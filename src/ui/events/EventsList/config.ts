import type { EventModel } from 'src/appState/models/models/EventModel';
import { SelectionIdentifier } from 'src/common/enums';

export const MIN_VISIBLE_COLUMNS = 1;

export const DEFAULT_LIVE_HIGHLIGHTS = 5;

export const MAX_VISIBLE_COLUMNS = 3;

export const SORT_VALUE = {
    time: 'sortbytime',
    competitions: 'sortbycompetitions',
    globalTime: 'globalsortbytime',
    globalCompetitions: 'globalsortbycompetitions',
};

export const SORT_OPTIONS = [
    { id: SORT_VALUE.competitions, label: 'League' },
    { id: SORT_VALUE.time, label: 'Time' },
];

export const COMPETITION_PRIORITY_ORDER: Partial<keyof EventModel>[] = [
    'sport',
    'displayOrder',
    'timeSettingsStartTime',
    'competitionId',
    'name',
];

export const americanSportIdentifiers = [
    SelectionIdentifier.MoneyLine,
    SelectionIdentifier.Spread,
    SelectionIdentifier.Total,
];

export const marketTypeGenericValues: Record<string, string[]> = {
    double: ['HD', 'HA', 'DA'],
    twowaywinner: ['H', 'A'],
    threewaywinner: ['H', 'D', 'A'],
    twowayhandicap: ['H', 'A'],
    threewayhandicap: ['H', 'D', 'A'],
    overunder: ['O', 'U'],
    yesno: ['Y', 'N'],
    wintonil: ['Y', 'N'],
};
