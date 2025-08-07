import find from 'lodash/find';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import size from 'lodash/size';
import { selector, selectorFamily } from 'recoil';

import { hasPriceWentDownSelector } from '@sc-betslip/store/selectors/animation';
import { hasBuildABetMaximumSelectionsAtomFamily } from '@sc-buildABet/store/atoms';

import { BetslipOdds, OfferStatus, OfferUser } from 'src/common/enums';
import { BetslipErrorCode, ErrorResource } from 'src/common/enums/error';

import { betslipNotifications } from '../../i18n/errors/betslip';
import { betslipProblemsAtom } from '../atoms/betslip';
import { getNotificationMessages, getOrderedErrors } from '../helpers/warning';
import type { BetslipWarning } from '../types';

import { isPossibleBetsLoadingSelector } from './betslip';
import { hasChangedLegSelector, hasSuspendedBetSelector, minBetsCountSelector } from './betslipBets';
import { isSingleTabSelector } from './betslipTab';
import {
    hasInsufficientFundsErrorSelector,
    hasPanicModeEnabledErrorSelector,
    hasServerSideErrorSelector,
    hasStartedBuildABetErrorSelector,
    hasStartedCrossBetErrorSelector,
    xyzErrorMessagesSelector,
} from './errors';
import { hasOfferSelector, isOfferRejectedSelector, offerStatusSelector, offerUserSelector } from './offer';
import { isPlaceBetLoadingSelector } from './placeBet';
import { hasRelatedSelectionProblemSelector } from './problems';
import { hasNonCombinableSelectionSelector } from './selections';
import { hasStakePerLineSelector } from './stake';

export const hasRelatedAndNonCombinableBetsWarningSelector = selector<boolean>({
    key: 'hasRelatedAndNonCombinableBetsWarningSelector',
    get: ({ get }) => {
        const minBetsCount = get(minBetsCountSelector);
        const isPossibleBetsLoading = get(isPossibleBetsLoadingSelector);
        const isSingleTab = get(isSingleTabSelector);
        const hasRelatedSelections = get(hasRelatedSelectionProblemSelector);

        return minBetsCount === 0 && !isSingleTab && !isPossibleBetsLoading && hasRelatedSelections;
    },
});

export const hasMinBetsWarningSelector = selector<boolean>({
    key: 'hasMinBetsWarningSelector',
    get: ({ get }) => {
        const minBetsCount = get(minBetsCountSelector);
        const isPossibleBetsLoading = get(isPossibleBetsLoadingSelector);
        const hasSuspendedBet = get(hasSuspendedBetSelector);
        const hasOffer = get(hasOfferSelector);

        return minBetsCount > 0 && !isPossibleBetsLoading && !hasSuspendedBet && !hasOffer;
    },
});

export const hasDontAcceptOddsChangesSettingSelector = selectorFamily<boolean, { oddsUpdate: BetslipOdds }>({
    key: 'hasDontAcceptOddsChangesSettingSelector',
    get:
        ({ oddsUpdate }) =>
        ({ get }) => {
            const isDontAcceptOdds = oddsUpdate === BetslipOdds.DontAcceptOdds;
            const isOfferRejected = get(isOfferRejectedSelector);
            const isPlaceBetLoading = get(isPlaceBetLoadingSelector);

            return isDontAcceptOdds && !isOfferRejected && !isPlaceBetLoading;
        },
});

export const hasRequireMoreAmountWarningSelector = selector<boolean>({
    key: 'hasRequireMoreAmountWarningSelector',
    get: ({ get }) => {
        const isSingleTab = get(isSingleTabSelector);
        const isPossibleBetsLoading = get(isPossibleBetsLoadingSelector);
        const hasInsufficientFundsError = get(hasInsufficientFundsErrorSelector);
        const hasRelatedSelections = get(hasRelatedSelectionProblemSelector);

        return hasInsufficientFundsError && !isPossibleBetsLoading && (isSingleTab || !hasRelatedSelections);
    },
});

export const betslipWarningsSelector = selector<BetslipWarning[]>({
    key: 'betslipWarningsSelector',
    get: ({ get }) => {
        const isSingleTab = get(isSingleTabSelector);
        const problems = get(betslipProblemsAtom);

        return getNotificationMessages(problems, isSingleTab);
    },
});

export const hasBetslipWarningsSelector = selector<boolean>({
    key: 'hasBetslipWarningsSelector',
    get: ({ get }) => !isEmpty(get(betslipWarningsSelector)),
});

export const betslipNotificationsMappingSelector = selectorFamily<
    { [key in BetslipErrorCode]?: boolean },
    { eventId: number | undefined; oddsUpdate: BetslipOdds }
