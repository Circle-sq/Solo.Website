import { atomFamilyWithKey } from '@solo-utils/jotai';

import { subscribeEventEffect, subscribeMarketEffect } from './effects/subscribes';
import type { EventItem, MarketItem, SelectionItem } from './types';

export const eventItemAtomFamily = atomFamilyWithKey<EventItem<number> | null, number>({
    key: 'eventItemAtomFamily',
    default: null,
    effects: (eventId) => [subscribeEventEffect(eventId)],
});

export const marketItemAtomFamily = atomFamilyWithKey<MarketItem<number> | null, number>({
    key: 'marketItemAtomFamily',
    default: null,
    effects: (marketId) => [subscribeMarketEffect(marketId)],
});

export const selectionItemAtomFamily = atomFamilyWithKey<SelectionItem | null, number>({
    key: 'selectionItemAtomFamily',
    default: null,
});
