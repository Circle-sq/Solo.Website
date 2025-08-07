import { atom } from 'recoil';

import { persistBetslipAtom } from 'src/common/recoil/persist';

import type { Legs } from '../../api/types/leg';
import type { SelectedBet } from '../../api/types/possibleBet';

export const betsAtom = atom<Legs>({
    key: 'betsAtom',
    effects: [persistBetslipAtom],
    default: {},
});

export const singleBetsAtom = atom<SelectedBet[]>({
    key: 'singleBetsAtom',
    default: [],
});

export const changedPriceBetIdsAtom = atom<string[]>({
    key: 'changedPriceBetIdsAtom',
    effects: [persistBetslipAtom],
    default: [],
});

export const uncheckedBetIdsAtom = atom<string[]>({
    key: 'uncheckedBetIdsAtom',
    effects: [persistBetslipAtom],
    default: [],
});
