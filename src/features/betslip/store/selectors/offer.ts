import { selector } from 'recoil';

import type { OfferUser } from 'src/common/enums';
import { OfferStatus } from 'src/common/enums';

import type { Legs } from '../../api/types/leg';
import { offerAtom } from '../atoms/offer';
import { getOfferExpiresAtInSeconds } from '../helpers/offer';

export const offerLegsSelector = selector<Legs>({
    key: 'offerLegsSelector',
    get: ({ get }) => {
        const { legs } = get(offerAtom);

        return legs;
    },
});

export const offerExpiresAtSelector = selector<string | null>({
    key: 'offerExpiresAtSelector',
    get: ({ get }) => {
        const { expiresAt } = get(offerAtom);

        return expiresAt;
    },
});

export const offerCreatedAtSelector = selector<string | null>({
    key: 'offerCreatedAtSelector',
    get: ({ get }) => {
        const { offeredAt } = get(offerAtom);

        return offeredAt;
    },
});

export const offerCountdownSelector = selector<number>({
    key: 'offerCountdownSelector',
    get: ({ get }) => {
        const offerExpiresAt = get(offerExpiresAtSelector);
        const offerCreatedAt = get(offerCreatedAtSelector);

        return getOfferExpiresAtInSeconds(offerExpiresAt, offerCreatedAt);
    },
});

export const offerStatusSelector = selector<OfferStatus | undefined>({
    key: 'offerStatusSelector',
    get: ({ get }) => {
        const { status } = get(offerAtom);

        return status;
    },
});

export const offerUserSelector = selector<OfferUser | null>({
    key: 'offerUserSelector',
    get: ({ get }) => {
        const { user } = get(offerAtom);

        return user;
    },
});

export const hasOfferSelector = selector<boolean>({
    key: 'hasOfferSelector',
    get: ({ get }) => get(offerStatusSelector) !== undefined,
});

export const isOfferRequestedSelector = selector<boolean>({
    key: 'isOfferRequestedSelector',
    get: ({ get }) => get(offerStatusSelector) === OfferStatus.Request,
});

export const isOfferedSelector = selector<boolean>({
    key: 'isOfferedSelector',
    get: ({ get }) => {
        const offerStatus = get(offerStatusSelector);

        return offerStatus === OfferStatus.Offer || offerStatus === OfferStatus.Offered;
    },
});

export const isOfferRejectedSelector = selector<boolean>({
    key: 'isOfferRejectedSelector',
    get: ({ get }) => get(offerStatusSelector) === OfferStatus.Reject,
});

export const isOfferTimeoutSelector = selector<boolean>({
    key: 'isOfferTimeoutSelector',
    get: ({ get }) => get(offerStatusSelector) === OfferStatus.Timeout,
});
