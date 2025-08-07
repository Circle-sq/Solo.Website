import values from 'lodash/values';

import type { MarketItem, SelectionItem } from 'src/store/events/types';

import { asianViewThreeWayWinnerSelectionOrder } from '../../configs';
import { MarketTypeGeneric } from '../../constants';
import { findSelectionByIdentifier } from '../../helpers';

export const sortByTemplateIdAndLine = (a: MarketItem, b: MarketItem): number => {
    const idComparison = (a.template?.id ?? '').localeCompare(b.template?.id ?? '');

    if (idComparison !== 0) {
        return idComparison;
    }

    if ((a.line === null && b.line === null) || (a.line === undefined && b.line === undefined)) {
        return 0;
    }

    if (a.line === null) {
        return 1;
    }

    if (b.line === null) {
        return -1;
    }

    if (b.line === undefined) {
        return 0 - +(a.line as string);
    }

    if (a.line === undefined) {
        return +b.line;
    }

    return +b.line - +a.line;
};

/**
 * Sorts an array of market items based on template id and after based on the line values in ascending order.
 *
 * @param {MarketItem[]} [markets] - Optional array of market items to be sorted.
 * @returns {MarketItem[]} The sorted array of market items, or an empty array if no input is provided.
 */

export const sortMarkets = (markets: MarketItem[] = []): MarketItem[] => {
    // TODO Replace sort method with toSorted (immutable method) after Node.js migration to version >= 20
    return markets.sort(sortByTemplateIdAndLine);
};

export const orderAsianViewThreeWayWinnerSelections = (
    marketTypeGeneric: string,
    selections: Record<number, SelectionItem>,
): SelectionItem[] => {
    if (marketTypeGeneric !== MarketTypeGeneric.TwoWayHandicap) {
        return values(selections);
    }

    return asianViewThreeWayWinnerSelectionOrder.map(findSelectionByIdentifier(selections));
};
