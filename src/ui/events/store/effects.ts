import type { AtomEffect } from 'recoil';

import type { PriceChange } from 'src/common/enums';

import { PRICE_CHANGE_RESET_TIMEOUT } from './configs';

export const resetPriceChangeEffect = ({ onSet, setSelf }: Parameters<AtomEffect<PriceChange | null>>[0]) => {
    let animationFrameId: number | null = null;
    let resetStartTime: number | null = null;

    const cleanupAnimation = () => {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        resetStartTime = null;
    };

    const startResetTimer = (timestamp: number) => {
        if (resetStartTime === null) {
            resetStartTime = timestamp;
        }

        const elapsed = timestamp - resetStartTime;

        if (elapsed >= PRICE_CHANGE_RESET_TIMEOUT) {
            cleanupAnimation();
            setSelf(null);
        } else {
            animationFrameId = requestAnimationFrame(startResetTimer);
        }
    };

    onSet((newPriceChange) => {
        cleanupAnimation();

        if (newPriceChange !== null) {
            animationFrameId = requestAnimationFrame(startResetTimer);
        }
    });

    return cleanupAnimation;
};
