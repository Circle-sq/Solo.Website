import type { Getter, Setter } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import type { DependencyList } from 'react';
import { useCallback } from 'react';

import type { CallbackParams } from './types';

export function useJotaiCallback<Args extends unknown[], Return>(
    callback: (i: CallbackParams) => (...args: Args) => Return,
    deps?: DependencyList,
): (...args: Args) => Return {
    return useAtomCallback(
        useCallback(
            (get: Getter, set: Setter, ...args: Args) => {
                return callback({
                    get,
                    set,
                })(...args);
            },
            deps ? [...deps] : [],
        ),
    );
}
