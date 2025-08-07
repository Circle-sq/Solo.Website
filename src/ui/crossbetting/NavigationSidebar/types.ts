import type { SportType } from 'src/common/enums';
import type { CompetitionLocationItem } from 'src/modules/sports/types';

export interface Country {
    id: string;
    count: number;
    sportId: string;
}

export interface Competition {
    id: string;
    count: number;
    country: string;
    displayOrder: number;
    globalDisplayOrder: string | number;
    name: string;
    countryId: string;
    label: string;
    competitions: number;
    sportId: string;
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
        sport?: SportType;
    };
}

export interface CompetitionLocationItemById {
    [key: string]: CompetitionLocationItem;
}

export interface TournamentModel {
    id: string;
    label?: string | null;
    count: number;
    sport?: string | null;
}
