import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import some from 'lodash/some';
import { selector, selectorFamily } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { isSuspendedSelectionSelectorFamily } from 'src/ui/events/store/selectors/selection';

import type { Leg, Legs } from '../../api/types/leg';
import { splitIds } from '../../helpers/multiBet';
import { isMultiBetType } from '../../typeGuards/bet';
import { betsAtom, changedPriceBetIdsAtom, uncheckedBetIdsAtom } from '../atoms/betslipBets';
import { betslipActiveTabAtom } from '../atoms/betslipTab';
import { systemCombinationAtom } from '../atoms/combinations';
import { singleBetStakesAtom } from '../atoms/stake';
import { betsLimitByTab, EMPTY_STAKE, MIN_ACTIVE_BETS } from '../configs';
import { getBetslipBets, getCheckedBets, getUncheckedBets, isChecked } from '../helpers/betslipBets';
import { getStakePerLine } from '../helpers/stake/common';

import { isSingleTabSelector } from './betslipTab';
import { offerLegsSelector } from './offer';
import { betslipSelectionParamIdsSelectorFamily } from './selections';

export const uncheckedBetsSelector = selector<Legs>({
    key: 'uncheckedBetsSelector',
    get: ({ get }) => getUncheckedBets(get(betsAtom), get(uncheckedBetIdsAtom)),
});

export const betsSelector = selector<Legs>({
    key: 'betsSelector',
    get: ({ get }) => {
        const bets = get(betsAtom);
        const offerLegs = get(offerLegsSelector);
        const uncheckedBets = get(uncheckedBetsSelector);

        if (!isEmpty(offerLegs)) {
            return { ...offerLegs, ...uncheckedBets };
        }

        return bets;
    },
});

export const betslipBetsSelector = selector<Legs>({
    key: 'betslipBetsSelector',
    get: ({ get }) => getBetslipBets(get(betsSelector)),
});

export const checkedBetsSelector = selector<Legs>({
    key: 'checkedBetsSelector',
    get: ({ get }) => getCheckedBets(get(betslipBetsSelector), get(uncheckedBetIdsAtom)),
});

export const isCheckedBetslipBetSelectorFamily = selectorFamily<boolean, string>({
    key: 'isCheckedBetslipBetSelectorFamily',
    get:
        (betId) =>
        ({ get }) =>
            isChecked(get(uncheckedBetIdsAtom), betId),
});

export const hasUncheckedBetSelector = selector<boolean>({
    key: 'hasUncheckedBetSelector',
    get: ({ get }) => !isEmpty(get(uncheckedBetIdsAtom)),
});

export const hasCheckedBetWithoutStakeSelector = selector<boolean>({
    key: 'hasCheckedBetWithoutStakeSelector',
    get: ({ get }) => {
        const singleBetStakes = get(singleBetStakesAtom);

        return some(
            get(checkedBetsSelector),
            (bet) => getStakePerLine(singleBetStakes, bet.selectionId ?? bet.id) === EMPTY_STAKE,
        );
    },
});

export const betslipBetsCounterSelector = selector<number>({
    key: 'betslipBetsCounterSelector',
    get: ({ get }) => size(get(betslipBetsSelector)),
});

export const hasMultipleBetsCountSelector = selector<boolean>({
    key: 'hasMultipleBetsCountSelector',
    get: ({ get }) => get(betslipBetsCounterSelector) > betsLimitByTab.single,
});

