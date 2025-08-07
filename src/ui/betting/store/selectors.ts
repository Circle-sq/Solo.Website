import { selector } from 'recoil';

import type { BettingTab } from 'src/common/enums';
import { isStandalone } from 'src/infra.client';

import { bettingAtom, quickBetAnimationStateAtom, quickBetStandaloneAnimationStateAtom } from './atoms';
import type { QuickBetAnimationState } from './types';

export const bettingTabSelector = selector<BettingTab>({
    key: 'bettingTabSelector',
    get: ({ get }) => {
        const { bettingTab } = get(bettingAtom);

        return bettingTab;
    },
});

export const showBackdropSelector = selector<boolean>({
    key: 'showBackdropSelector',
    get: ({ get }) => {
        const { showBackdrop } = get(bettingAtom);

        return showBackdrop;
    },
});

export const showMyBetsSelector = selector<boolean>({
    key: 'showMyBetsSelector',
    get: ({ get }) => {
        const { showMyBets } = get(bettingAtom);

        return showMyBets;
    },
});

export const showQuickBetSelector = selector<boolean>({
    key: 'showQuickBetSelector',
    get: ({ get }) => {
        const { showQuickBet } = get(bettingAtom);

        return showQuickBet;
    },
});

export const quickBetAnimationStateSelector = selector<QuickBetAnimationState>({
    key: 'quickBetAnimationStateSelector',
    get: ({ get }) => {
        if (isStandalone()) {
            return get(quickBetStandaloneAnimationStateAtom);
        }

        return get(quickBetAnimationStateAtom);
    },
});
