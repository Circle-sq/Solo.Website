import { atom, selector } from 'recoil';
import size from 'lodash/size';

import { betslipSelectionsAtom } from '@sc-betslip/store/atoms/selections';

import { BettingTab } from 'src/common/enums';

import { resetQuickBetAnimationStateEffect } from './effects';
import { showMyBetsSelector, showQuickBetSelector } from './selectors';
import { QuickBetAnimationState, type Betting } from './types';

export const bettingAtom = atom<Betting>({
    key: 'bettingAtom',
    default: {
        bettingTab: BettingTab.Betslip,
        showBackdrop: false,
        showQuickBet: false,
        showMyBets: false,
    },
});

export const quickBetAnimationStateAtom = atom<QuickBetAnimationState>({
    key: 'quickBetAnimationStateAtom',
    default: selector({
        key: 'quickBetAnimationStateAtom/default',
        get: ({ get }) => {
            const showQuickBet = get(showQuickBetSelector);
            const showMyBets = get(showMyBetsSelector);
            const selectionsCount = size(get(betslipSelectionsAtom));

            if (showQuickBet) {
                return QuickBetAnimationState.Open;
            }

            if (showMyBets) {
                return QuickBetAnimationState.Close;
            }

            return selectionsCount > 0 ? QuickBetAnimationState.Preview : QuickBetAnimationState.Close;
        },
    }),
    effects: [resetQuickBetAnimationStateEffect],
});

export const quickBetStandaloneAnimationStateAtom = atom<QuickBetAnimationState>({
    key: 'quickBetStandaloneAnimationStateAtom',
    default: selector({
        key: 'quickBetStandaloneAnimationStateAtom/default',
        get: ({ get }) => {
            const showQuickBet = get(showQuickBetSelector);

            return showQuickBet ? QuickBetAnimationState.Open : QuickBetAnimationState.Close;
        },
    }),
    effects: [resetQuickBetAnimationStateEffect],
});
