import every from 'lodash/every';
import getIn from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import { selector, selectorFamily } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { BetslipErrorCode, MinMaxErrorCode } from 'src/common/enums/error';

import { isValidCombination } from '../../helpers/combinations';
import { betslipActiveTabAtom } from '../atoms/betslipTab';
import { multipleCombinationAtom, systemCombinationAtom } from '../atoms/combinations';
import {
    multipleBetStakesAtom,
    multipleBetStakesWhileOfferAtomFamily,
    singleBetStakesAtom,
    stakeNumpadStateAtom,
} from '../atoms/stake';
import { EMPTY_STAKE, MIN_ACTIVE_BETS } from '../configs';
import {
    calcSingleTabMaxStake,
    calcSingleTabSummaryStake,
    calcSingleTabTotalPotentialReturns,
    calcSingleTabTotalStake,
    calcSystemTabTotalStake,
} from '../helpers/stake/calc';
import { getStakePerLine } from '../helpers/stake/common';

import { isPossibleBetsLoadingSelector } from './betslip';
import {
    activeBetsCountSelector,
    betslipBetsSelector,
    betsSelector,
    checkedBetsSelector,
    hasLessThanTabLimitBetsSelector,
    hasMultipleBetsCountSelector,
    hasSuspendedBetSelector,
    uncheckedBetsSelector,
} from './betslipBets';
import { isSingleTabSelector, isSystemTabSelector } from './betslipTab';
import { hasSystemCombinationSelector } from './combinations';
import { appliedFreeBetsSelector, hasAppliedFreeBetOnMultipleTabSelector } from './freeBets';
import { hasOfferSelector, isOfferedSelector, offerLegsSelector } from './offer';
import { hasMinMaxStakeProblemSelectorFamily, hasMinMaxTotalStakeProblemSelectorFamily } from './problems';

export const singleBetStakePerLineWhileOfferSelectorFamily = selectorFamily<number, string>({
    key: 'singleBetStakePerLineWhileOfferSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            const offerLegs = get(offerLegsSelector);
            const uncheckedBets = get(uncheckedBetsSelector);

            return getIn({ ...offerLegs, ...uncheckedBets }, [betId, 'stakePerLine'], EMPTY_STAKE);
        },
});

export const singleBetStakePerLineSelectorFamily = selectorFamily<number, string>({
    key: 'singleBetStakePerLineSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            const singleBetStakes = get(singleBetStakesAtom);
            const singleBetStakeWhileOffer = get(singleBetStakePerLineWhileOfferSelectorFamily(betId));

            return get(isOfferedSelector) ? singleBetStakeWhileOffer : getIn(singleBetStakes, betId, EMPTY_STAKE);
        },
});

export const maxStakeSelector = selector<number>({
    key: 'maxStakeSelector',
    get: ({ get }) => {
        const activeTab = get(betslipActiveTabAtom);
        const activeBetsCount = get(activeBetsCountSelector);
        const bets = get(betsSelector);
        const multipleCombination = get(multipleCombinationAtom);
        const systemCombination = get(systemCombinationAtom);

        switch (activeTab) {
            case BetslipTab.Single:
                return activeBetsCount === MIN_ACTIVE_BETS ? calcSingleTabMaxStake(bets) : EMPTY_STAKE;

            case BetslipTab.Multi:
                return multipleCombination?.maxStake ?? EMPTY_STAKE;

            case BetslipTab.System:
                return systemCombination?.maxStake ?? EMPTY_STAKE;

            default:
                return EMPTY_STAKE;
        }
    },
});

