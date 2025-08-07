import map from 'lodash/map';
import some from 'lodash/some';

import type { EventItem, MarketItem } from 'src/store/events/types';

import type { AsianViewSportConfig } from '../../api/cms/types';

import { orderAsianViewThreeWayWinnerSelections, sortMarkets } from './sort';

export const mapEventMarketsToIds = (event: EventItem): EventItem<number> => {
    return { ...event, markets: map(event.markets, 'id') };
};

export const prepareMarket = (market: MarketItem, eventActive?: boolean): MarketItem<number> => {
    const selections = orderAsianViewThreeWayWinnerSelections(market.template.marketTypeGeneric, market.selections);
    const active = eventActive === false ? false : market.active && some(selections, { active: true });

    return { ...market, active, selections: map(selections, 'id') };
};

export const prepareEvents = (events: EventItem[], sportConfig: AsianViewSportConfig | null): EventItem[] => {
    if (sportConfig === null) {
        return [];
    }

    const { primaryGroup, secondaryGroup } = sportConfig;
    const templateIds = [...map(primaryGroup.markets, 'id'), ...map(secondaryGroup.markets, 'id')];

    return map(events, (event) => {
        const markets = event.markets
            .filter(({ template }) => templateIds.includes(template.id))
            .map((market) => {
                const parents = {
                    eventId: market.event.id,
                    marketId: market.id,
                };

                return {
                    ...market,
                    selections: map(market.selections, (selection) => ({ ...selection, parents })),
                };
            });

        return { ...event, markets: sortMarkets(markets) };
    });
};
