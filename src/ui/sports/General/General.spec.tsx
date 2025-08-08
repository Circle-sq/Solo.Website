import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Map as ImmutableMap, fromJS, List } from 'immutable';
import map from 'lodash/map';
import { http, HttpResponse } from 'msw';

import MockComponent from '@solo-tests/unit/mocks/MockComponent';
import { buildSubUnsubWrapper, renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import { LOAD_MORE_TIMEOUT } from 'src/ui/events/EventsList/EventsList';

import events from './__fixtures__/events.json';
import General from './General';

const routeName = 'country';
const routeParams = {
    sportId: 'football',
    countryId: 'ENG',
    id: 444,
};
const countryList = fromJS([
    {
        country: 'PER',
        displayOrder: 0,
        id: '30',
        label: 'Peru',
        name: 'Primera Division',
        platformObject: {
            id: '02_sr:tournament:406',
            name: 'Primera Division',
            externalId: {
                feedId: 'sr:tournament:406',
                instance: 'solo',
                provider: 'bet-radar',
                sportId: 'bet-radar',
            },
        },
        total: 1,
    },
    {
        country: 'UKR',
        displayOrder: 0,
        id: '35',
        label: 'Ukraine',
        name: 'Premier League',
        platformObject: {
            id: '02_sr:tournament:218',
            name: 'Premier League',
            externalId: {
                feedId: 'sr:tournament:218',
                instance: 'solo',
                provider: 'bet-radar',
                sportId: 'bet-radar',
            },
        },
        total: 2,
    },
]);

const countryCustomList = [
    {
        children: [
            {
                elem: {
                    country: 'WRL',
                    displayOrder: 0,
                    id: '66',
                    label: 'World',
                    name: 'UEFA Champions League',
                    platformObject: {
                        externalId: {
                            feedId: 'sr:tournament:7',
                            instance: 'solo',
                            provider: 'bet-radar',
                            sportId: 'bet-radar',
                        },
                        id: '02_sr:tournament:7',
                        name: 'UEFA Champions League',
                    },
                    total: 1,
                },
                eventNumber: 1,
                id: '66',
            },
        ],
        competitions: 1,
        countryId: 'WRL',
        eventNumber: 1,
        key: 'World',
        uuid: '6b56fbe3-ba5a-4759-999b-2a415d266fa1',
    },
];
const tournamentCustomList = [
    {
        children: [
            {
                elem: {
                    country: 'PER',
                    displayOrder: 0,
                    id: '30',
                    label: 'Peru',
                    name: 'Primera Division',
                    platformObject: {
                        externalId: {
                            feedId: 'sr:tournament:406',
                            instance: 'solo',
                            provider: 'bet-radar',
                            sportId: 'bet-radar',
                        },
                        id: '02_sr:tournament:406',
                        name: 'Primera Division',
                    },
                    total: 1,
                },
                eventNumber: 1,
                id: '30',
            },
        ],
        competitions: 20,
        countryId: undefined,
        eventNumber: 35,
        key: 'undefined',
        uuid: 'fb62fcc4-6a9a-4465-b42b-22a7ad2104f2',
    },
];
const competitionHighlight = fromJS([]);

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                eventsCounter: {
                    getEventsCounterList: vi.fn().mockReturnValue({
                        isLoading: false,
                        total: 1,
                        currentLoadedPageNumber: null,
                    }),
                },
                eventsCollection: {
                    getEventsCollectionList: vi.fn().mockImplementation((collectionId: string) => {
                        const data = {
                            status: 'READY',
                            isLoading: false,
                            competitionForView: [],
                            collectionId: collectionId,
                            total: 1,
                        };

                        if (collectionId.endsWith('outright')) {
                            return {
                                events: [
                                    {
                                        ...events[0],
                                        getRawData: vi.fn().mockReturnValue(events[0]),
                                    },
                                ],
                                ...data,
                            };
                        }

                        return {
                            events: [
                                {
                                    ...events[1],
                                    getRawData: vi.fn().mockReturnValue(events[1]),
                                },
                            ],
                            ...data,
                        };
                    }),
                },
                models: {
                    getEvent: (id: number) => {
                        return events.find((e) => e.id === id);
                    },
                    getVisibleMarkets: (marketsIds: number[]) => {
                        const markets = [...Object.values(events[0].markets), ...Object.values(events[1].markets)];

                        return markets.filter((market) => marketsIds.includes(market.id));
                    },
                },
                translationsStore: {
                    translateStatisticsPeriodName: (name: string) => name,
                },
                language: {
                    getTranslation: vi.fn().mockImplementation((_label, defaultText) => {
                        return defaultText;
                    }),
                    getTranslationsReverse: vi.fn().mockReturnValue([]),
                },
                apiWrapper: {
                    getUniformsList: vi.fn().mockReturnValue([]),
                },
                reduxState: {
                    countryCustomList: countryCustomList,
                    tournamentCustomList: tournamentCustomList,
                    competitionHighlight: competitionHighlight,
                    getSportTemplates: vi.fn().mockReturnValue(List()),
                    getCompetitionLocationIconUrl: vi.fn().mockReturnValue(''),
                    getCompetitionIconUrl: vi.fn().mockReturnValue(''),
                },
                router: {
                    redirect: vi.fn(),
                    route: { name: routeName, params: routeParams },
                },
            };
        },
        default: vi.fn(),
    };
});

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));

vi.mock('src/ui/events/Selection/Selection', () => ({ default: MockComponent }));

vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: ({ options }: { options: { label: string }[] }) => {
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

vi.mock('react-slick', () => ({ default: MockComponent }));

const handlers = [
    http.get('/api/uniforms/volleyball/player/home', () => {
        return HttpResponse.json([]);
    }),
    http.post(`/api/streams/blacklist/brands/providers`, () => {
        return HttpResponse.json([]);
    }),
];

server.use(...handlers);

describe('General', () => {
    it('should switch between matches and outright tabs', async () => {
        const outright_testid = 'outright';
        const initState = {
            sports: ImmutableMap()
                .setIn(['countryList', 'items'], countryList)
                .setIn(['tournamentList', 'items'], countryList),
            competitions: ImmutableMap().set('items', ImmutableMap()),
            events: fromJS({
                collections: {
                    'sport-football-0-ENG': {
                        _state: 'READY',
                        items: [52098],
                    },
                    'football-0-outright': {
                        _state: 'READY',
                        items: [56917],
                    },
                },
            }),
        };
        const { findByTestId, container } = renderWithAppWrapper(<General />, initState, {
            wrapper: buildSubUnsubWrapper(),
        });

        await waitFor(
            () => {
                expect(container).toHaveTextContent('Brasil');
                expect(container).toHaveTextContent('Superliga');
            },
            { timeout: LOAD_MORE_TIMEOUT * 2 },
        );

        const outrightButton = await findByTestId(outright_testid);
        await userEvent.click(outrightButton);

        expect(container).toHaveTextContent('Sesi SP vs Joinville Volei');
    });
});
