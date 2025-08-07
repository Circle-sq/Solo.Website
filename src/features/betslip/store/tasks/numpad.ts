import mapValues from 'lodash/mapValues';
import type { CallbackInterface } from 'recoil';

import { stakeNumpadStateAtom } from '../atoms/stake';

export const openNumpadTask =
    ({ set }: CallbackInterface) =>
    (numpadId: string) => {
        set(stakeNumpadStateAtom, (state) => mapValues(state, (_, id) => id === numpadId));
    };

export const closeNumpadTask =
    ({ set }: CallbackInterface) =>
    (numpadId: string) => {
        set(stakeNumpadStateAtom, (state) => ({ ...state, [numpadId]: false }));
    };
