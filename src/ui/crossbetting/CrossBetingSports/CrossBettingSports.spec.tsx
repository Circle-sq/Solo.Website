import { screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import type { MarketModel } from 'src/appState/models/models/MarketModel';

import CrossBettingSports from './CrossBettingSports';

const rawData = require('./test/event.json');

let counters = [
    { id: 'icehockey', name: '아이스 하키', displayOrder: 94, translations: {}, count: 11 },
    { id: 'basketball', name: '농구', displayOrder: 99, translations: {}, count: 4 },
    { id: 'football', name: '축구', displayOrder: 100, translations: {}, count: 3 },
];

const sportSelectedAppState = {
    router: {
        url: 'crossbetting?sport=americanfootball&day=0',
        route: {
            name: 'crossbetting',
            params: {
                sport: 'americanfootball',
                day: '0',
            },
        },
        redirect: vi.fn(),
        routes: [{ url: '/crossbetting/:sport/:day', matcher: {}, params: ['sport', 'day'], name: 'crossbetting' }],
        updateQueryParams: vi.fn(),
    },
    eventsCounter: {
        getEventsCounterList: () => {
            return {
                counters,
            };
        },
    },
    language: {
        userLang: 'ko-KR',
        setUserLang: vi.fn().mockImplementation((id: string) => console.info(id)),
    },
    reduxState: {
        recentlyViewedSports: [],
    },
    models: {
        getEvent(id: unknown): string {
            return `event ${id}`;
        },
        getMarket(id: number): MarketModel {
            return rawData.markets.find((market: MarketModel) => {
                return market.id === id;
            });
        },
    },
};

vi.mock('src/utils/Router/Link', () => ({
    default: ({ children }: { children: ReactNode }) => {
        return (
            <a href='#' data-testid='link'>
                {children}
            </a>
        );
    },
}));

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => sportSelectedAppState,
        default: vi.fn(),
    };
});

describe('EventRow', () => {
    const testId = 'crossBettingSportsSwiper';

    it('should render properly All Sports tab', () => {
        renderWithAppWrapper(<CrossBettingSports />);
        expect(screen.getByTestId(testId)).toHaveTextContent('All Sports');
        expect(screen.getByTestId(testId).firstElementChild?.childElementCount).toBe(4);
    });

    it('should not show all tab if just one sport', () => {
        counters = [{ id: 'icehockey', name: '아이스 하키', displayOrder: 94, translations: {}, count: 11 }];

        renderWithAppWrapper(<CrossBettingSports />);
        expect(screen.getByTestId(testId)).not.toHaveTextContent('All Sports');
    });

    it('should show all tab if selected day changed and have counters more 1', () => {
        counters = [
            { id: 'icehockey', name: '아이스 하키', displayOrder: 94, translations: {}, count: 11 },
            { id: 'basketball', name: '농구', displayOrder: 99, translations: {}, count: 4 },
            { id: 'football', name: '축구', displayOrder: 100, translations: {}, count: 3 },
        ];
        sportSelectedAppState.router.route.params.day = '1';
        renderWithAppWrapper(<CrossBettingSports />);
        expect(screen.getByTestId(testId)).toHaveTextContent('All Sports');
    });
});
