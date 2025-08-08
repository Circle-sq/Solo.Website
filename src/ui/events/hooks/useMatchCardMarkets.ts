import get from 'lodash/get';
import includes from 'lodash/includes';
import reduce from 'lodash/reduce';
import size from 'lodash/size';
import { useSelector } from 'react-redux';

import { useBuildABetFeature } from '@solo-buildABet/hooks/useBuildABetFeature';

import { useAppStateContext } from 'src/appState/AppState';
import { sportsAllItemsSelector } from 'src/modules/sports/selectors';

import {
    computeSortedMarketGroups,
    filterMarketsByTabIndex,
    getMarketsCount,
    getMarketsTabIndex,
    getMarketsToDisplay,
    getVisibleMarkets,
} from '../utils/helpers';

const MIN_MARKETS_FOR_FILTER = 1;

export type MarketNavigationGroup = Record<string, { visible: boolean; position: number }>;

const visibleMarketByPosition = (computed: string[], name: string[]) =>
    reduce(
        computed,
        (markets: MarketNavigationGroup, buildABetMarket, position) => {
            markets[buildABetMarket] = { visible: includes(name, buildABetMarket), position };

            return markets;
        },
        {},
    );

const useMatchCardMarkets = (eventId: number) => {
    const sports = useSelector(sportsAllItemsSelector);

    const { models, router } = useAppStateContext();

    const event = models.getEvent(eventId);

    const sportTags: Record<string, string[]> = get(sports, `items.${event?.sport}.tags`, {});

    const computedMarketGroups = computeSortedMarketGroups(sportTags, event?.marketGroups);
    const tabIndex = getMarketsTabIndex(router.route);
    const marketsByTabIndex = filterMarketsByTabIndex(event, computedMarketGroups, tabIndex);
    const marketsToDisplay = getMarketsToDisplay(event, marketsByTabIndex);

    // TODO: refactor this in phase 2 for speedbet
    const filteredMarkets = marketsToDisplay.filter((market) => !market.templateId.includes('kerosports'));

    const { markets, buildABetMarketCount, marketNameGroup } = useBuildABetFeature({
        event,
        markets: filteredMarkets,
    });

    const marketsCount = getMarketsCount(event, marketsByTabIndex);
    const isHidden = event === null || size(getVisibleMarkets(event?.markets)) < MIN_MARKETS_FOR_FILTER;

    return {
        event,
        markets,
        marketsCount,
        marketGroups: visibleMarketByPosition(computedMarketGroups, marketNameGroup),
        buildABetMarketCount,
        isHidden,
    };
};

export default useMatchCardMarkets;
