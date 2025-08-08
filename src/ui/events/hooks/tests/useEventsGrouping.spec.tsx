import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import { EventModel } from 'src/appState/models/models/EventModel';
import type { ModelBoxContext } from 'src/appState/models/ModelWrapper';
import { RouteName } from 'src/common/enums';
import type { EventDataGrouped } from 'src/ui/events/EventsList/types';
import useEventsGrouping from 'src/ui/events/hooks/useEventsGrouping';
import type { CompetitionLocationItem } from 'src/modules/sports/types';

const dataEvents = require('./mocks/championship-data.json');
const dataCompetitions = require('./mocks/competitions-data.json');

const weekDayNames = {
    sunday: 'sunday',
    monday: 'monday',
    tuesday: 'tuesday',
    wednesday: 'wednesday',
    thursday: 'thursday',
    friday: 'friday',
    saturday: 'saturday',
} as Record<string, string>;

const Component = ({
    competitions,
    routeName,
    events,
    isDisplayEvents = false,
}: {
    competitions: CompetitionLocationItem[];
    routeName: string;
    events: EventModel[];
    isDisplayEvents?: boolean;
}) => {
    const sortBy = 'sortbytime';
    const shouldGroupEvents = false;

    const { groupedEvents } = useEventsGrouping(routeName, sortBy, events, competitions, shouldGroupEvents);

    return (
        <>
            {groupedEvents.map((group: EventDataGrouped) => {
                const name = weekDayNames[group.weekDayName];

                if (routeName === RouteName.Competition) {
                    return (
                        <div key={group.formattedDate} data-testid='weekDay'>
                            {name}
                        </div>
                    );
                }

                return (
                    <div key={`${group.formattedDate}-${group.competition}`} data-testid='competition-name'>
                        {group.competition}
                        {isDisplayEvents && (
                            <div data-testid='events'>
                                {group.events.map((event) => {
                                    return (
                                        <div key={event.id} data-testid='event'>
                                            {event.name}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};

describe('useEventsGrouping', () => {
    it('should group events by day for championship', () => {
        const mockModelBoxContent: ModelBoxContext = {} as ModelBoxContext;
        const events = dataEvents.map((event: Record<string, unknown>) => new EventModel(mockModelBoxContent, event));
        const competitions = [
            {
                id: '225',
                name: 'Championship',
                displayOrder: 99992,
                platformObject: {
                    id: '02_sr:tournament:18',
                    name: 'Championship',
                    externalId: {
                        instance: 'solo',
                        provider: 'bet-radar',
                        feedId: 'sr:tournament:18',
                    },
                },
            },
            {
                id: '225',
                name: 'Championship',
                displayOrder: 99992,
                platformObject: {
                    id: '02_sr:tournament:18',
                    name: 'Championship',
                    externalId: {
                        instance: 'solo',
                        provider: 'bet-radar',
                        feedId: 'sr:tournament:18',
                    },
                },
            },
        ] as CompetitionLocationItem[];

        const { getAllByTestId } = renderWithTheme(
            <Component routeName='competition' competitions={competitions} events={events} />,
        );
        const referenceWeekDays = ['friday', 'saturday', 'friday'];
        const weekDays = getAllByTestId('weekDay').map((element) => element.innerHTML);

        expect(weekDays.toString()).toEqual(referenceWeekDays.toString());
    });

    it('should group event by competition on country page', () => {
        const mockModelBoxContent: ModelBoxContext = {} as ModelBoxContext;
        const events = dataCompetitions.map(
            (event: Record<string, unknown>) => new EventModel(mockModelBoxContent, event),
        );
        const competitions = [
            {
                id: '4920',
                name: 'WK-League',
                displayOrder: 0,
                platformObject: {
                    id: '02_sr:tournament:1772',
                    name: 'WK-League',
                    externalId: {
                        instance: 'solo',
                        provider: 'bet-radar',
                        feedId: 'sr:tournament:1772',
                    },
                },
            },
            {
                id: '4514',
                name: 'FA Cup',
                displayOrder: 0,
                platformObject: {
                    id: '02_sr:tournament:615',
                    name: 'FA Cup',
                    externalId: {
                        instance: 'solo',
                        provider: 'bet-radar',
                        feedId: 'sr:tournament:615',
                    },
                },
            },
            {
                id: '4003',
                name: 'K-League 2',
                displayOrder: 99707,
                platformObject: {
                    id: '02_sr:tournament:777',
                    name: 'K-League 2',
                    externalId: {
                        instance: 'solo',
                        provider: 'bet-radar',
                        feedId: 'sr:tournament:777',
                    },
                },
            },
            {
                id: '800',
                name: 'K-League 1',
                displayOrder: 99756,
                platformObject: {
                    id: '02_sr:tournament:410',
                    name: 'K-League 1',
                    externalId: {
                        instance: 'solo',
                        provider: 'bet-radar',
                        feedId: 'sr:tournament:410',
                    },
                },
            },
        ] as CompetitionLocationItem[];

        const { getAllByTestId } = renderWithTheme(
            <Component routeName='country' competitions={competitions} events={events} />,
        );

        const referenceCompetitions = competitions.map((item) => item.name);
        const screenCompetitions = getAllByTestId('competition-name').map((element) => element.innerHTML);

        expect(screenCompetitions.toString()).toEqual(referenceCompetitions.toString());
    });

    it('should display events in right order', () => {
        const competitions = [
            {
                id: '225',
                name: 'WK-League',
                displayOrder: 0,
                platformObject: {
                    id: '02_sr:tournament:1772',
                    name: 'WK-League',
                    externalId: {
                        instance: 'solo',
                        provider: 'bet-radar',
                        feedId: 'sr:tournament:1772',
                    },
                },
            },
        ] as CompetitionLocationItem[];

        const event1 = {
            id: 51766,
            name: 'Luton Town vs Watford',
            originalName: 'Luton Town vs Watford',
            state: 'open',
            sport: 'football',
            competition: 225,
            data: {
                value: {
                    sport: 'football',
                    displayOrder: 0,
                    timeSettings: {
                        startTime: '2023-06-27T10:40:10Z',
                    },
                    name: 'Luton Town vs Watford',
                },
            },
            timeSettings: {
                startTime: '2023-06-27T10:40:10Z',
                started: false,
                tradedInPlay: true,
                offAtStartTime: false,
                timeZone: 'UTC',
            },
        };
        const event2 = {
            id: 51796,
            name: 'Burnley vs Sunderland AFC',
            originalName: 'Burnley vs Sunderland AFC',
            state: 'open',
            sport: 'football',
            competition: 225,
            data: {
                value: {
                    sport: 'football',
                    displayOrder: 1,
                    timeSettings: {
                        startTime: '2023-06-27T10:40:10Z',
                    },
                    name: 'Burnley vs Sunderland AFC',
                },
            },
            timeSettings: {
                startTime: '2023-06-27T10:40:10Z',
                started: false,
                tradedInPlay: true,
                offAtStartTime: false,
                timeZone: 'UTC',
            },
        };
        const event3 = {
            id: 51788,
            name: 'Wigan Athletic vs QPR',
            originalName: 'Wigan Athletic vs QPR',
            state: 'open',
            sport: 'football',
            competition: 225,
            data: {
                value: {
                    sport: 'football',
                    displayOrder: 0,
                    timeSettings: {
                        startTime: '2023-06-27T10:40:10Z',
                    },
                    name: 'Wigan Athletic vs QPR',
                },
            },
            timeSettings: {
                startTime: '2023-06-27T10:40:10Z',
                started: false,
                tradedInPlay: true,
                offAtStartTime: false,
                timeZone: 'UTC',
            },
        };

        const mockModelBoxContent: ModelBoxContext = {} as ModelBoxContext;
        const events = [
            new EventModel(mockModelBoxContent, event1),
            new EventModel(mockModelBoxContent, event2),
            new EventModel(mockModelBoxContent, event3),
        ];

        const { getAllByTestId } = renderWithTheme(
            <Component routeName='country' competitions={competitions} events={events} isDisplayEvents={true} />,
        );
        const displayEvents = getAllByTestId('event');
        expect(displayEvents[0]).toHaveTextContent(event2.name);
        expect(displayEvents[1]).toHaveTextContent(event1.name);
        expect(displayEvents[2]).toHaveTextContent(event3.name);
    });
});
