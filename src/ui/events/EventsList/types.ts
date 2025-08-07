import type { EventModel } from 'src/appState/models/models/EventModel';
import type { LanguagesState } from 'src/appState/LanguagesState';
import type { CompetitionLocationItem } from 'src/modules/sports/types';

export interface EventDataGrouped {
    weekDayName: string;
    formattedDate: string;
    startTime: string;
    competition: string;
    competitionId: number;
    eventCompetition: CompetitionLocationItem | undefined;
    events: EventModel[];
    location: string;
    locationLabel: string;
    tag: string;
    originalSport?: string;
}

export interface SportCounter {
    count: number;
    countries: Record<string, unknown>[];
    id: string;
}

export interface DropdownItem {
    label: string;
    value: string;
}

export interface SortOption {
    id: string;
    label: string;
}

export interface GroupNameParams extends Pick<LanguagesState, 'getTranslation'> {
    group: EventDataGrouped;
    routeName: string;
    shouldGroupEvents?: boolean;
}
