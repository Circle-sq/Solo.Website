import { QuickBetAnimationState } from '../store/types';

import { ANIMATION_DURATION_MS, ANIMATION_PREVIEW_DURATION_MS, ANIMATION_WAIT_TIME_MS, EVENT_NAME } from './constants';

class StateEvent extends CustomEvent<boolean> {
    constructor(state: boolean) {
        super(EVENT_NAME, { detail: state });
    }
}

export const dispatchStateEvent = (state: boolean) => {
    window.dispatchEvent(new StateEvent(state));
};

export const subscribeState = (onOpen: () => void, onClose: () => void) => {
    const handler = (event: Event) => {
        if (event instanceof StateEvent) {
            if (event.detail) {
                onOpen();
            } else {
                setTimeout(onClose, ANIMATION_WAIT_TIME_MS);
            }
        }
    };

    window.addEventListener(EVENT_NAME, handler);

    return () => {
        window.removeEventListener(EVENT_NAME, handler);
    };
};

export const getAnimationDuration = (previous: QuickBetAnimationState, current: QuickBetAnimationState) => {
    if (previous === QuickBetAnimationState.Close && current === QuickBetAnimationState.Preview) {
        return ANIMATION_PREVIEW_DURATION_MS;
    }

    if (previous === QuickBetAnimationState.Preview && current === QuickBetAnimationState.Close) {
        return ANIMATION_PREVIEW_DURATION_MS;
    }

    return ANIMATION_DURATION_MS;
};

// @TODO - Temporary fix to prevent scrolling in Safari when the toolbar is minimized.
// Once an update is released, revisit this and remove the code if it's no longer necessary.
const preventDefault = (event: WheelEvent | TouchEvent) => {
    const quickbetScrollable = document.getElementById('quickbet-scrollable');
    const isNode = event.target instanceof Node;

    if (quickbetScrollable === null || isNode === false) {
        return;
    }

    const isScrollable = quickbetScrollable.scrollHeight > quickbetScrollable.clientHeight;
    const isTarget = quickbetScrollable === event.target;
    const isContainingTarget = quickbetScrollable.contains(event.target);

    if (isScrollable && (isTarget || isContainingTarget)) {
        return;
    }

    event.preventDefault();
};

const listenerOptions: AddEventListenerOptions = {
    passive: false,
};

export const disableScroll = () => {
    // Note: Do not remove this line.
    document.body.style.overflow = 'hidden';

    document.body.addEventListener('wheel', preventDefault, listenerOptions);
    document.body.addEventListener('touchmove', preventDefault, listenerOptions);
};

export const enableScroll = () => {
    // Note: Do not remove this line.
    document.body.style.overflow = 'auto';

    document.body.removeEventListener('wheel', preventDefault, listenerOptions);
    document.body.removeEventListener('touchmove', preventDefault, listenerOptions);
};
