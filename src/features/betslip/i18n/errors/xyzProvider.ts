import { XyzProviderErrorCode } from 'src/common/enums/error';

import type { XyzErrors } from '../../api/types/error';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../../configs';

export const xyzErrors: XyzErrors = {
    [XyzProviderErrorCode.InsufficientFunds]: {
        key: `betslip:${XyzProviderErrorCode.InsufficientFunds}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.InsufficientFunds}`,
        defaultText: 'You do not have enough money on your account.',
    },
    [XyzProviderErrorCode.GamingLimitsIssue]: {
        key: `betslip:${XyzProviderErrorCode.GamingLimitsIssue}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.GamingLimitsIssue}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.InvalidPlayerIdAndFreeBetAmount]: {
        key: `betslip:${XyzProviderErrorCode.InvalidPlayerIdAndFreeBetAmount}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.InvalidPlayerIdAndFreeBetAmount}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.InvalidPlayer]: {
        key: `betslip:${XyzProviderErrorCode.InvalidPlayer}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.InvalidPlayer}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.InvalidRequestParameters]: {
        key: `betslip:${XyzProviderErrorCode.InvalidRequestParameters}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.InvalidRequestParameters}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.SessionExpiration]: {
        key: `betslip:${XyzProviderErrorCode.SessionExpiration}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.SessionExpiration}`,
        defaultText: 'Your session expired, please log in again.',
    },
    [XyzProviderErrorCode.InvalidUser]: {
        key: `betslip:${XyzProviderErrorCode.InvalidUser}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.InvalidUser}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.AlreadyProcessed]: {
        key: `betslip:${XyzProviderErrorCode.AlreadyProcessed}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.AlreadyProcessed}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.DifferentCurrencies]: {
        key: `betslip:${XyzProviderErrorCode.DifferentCurrencies}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.DifferentCurrencies}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.FailedToUpdateData]: {
        key: `betslip:${XyzProviderErrorCode.FailedToUpdateData}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.FailedToUpdateData}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.GeneralSystemError]: {
        key: `betslip:${XyzProviderErrorCode.GeneralSystemError}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.GeneralSystemError}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
    [XyzProviderErrorCode.UserNotFound]: {
        key: `betslip:${XyzProviderErrorCode.UserNotFound}`,
        type: 'error',
        langKey: `betslip:error:${XyzProviderErrorCode.UserNotFound}`,
        defaultText: INTERNAL_SERVER_ERROR_MESSAGE,
    },
};
