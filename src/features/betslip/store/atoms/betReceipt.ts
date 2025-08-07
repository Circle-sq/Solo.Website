import { atom } from 'recoil';

import type { BetReceipt } from '../types';

export const betReceiptAtom = atom<BetReceipt>({
    key: 'betReceiptAtom',
    default: {
        legs: [],
        betsCount: 0,
        totalStake: 0,
        totalPotentialReturns: 0,
    },
});

export const keepPlacedBetsAtom = atom<boolean>({
    key: 'keepPlacedBetsAtom',
    default: false,
});
