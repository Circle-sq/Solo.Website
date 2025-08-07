import { waitFor } from '@testing-library/react';
import { fromJS, List, Map } from 'immutable';
import { http, HttpResponse } from 'msw';
import type { ReactNode } from 'react';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';
import { server } from '@sc-tests/unit/mocks/server.setup';

import LeftSideNavigation from './LeftSideNavigation';

const MockIntersectionObserver = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}));

vi.stubGlobal(`IntersectionObserver`, MockIntersectionObserver);
vi.stubGlobal('ResizeObserver', MockIntersectionObserver);

let routeName = 'country';
const routeParams = {
    sportId: 'football',
    countryId: undefined,
    id: '',
};
const template1 = 'bet-radar-186';
const template2 = 'bet-radar-237';
const template3 = 'bet-radar-238';
const twoField_twowaywinner = 'twowaywinner';
const treeField_twowayhandicap = 'twowayhandicap';
const treeField_overunder = 'overunder';
const collectionId = 'in-play-home-football';

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
        getRawData: vi.fn(),
    },
];

vi.mock('@sc-hooks', () => ({
    __esModule: true,
    useWindowResize: vi.fn(),
    useWindowWidth: () => ({ isMobileLandscape: false }),
}));

vi.mock('@sc-feature-flags', () => ({
    useBetLinkGolfFlag: () => true,
}));

const handlers = [
    http.post('/api/competitions/search/event', async () => {
        return HttpResponse.json({
            results: [],
            totalHints: 0,
            aggregations: {},
        });
    }),
];

server.use(...handlers);

vi.mock('src/appState/AppState', async function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                reduxState: {
                    getSportTemplates: vi.fn().mockReturnValue(
                        fromJS({
                            Winner: [template1, twoField_twowaywinner],
                            'Point handicap': [template2, treeField_twowayhandicap],
                            'Total points': [template3, treeField_overunder],
                        }),
                    ),
                    getCompetitionIconUrl: vi.fn().mockReturnValue('url'),
                    getCompetitionLocationIconUrl: vi.fn(),
                    contentIcons: List(),
                    dispatch: vi.fn(),
                    getContent: fromJS({}),
                    normalizedCompetitionLocations: [],
                },
                sportsList: { sportsLinks: [] },
                eventsCounter: {
                    getEventsCounterList: vi.fn().mockImplementation((_label, dynamicParams) => {
                        return {
                            ...dynamicParams,
                            total: 2,
                            isLoading: false,
                            currentLoadedPageNumber: 1,
                        };
                    }),
                },
                eventsCollection: {
                    getEventsCollectionList: vi.fn().mockImplementation(() => {
                        return {
                            events: events,
                            loadMore: vi.fn(),
                            status: 'READY',
                            isLoading: false,
                            isLoadingMoreAvailable: true,
                            total: 3,
                            competitionForView: [
                                {
                                    id: 26,
                                    name: 'China League 1',
                                    platformObject: {
                                        displayOrder: undefined,
                                        externalId: {
                                            eventId: undefined,
                                            feedId: 'sr:tournament:782',
                                            instance: 'skycity',
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
                                            instance: 'skycity',
                                            producerId: undefined,
                                            provider: 'bet-radar',
                                            sportId: undefined,
                                        },
                                        id: '02_sr:tournament:1654',
                                        name: 'Philippines Footb. League',
                                    },
                                },
                            ],
                            getCurrentLoadedPage: 0,
                            collectionId: collectionId,
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
                    }),
                },
                router: {
                    route: { name: routeName, params: routeParams },
                    buildUrl: (route: string) => route,
                },
                language: {
                    getTranslation: vi.fn().mockImplementation((_label, str) => str),
                    getTranslationsReverse: vi.fn().mockImplementation((keys: string[]) => keys.reverse()),
                },
            };
        },
        default: vi.fn(),
    };
});

vi.mock('src/utils/Router/NewLink', () => ({
    default: ({ children }: { children: ReactNode }) => {
        return <a href='#'>{children}</a>;
    },
}));

vi.mock('src/ui/common/NavigationPanel/NavigationPanel', () => ({ default: () => <div></div> }));

const initState = {
    tabs: Map().set('matches_outright', {}),
    sports: Map().setIn(['countryList', 'items'], List()).setIn(['tournamentList', 'items'], List()),
    competitions: Map().set('items', Map()),
    content: Map().setIn(['icons', 'items'], List()),
    events: Map()
        .setIn(['collections', collectionId, '_state'], 'READY')
        .setIn(['collections', collectionId, 'items'], List([26, 226])),
};
describe('EventsList', () => {
    it('should render LeftSideNavigation with routeName country', async () => {
        const { findByTestId } = renderWithAppWrapper(<LeftSideNavigation />, initState);
        const matches = await findByTestId('matches');

        await waitFor(() => {
            expect(matches.lastChild).toHaveTextContent('2');
        });
    });

    it('should render LeftSideNavigation with routeName competition', async () => {
        routeName = 'competition';
        const { findByTestId } = renderWithAppWrapper(<LeftSideNavigation />, initState);
        const matches = await findByTestId('matches');

        expect(matches.lastChild).toHaveTextContent('2');
    });

    it.skip('should render LeftSideNavigation with routeName sport', async () => {
        routeName = 'sport';
        routeParams.id = 'football';
        const { findByTestId } = renderWithAppWrapper(<LeftSideNavigation />, initState);
        const matchesSection = await findByTestId('matchesSection');

        expect(matchesSection).toHaveTextContent('Bet Type');
    });
});
