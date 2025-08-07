import isEmpty from 'lodash/isEmpty';
import { selector, selectorFamily } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { MutationStatus } from 'src/common/enums/status';

import { placeBetStatusAtom } from '../atoms/betslip';
import { betslipActiveTabAtom } from '../atoms/betslipTab';
import { multipleBetStakesAtom } from '../atoms/stake';
import { EMPTY_STAKE } from '../configs';

import { isPossibleBetsLoadingSelector } from './betslip';
import { betsSelector, hasCheckedBetWithoutStakeSelector, hasLessThanTabLimitBetsSelector } from './betslipBets';
import {
    hasErrorsExceptRelatedSelectionProblemsSelector,
    hasInsufficientFundsErrorSelector,
    hasServerSideErrorSelector,
} from './errors';
import { hasAppliedFreeBetsSelector } from './freeBets';
import { isOfferRejectedSelector, isOfferRequestedSelector } from './offer';
import { hasRelatedSelectionProblemSelector } from './problems';
import { hasNonCombinableSelectionSelector } from './selections';
import { isTotalStakeEqualZeroSelector } from './stake';

export const isPlaceBetLoadingSelector = selector<boolean>({
    key: 'isPlaceBetLoadingSelector',
    get: ({ get }) => get(placeBetStatusAtom) === MutationStatus.Loading,
});

export const isPlaceBetErrorSelector = selector<boolean>({
    key: 'isPlaceBetErrorSelector',
    get: ({ get }) => get(placeBetStatusAtom) === MutationStatus.Error,
});

export const isPlaceBetButtonDisabledSelector = selector<boolean>({
    key: 'isPlaceBetButtonDisabledSelector',
    get: ({ get }) => {
        const betslipTab = get(betslipActiveTabAtom);
        const isOfferRequested = get(isOfferRequestedSelector);
        const isPlaceBetLoading = get(isPlaceBetLoadingSelector);
        const isPossibleBetsLoading = get(isPossibleBetsLoadingSelector);
        const isTotalStakeEqualZero = get(isTotalStakeEqualZeroSelector);
        const hasCheckedBetWithoutStake = get(hasCheckedBetWithoutStakeSelector);
        const hasErrorsExceptRelatedSelectionProblems = get(hasErrorsExceptRelatedSelectionProblemsSelector);
        const hasInsufficientFundsError = get(hasInsufficientFundsErrorSelector);
        const hasLessThanTabLimitBets = get(hasLessThanTabLimitBetsSelector);
        const hasNonCombinableSelection = get(hasNonCombinableSelectionSelector);
        const hasRelatedSelections = get(hasRelatedSelectionProblemSelector);
        const hasServerSideError = get(hasServerSideErrorSelector);
        const multipleBetStakes = get(multipleBetStakesAtom);

        const isMultipleTabWithEmptyStake =
            betslipTab === BetslipTab.Multi && multipleBetStakes[BetslipTab.Multi] === EMPTY_STAKE;

        return (
            isOfferRequested ||
            isPlaceBetLoading ||
            isPossibleBetsLoading ||
            isTotalStakeEqualZero ||
            hasErrorsExceptRelatedSelectionProblems ||
            hasInsufficientFundsError ||
            hasServerSideError ||
            hasLessThanTabLimitBets ||
            hasNonCombinableSelection ||
            isMultipleTabWithEmptyStake ||
            (hasCheckedBetWithoutStake && betslipTab === BetslipTab.Single) ||
            (hasRelatedSelections && betslipTab !== BetslipTab.Single)
        );
    },
});

export const isPlaceBetDisabledSelector = selectorFamily<boolean, { isAuthenticated: boolean }>({
    key: 'isPlaceBetDisabledSelector',
    get:
        ({ isAuthenticated }) =>
        ({ get }) => {
            const isOfferRequested = get(isOfferRequestedSelector);
            const isPlaceBetLoading = get(isPlaceBetLoadingSelector);
            const hasInsufficientFundsError = get(hasInsufficientFundsErrorSelector);
            const hasAppliedFreeBets = get(hasAppliedFreeBetsSelector);

            return (
                !isAuthenticated ||
                isOfferRequested ||
                isPlaceBetLoading ||
                (hasAppliedFreeBets && hasInsufficientFundsError)
            );
        },
});

export const showPlaceBetButtonSelector = selector<boolean>({
    key: 'showPlaceBetButtonSelector',
    get: ({ get }) => {
        const bets = get(betsSelector);
        const isOfferRejected = get(isOfferRejectedSelector);

        return !isEmpty(bets) && !isOfferRejected;
    },
});
