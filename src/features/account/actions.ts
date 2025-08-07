import { store } from '@sc-utils/jotai';

import type { OddsFormatLong } from 'src/common/enums';
import { STORAGE_KEYS } from 'src/utils/constants';
import { getTokenExpirationDate } from 'src/utils/jwt';

import { SessionService, UserService } from './api/services';
import { updateStorageItems } from './helpers';
import { isAuthenticatedAtom, userDataAtom } from './store/atoms';
import { oddsFormatSelector } from './store/selectors';
import type { SessionPayload } from './types';

interface Options {
    throwOnError?: boolean;
}

export const signIn = async (payload: SessionPayload, { throwOnError = false }: Options = {}) => {
    try {
        const { token, refresh_token, expires, ...userData } = await SessionService.createSession(payload);

        updateStorageItems([
            { key: STORAGE_KEYS.token, value: token },
            { key: STORAGE_KEYS.tokenExpireDate, value: getTokenExpirationDate(token) },
            { key: STORAGE_KEYS.refreshToken, value: refresh_token },
            { key: STORAGE_KEYS.refreshTokenExpireDate, value: expires },
            { key: STORAGE_KEYS.seenNotifications },
        ]);

        store.set(isAuthenticatedAtom, true);
        store.set(userDataAtom, userData);
    } catch (error) {
        console.error('Failed to signIn', error);

        if (throwOnError) {
            throw error;
        }
    }
};

export const signOut = async ({ throwOnError = false }: Options = {}) => {
    try {
        updateStorageItems([
            { key: STORAGE_KEYS.token },
            { key: STORAGE_KEYS.tokenExpireDate },
            { key: STORAGE_KEYS.refreshToken },
            { key: STORAGE_KEYS.refreshTokenExpireDate },
            { key: STORAGE_KEYS.seenNotifications },
        ]);

        store.set(isAuthenticatedAtom, false);
        store.set(userDataAtom, null);

        await SessionService.deleteSession();
    } catch (error) {
        console.error('Failed to signOut', error);

        if (throwOnError) {
            throw error;
        }
    }
};

export const updateOddsFormat = async (oddsFormat: OddsFormatLong, { throwOnError = false }: Options = {}) => {
    const previousOddsFormat = store.get(oddsFormatSelector);

    try {
        store.set(userDataAtom, (state) => {
            if (state === null) {
                return state;
            }

            return { ...state, oddsFormat };
        });

        await UserService.changeOddsFormat(oddsFormat);
    } catch (error) {
        console.error('Failed to updateOddsFormat', error);

        store.set(userDataAtom, (state) => {
            if (state === null) {
                return state;
            }

            return { ...state, oddsFormat: previousOddsFormat };
        });

        if (throwOnError) {
            throw error;
        }
    }
};
