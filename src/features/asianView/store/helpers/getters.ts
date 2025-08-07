import type { Getter } from 'jotai';

import { marketItemAtomFamily, selectionItemAtomFamily } from 'src/store/events/entities';
import type { MarketItem, SelectionItem } from 'src/store/events/types';

import { orderAsianViewThreeWayWinnerSelections } from './sort';

type ValidationCb<T> = (item: T) => boolean;

export const getSelections =
    (get: Getter) =>
    (selectionIds: number[], validationCb: ValidationCb<SelectionItem> = () => true) => {
        const selections: SelectionItem[] = [];

        selectionIds.forEach((selectionId) => {
            const selection = get(selectionItemAtomFamily(selectionId));

            if (selection !== null && validationCb(selection)) {
                selections.push(selection);
            }
        });

        return selections;
    };

export const getMarkets =
    (get: Getter) =>
    (marketIds: number[], validationCb: ValidationCb<MarketItem<number>> = () => true) => {
        const markets: MarketItem[] = [];

        marketIds.forEach((marketId) => {
            const market = get(marketItemAtomFamily(marketId));

            if (market !== null && validationCb(market)) {
                const selections = getSelections(get)(market.selections);

                if (selections.length > 1) {
                    const { marketTypeGeneric } = market.template;

                    markets.push({
                        ...market,
                        selections: orderAsianViewThreeWayWinnerSelections(marketTypeGeneric, selections),
                    });
                }
            }
        });

        return markets;
    };

const validateByTemplateId = (templateId: string) => (market: MarketItem<number>) =>
    market.template.id === templateId && market.display;

export const getMarketsByTemplateId = (get: Getter) => (marketIds: number[], templateId: string) => {
    return getMarkets(get)(marketIds, validateByTemplateId(templateId));
};
