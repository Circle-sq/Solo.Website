import type { AsianViewSportConfig, MarketConfig, SportConfigGroup } from '@sc-asianView/api/cms/types';

import type { MarketItem, SelectionItem } from 'src/store/events/types';

import type { MainLineMarketIds } from '../mainLine';

type BaseSelectionItem = Pick<SelectionItem, 'price'>;

type BaseMarketItem = MarketItem<BaseSelectionItem>;

const findGroupTemplateIdIndex = (marketTemplateId: string) => (marketConfig: MarketConfig) =>
    marketConfig.id === marketTemplateId;

export const findGroupTemplateIdIndexes = (
    marketTemplateId: string,
    { primaryGroup, secondaryGroup }: AsianViewSportConfig,
) => {
    const findTemplateIdIndex = findGroupTemplateIdIndex(marketTemplateId);

    return {
        primaryGroupTemplateIdIndex: primaryGroup.markets.findIndex(findTemplateIdIndex),
        secondaryGroupTemplateIdIndex: secondaryGroup.markets.findIndex(findTemplateIdIndex),
    };
};

export const hasMainLineMarket = (marketTemplateId: string, sportConfig: AsianViewSportConfig) => {
    const { primaryGroupTemplateIdIndex, secondaryGroupTemplateIdIndex } = findGroupTemplateIdIndexes(
        marketTemplateId,
        sportConfig,
    );

    return {
        isInPrimaryGroup: primaryGroupTemplateIdIndex !== -1,
        isInSecondaryGroup: secondaryGroupTemplateIdIndex !== -1,
    };
};

const getMarketTemplateGroupIds = (marketsConfig: MarketConfig[]): Map<string, BaseMarketItem[]> => {
    const templateGroupIds = new Map<string, BaseMarketItem[]>();

    marketsConfig.forEach((marketConfig) => {
        if ('id' in marketConfig) {
            templateGroupIds.set(marketConfig.id, []);
        }
    });

    return templateGroupIds;
};

const groupMarketsByTemplateId = (groupMarkets: BaseMarketItem[], marketsConfig: MarketConfig[]) => {
    const marketTemplateGroupIds = getMarketTemplateGroupIds(marketsConfig);

    // Filter out markets that are not included in the CMS market groups
    groupMarkets.forEach((market) => {
        if ('id' in market.template && marketTemplateGroupIds.has(market.template.id)) {
            marketTemplateGroupIds.get(market.template.id)!.push(market);
        }
    });

    return marketTemplateGroupIds;
};

/**
 * Iterate over a market's selections to find the min diff between prices
 */
const calcPriceDifference = (selections: BaseSelectionItem[]): number =>
    selections.reduce((diffAcc, selection) => {
        const price = selection.price?.d ?? 0;

        return Math.abs(diffAcc - price);
    }, 0);

const findIdealMarket = (markets: BaseMarketItem[]): BaseMarketItem | undefined => {
    let minDiff = Infinity;

    return markets.reduce<BaseMarketItem | undefined>((ideal, market) => {
        const diff = calcPriceDifference(market.selections);

        if (diff < minDiff) {
            minDiff = diff;

            return market;
        }

        return ideal;
    }, undefined);
};

export const getIdealMarketId = (groupMarkets: BaseMarketItem[], groupIndex = 0) => {
    const idealMarket = groupMarkets.length > 1 ? findIdealMarket(groupMarkets) : groupMarkets[0];

    // If the ideal market is found, return its ID;
    // otherwise, generate a unique negative ID to avoid using UUID
    return idealMarket ? idealMarket.id : -(Date.now() + groupIndex);
};

export const getMainLineMarketIds = (sportConfigGroup?: SportConfigGroup, markets?: BaseMarketItem[]): number[] => {
    if (!sportConfigGroup || !markets) {
        return [];
    }

    const groupedMarketsByTemplateId = groupMarketsByTemplateId(markets, sportConfigGroup.markets);

    const mainLineMarketIds: number[] = [];
    let groupIndex = 0;

    // Iterate over each group type to find the market with the minimum difference between selection prices
    groupedMarketsByTemplateId.forEach((groupMarkets) => {
        const marketId = getIdealMarketId(groupMarkets, ++groupIndex);

        mainLineMarketIds.push(marketId);
    });

    return mainLineMarketIds;
};

export const getMainLineMarketIdsGroups = (
    config: AsianViewSportConfig,
    markets: BaseMarketItem[],
): MainLineMarketIds => {
    return {
        primaryGroup: getMainLineMarketIds(config.primaryGroup, markets),
        secondaryGroup: getMainLineMarketIds(config.secondaryGroup, markets),
    };
};
