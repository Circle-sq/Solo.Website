import { screen } from '@testing-library/dom';
import { fromJS, Map, List } from 'immutable';
import type { PropsWithChildren } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import type { AppState } from 'src/appState/AppState';

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
                            instance: 'skycity',
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

vi.mock('src/appState/AppState', async () => {
    const actual: AppState = await vi.importActual('src/appState/AppState');

    return {
        ...actual,
        useAppStateContext: () => ({
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
                    getTag: vi.fn().mockReturnValue([]),
                    getRawData: vi.fn(),
                }),
            },
            language: {
                getTranslation: vi.fn().mockImplementation((_param1, param2) => {
                    return param2;
                }),
            },
            env: { img_api_url: '' },
        }),
    };
});

vi.mock('src/utils/Router/Link', () => {
    return {
        default: ({ children, className }: PropsWithChildren<{ className: string }>) => (
            <a href='#' data-testid='breadcrumb' className={className}>
                {children}
            </a>
        ),
    };
});

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
                    instance: 'skycity',
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

describe('Check text color normal and on hover', () => {
    it('Check text color normal and on hover. (on country page)', async () => {
        _route.name = 'country';
        _route.params.id = '56';
        renderWithAppWrapper(<Breadcrumb />, mockStore);
        const allBreadcrumb = await screen.findAllByTestId('breadcrumb');

        expect(allBreadcrumb[0]).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
        expect(allBreadcrumb[1]).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
        expect(allBreadcrumb[2]).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
    });

    it('Check text color normal and on hover. (on competition page)', async () => {
        _route.name = 'competition';
        _route.params.id = '56';
        renderWithAppWrapper(<Breadcrumb />, mockStore);
        const allBreadcrumb = await screen.findAllByTestId('breadcrumb');

        expect(allBreadcrumb[0]).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
        expect(allBreadcrumb[1]).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
        expect(allBreadcrumb[2]).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
        expect(allBreadcrumb[3]).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
    });

    it('Check text color normal and on hover. (on event page)', async () => {
        _route.name = 'event';
        _route.params.id = '56';
        renderWithAppWrapper(<Breadcrumb />, mockStore);
        const allBreadcrumb = await screen.findAllByTestId('breadcrumb');

        expect(allBreadcrumb[0]).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
    });
});
