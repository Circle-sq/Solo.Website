import { atom } from 'recoil';

import { persistBetslipAtom } from 'src/common/recoil/persist';

import type { Combination, Combinations, CombinationStandardLeg } from '../../api/types/combination';
import { syncSystemBetTypeEffect } from '../effects/combinations';

export const combinationsAtom = atom<Combinations>({
    key: 'combinationsAtom',
    default: {},
    effects: [persistBetslipAtom],
});

export const multipleCombinationAtom = atom<Combination | undefined>({
    key: 'multipleCombinationAtom',
    default: undefined,
    effects: [persistBetslipAtom],
});

export const systemCombinationAtom = atom<Combination<CombinationStandardLeg> | undefined>({
    key: 'systemCombinationAtom',
    default: undefined,
    effects: [persistBetslipAtom],
});

export const systemBetTypeAtom = atom<string | undefined>({
    key: 'systemBetTypeAtom',
    default: undefined,
    effects: [persistBetslipAtom, syncSystemBetTypeEffect],
});
