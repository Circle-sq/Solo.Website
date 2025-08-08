import type { Lines } from '@solo-asianView/enums';

import type { SportType } from 'src/common/enums';
import type { PlatformObject } from 'src/common/types/competition';
import type { EventItem } from 'src/store/events/types';

export interface Counter {
    count: number;
    id: SportType;
    displayOrder: number;
    name: string;
}

export interface Sport {
    id: SportType;
    name: string;
    displayOrder: number;
    count: number;
}

export interface AggregatedSport {
    id: SportType;
    name: string;
    tags: {
        'website-show'?: string[];
        'solo-events'?: string[];
        'market-group'?: string[];
        region?: string[];
        outright?: string[];
        'ante-post'?: string[];
        country?: string[];
        'tennis-tour'?: string[];
    };
    displayOrder: number;
    eventCount: number;
    translations: Record<string, unknown>;
    hasLiveEvents?: boolean;
}

export interface TagsCategoryInfo {
    category: string;
    categoryLabel: string;
    tag: string;
}

export interface EventGroup extends TagsCategoryInfo {
    id: number;
    name: string;
    events: EventItem<number>[];
    platformObject: PlatformObject;
}

export interface CompetitionGroups {
    [competitionId: string]: EventGroup;
}

export interface ESports {
    id: string;
    sports: AggregatedSport[];
    totalCount: number;
    hasLiveSports: boolean;
    displayOrder: number;
}

export type GroupedSports = (AggregatedSport | ESports)[];

export interface LineDetails {
    top: number[];
    bottom: number[];
}

export type LinesRange = Record<Lines, LineDetails>;
