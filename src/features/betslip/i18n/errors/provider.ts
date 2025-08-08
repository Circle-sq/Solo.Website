import { SportsbookProviderErrorCode } from 'src/common/enums/error';

import type { SportsbookErrors } from '../../api/types/error';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../configs';

export const sportsbookErrors: SportsbookErrors = {
    [SportsbookProviderErrorCode.InsufficientFunds]: {
        key: `betslip:${SportsbookProviderErrorCode.InsufficientFunds}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.InsufficientFunds}`,
        defaultText: 'You do not have enough money on your account.',
    },
    [SportsbookProviderErrorCode.GamingLimitsIssue]: {
        key: `betslip:${SportsbookProviderErrorCode.GamingLimitsIssue}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.GamingLimitsIssue}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.InvalidPlayerIdAndFreeBetAmount]: {
        key: `betslip:${SportsbookProviderErrorCode.InvalidPlayerIdAndFreeBetAmount}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.InvalidPlayerIdAndFreeBetAmount}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.InvalidPlayer]: {
        key: `betslip:${SportsbookProviderErrorCode.InvalidPlayer}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.InvalidPlayer}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.InvalidRequestParameters]: {
        key: `betslip:${SportsbookProviderErrorCode.InvalidRequestParameters}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.InvalidRequestParameters}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.SessionExpiration]: {
        key: `betslip:${SportsbookProviderErrorCode.SessionExpiration}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.SessionExpiration}`,
        defaultText: 'Your session expired, please log in again.',
    },
    [SportsbookProviderErrorCode.InvalidUser]: {
        key: `betslip:${SportsbookProviderErrorCode.InvalidUser}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.InvalidUser}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.AlreadyProcessed]: {
        key: `betslip:${SportsbookProviderErrorCode.AlreadyProcessed}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.AlreadyProcessed}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.DifferentCurrencies]: {
        key: `betslip:${SportsbookProviderErrorCode.DifferentCurrencies}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.DifferentCurrencies}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.FailedToUpdateData]: {
        key: `betslip:${SportsbookProviderErrorCode.FailedToUpdateData}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.FailedToUpdateData}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.GeneralSystemError]: {
        key: `betslip:${SportsbookProviderErrorCode.GeneralSystemError}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.GeneralSystemError}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [SportsbookProviderErrorCode.UserNotFound]: {
        key: `betslip:${SportsbookProviderErrorCode.UserNotFound}`,
        type: 'error',
        langKey: `betslip:error:${SportsbookProviderErrorCode.UserNotFound}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
};
