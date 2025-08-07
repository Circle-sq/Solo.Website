import type { OddsFormat } from 'src/common/enums';

/**
 *  Selection Price
 *
 * @property {number} d - Decimal odds.
 * @property {string} f - Fractional odds in form. For example: '1/2'
 */

export interface Price {
    [OddsFormat.Decimal]: number;
    [OddsFormat.Fractional]: string;
}

/**
 *  Price History
 *
 * @property {string} t - Date in the ISO 8601 format according to universal time.
 * @property {Price} p - Selection Price.
 */

export interface PriceHistory {
    t: string;
    p: Price;
}

/**
 *  Price Type
 *
 * @property FP - Fixed Price - default
 * @property SP - Starting Price - the current price at the moment of the event start.
 */

export enum PriceType {
    FP = 'fp',
    SP = 'sp',
}

export type PriceForView = Price | PriceType.SP;
