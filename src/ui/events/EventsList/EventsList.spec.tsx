import { waitFor } from '@testing-library/dom';
import { fromJS, List, Map } from 'immutable';
import map from 'lodash/map';

import MockComponent from '@solo-tests/unit/mocks/MockComponent';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import EventsList, { LOAD_MORE_TIMEOUT } from './EventsList';

const MockIntersectionObserver = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}));

vi.stubGlobal(`IntersectionObserver`, MockIntersectionObserver);

const allowLoadMore = true;
let collectionId = 'sport-football-0-undefined';
const query = {
    sport: 'football',
};
let routeName = 'sport';
const testId = 'matchesSection';
let routeParams: Record<string, string> = {
    sportId: 'football',
};
let isLoading = false;
const counters = [
    {
        count: 45,
        countries: [
            {
                aggregations: {},
                count: 45,
                key: 'WRL',
            },
        ],
        id: 'tennis',
    },
    {
        count: 11,
        countries: [
            {
                aggregations: {},
                count: 6,
                key: 'JPN',
            },
            {
                aggregations: {},
                count: 5,
                key: 'KOR',
            },
        ],
        id: 'baseball',
    },
];

const template1 = 'bet-radar-186';
const template2 = 'bet-radar-237';
const template3 = 'bet-radar-238';
const twoField_twowaywinner = 'twowaywinner';
const treeField_twowayhandicap = 'twowayhandicap';
const treeField_overunder = 'overunder';

const winner_betType = 'Winner';
const pointHandicap_betType = 'Point handicap';
const totalPoint_betType = 'Total points';

const events = [
    {
        id: 26,
        markets: [
            {
                templateId: 'id1',
                selections: ['H', 'A'],
                marketTypeGeneric: twoField_twowaywinner,
            },
            {
                templateId: 'id2',
                selections: ['H', 'A'],
                marketTypeGeneric: treeField_twowayhandicap,
            },
            {
                templateId: 'id3',
                selections: ['O', 'U'],
                marketTypeGeneric: treeField_overunder,
            },
        ],
        participants: {},
        getRawData: vi.fn(),
    },
    {
        id: 226,
        markets: [
            {
                templateId: 'id4',
                selections: ['H', 'A'],
                marketTypeGeneric: twoField_twowaywinner,
            },
            {
                templateId: 'id5',
                selections: ['H', 'A'],
                marketTypeGeneric: treeField_twowayhandicap,
            },
            {
                templateId: 'id6',
                selections: ['O', 'U'],
                marketTypeGeneric: treeField_overunder,
            },
        ],
        participants: {},
        getRawData: vi.fn(),
    },
];

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                reduxState: {
                    getCompetitionIconUrl: vi.fn().mockReturnValue('url'),
                    getCompetitionLocationIconUrl: vi.fn(),
                },
                eventsCollection: {
                    getEventsCollectionList: (collectionId: string) => {
                        if (collectionId === 'empty') {
                            return {
                                events: [],
                                loadMore: vi.fn(),
                                status: 'READY',
                                isLoading: false,
                                isLoadingMoreAvailable: false,
                                total: 0,
                            };
                        }

                        return {
                            events: events,
                            loadMore: vi.fn(),
                            status: 'READY',
                            isLoading: isLoading,
                            isLoadingMoreAvailable: true,
                            total: 2,
                            competitionForView: [
                                {
                                    id: 26,
                                    name: 'China League 1',
                                    platformObject: {
                                        displayOrder: undefined,
                                        externalId: {
                                            eventId: undefined,
                                            feedId: 'sr:tournament:782',
                                            instance: 'solo',
                                            producerId: undefined,
                                            provider: 'bet-radar',
                                            sportId: undefined,
                                        },
                                        id: '02_sr:tournament:782',
                                        name: 'China League 1',
                                    },
                                },
                                {
                                    id: 226,
                                    name: 'Philippines Footb. League',
                                    platformObject: {
                                        displayOrder: undefined,
                                        externalId: {
                                            eventId: undefined,
                                            feedId: 'sr:tournament:1654',
                                            instance: 'solo',
                                            producerId: undefined,
                                            provider: 'bet-radar',
                                            sportId: undefined,
                                        },
                                        id: '02_sr:tournament:1654',
                                        name: 'Philippines Footb. League',
                                    },
                                },
                            ],
                            getCurrentLoadedPage: 1,
                            collectionId: 'in-play-home-football',
                            currentLoadedPage: 1,
                            eventQuery: {
                                display: true,
                                market: {
                                    display: true,
                                    tradedInPlay: true,
                                },
                                perPage: 5,
                                sort: [
                                    '-competition.displayOrder',
                                    'timeSettings.startTime',
                                    '-sport.displayOrder',
                                    'competition.name',
                                    'name',
                                ],
                            },
                        };
                    },
                },
                router: {
                    route: { name: routeName, params: routeParams },
                },
                language: {
                    getTranslation: vi.fn(),
                },
            };
        },
        default: vi.fn(),
    };
});

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));

vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: ({ options }: { options: Record<string, string>[] }) => {
        return (
            <div>
                <ul>
                    {map(options, ({ label }) => (
                        <li data-testid={label} key={label}>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
}));

describe('EventsList', () => {
    it('should render EventsList', async () => {
        const initState = {
            events: Map()
                .setIn(['collections', collectionId, '_state'], 'READY')
                .setIn(['collections', collectionId, 'items'], List([26, 226]))
                .setIn(
                    ['marketTemplates', 'football', 'items'],
                    fromJS({
                        Winner: [template1, twoField_twowaywinner],
                        'Point handicap': [template2, treeField_twowayhandicap],
                        'Total points': [template3, treeField_overunder],
                    }),
                ),
        };
        const { findByTestId, findAllByTestId } = renderWithAppWrapper(
            <EventsList
                allowLoadMore={allowLoadMore}
                collectionId={collectionId}
                query={query}
                triggerReloadEvents={vi.fn()}
                counters={counters}
                testId={testId}
            />,
            initState,
        );
        const winner = await findByTestId(winner_betType);
        expect(winner).toHaveTextContent(winner_betType);

        const pointHandicap = await findByTestId(pointHandicap_betType);
        expect(pointHandicap).toHaveTextContent(pointHandicap_betType);

        const totalPoint = await findByTestId(totalPoint_betType);
        expect(totalPoint).toHaveTextContent(totalPoint_betType);

        const marketHeaders = await findAllByTestId('marketHeader');
        const cols = map(marketHeaders, 'innerHTML');
        expect(cols).toEqual(['H', 'A', '', 'H', 'A']);
    });

    it('should render loading message', async () => {
        routeName = 'homepage';
        routeParams = {};
        collectionId = 'in-play-home-football';
        isLoading = true;
        const initState = {
            events: Map()
                .setIn(['collections', collectionId, '_state'], 'PROGRESS')
                .setIn(['collections', collectionId, 'items'], List([26, 226])),
        };
        const { findByTestId } = renderWithAppWrapper(
            <EventsList
                allowLoadMore={allowLoadMore}
                collectionId={collectionId}
                query={query}
                triggerReloadEvents={vi.fn()}
                counters={counters}
                testId={testId}
            />,
            initState,
        );
        const loadingMessage = await findByTestId('loadingEvents');
        expect(loadingMessage).toContainHTML('Loading events...');
    });

    it('should render message about empty events', async () => {
        collectionId = 'empty';
        const initState = {
            events: Map()
                .setIn(['collections', collectionId, '_state'], 'READY')
                .setIn(['collections', collectionId, 'items'], List([])),
        };
        const { container } = renderWithAppWrapper(
            <EventsList
                allowLoadMore={allowLoadMore}
                collectionId={collectionId}
                query={query}
                triggerReloadEvents={vi.fn()}
                counters={counters}
                testId={testId}
            />,
            initState,
        );

        await waitFor(
            () => {
                expect(container).toHaveTextContent('There are no events being traded. Come back later!');
            },
            { timeout: LOAD_MORE_TIMEOUT * 2 },
        );
    });
});
