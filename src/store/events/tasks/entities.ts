import { RESET } from 'jotai/utils';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import { getMarkets } from '@solo-asianView/store/helpers/getters';
import { getMainLineMarketIdsGroups } from '@solo-asianView/store/helpers/mainLine';
import { mapEventMarketsToIds, prepareMarket } from '@solo-asianView/store/helpers/prepare';
import { sortMarkets } from '@solo-asianView/store/helpers/sort';
import { mainLineMarketIdsAtomFamily } from '@solo-asianView/store/mainLine';
import { sportConfigAtom } from '@solo-asianView/store/sportConfig';
import type { PossibleBetEvent } from '@solo-betslip/api/types';
import type { CallbackParams } from '@solo-utils/jotai';

import type { SelectionItem } from 'src/common/types/selection';

import { eventItemAtomFamily, marketItemAtomFamily, selectionItemAtomFamily } from '../entities';
import type { EventItem, MarketItem } from '../types';

export const addMarketToEventTask =
    ({ get, set }: CallbackParams) =>
    (market: MarketItem) => {
        const { id: eventId } = market.event;
        const eventItem = get(eventItemAtomFamily(eventId));

        if (eventItem === null) {
            return;
        }

        const marketIds = eventItem.markets.filter((id) => id !== market.id);
        const markets = getMarkets(get)(marketIds);

        set(eventItemAtomFamily(eventId), {
            ...eventItem,
            markets: map(sortMarkets([...markets, market]), 'id'),
        });
    };

export const setMarketTask =
    ({ set }: CallbackParams) =>
    (market: MarketItem, eventActive?: boolean) => {
        set(marketItemAtomFamily(market.id), prepareMarket(market, eventActive));
        const parents = { marketId: market.id, eventId: market.event.id };

        forEach(market.selections, (selection) => {
            set(selectionItemAtomFamily(selection.id), { ...selection, parents });
        });
    };

export const setEventTask = (p: CallbackParams) => (event: EventItem) => {
    p.set(eventItemAtomFamily(event.id), mapEventMarketsToIds(event));

    forEach(event.markets, (market) => {
        setMarketTask(p)(market, event.active);
    });
};

export const setEntitiesTask = (p: CallbackParams) => (events: EventItem[]) => {
    const sportConfig = p.get(sportConfigAtom);

    forEach(events, (event) => {
        setEventTask(p)(event);

        if (sportConfig != null) {
            p.set(mainLineMarketIdsAtomFamily(event.id), getMainLineMarketIdsGroups(sportConfig, event.markets));
        }
    });
};

export const updateSelectionsPriceTask =
    ({ get, set }: CallbackParams) =>
    (selections: Record<number, SelectionItem>) => {
        forEach(selections, (selection) => {
            if (isEmpty(selection)) {
                return;
            }

            const selectionItem = get(selectionItemAtomFamily(selection.id));

            if (selectionItem === null || selectionItem.price?.d === selection.price?.d) {
                return;
            }

            set(selectionItemAtomFamily(selection.id), { ...selectionItem, price: selection.price });
        });
    };

export const syncEntitiesStatesWithPossibleBetsTask =
    ({ get, set }: CallbackParams) =>
    (events: PossibleBetEvent[]) => {
        forEach(events, (event) => {
            const eventItem = get(eventItemAtomFamily(event.id));

            if (eventItem === null || eventItem.revision >= event.revision) {
                return;
            }

            forEach(event.markets, (market) => {
                const marketItem = get(marketItemAtomFamily(market.id));

                if (marketItem === null || marketItem.revision >= market.revision) {
                    return;
                }

                forEach(market.selections, ({ id: selectionId, active, display, price }) => {
                    const selectionItem = get(selectionItemAtomFamily(selectionId));

                    if (selectionItem === null) {
                        return;
                    }

                    if ('d' in price && selectionItem.price?.d !== price.d) {
                        set(selectionItemAtomFamily(selectionId), { ...selectionItem, price });
                    }

                    set(selectionItemAtomFamily(selectionId), { ...selectionItem, active, display });
                });

                set(marketItemAtomFamily(market.id), {
                    ...marketItem,
                    active: market.active,
                    display: market.display,
                    revision: market.revision,
                });
            });

            set(eventItemAtomFamily(event.id), {
                ...eventItem,
                active: event.active,
                display: event.display,
                revision: event.revision,
            });
        });
    };

export const resetEventItemWithDescendantsTask =
    ({ get, set }: CallbackParams) =>
    (eventId: number) => {
        const eventItem = get(eventItemAtomFamily(eventId));

        if (eventItem === null) {
            return;
        }

        eventItem.markets.forEach((marketId) => {
            const marketItem = get(marketItemAtomFamily(marketId));

            if (marketItem !== null) {
                marketItem.selections.forEach((selectionId) => {
                    set(selectionItemAtomFamily(selectionId), RESET);
                    selectionItemAtomFamily.remove(selectionId);
                });

                set(marketItemAtomFamily(marketId), RESET);
                marketItemAtomFamily.remove(marketId);
            }
        });

        set(eventItemAtomFamily(eventId), RESET);
        eventItemAtomFamily.remove(eventId);
    };
