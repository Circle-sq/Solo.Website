import { screen } from '@testing-library/dom';
import { fromJS, Map, List } from 'immutable';
import type { PropsWithChildren } from 'react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { RequestStatus } from 'src/common/enums';

import Breadcrumb from './Breadcrumb';

const _route = {
    name: 'sport',
    params: { id: 'football', sportId: 'football', countryId: 'ESP', competitionId: '56', slug: 'football' },
};

const normalizedCompetitionLocations = [
    {
        children: [
            {
                elem: {
                    country: 'ESP',
                    displayOrder: 0,
                    id: '56',
                    label: 'Spain',
                    name: 'LaLiga',
                    platformObject: {
                        externalId: {
                            feedId: 'sr:tournament:8',
                            instance: 'solo',
                            provider: 'bet-radar',
                            sportId: 'bet-radar',
                        },
                        id: '02_sr:tournament:8',
                        name: 'LaLiga',
                    },
                    tags: {
                        'ante-post': ['no'],
                        country: ['0', 'ESP'],
                        'country-label': ['0', 'Spain'],
                        highlight: ['yes'],
                        outright: ['no'],
                        region: ['-'],
                        'website-show': ['yes'],
                    },
                    sport: 'football',
                    total: 1,
                },
                eventNumber: 3,
                id: '56',
            },
        ],
        competitions: 1,
        countryId: 'ESP',
        eventNumber: 3,
        key: 'ESP',
        locationKey: 'ESP',
        locationLabel: 'Spain',
        sport: 'football',
        uuid: '5ad8d43b-0edf-4e5a-9b92-191470f1b7c6',
    },
];

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: (): Record<string, unknown> => ({
        router: {
            route: _route,
        },
        reduxState: {
            normalizedCompetitionLocations: normalizedCompetitionLocations,
            competitionHighlight: Map(),
            getCompetitionLocationIconUrl: vi.fn(),
            getCompetitionIconUrl: vi.fn(),
            competitionIcons: fromJS({}),
        },
        eventsCounter: {
            getEventsCounterList: vi.fn().mockImplementation(() => {
                return {
                    isLoading: false,
                    total: 1,
                };
            }),
        },
        models: {
            getEvent: vi.fn().mockReturnValue({
                media: {
                    liveTrackers: [
                        {
                            id: 56,
                        },
                    ],
                    streams: [
                        {
                            id: 56,
                        },
                    ],
                },
            }),
        },
        language: {
            getTranslation: (_key: string, defaultMessage: string) => defaultMessage,
        },
        env: { img_api_url: '' },
    }),
}));

vi.mock('src/utils/Router/Link', () => ({
    default: ({ children, className }: PropsWithChildren<{ className: string }>) => {
        return (
            <a href='#' data-testid='breadcrumb' className={className}>
                {children}
            </a>
        );
    },
}));

vi.mock('./hooks/useCompetitionEventById', () => ({
    __esModule: true,
    useCompetitionEventById: vi.fn().mockImplementation(() => ({
        name: 'LaLiga',
        tags: {
            'website-show': ['yes'],
            highlight: ['no'],
            outright: ['no'],
            'ante-post': ['no'],
            country: ['TUR'],
            region: ['-'],
            'country-label': ['Spain'],
        },
        id: '195',
    })),
}));

vi.mock('./hooks/useCompetitionLocations', () => ({
    __esModule: true,
    useCompetitionLocations: vi.fn(() => ({
        tagSelector: 'tags.country.0',
        labelSelector: 'tags.country-label.0',
    })),
}));

const defaultCompetitionLocations = {
    items: [
        {
            country: 'ESP',
            displayOrder: 0,
            id: '56',
            label: 'Spain',
            name: 'LaLiga',
            platformObject: {
                externalId: {
                    feedId: 'sr:tournament:8',
                    instance: 'solo',
                    provider: 'bet-radar',
                    sportId: 'bet-radar',
                },
                id: '02_sr:tournament:8',
                name: 'LaLiga',
            },
            tags: {
                'ante-post': ['no'],
                country: ['ESP'],
                'country-label': ['Spain'],
                highlight: ['yes'],
                outright: ['no'],
                region: ['-'],
                'website-show': ['yes'],
            },
            sport: 'football',
            total: 1,
        },
    ],
    state: RequestStatus.Ready,
};

const mockStore = {
    competitions: Map({
        items: Map({ 56: Map({ competition: '56' }) }),
    }),
    events: Map({
        items: Map().set(
            56,
            Map([
                ['sport', 'football'],
                ['competition', 56],
                ['id', 56],
                [
                    'tags',
                    Map([
                        ['country', List(['KSA'])],
                        ['country-label', List(['Saudi Arabia'])],
                    ]),
                ],
            ]),
        ),
    }),
    media: Map([
        ['activeTab', 'video'],
        ['eventId', '1111'],
    ]),
    sports: fromJS({
        sports: {
            items: {
                football: {
                    displayOrder: 100,
                    id: 'football',
                    name: 'Football',
                },
            },
        },
        competitionLocations: defaultCompetitionLocations,
    }),
};

const originalBtoa = window.btoa;

beforeAll(() => {
    window.btoa = (value: string) => Buffer.from(value).toString('base64');
});
afterAll(() => {
    window.btoa = originalBtoa;
});

describe('Breadcrumb', () => {
    it('should render Breadcrumb with routeName sport', async () => {
        _route.name = 'sport';
        const { container } = renderWithAppWrapper(<Breadcrumb />, mockStore);
        expect(container).toHaveTextContent('Football Betting');
    });
    it('should render Breadcrumb with routeName country', async () => {
        _route.name = 'country';
        const { container } = renderWithAppWrapper(<Breadcrumb />, mockStore);
        expect(container).toHaveTextContent('Football BettingCompetitionsSpain');
    });
    it('should render Breadcrumb with routeName competition', async () => {
        _route.name = 'competition';
        _route.params.id = '56';
        const { container } = renderWithAppWrapper(<Breadcrumb />, mockStore);
        expect(container).toHaveTextContent('Football BettingCompetitionsSpainLaLiga');
    });
    it('should render Breadcrumb with routeName allcountries', async () => {
        _route.name = 'allcountries';
        const { container } = renderWithAppWrapper(<Breadcrumb />, mockStore);
        expect(container).toHaveTextContent('Football Betting');
    });
    it('should render Breadcrumb with routeName event', async () => {
        _route.name = 'event';
        _route.params.id = '56';
        const { container } = renderWithAppWrapper(<Breadcrumb />, mockStore);
        expect(container).toHaveTextContent('Spain | LaLiga');
    });
    it('should render Breadcrumb with routeName inplay', async () => {
        _route.name = 'inplay';
        const { container } = renderWithAppWrapper(<Breadcrumb />, mockStore);
        expect(container).toHaveTextContent('Live');
    });
    it('should render Breadcrumb with routeName crossbetting', async () => {
        _route.name = 'crossbetting';
        const { container } = renderWithAppWrapper(<Breadcrumb />, mockStore);
        expect(container).toHaveTextContent('Cross');
    });

    it('should not show "Other" label when there are no data fetched yet', async () => {
        defaultCompetitionLocations.items = [];

        renderWithAppWrapper(<Breadcrumb />, mockStore);
        const footballBetting = screen.queryByText('Football Betting');
        const liveLabel = screen.queryByText('Live');

        expect(footballBetting).toBeNull();
        expect(liveLabel).toBeDefined();
    });
});
