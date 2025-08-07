import every from 'lodash/every';
import has from 'lodash/has';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';

import { ErrorResource, MinMaxErrorCode, PriceErrorCode } from 'src/common/enums/error';
import type {
    ErrorDetails,
    InsufficientFundsErrorDetails,
    MaxPayoutErrorDetails,
    MaxStakeExceededErrorDetails,
    MinStakeExceededErrorDetails,
    SelectionPriceErrorDetails,
} from 'src/common/types/error';

import type { BetError } from '../api/types/error';
import type { Problem } from '../api/types/problem';

export const isBetErrorType = (error: unknown): error is BetError =>
    has(error, 'code') || has(error, 'field') || has(error, 'resource');

export const isStakePriceChangedErrorType = (error: BetError): error is BetError<SelectionPriceErrorDetails> =>
    error.code === PriceErrorCode.Increased || error.code === PriceErrorCode.Decreased;

export const isMinMaxStakeErrorType = <T extends { code: string }>(error: T): error is T & { code: MinMaxErrorCode } =>
    includes(MinMaxErrorCode, error.code);

export const isBetStakeBelowMinimumErrorType = (error: BetError): error is BetError<MinStakeExceededErrorDetails> =>
    error.resource === ErrorResource.Bet && error.code === MinMaxErrorCode.BelowMinimum;

export const isBetExceedsMaxPayoutErrorType = (error: BetError): error is BetError<MaxPayoutErrorDetails> =>
    error.resource === ErrorResource.Bet && error.code === MinMaxErrorCode.MaxPayout;

export const isBetStakeTooHighErrorType = (error: BetError): error is BetError<MaxStakeExceededErrorDetails> =>
    error.resource === ErrorResource.Bet && error.code === MinMaxErrorCode.TooHigh;

export const isInsufficientFundsErrorType = (error: Problem): error is Problem<InsufficientFundsErrorDetails> =>
    error.resource === ErrorResource.Wallet &&
    error.field === 'playableBalance' &&
    error.code === 'minimum' &&
    has(error.details, 'currentAmount') &&
    has(error.details, 'requiredAmount');

export const isMinStakeExceededErrorDetails = (details: ErrorDetails): details is MinStakeExceededErrorDetails => {
    return has(details, 'minLineStake') || has(details, 'minTotalStake') || has(details, 'minStakePerLine');
};

export const isMinStakeExceededErrors = (errors: BetError[]): errors is BetError<MinStakeExceededErrorDetails>[] => {
    return !isEmpty(errors) && every(errors, ({ details }) => isMinStakeExceededErrorDetails(details));
};

export const isMaxPayoutErrorDetails = (details: ErrorDetails): details is MaxPayoutErrorDetails => {
    return has(details, 'maxPayout');
};

export const isMaxPayoutErrors = (errors: BetError[]): errors is BetError<MaxPayoutErrorDetails>[] => {
    return !isEmpty(errors) && every(errors, ({ details }) => isMaxPayoutErrorDetails(details));
};

export const isMaxStakePerLineErrorDetails = (details: ErrorDetails): details is MaxStakeExceededErrorDetails => {
    return has(details, 'maxStakePerLine');
};

export const isMaxStakePerLineErrors = (errors: BetError[]): errors is BetError<MaxStakeExceededErrorDetails>[] => {
    return !isEmpty(errors) && every(errors, ({ details }) => isMaxStakePerLineErrorDetails(details));
};
