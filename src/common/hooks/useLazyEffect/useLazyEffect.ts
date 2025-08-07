import { useEffect } from 'react';
import type { DependencyList, EffectCallback } from 'react';

import { useFirstMount } from '../useFirstMount/useFirstMount';

/**
 * Modified version of useEffect that is skipping the first render.
 */

export const useLazyEffect = (effect: EffectCallback, deps?: DependencyList) => {
    const isFirstMount = useFirstMount();

    useEffect(() => {
        if (!isFirstMount) {
            return effect();
        }
    }, deps);
};
