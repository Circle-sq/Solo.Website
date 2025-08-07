import type { BetslipErrorCode, ErrorResource, MinMaxErrorCode, XyzProviderErrorCode } from 'src/common/enums/error';
import type { ErrorDetails, ErrorLeg } from 'src/common/types/error';

export interface BetError<T = ErrorDetails> {
    code: string;
    details: T;
    debugDetails: string | null;
    field: string | null;
    resource: ErrorResource;
    pointer: string | null;
    ignorePointer?: null | string;
    readOnly?: boolean;
    hidden?: boolean;
    value?: string;
    bets?: Record<string, unknown>;
    leg?: ErrorLeg;
}

export type MinMaxErrors = {
    [key in MinMaxErrorCode]: Omit<MessageParams, 'type'> & MinMaxErrorParams;
};

interface MinMaxErrorParams {
    getParams?: (error: BetError, currency: string) => Record<string, string | number> | undefined;
}

type OfferErrorType =
    | BetslipErrorCode.OfferRejectedByCustomer
    | BetslipErrorCode.OfferReferredToTrader
    | BetslipErrorCode.OfferRejectedByTrader;

export type OfferErrors = {
    [key in OfferErrorType]: MessageParams;
};

export type XyzErrors = {
    [key in XyzProviderErrorCode]: MessageParams;
};

export interface MessageParams {
    key: string;
    type: string;
    langKey: string;
    defaultText: string;
}

export type BetslipNotifications = {
    [key in BetslipErrorCode]?: BetslipWarning;
};

export interface BetslipWarning extends MessageParams {
    testId?: string;
    error?: BetError;
    getParams?: (value: string) => Record<string, string>;
}
