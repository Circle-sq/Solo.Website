import type { SportType } from 'src/common/enums';

export interface Competition {
    id: number;
    name: string;
    displayOrder?: number | null; // TODO Check if nullable
    platformObject?: PlatformObject | null; // TODO Check if nullable
}

export interface PlatformObject {
    id: string;
    name: string;
    externalId?: ExternalId | null;
}

export interface ExternalId {
    instance: string;
    provider: string;
    feedId?: string | null;
    eventId?: string | null;
    sportId?: string | null;
    producerId?: string | null;
}

export interface CompetitionLocationItem {
    id: number;
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

export interface CompetitionTags {
    category: string[];
    'category-label': string[];
    country: string[];
    'country-label': string[];
    'tennis-tour'?: string[];
    'tennis-tour-label'?: string[];
    highlight: string[];
    outright: string[];
    region: string[];
    'ante-post': string[];
    'website-show': string[];
}

export interface CompetitionLocationTags {
    category: string[];
    'category-label': string[];
    country: string[];
    'country-label': string[];
    'tennis-tour'?: string[];
    'tennis-tour-label'?: string[];
}
