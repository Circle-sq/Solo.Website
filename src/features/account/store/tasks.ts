import type { CallbackParams } from '@solo-utils/jotai';

import isLocal from 'src/utils/isLocal';

import type { UserData } from '../types';

import { showLoginPopupAtom, userDataAtom } from './atoms';
import { updateUserData } from './helpers';

export const openLoginPopupTask =
    ({ set }: CallbackParams) =>
    () => {
        if (!isLocal()) {
            return;
        }

        set(showLoginPopupAtom, true);
    };

export const closeLoginPopupTask =
    ({ set }: CallbackParams) =>
    () => {
        set(showLoginPopupAtom, false);
    };

export const updateAccountUserTask =
    ({ set }: CallbackParams) =>
    (userData: Partial<UserData>) => {
        set(userDataAtom, updateUserData(userData));
    };