export const activeBetsSelector = selector<Leg[]>({
    key: 'activeBetsSelector',
    cachePolicy_UNSTABLE: { eviction: 'most-recent' },
    get: ({ get }) => {
        const activeBets: Leg[] = [];

        forEach(get(checkedBetsSelector), (bet) => {
            if (isMultiBetType(bet)) {
                const isMultiBetSuspended = splitIds(bet.id).some((selectionId) => {
                    const paramIds = get(betslipSelectionParamIdsSelectorFamily(Number(selectionId)));

                    return get(isSuspendedSelectionSelectorFamily(paramIds));
                });

                if (!isMultiBetSuspended) {
                    activeBets.push(bet);
                }
            } else {
                const paramIds = get(betslipSelectionParamIdsSelectorFamily(Number(bet.selectionId)));
                const isSuspended = get(isSuspendedSelectionSelectorFamily(paramIds));

                if (!isSuspended) {
                    activeBets.push(bet);
                }
            }
        });

        return activeBets;
    },
});

export const activeBetsCountSelector = selector<number>({
    key: 'activeBetsCountSelector',
    get: ({ get }) => size(get(activeBetsSelector)),
});

export const minBetsCountSelector = selector<number>({
    key: 'minBetsCountSelector',
    get: ({ get }) => {
        const activeBetsCount = get(activeBetsCountSelector);
        const betslipTab = get(betslipActiveTabAtom);

        const hasLessThanTabLimitBets = activeBetsCount < betsLimitByTab[betslipTab];

        return hasLessThanTabLimitBets ? betsLimitByTab[betslipTab] : 0;
    },
});

export const suspendedBetsCountSelector = selector<number>({
    key: 'suspendedBetsCountSelector',
    get: ({ get }) => {
        const checkedBets = get(checkedBetsSelector);
        const activeBetsCount = get(activeBetsCountSelector);

        return size(checkedBets) - activeBetsCount;
    },
});

export const hasSuspendedBetSelector = selector<boolean>({
    key: 'hasSuspendedBetSelector',
    get: ({ get }) => get(suspendedBetsCountSelector) > 0,
});

export const hasLessThanTabLimitBetsSelector = selector<boolean>({
    key: 'hasLessThanTabLimitBetsSelector',
    get: ({ get }) => {
        const activeBetsCount = get(activeBetsCountSelector);
        const activeTab = get(betslipActiveTabAtom);

        return activeBetsCount < betsLimitByTab[activeTab];
    },
});

export const isMaxBetValueAvailableSelector = selector<boolean>({
    key: 'isMaxBetValueAvailableSelector',
    get: ({ get }) => {
        const activeBetsCount = get(activeBetsCountSelector);
        const isSingleTab = get(isSingleTabSelector);

        return !isSingleTab || (isSingleTab && activeBetsCount === MIN_ACTIVE_BETS);
    },
});

export const hasChangedLegSelector = selector<boolean>({
    key: 'hasChangedLegSelector',
    get: ({ get }) => {
        return !isEmpty(get(changedPriceBetIdsAtom));
    },
});

export const hasBetWithoutPriceSelector = selector<boolean>({
    key: 'hasBetWithoutPriceSelector',
    get: ({ get }) => some(get(betslipBetsSelector), ({ price }) => price === undefined),
});

export const hasCheckedMultiBetSelector = selector<boolean>({
    key: 'hasCheckedMultiBetSelector',
    get: ({ get }) => {
        const uncheckedBetIds = get(uncheckedBetIdsAtom);

        return some(get(betsSelector), (bet) => isMultiBetType(bet) && isChecked(uncheckedBetIds, bet.id));
    },
});

export const totalBetsSelectorFamily = selectorFamily<number, BetslipTab>({
    key: 'totalBetsSelectorFamily',
    get:
        (activeTab) =>
        ({ get: getRecoilValue }) => {
            switch (activeTab) {
                case BetslipTab.Single: {
                    const activeBetsCount = getRecoilValue(activeBetsCountSelector);
                    const hasActiveBets = activeBetsCount >= MIN_ACTIVE_BETS;

                    return hasActiveBets ? activeBetsCount : 0;
                }

                case BetslipTab.System: {
                    const systemCombination = getRecoilValue(systemCombinationAtom);

                    return get(systemCombination, 'numLines', 0);
                }

                default:
                    return 0;
            }
        },
});
