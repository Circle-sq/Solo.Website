import { waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import CrossBettingPage from './CrossBettingPage';

const spyRedirect = vi.fn();

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                router: {
                    route: {
                        name: 'crossbetting',
                        params: {},
                    },
                    redirect: spyRedirect,
                },
                eventsCounter: {
                    getEventsCounterList: vi.fn().mockImplementation(() => {
                        return {
                            isLoading: false,
                            total: 1,
                        };
                    }),
                },
            };
        },
        default: vi.fn(),
    };
});

vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: () => <span data-testid='dropdown-select'>dropdown</span>,
}));

vi.mock('src/ui/crossbetting/FilterDropdown/FilterDropdown', () => ({
    default: () => <span data-testid='filter-dropdown'>dropdown</span>,
}));

vi.mock('src/ui/crossbetting/NavigationSidebar/NavigationSidebar', () => ({
    default: () => <div data-testid='navigation-sidebar' />,
}));

vi.mock('src/ui/crossbetting/TopSportsNavigationSidebar', () => ({
    default: () => <div data-testid='top-sports-navigation-sidebar' />,
}));

vi.mock('src/ui/crossbetting/CrossBetting', () => ({ default: () => <div data-testid='crossbetContent' /> }));

vi.mock('@solo-hooks', () => ({
    __esModule: true,
    useWindowWidth: () => ({ isTablet: false }),
}));

vi.stubGlobal(
    'ResizeObserver',
    class {
        observe() {}

        unobserve() {}

        disconnect() {}
    },
);

const handlers = [
    http.post('/api/competitions/search/event', async () => {
        return HttpResponse.json({
            results: [],
            totalHints: 0,
            aggregations: {},
        });
    }),

    http.get('/api/event-days/search', async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));

        return HttpResponse.json([127, 124, 106, 93, 53, 5, 3]);
    }),

    http.get('/api/cache-proxy/event-days/search', async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));

        return HttpResponse.json([127, 124, 106, 93, 53, 5, 3]);
    }),
];

server.use(...handlers);

describe('CrossBettingPage', () => {
    it('should render and call redirect', async () => {
        const { getByTestId } = renderWithAppWrapper(<CrossBettingPage />);

        await waitFor(() => {
            expect(getByTestId('loader-container')).toBeTruthy();
        });

        await waitFor(() => {
            expect(getByTestId('crossbetContent')).toBeTruthy();
            expect(getByTestId('navigation-sidebar')).toBeTruthy();
        });
    });
});
