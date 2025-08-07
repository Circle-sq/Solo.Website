import { differenceInSeconds, isAfter } from 'date-fns';
import isNull from 'lodash/isNull';
import isString from 'lodash/isString';

export const isOfferExist = (expiresAt: string | null) => isNull(expiresAt) || isAfter(new Date(expiresAt), Date.now());

export const getOfferExpiresAtInSeconds = (expiresAt: string | null, offeredAt: string | null): number => {
    if (!isString(expiresAt)) {
        return 0;
    }

    if (offeredAt === null) {
        return differenceInSeconds(new Date(expiresAt), new Date());
    }

    return differenceInSeconds(new Date(expiresAt), new Date(offeredAt));
};
