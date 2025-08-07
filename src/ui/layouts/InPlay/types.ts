import type { EventsCollectionQuery } from 'src/appState/EventsCollection/types';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { SportType } from 'src/common/enums';
import type { PlatformObject } from 'src/common/types/competition';
import type { TagsCategoryInfo } from 'src/modules/sports/types';

export interface LiveStreamProps {
    liveStreams: Stream[];
    allowLoadMore?: boolean;
    perPage?: number;
}

export interface Stream {
    count: number;
    displayOrder: number;
    id: string;
    name: string;
}

export interface InPlayCounters {
    count: number;
    countries: Record<string, AggregationLocation>;
    displayOrder: number;
    id: string;
    name: string;
}

export type QueryParams = Pick<
    EventsCollectionQuery,
    'perPage' | 'sport' | 'time' | 'tags.country' | 'tags.tennis-tour'
>;

export interface AggregationLocation {
    key: string;
    count: number;
    label: string;
    locationIcon?: string;
}

export interface LHNSport {
    id: string;
    displayOrder: number;
    name: string;
    count: number;
}

export interface LHNCompetition {
    id: number;
    name: string;
    sport: SportType;
    displayOrder: number;
    platformObject: PlatformObject | null;
    categoryInfo: TagsCategoryInfo | null;
    events: EventModel[];
}
