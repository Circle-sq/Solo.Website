import { atom, atomFamily } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { persistBetslipAtom } from 'src/common/recoil/persist';

import type { BetStake } from '../../api/types/bet';
import { EMPTY_STAKE } from '../configs';
import type { MultipleBetStakes } from '../types';

export const singleBetStakesAtom = atom<Record<string, number>>({
    key: 'singleBetStakesAtom',
    default: {},
    effects: [persistBetslipAtom],
});

export const multipleBetStakesAtom = atom<MultipleBetStakes>({
    key: 'multipleBetStakesAtom',
    default: {
        [BetslipTab.Multi]: EMPTY_STAKE,
        [BetslipTab.System]: EMPTY_STAKE,
    },
    effects: [persistBetslipAtom],
});

export const multipleBetStakesWhileOfferAtomFamily = atomFamily<BetStake, BetslipTab>({
    key: 'multipleBetStakesWhileOfferAtomFamily',
    default: undefined,
});

export const stakeNumpadStateAtom = atom<Record<string, boolean>>({
    key: 'stakeNumpadStateAtom',
    default: {},
});
