import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import size from 'lodash/size';
import indexOf from 'lodash/indexOf';

import { SportType } from 'src/common/enums';
import { DefaultMarketsTabIndex } from 'src/common/enums/market';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { GetDefaultSelectedTabProps } from 'src/ui/events/MarketGroup/types';
import type { MarketTemplateTabs } from 'src/ui/events/DisplayTemplates/types';
import type { ReadonlyRoute } from 'src/utils/Router/types';
import { MARKET_TABS_PERIODS } from 'src/utils/constants';

export const UI_TAB_KEY_ORDER = Object.values(MARKET_TABS_PERIODS);

export const getDefaultSelectedTabKey = ({
    availableTabs,
    staticTabOrder = UI_TAB_KEY_ORDER,
}: GetDefaultSelectedTabProps): string => {
    // If there is no match in the list, probably is single tab -> Name shouldn't show anyway. Return string for consistency
    const defaultSelected = Object.keys(availableTabs)[0];

    const foundMatched = staticTabOrder.find((staticOrderingName: string) => {
        return !isEmpty(availableTabs[staticOrderingName]);
    });

    return typeof foundMatched === 'string' && foundMatched.length > 0 ? foundMatched : defaultSelected;
};

export const sortTabKeys = (tabs: MarketTemplateTabs) =>
    Object.keys(tabs).sort((a, b) => indexOf(UI_TAB_KEY_ORDER, a) - indexOf(UI_TAB_KEY_ORDER, b));

const sportsWithScoreboard: SportType[] = [
    SportType.Volleyball,
    SportType.Tennis,
    SportType.TableTennis,
    SportType.Darts,
    SportType.Snooker,
];

export const isSportWithScoreboard = (sport: string | undefined) =>
    sport !== undefined && includes(sportsWithScoreboard, String(sport));

export const getVisibleMarkets = (markets: MarketModel[] = []): MarketModel[] => filter(markets, 'visible');

export const filterMarketsByTabIndex = (
    event: EventModel | null,
    sortedMarketGroups: string[],
    tabIndex: number,
): MarketModel[] => {
    if (event === null) {
        return [];
    }

    const newMarkets = filter(event.markets, (market: MarketModel) => {
        if (tabIndex === DefaultMarketsTabIndex.Main) {
            return includes(market.marketGroups, 'Main');
        }

        if (tabIndex === DefaultMarketsTabIndex.All) {
            return Boolean(market);
        }

        return includes(market.marketGroups, sortedMarketGroups[tabIndex]);
    });

    return getVisibleMarkets(newMarkets);
};

export const getMarketsToDisplay = (event: EventModel | null, newMarkets: MarketModel[]) => {
    if (!isEmpty(newMarkets)) {
        return newMarkets;
    }

    if (event === null) {
        return [];
    }

    return getVisibleMarkets(event.markets);
};

export const getMarketsCount = (event: EventModel | null, newMarkets: MarketModel[]) => {
    if (!isEmpty(newMarkets)) {
        return size(newMarkets);
    }

    return size(event?.markets);
};

export const getMarketsTabIndex = ({ params }: ReadonlyRoute) => {
    if (params.market === undefined) {
        return DefaultMarketsTabIndex.Main;
    }

    return Number(params.market);
};

export const computeSortedMarketGroups = (tags: Record<string, string[]>, marketGroups: string[] = []): string[] => {
    const orderArray: string[] = get(tags, 'market-group', []);

    const sortedMarketGroups = [...marketGroups].sort((a, b) => orderArray.indexOf(a) - orderArray.indexOf(b));

    const mainMarketIndex = sortedMarketGroups.indexOf('Main');

    if (mainMarketIndex >= 0) {
        sortedMarketGroups.splice(mainMarketIndex, 1);
        sortedMarketGroups.unshift('Main');
    }

    return sortedMarketGroups;
};
