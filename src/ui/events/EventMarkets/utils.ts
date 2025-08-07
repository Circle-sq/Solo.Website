import find from 'lodash/find';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { isHandicapMarket, isOverUnderMarket } from 'src/common/helpers/market';
import { getBestMarketIds } from 'src/ui/events/EventRow/helpers';
import { MARKET_TEMPLATE, MARKET_TEMPLATE_GROUP } from 'src/utils/constants';
import { sportsWithGameLinesTemplate } from 'src/utils/marketGroupingConfig';

import type { MarketGroupUI, MarketTemplateDescription, NormalizedMarketTemplateDescription } from './types';

const IS_GAME_LINES_MARKETS_AVAILABLE = 3;

const TEMPLATES_GROUPED_BY_NAME: string[] = [
    MARKET_TEMPLATE.overunder,
    MARKET_TEMPLATE.threeWayHandicap,
    MARKET_TEMPLATE.twoWayHandicap,
    MARKET_TEMPLATE.asianOverUnder,
    MARKET_TEMPLATE.asianHandicap,
    MARKET_TEMPLATE.twoWayWinner,
];

const GAME_LINES_ORDER: (string | null)[] = [null, 'Spreads', 'Totals'];
const bestGameLineMarketsConfig = {
    moneyline: (market: MarketModel): boolean => !isOverUnderMarket(market) && !isHandicapMarket(market),
    spread: (market: MarketModel): boolean => isHandicapMarket(market),
    total: (market: MarketModel): boolean => isOverUnderMarket(market),
};

export const normalizeById = (array: MarketTemplateDescription[]): NormalizedMarketTemplateDescription => {
    return array.reduce((acc, item) => {
        acc[item.templateId] = item;

        return acc;
    }, {} as NormalizedMarketTemplateDescription);
};

const gameLinesBestMarketIds = (markets: MarketModel[]): number[] => {
    const bestLineFns = Object.values(bestGameLineMarketsConfig);
    const marketTemplateIds = Object.keys(groupBy(markets, (market) => market.template.id));

    return bestLineFns.map((bestLineFn) => {
        const [bestLineMarket] = getBestMarketIds(marketTemplateIds, markets.filter(bestLineFn), {
            excludeFalsey: true,
        });

        return bestLineMarket;
    });
};

export const getGameLineMarkets = (markets: MarketModel[]): MarketModel[] => {
    const gameLineCustomNameMarkets = markets.filter(
        (market) => get(market, 'data.value.template.customName') === MARKET_TEMPLATE_GROUP.gameLines,
    );

    if (gameLineCustomNameMarkets.length) {
        const groupByPeriods = groupBy(gameLineCustomNameMarkets, (market) => market.template.period);

        return Object.keys(groupByPeriods).reduce<MarketModel[]>((acc, period) => {
            const markets = groupByPeriods[period];
            const bestMarketsIds = gameLinesBestMarketIds(markets);

            // Because of this condition, the game lines were not rendered on KR language
            // const hasHiddenMarkets =
            //     difference(GAME_LINES_ORDER, uniq(map(markets, 'data.value.template.mainGroup'))).length > 0;

            if (bestMarketsIds.length === IS_GAME_LINES_MARKETS_AVAILABLE) {
                const bestMarkets = bestMarketsIds.map((id) =>
                    markets.find((market) => market.id === id),
                ) as MarketModel[];

                Object.keys(bestMarketsIds).forEach((k) => {
                    const key = Number(k);

                    if (bestMarketsIds[key] === undefined) {
                        const defaultMarket = find(
                            markets,
                            (market) => market.template.mainGroup === GAME_LINES_ORDER[key],
                        );

                        if (defaultMarket !== undefined) {
                            bestMarkets[key] = defaultMarket;
                        }
                    }
                });

                return [...acc, ...bestMarkets];
            } else {
                return acc;
            }
        }, []);
    }

    return [];
};

export function generateMarketsGroups(markets: MarketModel[], sport?: string): MarketGroupUI[] {
    const visualGroups: MarketGroupUI[] = [];
    let marketsState: MarketModel[] = markets;
    const detectGameLineSportType = sport !== undefined && sportsWithGameLinesTemplate.includes(sport);

    // GAME LINES MARKETS
    if (detectGameLineSportType) {
        const gameLineMarkets = markets.filter(
            (market) => get(market, 'data.value.template.customName') === MARKET_TEMPLATE_GROUP.gameLines,
        );

        const bestGameLineMarkets = !isEmpty(gameLineMarkets) ? getGameLineMarkets(gameLineMarkets) : [];

        if (!isEmpty(bestGameLineMarkets) && bestGameLineMarkets.every((market) => market?.display)) {
            const [firstMarket] = gameLineMarkets;
            const customName: string = get(firstMarket, 'data.value.template.customName', '');

            // Remove moneyLine markets from markets state
            const moneyLineMarketIds = gameLineMarkets
                .filter(bestGameLineMarketsConfig.moneyline)
                .map((market) => market.id);

            marketsState = marketsState.filter((market) => {
                return !moneyLineMarketIds.includes(market.id);
            });

            visualGroups.push({
                // TODO create proper way to translate custom name Markets currently this property should be part of every customName market group
                customName,
                groupName: customName,
                displayOrder: 0,
                markets: bestGameLineMarkets,
            });
        }
    }
    // END OF GAMELINES MARKETS

    // Group by mainGroup -> BE setting in order to determine which markets of diff types should be merged into one Display Template
    // If mainGroup is missing, we group by name + marketTypeGeneric, this way we avoid grouping together two markets with same name but different format type
    const groupedMarkets = groupBy(marketsState, (market) => {
        if (!isEmpty(market.template.mainGroup)) {
            return market.template.mainGroup;
        }

        if (TEMPLATES_GROUPED_BY_NAME.includes(market.template.marketTypeGeneric)) {
            return market.name;
        }

        return market.id.toString();
    });

    for (const [, markets] of Object.entries(groupedMarkets)) {
        const sortedMarkets = sortBy(markets, (market) => market.displayOrder);
        const [firstMarket] = sortedMarkets;
        const mainGroupOrMarketName = firstMarket.template.mainGroup ?? firstMarket.name;

        visualGroups.push({
            groupName: markets.length > 1 ? mainGroupOrMarketName : firstMarket.name,
            displayOrder: firstMarket.displayOrder,
            markets,
        });
    }

    return visualGroups;
}
