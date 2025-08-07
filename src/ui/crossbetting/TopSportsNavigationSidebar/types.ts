import type { ReactElement } from 'react';

export interface Country {
    id: string;
    count: number;
}

export interface Competition {
    id: string;
    count: number;
    country: string;
    displayOrder: number;
    name: string;
    countryId: string;
    label: string;
    competitions: number;
    key: string;
}

export interface GroupCompetitionsByCountry {
    id?: string;
    countryId: string;
    label: string;
    competitions: number;
    totalEventsCounter: number;
    key: string;
    children: Children[];
}

export interface Children {
    iconName: string;
    eventNumber: number;
    id: string;
    country: string;
    displayOrder: number;
    label: string;
    params: {
        countryId: string;
        competitionId: string | number;
    };
}

export interface TopSportsLinks {
    children: GroupCompetitionsByCountry[];
    route?: string;
    imageUrl: string;
    params?: {
        sport: string;
        countryId?: string | number;
        sportId?: string | number;
        id?: string | number;
    };
    sportId?: string;
    icon?: string;
    label?: ReactElement;
    displayOrder?: number;
    count?: number;
    testId?: string;
}
