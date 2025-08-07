import type { EventItem } from 'src/store/events/types';

export interface SearchResultsData {
    events: EventItem[];
    total: number;
    pageParam: number;
}

export interface SearchResultsResponse {
    results: EventItem[];
    totalHints: number;
    aggregations: Record<string, unknown>;
}

export interface SearchWarning {
    langKey: string;
    defaultText: string;
}
