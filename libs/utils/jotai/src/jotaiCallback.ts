import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';

import { store } from './store';
import type { CallbackParams } from './types';

export function jotaiCallback<Args extends unknown[], Return>(
    callback: (params: CallbackParams) => (...args: Args) => Return,
): (...args: Args) => Return {
    return (...args: Args) => {
        let result: Return;

        batchedUpdates(() => {
            result = callback({
                get: store.get,
                set: store.set,
            })(...args);
        });

        return result!;
    };
}
