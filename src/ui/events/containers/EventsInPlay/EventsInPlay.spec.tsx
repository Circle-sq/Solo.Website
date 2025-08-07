import { fromJS, List, Map } from 'immutable';
import map from 'lodash/map';
import type { ReactNode } from 'react';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import EventsInPlay from './EventsInPlay';

const template1 = 'bet-radar-186';
const template2 = 'bet-radar-237';
const template3 = 'bet-radar-238';
const twoField_twowaywinner = 'twowaywinner';
const treeField_twowayhandicap = 'twowayhandicap';
const treeField_overunder = 'overunder';

let counters = [
    {
        id: 'baseball',
    },
];
let isLoading = true;
let sports = [
    {
        id: 'baseball',
    },
    {
        id: 'football',
    },
];

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext() {
            return {
                language: {
                    getTranslation(_key: string, defaultValue: string) {
                        return defaultValue;
                    },
                    translateTokens(defaultValue: string, _func: unknown) {
                        return defaultValue;
                    },
                },
                currency: 10000000,
                eventsCounter: {
                    getEventsCounterList: vi.fn().mockImplementation((_label, dynamicParams) => {
                        return {
                            ...dynamicParams,
                            counters: counters,
                            isLoading: isLoading,
                            total: 1,
                            currentLoadedPageNumber: 1,
                        };
                    }),
                },
                sportsList: {
                    sports: sports,
                },
                router: {
                    route: {
                        name: 'inplay',
                        params: {
                            id: 'football',
                        },
                    },
                },
                reduxState: {
                    getSportTemplates: vi.fn().mockReturnValue(
                        fromJS({
                            Winner: [template1, twoField_twowaywinner],
                            'Point handicap': [template2, treeField_twowayhandicap],
                            'Total points': [template3, treeField_overunder],
                        }),
                    ),
                    getCompetitionIconUrl: vi.fn().mockReturnValue('url'),
                    contentIcons: List(),
                    dispatch: vi.fn(),
                },
                eventsCollection: {
                    getEventsCollectionList: vi.fn().mockImplementation(() => {
                        return {
                            events: [
                                {
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
                            ],
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
                    }),
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
vi.mock('src/utils/Router/Link', () => ({
    default: ({ children }: { children: ReactNode }) => {
        return <a href='#'>{children}</a>;
    },
}));

vi.mock('src/ui/events/Selection/Selection', () => ({
    default: () => (
        <div>
            <button></button>
        </div>
    ),
}));

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

vi.mock('src/ui/common/Carousel/Carousel', () => ({
    default: ({ children }: { children: ReactNode }) => {
        return <div>{children}</div>;
    },
}));

const baseballClass = 'sports-23';

describe('InPlayLayout', () => {
    const collectionId = 'home-count-live-highlights';
    const initState = {
        events: Map().setIn(['collections', collectionId, '_state'], 'READY'),
    };

    it('should render Loading sports...', async () => {
        const { getByText } = renderWithAppWrapper(<EventsInPlay />, initState);

        expect(getByText('Loading sports...')).toBeInTheDocument();
    });

    it('should render baseball sport', async () => {
        isLoading = false;

        const { findAllByTestId } = renderWithAppWrapper(<EventsInPlay />, initState);
        const sportIcon = await findAllByTestId('sportIcon');

        expect(sportIcon[0]).toHaveClass(baseballClass);
    });

    it('should render live streaming tab', async () => {
        isLoading = false;

        const { findByTestId } = renderWithAppWrapper(<EventsInPlay />, initState);
        const liveIcon = await findByTestId('playIcon');

        expect(liveIcon).toBeInTheDocument();
    });

    it('should render message about no live events', async () => {
        counters = [];
        sports = [];
        isLoading = false;

        const { findByTestId } = renderWithAppWrapper(<EventsInPlay />, initState);
        const message = await findByTestId('message');

        expect(message).toContainHTML('Currently there are no live events, please check back later!');
    });
});
