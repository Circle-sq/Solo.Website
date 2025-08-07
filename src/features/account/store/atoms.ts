import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { UserData, UserSettings } from '../types';

export const showLoginPopupAtom = atom<boolean>(false);

export const isAuthenticatedAtom = atomWithStorage('isAuthenticated', false, undefined, {
    getOnInit: true,
});

export const userDataAtom = atomWithStorage<UserData | null>('userData', null, undefined, {
    getOnInit: true,
});

export const userSettingsAtom = atomWithStorage<Partial<UserSettings> | undefined>(
    'userSettings',
    undefined,
    undefined,
    {
        getOnInit: true,
    },
);
