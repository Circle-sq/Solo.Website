import get from 'lodash/get';
import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { ModelsState } from 'src/appState/models/ModelsState';
import type { BestMarkets } from 'src/ui/crossbetting/EventCardMobile/types';
import { getBestMarketIds } from 'src/ui/events/EventRow/helpers';
import { MARKET_TEMPLATE } from 'src/utils/constants';

const MAX_MARKET_TEMPLATE_LENGTH = 3;

const specialMarketTemplateIds = [
    // Football
    'bet-radar-60',
    'bet-radar-66',
    'bet-radar-68',
    // Baseball
    'bet-radar-1124',
    'bet-radar-275',
    'bet-radar-276',
    // Basketball
    'bet-radar-235',
    'bet-radar-303',
    'bet-radar-236',
];

export const hasMarketDisplayCrossBet = (marketDisplay: Array<string>): boolean =>
    includes(marketDisplay, 'cross-bet-view');

export const getVisibleMarkets = (
    markets: MarketModel[],
    models: ModelsState,
    isCrossBetEvent = false,
): MarketModel[] => {
    return markets.filter(({ id }) => {
        const market = models.getMarket(id);
        const display: boolean = get(market, 'display', false);

        if (!isCrossBetEvent) {
            return display;
        }

        const marketDisplay: Array<string> = get(market, 'tags["market-display"]', [MARKET_TEMPLATE.default]);

        const displayCrossBet: boolean = hasMarketDisplayCrossBet(marketDisplay);

        return display && displayCrossBet;
    });
};

export const getMarketTemplates = <T extends { templateId: string }>(markets: T[]): string[] => {
    const marketTemplates: string[] = [];
    const uniqueEntries: Set<string> = new Set();

    for (const market of markets) {
        if (!uniqueEntries.has(market.templateId)) {
            uniqueEntries.add(market.templateId);
            marketTemplates.push(market.templateId);

            if (marketTemplates.length === MAX_MARKET_TEMPLATE_LENGTH) {
                break;
            }
        }
    }

    return marketTemplates.sort();
};

export const getMarketsData = (markets: MarketModel[]): BestMarkets => {
    const restMarkets = markets.filter((m) => !specialMarketTemplateIds.includes(m.templateId));
    const specialMarkets = markets.filter((m) => specialMarketTemplateIds.includes(m.templateId));
    const bestMarketTemplates = getMarketTemplates(restMarkets);
    const bestSpecialMarketTemplates = getMarketTemplates(specialMarkets);

    if (isArray(bestMarketTemplates) && isArray(bestSpecialMarketTemplates)) {
        return {
            bestMarketTemplates,
            bestSpecialMarketTemplates,
            bestMarketsIds: getBestMarketIds(bestMarketTemplates, restMarkets, { excludeSuspended: false }),
            bestSpecialMarketIds: getBestMarketIds(bestSpecialMarketTemplates, specialMarkets, {
                excludeSuspended: false,
            }),
        };
    }

    return reduce(
        [...Object.keys(bestMarketTemplates), ...Object.keys(bestSpecialMarketTemplates)],
        (acc: BestMarkets, sportKey) => {
            const currentRestMarketTemplates: string[] = get(bestMarketTemplates, sportKey);
            const currentSpecialMarketTemplates: string[] = get(bestSpecialMarketTemplates, sportKey);
            const bestMarketsIds = getBestMarketIds(currentRestMarketTemplates, markets, { excludeSuspended: false });
            const bestSpecialMarketIds = getBestMarketIds(currentSpecialMarketTemplates, markets, {
                excludeSuspended: false,
            });

            const accTotalIdsLength = acc.bestMarketsIds.length + acc.bestSpecialMarketIds.length;
            const currentTotalIdsLength = bestMarketsIds.length + bestSpecialMarketIds.length;

            if (accTotalIdsLength > currentTotalIdsLength) {
                return acc;
            }

            return {
                bestMarketTemplates: currentRestMarketTemplates,
                bestSpecialMarketTemplates: currentSpecialMarketTemplates,
                bestMarketsIds,
                bestSpecialMarketIds,
            };
        },
        {
            bestMarketTemplates: [],
            bestSpecialMarketTemplates: [],
            bestMarketsIds: [],
            bestSpecialMarketIds: [],
        },
    );
};
