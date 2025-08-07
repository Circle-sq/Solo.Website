import type { MarketModel } from 'src/appState/models/models/MarketModel';

export interface Settings {
    group: number;
    id: string;
    open: boolean;
}

export interface EventData {
    id: number;
    name: string;
    originalName: string;
    date: string;
    markets: MarketModel[];
    revision: number;
}

export interface CompetitionData {
    weekDayName: string;
    competition: string;
    locationLabel: string;
    formattedDate: string;
    eventCompetition: number;
    events: EventData[];
}
