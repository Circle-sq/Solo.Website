import { addYears, format } from 'date-fns';

import type { EventModel } from 'src/appState/models/models/EventModel';
import type { CompetitionLocationItem } from 'src/modules/sports/types';
import { groupOutrightEvents, isValidOutrightDate } from 'src/ui/events/Outrights/utils';
import { DATE_FORMAT } from 'src/utils/constants';
import type { CompetitionLocation } from 'src/utils/types';

const dateA_event1 = {
    date: '2023-02-20T22:00:00Z',
    id: 1,
    markets: [],
    name: 'Date A Event 1',
    originalName: 'Date A Event 1',
};

const dateA_event2 = {
    date: '2023-02-20T22:00:00Z',
    id: 2,
    markets: [],
    name: 'Date A Event 2',
    originalName: 'Date A Event 2',
};

const dateB_event1 = {
    date: '2023-04-13T17:00:00Z',
    id: 3,
    markets: [],
    name: 'Date B Event 1',
    originalName: 'Date B Event 1',
};

const eventsByDateRaw = [
    {
        competitionId: 133,
        id: 1,
        name: 'Date A Event 1',
        originalName: 'Date A Event 1',
        markets: [],
        timeSettingsStartTime: '2023-02-20T22:00:00Z',
    },
    {
        competitionId: 133,
        id: 2,
        name: 'Date A Event 2',
        originalName: 'Date A Event 2',
        markets: [],
        timeSettingsStartTime: '2023-02-20T22:00:00Z',
    },
    {
        competitionId: 225,
        id: 3,
        name: 'Date B Event 1',
        originalName: 'Date B Event 1',
        markets: [],
        timeSettingsStartTime: '2023-04-13T17:00:00Z',
    },
];

const competitionA_event1 = {
    date: '2023-05-06T14:00:00Z',
    id: 1,
    markets: [],
    name: 'Competition A Event 1',
    originalName: 'Competition A Event 1',
};

const competitionA_event2 = {
    date: '2023-04-27T14:00:00Z',
    id: 2,
    markets: [],
    name: 'Competition A Event 2',
    originalName: 'Competition A Event 2',
};

const competitionB_event1 = {
    date: '2023-04-27T14:00:00Z',
    id: 3,
    markets: [],
    name: 'Competition B Event 1',
    originalName: 'Competition B Event 1',
};

const eventsByCompetitionRaw = [
    {
        competitionId: 225,
        id: 1,
        name: 'Competition A Event 1',
        originalName: 'Competition A Event 1',
        markets: [],
        timeSettingsStartTime: '2023-05-06T14:00:00Z',
    },
    {
        competitionId: 225,
        id: 2,
        name: 'Competition A Event 2',
        originalName: 'Competition A Event 2',
        markets: [],
        timeSettingsStartTime: '2023-04-27T14:00:00Z',
    },
    {
        competitionId: 133,
        id: 3,
        name: 'Competition B Event 1',
        originalName: 'Competition B Event 1',
        markets: [],
        timeSettingsStartTime: '2023-04-27T14:00:00Z',
    },
];

const getTranslation = vi.fn();

const competitionLocations = [
    {
        id: '225',
        country: 'ENG',
        displayOrder: 250,
        label: 'England',
        name: 'Championship',
        tags: { country: ['ENG'], 'country-label': ['England'] },
    },
    {
        id: '133',
        country: '300',
        displayOrder: 9994,
        label: 'England',
        name: 'National League North',
        tags: { country: ['ENG'], 'country-label': ['England'] },
    },
] as CompetitionLocationItem[];

const competitionLocation: CompetitionLocation = {
    tag: '',
    label: '',
    querySelector: '',
    queryLabelSelector: '',
    categorySelector: 'tags.category.0',
    categoryLabelSelector: 'tags.category-label.0',
    labelSelector: 'tags.country-label.0',
    tagSelector: 'tags.country.0',
};

describe('test outright utils', () => {
    it('should check for validOutrightDate when valid"', () => {
        const date = format(addYears(new Date(), 1), DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF);
        expect(isValidOutrightDate(date)).toBeTruthy();
    });
    it('should check for validOutrightDate when invalid"', () => {
        const date = format(addYears(new Date(), 10), DATE_FORMAT.FULL_NUMERIC_WITH_TIMEZONE_DIFF);
        expect(isValidOutrightDate(date)).toBeFalsy();
    });
    it('should group outright events by date', () => {
        const groupedEvents = groupOutrightEvents(
            eventsByDateRaw as unknown as EventModel[],
            'formattedDate',
            competitionLocations,
            competitionLocation,
            getTranslation,
        );

        expect(groupedEvents.length).toBe(2);
        expect(groupedEvents[0].events).toEqual([dateA_event1, dateA_event2]);
        expect(groupedEvents[1].events).toEqual([dateB_event1]);
    });
    it('should group outright events by competitionId', () => {
        const groupedEvents = groupOutrightEvents(
            eventsByCompetitionRaw as unknown as EventModel[],
            'eventCompetition',
            competitionLocations,
            competitionLocation,
            getTranslation,
        );

        expect(groupedEvents.length).toBe(2);
        expect(groupedEvents[0].events).toEqual([competitionA_event1, competitionA_event2]);
        expect(groupedEvents[1].events).toEqual([competitionB_event1]);
    });
});
