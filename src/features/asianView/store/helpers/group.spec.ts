import { SortBy } from '@solo-asianView/enums';
import type { EventGroup } from '@solo-asianView/types';

import { SportType } from 'src/common/enums';
import type { CompetitionLocationItem } from 'src/common/types/competition';
import type { EventItem, ParticipantItem } from 'src/store/events/types';
import { TAGS } from 'src/utils/constants';

import { groupCompetitionEvents } from './group';

const participants = [
    {
        participant: { id: 347 },
        role: 'home',
    },
    {
        participant: { id: 350 },
        role: 'away',
    },
] as unknown as ParticipantItem[];

const competition: CompetitionLocationItem = {
    id: 83,
    name: 'Primera Division Women',
    label: 'Spain',
    country: 'ESP',
    total: 1,
    sport: SportType.Football,
    platformObject: {
        id: '02_sr:tournament:1127',
        name: 'Primera Division Women',
        externalId: {
            instance: 'solo',
            provider: 'bet-radar',
            feedId: 'sr:tournament:1127',
            sportId: 'bet-radar',
        },
    },
    tags: {
        'website-show': ['yes'],
        highlight: ['no'],
        'category-label': ['-'],
        'country-label': ['Spain'],
        outright: ['no'],
        'ante-post': ['no'],
        country: ['ESP'],
        region: ['-'],
        category: ['-'],
    },
    displayOrder: 1,
    globalDisplayOrder: 1,
};

const event = {
    competition: {
        id: String(competition.id),
        displayOrder: competition.displayOrder,
        globalDisplayOrder: competition.globalDisplayOrder,
    },
    id: 10000,
    name: 'FC Barcelona vs Levante UD',
    originalName: 'FC Barcelona vs Levante UD',
    sport: { id: SportType.Football },
    statistics: {},
    participants,
    markets: [],
    revision: 1,
} as unknown as EventItem;

const eventGroup: EventGroup = {
    id: competition.id,
    name: competition.name,
    events: [],
    platformObject: competition.platformObject,
    tag: TAGS.Country,
    category: 'ESP',
    categoryLabel: 'Spain',
};

const modifiedCompetition: CompetitionLocationItem = {
    ...competition,
    id: 100,
    displayOrder: 2,
    globalDisplayOrder: 2,
};

const modifiedEvent = {
    ...event,
    competition: {
        id: String(modifiedCompetition.id),
        displayOrder: modifiedCompetition.displayOrder,
        globalDisplayOrder: modifiedCompetition.globalDisplayOrder,
    },
} as EventItem;

describe('grouping helpers', () => {
    describe('groupEvents', () => {
        it('should return empty groups when params are empty', () => {
            expect(groupCompetitionEvents([], [], SortBy.Competitions)).toStrictEqual({
                liveGroups: [],
                upcomingGroups: [],
            });
        });

        it("should return empty groups when event competition ids don't overlap competition location ids", () => {
            expect(groupCompetitionEvents([modifiedEvent], [competition], SortBy.Competitions)).toStrictEqual({
                liveGroups: [],
                upcomingGroups: [],
            });
        });

        it('should return group with 1 event when event competition id overlaps with competition location id', () => {
            expect(groupCompetitionEvents([event], [competition], SortBy.Competitions)).toStrictEqual({
                liveGroups: [],
                upcomingGroups: [
                    {
                        ...eventGroup,
                        events: [event],
                    },
                ],
            });
        });

        it('should return 2 groups, with the order determined by the competitions param, with 2 events each when sort criteria is competitions', () => {
            expect(
                groupCompetitionEvents(
                    [event, event, modifiedEvent, modifiedEvent],
                    [competition, modifiedCompetition],
                    SortBy.Competitions,
                ),
            ).toStrictEqual({
                liveGroups: [],
                upcomingGroups: [
                    { ...eventGroup, id: 100, events: [modifiedEvent, modifiedEvent] },
                    { ...eventGroup, events: [event, event] },
                ],
            });
        });

        it('should return 2 groups with 2 events each when sort criteria is time and the events one after the other belong to the same competition', () => {
            expect(
                groupCompetitionEvents(
                    [event, event, modifiedEvent, modifiedEvent],
                    [competition, modifiedCompetition],
                    SortBy.Time,
                ),
            ).toStrictEqual({
                liveGroups: [],
                upcomingGroups: [
                    { ...eventGroup, events: [event, event] },
                    { ...eventGroup, id: 100, events: [modifiedEvent, modifiedEvent] },
                ],
            });
        });

        it('competitions param order should not affect group ordering when sort criteria is time', () => {
            expect(
                groupCompetitionEvents(
                    [event, event, modifiedEvent, modifiedEvent],
                    [competition, modifiedCompetition],
                    SortBy.Time,
                ),
            ).toStrictEqual({
                liveGroups: [],
                upcomingGroups: [
                    { ...eventGroup, events: [event, event] },
                    { ...eventGroup, id: 100, events: [modifiedEvent, modifiedEvent] },
                ],
            });
        });

        it('should return 4 groups with 1 event each when sort criteria is time and the events belonging to a same competition are intertwined', () => {
            expect(
                groupCompetitionEvents(
                    [event, modifiedEvent, event, modifiedEvent],
                    [competition, modifiedCompetition],
                    SortBy.Time,
                ),
            ).toStrictEqual({
                liveGroups: [],
                upcomingGroups: [
                    { ...eventGroup, events: [event] },
                    { ...eventGroup, id: 100, events: [modifiedEvent] },
                    { ...eventGroup, events: [event] },
                    { ...eventGroup, id: 100, events: [modifiedEvent] },
                ],
            });
        });

        it('should return 1 group with 4 events when sort criteria is time and the events belong the same competition', () => {
            expect(
                groupCompetitionEvents([event, event, event, event], [competition, modifiedCompetition], SortBy.Time),
            ).toStrictEqual({
                liveGroups: [],
                upcomingGroups: [{ ...eventGroup, events: [event, event, event, event] }],
            });
        });

        it('should return 1 group in live and 1 group in upcoming (make it a coincidence that events belong to same competition in live and upcoming)', () => {
            const liveEvent: EventItem = {
                ...event,
                timeSettings: { started: true, tradedInPlay: true, startTime: '00:00', timeZone: '' },
            };
            expect(
                groupCompetitionEvents(
                    [liveEvent, modifiedEvent, liveEvent, modifiedEvent],
                    [competition, modifiedCompetition],
                    SortBy.Time,
                ),
            ).toStrictEqual({
                liveGroups: [{ ...eventGroup, events: [liveEvent, liveEvent] }],
                upcomingGroups: [{ ...eventGroup, id: 100, events: [modifiedEvent, modifiedEvent] }],
            });
        });

        it('should return 2 groups in live and 2 groups in upcoming', () => {
            const liveEvent: EventItem = {
                ...event,
                timeSettings: { started: true, tradedInPlay: true, startTime: '00:00', timeZone: '' },
            };
            expect(
                groupCompetitionEvents(
                    [liveEvent, event, { ...liveEvent, ...modifiedEvent }, modifiedEvent],
                    [competition, modifiedCompetition],
                    SortBy.Time,
                ),
            ).toStrictEqual({
                liveGroups: [
                    { ...eventGroup, events: [liveEvent] },
                    { ...eventGroup, id: 100, events: [{ ...liveEvent, ...modifiedEvent }] },
                ],
                upcomingGroups: [
                    { ...eventGroup, events: [event] },
                    { ...eventGroup, id: 100, events: [modifiedEvent] },
                ],
            });
        });
    });
});
