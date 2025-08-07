import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import type { Problem } from '@sc-betslip/api/types/problem';

import type { MarketItem } from 'src/common/types/market';

export const getAlertParams = (
    problem: Problem,
    currency?: string,
    getParams?: (problem: Problem, currency?: string) => Record<string, string | number> | undefined,
) => {
    if (!problem || !getParams) {
        return {};
    }

    return getParams(problem, currency) || {};
};

export const isMarketsIdentical = (
    speedBetMarkets: MarketItem[],
    prevSpeedBetMarkets: MarketItem[],
    selectedMarketId: number,
): boolean => {
    if (!Array.isArray(speedBetMarkets) || !Array.isArray(prevSpeedBetMarkets) || !selectedMarketId) {
        return false;
    }

    const selectedMarket = speedBetMarkets.find((market) => market.id === selectedMarketId);
    const prevSelectedMarket = prevSpeedBetMarkets.find((market) => market.id === selectedMarketId);

    const selectedMarketFiltered = pick(selectedMarket, ['id', 'active', 'display']);
    const prevSelectedMarketFiltered = pick(prevSelectedMarket, ['id', 'active', 'display']);

    return isEqual(selectedMarketFiltered, prevSelectedMarketFiltered);
};
