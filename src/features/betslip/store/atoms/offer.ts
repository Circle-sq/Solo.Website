import { atom, atomFamily } from 'recoil';

import type { Price } from 'src/common/types/selectionPrice';

import type { Offer } from '../types';

export const offerAtom = atom<Offer>({
    key: 'offerAtom',
    default: {
        legs: {},
        expiresAt: null,
        offeredAt: null,
        status: undefined,
        user: null,
    },
});

export const standardBetPriceWhileOfferAtomFamily = atomFamily<Price | null, string>({
    key: 'standardBetPriceWhileOfferAtomFamily',
    default: null,
});
