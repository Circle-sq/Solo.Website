import type { AtomEffect } from 'recoil';

import { ANIMATION_WAIT_TIME_MS } from '../utils/constants';

import type { QuickBetAnimationState } from './types';

export const resetQuickBetAnimationStateEffect: AtomEffect<QuickBetAnimationState> = ({ onSet, resetSelf }) => {
    let timerId: NodeJS.Timeout | null = null;

    onSet(() => {
        timerId = setTimeout(() => {
            resetSelf();
        }, ANIMATION_WAIT_TIME_MS);
    });

    return () => {
        if (timerId !== null) {
            clearTimeout(timerId);
        }
    };
};