export const possibleWinningsSelector = selector<number>({
    key: 'possibleWinningsSelector',
    get: ({ get }) => {
        const betslipTab = get(betslipActiveTabAtom);
        const checkedBets = get(checkedBetsSelector);
        const multipleCombination = get(multipleCombinationAtom);
        const systemCombination = get(systemCombinationAtom);
        const isPossibleBetsLoading = get(isPossibleBetsLoadingSelector);
        const multipleBetStakesWhileOffer = get(multipleBetStakesWhileOfferAtomFamily(betslipTab));
        const hasSuspendedBet = get(hasSuspendedBetSelector);
        const isOffered = get(isOfferedSelector);

        if (hasSuspendedBet || isEmpty(checkedBets)) {
            return EMPTY_STAKE;
        }

        const errorCodes = [...Object.values(MinMaxErrorCode), BetslipErrorCode.Related, BetslipErrorCode.SinglesOnly];
        const isInvalidCombination = !isValidCombination(multipleCombination?.problems, errorCodes);

        switch (betslipTab) {
            case BetslipTab.Single:
                return calcSingleTabTotalPotentialReturns(checkedBets);

            case BetslipTab.Multi: {
                if (!isOffered) {
                    if (isPossibleBetsLoading || isInvalidCombination) {
                        return EMPTY_STAKE;
                    }

                    return multipleCombination?.potentialReturns ?? EMPTY_STAKE;
                }

                return isPossibleBetsLoading
                    ? EMPTY_STAKE
                    : getIn(multipleBetStakesWhileOffer, 'potentialReturns', EMPTY_STAKE);
            }

            case BetslipTab.System: {
                if (isPossibleBetsLoading && !isOffered) {
                    return EMPTY_STAKE;
                }

                return isOffered
                    ? getIn(multipleBetStakesWhileOffer, 'potentialReturns', 0)
                    : systemCombination?.potentialReturns ?? EMPTY_STAKE;
            }

            default:
                return EMPTY_STAKE;
        }
    },
});

export const tabTotalStakeSelector = selector<number>({
    key: 'tabTotalStakeSelector',
    get: ({ get }) => {
        const betslipTab = get(betslipActiveTabAtom);
        const checkedBets = get(checkedBetsSelector);
        const systemCombination = get(systemCombinationAtom);
        const multipleBetStakes = get(multipleBetStakesAtom);
        const multipleBetStakesWhileOffer = get(multipleBetStakesWhileOfferAtomFamily(betslipTab));
        const singleBetStakes = get(singleBetStakesAtom);
        const isOffered = get(isOfferedSelector);

        switch (betslipTab) {
            case BetslipTab.Single:
                return calcSingleTabTotalStake(checkedBets, singleBetStakes, isOffered);

            case BetslipTab.Multi:
                return isOffered
                    ? getIn(multipleBetStakesWhileOffer, 'stakePerLine', 0)
                    : multipleBetStakes[BetslipTab.Multi];

            case BetslipTab.System: {
                const stakePerLine = isOffered
                    ? getIn(multipleBetStakesWhileOffer, 'stakePerLine', 0)
                    : multipleBetStakes[BetslipTab.System];

                return calcSystemTabTotalStake(systemCombination, stakePerLine);
            }

            default:
                return EMPTY_STAKE;
        }
    },
});

export const isTotalStakeEqualZeroSelector = selector<boolean>({
    key: 'isTotalStakeEqualZeroSelector',
    get: ({ get }) => get(tabTotalStakeSelector) === 0,
});

export const summaryStakeSelector = selector<number | null>({
    key: 'summaryStakeSelector',
    get: ({ get }) => {
        const appliedFreeBets = get(appliedFreeBetsSelector);
        const betslipTab = get(betslipActiveTabAtom);
        const checkedBets = get(checkedBetsSelector);
        const singleBetStakes = get(singleBetStakesAtom);
        const multipleBetStakes = get(multipleBetStakesAtom);
        const multipleBetStakesWhileOffer = get(multipleBetStakesWhileOfferAtomFamily(betslipTab));
        const isOffered = get(isOfferedSelector);

        if (betslipTab === BetslipTab.Single) {
            return calcSingleTabSummaryStake(checkedBets, singleBetStakes, keys(appliedFreeBets), isOffered);
        }

        return isOffered ? getIn(multipleBetStakesWhileOffer, 'stakePerLine', 0) : multipleBetStakes[betslipTab];
    },
});

