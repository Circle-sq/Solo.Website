import { buildCacheUrl } from 'src/appState/utils';
import type { EventItem } from 'src/common/types/event';
import type { MarketItem } from 'src/store/events/types';

import { api } from '../api';

import type { MarketsByIdsParams, SearchEventsByValueQueryParams, SearchEventsQueryParams } from './types';

export const EventsService = {
    getEventWithoutMarkets: async (eventId: number): Promise<Omit<EventItem, 'markets'>> => {
        return api.get(`/events/${eventId}/without-markets`);
    },
    getActiveMarketsCounter: async (eventIds: number[]): Promise<Record<string, number>> => {
        return api.post('/events/markets/active-counter', eventIds);
    },
    getMarketsByIds: async (params: MarketsByIdsParams): Promise<MarketItem[]> => {
        return api.post(`/events/markets-by-ids`, params);
    },
    search: async <T>(params: SearchEventsQueryParams): Promise<T> => {
        return api.post('/events/new-search', params);
    },
    searchByValue: async (params: SearchEventsByValueQueryParams, id = 'search'): Promise<{ events: EventItem[] }> => {
        return api.get(buildCacheUrl('/events/search'), { ...params, reduceMarkets: true }, { cache: 500, id });
    },
};
