import { BetslipErrorCode } from 'src/common/enums/error';

import type { BetslipNotifications } from '../../api/types/error';
import { INTERNAL_SERVER_ERROR_MESSAGE, STARTED_BUILD_A_BET_ERROR_MESSAGE } from '../../configs';

import { offerErrors } from './offer';

export const betslipNotifications: BetslipNotifications = {
    [BetslipErrorCode.SinglesOnly]: {
        key: BetslipErrorCode.SinglesOnly,
        type: 'warning',
        langKey: 'errors.singles-only',
        defaultText: 'One of your selections can be placed only as Single Only',
        testId: 'betslip:singlesOnly',
    },
    [BetslipErrorCode.Related]: {
        key: BetslipErrorCode.Related,
        type: 'warning',
        langKey: 'betslip.error.combination-related',
        defaultText: 'Items in your betslip are related and cannot be included in Multiples',
    },
    [BetslipErrorCode.MinimumActiveSelectionsSingleTab]: {
        key: BetslipErrorCode.MinimumActiveSelectionsSingleTab,
        type: 'warning',
        langKey: 'betslip.minimum.active.single.selections.message',
        defaultText: 'Select at least {count} pick to place a bet.',
        getParams: (value: string) => ({ count: value }),
    },
    [BetslipErrorCode.MinimumActiveSelectionsMultiTab]: {
        key: BetslipErrorCode.MinimumActiveSelectionsMultiTab,
        type: 'warning',
        langKey: 'betslip.minimum.active.selections.message',
        defaultText: 'Select at least {count} combinable picks.',
        getParams: (value: string) => ({ count: value }),
    },
    ...offerErrors,
    [BetslipErrorCode.OddsChange]: {
        key: BetslipErrorCode.OddsChange,
        type: 'warning',
        langKey: 'betslip.message.warning.selection_changed',
        defaultText: 'The odds or availability of your bet has changed.',
    },
    [BetslipErrorCode.AcceptOdds]: {
        key: BetslipErrorCode.AcceptOdds,
        type: 'warning',
        langKey: 'betslip.accept-odds-betting-message',
        defaultText: 'Accept all odds changes - just toggle on!',
    },
    [BetslipErrorCode.BalanceWarning]: {
        key: BetslipErrorCode.BalanceWarning,
        type: 'warning',
        langKey: 'betslip.balance-warning.description',
        defaultText: 'To place your bet you need {amount} {Currency} more.',
        getParams: (value: string) => ({ amount: value }),
    },
    [BetslipErrorCode.PanicModeEnabled]: {
        key: BetslipErrorCode.PanicModeEnabled,
        type: 'error',
        langKey: `betslip:error:${BetslipErrorCode.PanicModeEnabled}`,
        defaultText: 'Sorry, we are not able to accept your bet at this time.',
    },
    [BetslipErrorCode.BuildABetMaximumSelections]: {
        key: BetslipErrorCode.BuildABetMaximumSelections,
        type: 'warning',
        langKey: `betslip.bab.maximum.selections.message`,
        defaultText: 'A maximum of 6 selections can be added to your Bet builder bet.',
    },
    [BetslipErrorCode.InternalServerError]: {
        key: BetslipErrorCode.InternalServerError,
        type: 'error',
        langKey: 'errors.internal-server',
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [BetslipErrorCode.BuildABetInPlayNotAllowed]: {
        key: BetslipErrorCode.BuildABetInPlayNotAllowed,
        type: 'error',
        langKey: `betslip:error:${BetslipErrorCode.BuildABetInPlayNotAllowed}`,
        defaultText: STARTED_BUILD_A_BET_ERROR_MESSAGE,
    },
};
