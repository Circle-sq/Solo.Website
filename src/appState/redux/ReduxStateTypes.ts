import type { ReactNode } from 'react';

import type { CompetitionTags, PlatformObject } from 'src/common/types/competition';
import type { LinkItem } from 'src/ui/common/NavigationPanel/types';

export interface LinkItemEl {
    id: string;
    eventNumber: number;
    elem: LinkElem;
}

export interface LinkElem {
    id: string;
    label: string;
    sport: string;
    name: string;
    total: number;
    displayOrder: number;
    tags: CompetitionTags;
    country?: string;
    tennisTour?: string;
    platformObject?: PlatformObject;
    tennisTourLabel?: string;
}

export interface PreparedNestedItem extends LinkItem {
    route: string;
    eventNumber: number;
    label: string;
}

export interface NestedItemChildren<T> {
    params: T;
    label: string;
    Icon: ReactNode;
    route: string;
    eventNumber: number;
    displayOrder?: number;
    imageUrl?: string;
    country?: string;
    category?: string;
}

export interface NestedItem {
    key: string;
    uuid: string;
    countryId: string;
    eventNumber: number;
    competitions: number;
    children: LinkItemEl[];
    country?: string;
    label: string;
    sport?: null | string;
    locationKey?: null | string;
    locationLabel?: null | string;
}
