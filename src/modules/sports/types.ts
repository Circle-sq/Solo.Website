import type { RequestStatus, SportType } from 'src/common/enums';
import type { CompetitionTags, PlatformObject } from 'src/common/types/competition';

export interface SportsState {
    all: AllSports;
    sports: Sports;
    competitionLocations: CompetitionLocations;
}

export interface AllSports {
    _state: RequestStatus;
    items: AllSportItems;
}

export interface Sports {
    state: RequestStatus;
    items: SportItems;
}

export interface CompetitionLocationItemsBySport {
    [key: string]: CompetitionLocationItem[];
}

export interface CompetitionLocations {
    state: RequestStatus;
    items: CompetitionLocationItem[];
    sports: CompetitionLocationItemsBySport;
}

export type AllSportItems = {
    [key in SportType]: AllSportItem;
};

export interface AllSportItem {
    id: string;
    name: string;
    displayOrder: number;
    tags: Record<string, string[]>;
}

export type SportItems = {
    [key in SportType]: SportItem;
};

export interface SportItem {
    id: string;
    name: string;
    displayOrder: number;
    translations?: Record<string, unknown>;
}

export interface CompetitionLocationItem {
    id: string;
    name: string;
    label: string;
    total: number;
    sport: SportType;
    country: string;
    displayOrder: number;
    globalDisplayOrder: number;
    platformObject: PlatformObject;
    tags: CompetitionTags;
}

export interface TagsCategoryInfo {
    category: string;
    categoryLabel: string;
    tag: string;
}
