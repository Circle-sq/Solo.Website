import { isBefore } from 'date-fns';

import { STORAGE_KEYS } from './constants';
import { getStorageBuilder } from './StorageService';

export const isTokenExpired = () => {
    const expiresToken = getStorageBuilder()(STORAGE_KEYS.tokenExpireDate).getItem();

    return expiresToken && isBefore(new Date(expiresToken), new Date());
};
