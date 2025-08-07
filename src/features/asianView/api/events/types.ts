import type { InfiniteData } from '@tanstack/query-core';

import type { SportType } from 'src/common/enums';
import type { EventItem } from 'src/store/events/types';

import type { LHNTimeTab, SortBy, TimePeriod } from '../../enums';
import type { EventGroup } from '../../types';

export interface EventGroupsPageData {
    groups: EventGroup[];
    total: number;
}

export interface SearchEventsPageData {
    events: EventItem[];
    live: EventGroupsPageData;
    upcoming: EventGroupsPageData;
    pageParam: number;
    total: number;
}

export type SearchEventsInfiniteData = InfiniteData<SearchEventsPageData, number>;

export interface SearchEventsKeyParams {
    competitionIds: number[];
    timePeriod: TimePeriod;
    sport: SportType;
    sortBy: SortBy;
    timeTab?: LHNTimeTab;
}

export interface SearchEventsResponse {
    results: EventItem[];
    totalHints: number;
    pageParam?: number;
}
