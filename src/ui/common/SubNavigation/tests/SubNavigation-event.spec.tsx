import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';
import MockComponent from '@sc-tests/unit/mocks/MockComponent';

import SubNavigation from '../SubNavigation';
import { mockUseAppStateContext } from './test-helper';
import { liveGroupedSportsData, allCountData } from 'src/ui/common/SportsModal/test/mocks';

const eventSelectedAppState = mockUseAppStateContext({
    router: {
        url: '/event/8432/china-vs-dongguan-guanlian',
        route: {
            name: 'event',
            params: {
                id: '8432',
                slug: 'china-vs-dongguan-guanlian',
            },
        },
    },
    language: {
        userLang: 'en-US',
        getTranslation: vi.fn().mockImplementation((key: string) => key),
    },
    reduxState: {
        recentlyViewedSports: ['football'],
    },
    models: {
        getEvent: vi.fn().mockReturnValue({ sport: 'football' }),
    },
    eventsCounter: {
        getEventsCounterList: (collectionId: string, _params: unknown) => {
            if (collectionId === 'home-count-live-highlights') {
                return { counters: liveGroupedSportsData };
            }

            if (collectionId === 'all-count') {
                return { counters: allCountData };
            }
        },
    },
});

vi.mock('src/appState/AppState', () => {
    return { __esModule: true, useAppStateContext: () => eventSelectedAppState, default: vi.fn() };
});

vi.mock('src/ui/common/Carousel/Carousel', () => ({ default: MockComponent }));
vi.mock('src/ui/common/Button/Button', () => ({ default: MockComponent }));
vi.mock('src/utils/Router/Link', () => ({ default: MockComponent }));
vi.mock('src/ui/common/DropdownList/DropdownList', () => ({ default: MockComponent }));
vi.mock('src/ui/events/Search/Search', () => ({ default: MockComponent }));
vi.mock('src/ui/common/SportsModal/SportsModal', () => ({ default: MockComponent }));
vi.mock('src/ui/common/LiveSportsModal/LiveSportsModal', () => ({ default: MockComponent }));

vi.mock('@sc-hooks', () => ({
    __esModule: true,
    useWindowWidth: () => ({ isDesktop: false }),
    useFirstMount: () => false,
}));

describe('SubNavigation (event)', () => {
    it('should render nav item active (in case of event selected)', () => {
        const { getByText } = renderWithAppWrapper(<SubNavigation isNav />);
        const footballNavItem = getByText(/football/i);

        expect(footballNavItem.closest('.link')).toHaveClass('active');
    });
});