>({
    key: 'betslipNotificationsSelector',
    get:
        ({ eventId, oddsUpdate }) =>
        ({ get }) => {
            const hasChangedLeg = get(hasChangedLegSelector);
            const hasDontAcceptOddsChangesSetting = get(hasDontAcceptOddsChangesSettingSelector({ oddsUpdate }));
            const hasMinBetsWarning = get(hasMinBetsWarningSelector);
            const hasNonCombinableSelection = get(hasNonCombinableSelectionSelector);
            const hasRelatedAndNonCombinableBetsWarning = get(hasRelatedAndNonCombinableBetsWarningSelector);
            const hasRequireMoreAmountWarning = get(hasRequireMoreAmountWarningSelector);
            const hasPanicModeEnabledError = get(hasPanicModeEnabledErrorSelector);
            const hasServerSideError = get(hasServerSideErrorSelector);
            const hasSuspendedBet = get(hasSuspendedBetSelector);
            const hasStartedCrossBetError = get(hasStartedCrossBetErrorSelector);
            const hasStartedBuildABetError = get(hasStartedBuildABetErrorSelector);
            const hasBuildABetMaximumSelections = get(hasBuildABetMaximumSelectionsAtomFamily(eventId));
            const hasStakePerLine = get(hasStakePerLineSelector);
            const isHigherOddsAccepted = oddsUpdate === BetslipOdds.AcceptHigherOdds;
            const isSingleTab = get(isSingleTabSelector);
            const offerStatus = get(offerStatusSelector);
            const offerUser = get(offerUserSelector);
            const hasPriceWentDown = get(hasPriceWentDownSelector);

            const isOddsOrAvailabilityChanged = hasChangedLeg && hasDontAcceptOddsChangesSetting && hasStakePerLine;
            const warnOddsPriceWentDown = hasPriceWentDown && isHigherOddsAccepted;

            return {
                [BetslipErrorCode.Related]: hasRelatedAndNonCombinableBetsWarning,
                [BetslipErrorCode.SinglesOnly]: hasNonCombinableSelection,
                [BetslipErrorCode.MinimumActiveSelectionsSingleTab]: hasMinBetsWarning && isSingleTab,
                [BetslipErrorCode.MinimumActiveSelectionsMultiTab]: hasMinBetsWarning && !isSingleTab,
                [BetslipErrorCode.OfferReferredToTrader]: offerStatus === OfferStatus.Request,
                [BetslipErrorCode.OfferRejectedByTrader]:
                    offerStatus === OfferStatus.Reject && offerUser === OfferUser.Staff,
                [BetslipErrorCode.OfferRejectedByCustomer]:
                    offerStatus === OfferStatus.Reject && offerUser === OfferUser.Customer,
                [BetslipErrorCode.OddsChange]: hasSuspendedBet || isOddsOrAvailabilityChanged || warnOddsPriceWentDown,
                [BetslipErrorCode.AcceptOdds]:
                    (!hasSuspendedBet && isOddsOrAvailabilityChanged) || warnOddsPriceWentDown,
                [BetslipErrorCode.BalanceWarning]: hasRequireMoreAmountWarning,
                [BetslipErrorCode.PanicModeEnabled]: hasPanicModeEnabledError,
                [BetslipErrorCode.BuildABetMaximumSelections]: hasBuildABetMaximumSelections,
                [BetslipErrorCode.BuildABetInPlayNotAllowed]: hasStartedBuildABetError,
                [BetslipErrorCode.InternalServerError]: hasServerSideError,
                [BetslipErrorCode.Started]: hasStartedCrossBetError,
            };
        },
});

export const betslipNotificationsSelector = selectorFamily<
    BetslipWarning[],
    { eventId: number | undefined; oddsUpdate: BetslipOdds }
>({
    key: 'betslipNotificationsSelector',
    get:
        ({ eventId, oddsUpdate }) =>
        ({ get: getRecoilValue }) => {
            const betslipWarnings = getRecoilValue(betslipWarningsSelector);
            const xyzErrorMessages = getRecoilValue(xyzErrorMessagesSelector);
            const betslipNotificationsMap = getRecoilValue(
                betslipNotificationsMappingSelector({ eventId, oddsUpdate }),
            );
            const notifications = [...betslipWarnings];

            forEach(betslipNotificationsMap, (display, key: string) => {
                if (display) {
                    if (key === BetslipErrorCode.Related) {
                        notifications.slice(0, size(notifications));
                    }

                    if (key in betslipNotifications) {
                        notifications.push(get(betslipNotifications, key));
                    }
                }
            });

            if (!isEmpty(xyzErrorMessages)) {
                notifications.push(...xyzErrorMessages);
            }

            const accountErrorMessage = find(notifications, ({ error }) => error?.resource === ErrorResource.Account);

            if (!isUndefined(accountErrorMessage)) {
                return [accountErrorMessage];
            }

            return getOrderedErrors(notifications);
        },
});
