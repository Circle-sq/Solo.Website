import type { Price } from './selectionPrice';

/**
 *  Selection Price Increased/Decreased
 *
 * @property {Price} newValue - the new price object.
 */

export interface SelectionPriceErrorDetails {
    newValue: Price;
    oldValue: Price;
    selectionId: number;
}

/**
 *  Insufficient Funds
 *
 *  The customer has insufficient funds to cover the bet
 * @property {number} currentAmount - amount in the lowest unit (e.g. pence or cents).
 * @property {number} requiredAmount - amount in the lowest unit (e.g. pence or cents).
 */

export interface InsufficientFundsErrorDetails {
    currentAmount: number;
    requiredAmount: number;
}

/**
 *  Min Stake Exceeded
 *
 *  Stake value is below the minimum value allowed for the customer. It is based on betting configuration.
 * @property {number} minLineStake - amount in the lowest unit (e.g. pence or cents).
 * @property {number} minTotalStake - amount in the lowest unit (e.g. pence or cents).
 * @property {number} minStakePerLine - amount in the lowest unit (e.g. pence or cents).
 */

export interface MinStakeExceededErrorDetails {
    minLineStake?: number;
    minTotalStake: number;
    minStakePerLine: number;
}

/**
 *  Max Stake Exceeded.
 *
 *  Value that represents the highest permitted amount that can be placed on a bet per line.
 * @property {number} maxStakePerLine - amount in the lowest unit (e.g. pence or cents).
 */

export interface MaxStakeExceededErrorDetails {
    maxStakePerLine: number;
    id?: string;
}

/**
 *  Max Payout Exceeded.
 *
 * Value used when deciding how much will be paid out to a customer when placing a single line bet.
 * @property {number} maxPayout - amount in the lowest unit (e.g. pence or cents).
 */

export interface MaxPayoutErrorDetails {
    maxPayout: number;
    id?: string;
}

export type ErrorDetails =
    | SelectionPriceErrorDetails
    | InsufficientFundsErrorDetails
    | MinStakeExceededErrorDetails
    | MaxStakeExceededErrorDetails
    | MaxPayoutErrorDetails
    | EventErrorDetails
    | null;

interface Id {
    id: number;
}

export interface ErrorLeg {
    index: number;
    event: Id;
    market: Id;
    selection: Id;
}

export interface BettingErrorsItem {
    errors: string[];
}

export interface EventErrorDetails {
    eventId: string;
}

export interface RequestError extends Error {
    body?: Record<string, unknown>;
}
