import compact from 'lodash/compact';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { useCallback, useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import { SportType } from 'src/common/enums';
import { getMarketsData, getVisibleMarkets } from 'src/ui/crossbetting/EventCardMobile/helpers';
import { NUMBERS } from 'src/utils/constants';

import type { UseEventCardData } from './types';

const useEventCardData = (markets: MarketModel[], isExpanded: boolean, eventSport: string): UseEventCardData => {
    const { models, router } = useAppStateContext();
    const { sport: routerSport } = router.route.params;
    const sport = routerSport === SportType.All ? eventSport : routerSport;

    const visibleMarkets = getVisibleMarkets(markets, models, true);

    const { bestMarketsIds, bestSpecialMarketIds, bestMarketTemplates, bestSpecialMarketTemplates } = useMemo(
        () => getMarketsData(visibleMarkets),
        [visibleMarkets, sport],
    );

    const bestMarkets = compact(bestMarketsIds.map((marketId) => models.getMarket(marketId)));
    const specialMarkets = compact(bestSpecialMarketIds.map((marketId) => models.getMarket(marketId)));

    const restMarkets = visibleMarkets.filter(({ id, templateId }) => {
        return (
            !bestMarketsIds.includes(id) &&
            !bestSpecialMarketIds.includes(id) &&
            bestMarketTemplates.includes(templateId)
        );
    });

    const restSpecialMarkets = visibleMarkets.filter(({ id, templateId }) => {
        return (
            !bestMarketsIds.includes(id) &&
            !bestSpecialMarketIds.includes(id) &&
            bestSpecialMarketTemplates.includes(templateId)
        );
    });

    const getMarkets = useCallback(
        (isExpanded: boolean) => {
            const groupedBestMarkets = groupBy(bestMarkets, 'templateId');
            const groupedMarkets = groupBy([...bestMarkets, ...restMarkets], 'templateId');

            const mappedMarkets = bestMarketTemplates.reduce((acc: MarketModel[], templateId) => {
                return [
                    ...acc,
                    ...(isExpanded
                        ? orderBy(get(groupedMarkets, templateId, []), 'line', 'asc')
                        : get(groupedBestMarkets, templateId, [])),
                ];
            }, []);

            return uniqBy(mappedMarkets, 'id');
        },
        [bestMarketTemplates, bestMarkets, restMarkets],
    );

    const getSpecialMarkets = useCallback(
        (isExpanded: boolean) => {
            const groupedBestSpecialMarkets = groupBy(specialMarkets, 'templateId');
            const groupedMarkets = groupBy([...specialMarkets, ...restSpecialMarkets], 'templateId');

            const mappedMarkets = bestSpecialMarketTemplates.reduce((acc: MarketModel[], templateId) => {
                return [
                    ...acc,
                    ...(isExpanded
                        ? orderBy(get(groupedMarkets, templateId, []), 'line', 'asc')
                        : get(groupedBestSpecialMarkets, templateId, [])),
                ];
            }, []);

            return uniqBy(mappedMarkets, 'id');
        },
        [bestSpecialMarketIds, specialMarkets, restSpecialMarkets],
    );

    const allMarketsCount = getMarkets(true).length;
    const specialMarketsCount = getSpecialMarkets(true).length;
    const bestAndSpecialMarketsCount = compact([...bestMarketsIds, ...bestSpecialMarketIds]).length;
    const marketsToShowCount = isExpanded ? NUMBERS.max : bestAndSpecialMarketsCount;

    const restMarketsToShow = useMemo(
        () => getMarkets(isExpanded).slice(0, marketsToShowCount),
        [isExpanded, getMarkets, marketsToShowCount],
    );

    const specialMarketsToShow = useMemo(
        () => getSpecialMarkets(isExpanded).slice(0, marketsToShowCount),
        [isExpanded, getMarkets, marketsToShowCount],
    );

    return {
        restMarketsToShow,
        specialMarketsToShow,
        showExpander: allMarketsCount + specialMarketsCount > bestAndSpecialMarketsCount,
        hiddenMarketsCount: allMarketsCount + specialMarketsCount - bestAndSpecialMarketsCount,
    };
};

export default useEventCardData;
