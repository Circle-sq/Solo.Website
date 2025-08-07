import { composeWithDevTools } from '@redux-devtools/extension';
import { Map } from 'immutable';
import flatten from 'lodash/flatten';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import modules from '../modules';
import { createIgnoreNodeMiddleware, createAsyncMiddleware, createRepeatMiddleware } from '../utils/AsyncRender';
import combine from '../utils/combine';

function buildModules(modules, clbk) {
    const mods = {};

    Object.keys(modules).forEach((mod) => {
        if (clbk) {
            clbk(mod, modules[mod]);
        }

        mods[mod] = combine(modules[mod].reducers);
    });

    return combineReducers(mods);
}

export default function (data = {}, app) {
    const sagaMiddleware = createSagaMiddleware();
    const ignoreNodeMiddleware = createIgnoreNodeMiddleware();
    const asyncMiddleware = createAsyncMiddleware();
    const repeatMiddleware = createRepeatMiddleware();

    const mods = buildModules(modules, (mod) => {
        if (!data[mod]) {
            data[mod] = new Map();
        }
    });

    // FIXME: When redux-saga will correctly rethrow errors, it's not needed
    const sagaFailMiddleware = () => (next) => (action) => {
        try {
            next(action);
        } catch (e) {
            return Promise.reject(e);
        }
    };
    // END OF FIX

    const composeEnhancers = composeWithDevTools({});

    const middlewares = [thunk, ignoreNodeMiddleware, sagaMiddleware, sagaFailMiddleware];

    const store = createStore(mods, data, composeEnhancers(applyMiddleware(...middlewares)));

    store.async = asyncMiddleware;

    store.repeat = repeatMiddleware;

    let sagas = [];

    //run saga only in browser
    if (typeof window !== 'undefined') {
        sagas = sagas.concat.apply(
            sagas,
            Object.keys(modules)
                .map((mod) => modules[mod].init)
                .filter((x) => x)
                .map((init) => init(sagaMiddleware, app)),
        );

        sagas = flatten(sagas).filter((x) => x);

        window.store = store;
    }

    /**
     * Destroy store to be sure that there is no leak
     * After calling this methods it's not usable.
     */
    store.destroy = () => {
        sagas.forEach((saga) => saga.cancel());

        sagas = [];

        asyncMiddleware.clear();

        repeatMiddleware.clear();

        delete store._functions;

        delete store._components;
    };

    return store;
}
