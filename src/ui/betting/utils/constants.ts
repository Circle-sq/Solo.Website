import type { CSSProperties } from 'react';

import { GenericColors, Opacities } from '@sc-ui/system';

import { QuickBetAnimationState } from '../store/types';

export const EVENT_NAME = 'quickbet:state';

export const OFFSET_TOP = 50;
export const HIGHLIGHTS_HEIGHT = 40;

export const ROTATION_HIGHLIGHT_COUNT = 3;
export const ROTATION_HIGHLIGHT_HEIGHT = 20;
export const ROTATION_INTERVAL_MS = 5000;
export const ROTATION_DURATION_MS = 1000;

export const ANIMATION_DURATION_MS = 1000;
export const ANIMATION_PREVIEW_DURATION_MS = 250;
export const ANIMATION_CLOSE_DELAY_RATIO = 0.95;
export const ANIMATION_WAIT_TIME_MS = ANIMATION_DURATION_MS * ANIMATION_CLOSE_DELAY_RATIO;

export const ANIMATIONS_STYLES: Record<QuickBetAnimationState, CSSProperties> = {
    [QuickBetAnimationState.Close]: {
        boxShadow: 'none',
        transform: 'translate3d(0, 100%, 0)',
    },
    [QuickBetAnimationState.Open]: {
        boxShadow: `0 0 4px ${GenericColors.black + Opacities.opacity25}`,
        transform: 'translate3d(0, 0%, 0)',
    },
    [QuickBetAnimationState.Preview]: {
        boxShadow: 'none',
        transform: `translate3d(0, calc(100% - ${HIGHLIGHTS_HEIGHT}px), 0)`,
    },
};