export const summaryStakeInputValueSelector = selector<number | null>({
    key: 'summaryStakeInputValueSelector',
    get: ({ get }) => {
        const totalStake = get(tabTotalStakeSelector);
        const summaryStake = get(summaryStakeSelector);
        const activeBetsCount = get(activeBetsCountSelector);
        const hasAppliedFreeBet = get(hasAppliedFreeBetOnMultipleTabSelector);

        const hasMinActiveBets = activeBetsCount === MIN_ACTIVE_BETS;

        return hasMinActiveBets && hasAppliedFreeBet ? totalStake : summaryStake;
    },
});

export const isSummaryStakeDisabledSelector = selector<boolean>({
    key: 'isSummaryStakeDisabledSelector',
    get: ({ get }) => {
        const hasOffer = get(hasOfferSelector);
        const hasSystemCombination = get(hasSystemCombinationSelector);
        const hasLessThanTabLimitBets = get(hasLessThanTabLimitBetsSelector);
        const hasAppliedFreeBet = get(hasAppliedFreeBetOnMultipleTabSelector);
        const isSystemTab = get(isSystemTabSelector);

        return hasAppliedFreeBet || hasOffer || hasLessThanTabLimitBets || (isSystemTab && !hasSystemCombination);
    },
});

export const showCardStakeSelector = selector<boolean>({
    key: 'showCardStakeSelector',
    get: ({ get }) => {
        const hasMultipleBetsCount = get(hasMultipleBetsCountSelector);
        const isSingleTab = get(isSingleTabSelector);

        return isSingleTab && hasMultipleBetsCount;
    },
});

export const showNumpadSelectorFamily = selectorFamily<boolean, string>({
    key: 'showNumpadSelectorFamily',
    get:
        (numpadId) =>
        ({ get }) => {
            const stakeNumpadState = get(stakeNumpadStateAtom);

            return getIn(stakeNumpadState, numpadId, false);
        },
});

export const hasStakeErrorSelector = selectorFamily<boolean, string>({
    key: 'hasStakeErrorSelector',
    get:
        (betId) =>
        ({ get }) => {
            const isSingleTab = get(isSingleTabSelector);
            const activeBetsCount = get(activeBetsCountSelector);
            const hasMinMaxProblem = get(hasMinMaxStakeProblemSelectorFamily(betId));

            return isSingleTab && hasMinMaxProblem && activeBetsCount !== MIN_ACTIVE_BETS;
        },
});

export const hasStakeInputErrorSelector = selectorFamily<boolean, string>({
    key: 'hasStakeInputErrorSelector',
    get:
        (betId) =>
        ({ get }) => {
            const hasMinMaxTotalStakeProblem = get(hasMinMaxTotalStakeProblemSelectorFamily(betId));
            const hasMinMaxProblem = get(hasMinMaxStakeProblemSelectorFamily(betId));

            return hasMinMaxTotalStakeProblem || hasMinMaxProblem;
        },
});

export const hasStakePerLineSelector = selector<boolean>({
    key: 'hasStakePerLineSelector',
    get: ({ get }) => {
        const betslipTab = get(betslipActiveTabAtom);
        const betslipBets = get(betslipBetsSelector);
        const singleBetStakes = get(singleBetStakesAtom);
        const multipleBetStakes = get(multipleBetStakesAtom);

        if (betslipTab === BetslipTab.Single) {
            return every(
                betslipBets,
                (bet) => getStakePerLine(singleBetStakes, bet.selectionId ?? bet.id) > EMPTY_STAKE,
            );
        }

        return multipleBetStakes[betslipTab] > EMPTY_STAKE;
    },
});
