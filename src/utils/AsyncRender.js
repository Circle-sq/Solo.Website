import { renderToString } from 'react-dom/server';

// Constants for async actions

const START = 'start';
const END = 'end';

const constants = Object.freeze({
    START: START,
    END: END,
});

/**
 * Middleware factory to handle async actions
 *
 * @param {string} key Key used in actions for async actions
 * @returns {function} Redux middleware with some additional properties
 */
function createAsyncMiddleware({ key = 'async' } = {}) {
    let callbacks = [];
    let counter = 0;
    let timeout = void 0;

    // Extracted method to call all callbacks
    const onIdle = () => callbacks.forEach((callback) => callback());

    function asyncMiddleware() {
        return (next) => (action) => {
            if (action[key] === START) {
                counter++;
            } else if (action[key] === END) {
                if (counter <= 0) {
                    console.error(
                        `Something is wrong with your async actions. Probably FINISH method is called from outside the flow.`,
                    );
                }

                // Don't break application even if some FINISH actions were running beside flow is broken
                counter = Math.max(0, counter - 1);
            } else {
                return next(action);
            }

            if (action[key]) {
                clearTimeout(timeout);

                if (!counter) {
                    // Queue callbacks in event loop to be sure that no async actions will be called immediately
                    timeout = setTimeout(onIdle, 1);
                }
            }

            next(action);
        };
    }

    const isWorking = (asyncMiddleware.isWorking = () => counter > 0);

    /**
     * Add listener for `idle` state
     *
     * @param {function} clbk
     * @returns {function}
     */
    asyncMiddleware.onIdle = (clbk) => {
        const f = () => clbk();

        callbacks.push(f);

        // Run callback immediately if there is no async actions, otherwise it will be called in standard flow
        if (!isWorking()) {
            clbk();
        }

        return () => {
            const index = callbacks.indexOf(f);

            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        };
    };

    // Clear everything and remove references
    asyncMiddleware.clear = () => {
        clearTimeout(timeout);

        callbacks = [];

        counter = 0;
    };

    return asyncMiddleware;
}

/**
 * Middleware factory for ignoring actions server-side
 * Remember to use it before other middlewares or after repeatMiddleware!
 *
 * @param {string} key Key used in actions for actions ignored in Node.js
 * @returns {function} Redux middleware
 */
function createIgnoreNodeMiddleware({ key = 'clientOnly' } = {}) {
    if (typeof window !== 'undefined') {
        // When it's browser just pass action to next middleware
        return () => (next) => next;
    } else {
        return function ignoreNodeMiddleware() {
            return (next) => (action) => {
                if (!action[key]) {
                    next(action);
                }
            };
        };
    }
}

/**
 * Middleware factory to queue actions in Node.js
 *
 * @param {string} key Key used in actions for async actions
 * @returns {function} Redux middleware with some additional properties
 */
function createRepeatMiddleware({ key = 'repeat' } = {}) {
    let queue = [];
    let middleware;

    if (typeof window !== 'undefined') {
        // If it's browser just pass to next middleware
        middleware = () => (next) => next;
    } else {
        middleware = function repeatMiddleware() {
            return (next) => (action) => {
                if (action[key]) {
                    queue.push(action);
                }

                next(action);
            };
        };
    }

    /**
     * @returns {object[]} queued actions; new instance for encapsulation (partial - you can, but SHOULDN'T modify actions)
     */
    middleware.getQueue = () => [].concat(queue);

    /**
     * Clear queue
     */
    middleware.clear = () => {
        queue = [];
    };

    return middleware;
}

/**
 * Prepare ready data to show page to user
 *
 * @param {function({ html, actions, state }, err)} callback  Called after render, with HTML, Redux store state and queued actions
 * @param {object} store  Redux store
 * @param asyncMiddleware
 * @param [repeatMiddleware]
 * @param createVirtualDom  Method which will return virtual DOM passed to render function
 * @param [tries]  Max. number of render retries (when async actions are dispatched again after render)
 */
function render(callback, { store, asyncMiddleware, repeatMiddleware, createVirtualDom, _tries = 1 } = {}) {
    let tries = _tries;

    if (!store || typeof store.getState !== 'function') {
        throw new TypeError('You need to pass store to function.');
    }

    if (
        asyncMiddleware &&
        (typeof asyncMiddleware !== 'function' ||
            typeof asyncMiddleware.clear !== 'function' ||
            typeof asyncMiddleware.isWorking !== 'function')
    ) {
        throw new TypeError('You need to pass correct asyncMiddleware to function.');
    }

    if (repeatMiddleware && (typeof repeatMiddleware !== 'function' || typeof repeatMiddleware.clear !== 'function')) {
        throw new TypeError('You need to pass correct repeatMiddleware to function.');
    }

    if (typeof createVirtualDom !== 'function') {
        throw new TypeError('You need to pass function to create React Virtual DOM.');
    }

    let result = {};
    let err = null;

    /**
     * Build new render result.
     * It caches error, to be sure that even if something will break, user will get previous version
     *
     * @returns {object}
     */
    function buildResult() {
        try {
            result.html = renderToString(createVirtualDom());

            result.state = store.getState();

            result.actions = repeatMiddleware ? repeatMiddleware.getQueue() : [];
        } catch (e) {
            err = e;
        }

        return result;
    }

    result = buildResult();

    // Run callback immediately if there is no need for async actions
    if (!asyncMiddleware || !asyncMiddleware.isWorking() || !tries) {
        return callback(result, err);
    }

    // Keep `unregister` to clean all possible references
    const unregister = asyncMiddleware.onIdle(() => {
        result = buildResult();

        // If there is no HTML something has broken before any render
        if (!result.html) {
            unregister();

            callback(result, err);
        }

        tries--;

        if (!asyncMiddleware.isWorking() || !tries) {
            unregister();

            callback(result, err);
        }
    });
}

export { createAsyncMiddleware, createRepeatMiddleware, createIgnoreNodeMiddleware, constants, render };
