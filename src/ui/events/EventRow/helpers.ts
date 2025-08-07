import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { isHandicapMarket, isOverUnderMarket } from 'src/common/helpers/market';
import type { TemplateMarketsIds } from 'src/ui/events/store/types';

export const getBestMarketIds = (
    marketTemplateIdsGroups: string[][] | string[],
    markets: MarketModel[],
    options?: { excludeSuspended?: boolean; excludeFalsey?: boolean },
): number[] => {
    const marketIds = getMarketIds(getTemplateMarketIds(marketTemplateIdsGroups, markets, options));

    const { excludeFalsey = false } = options ?? {};

    return excludeFalsey ? compact(marketIds) : marketIds;
};

export const getTemplateMarketIds = (
    marketTemplateIdsGroups: string[][] | string[],
    markets: MarketModel[],
    options?: { excludeSuspended?: boolean; excludeFalsey?: boolean },
): Record<string, number>[] => {
    if (isEmpty(marketTemplateIdsGroups)) {
        return [];
    }

    const { excludeSuspended = true } = options ?? {};

    const defaultMarketId = 0;
    const defaultValue = 999;
    const marketIdsMap: Record<string, number>[] = [];

    marketTemplateIdsGroups.forEach((group: string[] | string) => {
        let foundMarkets = markets.filter((market) =>
            Array.isArray(group) ? group.includes(market.templateId) : group === market.templateId,
        );

        if (excludeSuspended) {
            foundMarkets = foundMarkets.filter((market) => !market.isSuspended);
        }

        const { templateId, marketId } = foundMarkets.reduce(
            (acc, market) => {
                if (market === undefined) {
                    return acc;
                }

                const isOverUnder = isOverUnderMarket(market);
                const isHandicap = isHandicapMarket(market);

                // Calculate average price for selections
                const diff = market.selections.reduce((diffAcc, selection) => {
                    if (isOverUnder || isHandicap) {
                        const price = selection.price?.d ?? 0;

                        return Math.abs(diffAcc - price);
                    }

                    return diffAcc;
                }, 0);

                if (diff < acc.value) {
                    return { templateId: market.templateId, value: diff, marketId: market.id };
                }

                return acc;
            },
            { templateId: 'default', marketId: defaultMarketId, value: defaultValue },
        );

        marketIdsMap.push({ [templateId]: marketId });
    });

    return marketIdsMap;
};

export const getMarketIds = (templateMarketIds: TemplateMarketsIds[]): number[] =>
    templateMarketIds.flatMap((market) => Object.values(market));

export const updatedMarketIds = (eventMainLine: TemplateMarketsIds, templateMarketIds: TemplateMarketsIds[]) => {
    return getMarketIds(
        templateMarketIds.map((template) => {
            const updatedTemplate = {} as TemplateMarketsIds;

            for (const [templateId, marketId] of Object.entries(template)) {
                updatedTemplate[templateId] = eventMainLine[templateId] || marketId;
            }

            return updatedTemplate;
        }),
    );
};
