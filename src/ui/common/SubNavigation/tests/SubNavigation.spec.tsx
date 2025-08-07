import { List, Map } from 'immutable';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';
import MockComponent from '@sc-tests/unit/mocks/MockComponent';
import { GreyPalette, LightBluePalette } from '@sc-ui/system';

import SubNavigation from '../SubNavigation';
import { mockUseAppStateContext } from './test-helper';
import userEvent from '@testing-library/user-event';
import { fireEvent, waitFor } from '@testing-library/react';
import { allCountData, liveGroupedSportsData } from '../../SportsModal/test/mocks';
import { RequestStatus } from 'src/common/enums';

const sportSelectedAppState = mockUseAppStateContext({
    router: {
        url: '/sport/football',
        route: {
            name: 'sport',
            params: {
                id: 'football',
            },
        },
    },
    language: {
        userLangShort: 'en',
        userLang: 'en-US',
        getTranslation: (_key: string, defaultText: string) => defaultText,
    },
    reduxState: {
        recentlyViewedSports: [],
    },

    models: {
        getEvent: vi.fn(),
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
    sportsList: {
        sports: [
            {
                id: 'football',
                label: 'Football',
                displayOrder: 100,
                testId: 'sport-football',
            },
        ],
    },
});

vi.mock('src/appState/AppState', () => {
    return { __esModule: true, useAppStateContext: () => sportSelectedAppState, default: vi.fn() };
});

vi.mock('src/ui/common/Carousel/Carousel', () => ({ default: MockComponent }));
vi.mock('src/ui/common/Button/Button', () => ({ default: MockComponent }));
vi.mock('src/utils/Router/Link', () => ({ default: MockComponent }));
vi.mock('src/ui/common/DropdownList/DropdownList', () => ({ default: MockComponent }));
vi.mock('src/ui/events/Search/Search', () => ({ default: MockComponent }));
vi.mock('src/ui/common/SportsModal/SportsModal', () => ({ default: MockComponent }));
vi.mock('src/ui/common/LiveSportsModal/LiveSportsModal', () => ({ default: MockComponent }));

let isDesktop = false;

vi.mock('@sc-hooks', () => ({
    __esModule: true,
    useWindowWidth: () => ({ isDesktop }),
}));

vi.mock('src/ui/common/SubNavigation/hooks', () => ({
    __esModule: true,
    useVisibleMenuItems: () => 18,
}));

const initState = {
    content: Map()
        .setIn(['icons', 'sports', 'items'], List())
        .setIn(['icons', 'sports', '_state'], RequestStatus.Ready),
};

describe('SubNavigation (sport)', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('should render nav item active (in case of sport selected)', () => {
        const props = {
            isInHeader: false,
            isNav: true,
            events: Map(),
            propsLinks: [
                {
                    route: 'sport',
                    params: {
                        id: 'football',
                    },
                    label: 'Football',
                    icon: 'football',
                },
            ],
        };

        const { getByText } = renderWithAppWrapper(<SubNavigation {...props} />);
        const footballNavItem = getByText(/football/i);

        expect(footballNavItem.closest('.link')).toHaveClass('active');
    });

    // TODO - SC-15787
    it.skip('should render AZ Sports active when clicked', async () => {
        const props = {
            isInHeader: false,
            isNav: false,
            events: Map(),
        };

        const { getByText } = renderWithAppWrapper(<SubNavigation {...props} />);
        const footballNavItem = getByText(/a-z sports/i);
        expect(footballNavItem).toHaveStyle({ color: GreyPalette.grey7 });

        if (footballNavItem) {
            await userEvent.click(footballNavItem);
        }
        await waitFor(() => expect(footballNavItem).toHaveStyle({ color: LightBluePalette.lightBlue10 }));
    });

    it('should render sport icon Olympicgames with params isInHeader = false and SOME_WIDTH = 1000', () => {
        const props = {
            isInHeader: false,
            isNav: true,
            propsLinks: [
                {
                    route: 'sport',
                    params: {
                        id: 'olympicgames',
                    },
                    label: 'Olympicgames',
                    icon: 'OLYMPICGAMES',
                },
            ],
        };

        const { container } = renderWithAppWrapper(<SubNavigation {...props} />, initState);
        const icon = container.getElementsByClassName('subnavmobile_icon');
        expect(icon.item(0)?.parentElement?.lastChild).toHaveTextContent('Olympicgames');
    });

    it('should render sport icon Olympicgames with params isInHeader = true and SOME_WIDTH = 1000', () => {
        const props = {
            isInHeader: true,
            isNav: true,
            propsLinks: [
                {
                    route: 'sport',
                    params: {
                        id: 'olympicgames',
                    },
                    label: 'Olympicgames',
                    icon: 'OLYMPICGAMES',
                },
            ],
        };

        const { container } = renderWithAppWrapper(<SubNavigation {...props} />, initState);
        const icon = container.getElementsByClassName('subnavheadmobile_icon');
        expect(icon.item(0)?.parentElement?.lastChild).toHaveTextContent('Olympicgames');
    });

    it('should render sport icon Olympicgames with params isInHeader = false and SOME_WIDTH = 1920', () => {
        isDesktop = true;

        const props = {
            isInHeader: false,
            isNav: true,
            propsLinks: [
                {
                    route: 'sport',
                    params: {
                        id: 'olympicgames',
                    },
                    label: 'Olympicgames',
                    icon: 'OLYMPICGAMES',
                },
            ],
        };
        const { container } = renderWithAppWrapper(<SubNavigation {...props} />, initState);
        const icon = container.getElementsByClassName('subnav_icon');
        expect(icon.item(0)?.parentElement?.lastChild).toHaveTextContent('Olympicgames');
    });

    it('should render sport icon Olympicgames with params isInHeader = true and SOME_WIDTH = 1920', () => {
        isDesktop = true;

        const props = {
            isInHeader: true,
            isNav: true,
            propsLinks: [
                {
                    route: 'sport',
                    params: {
                        id: 'olympicgames',
                    },
                    label: 'Olympicgames',
                    icon: 'OLYMPICGAMES',
                },
            ],
        };
        const { container } = renderWithAppWrapper(<SubNavigation {...props} />, initState);
        const icon = container.getElementsByClassName('subnavhead_icon');
        expect(icon.item(0)?.parentElement?.lastChild).toHaveTextContent('Olympicgames');
    });

    it('should render football with counter and the other static links', async () => {
        const props = {
            isInHeader: false,
            isNav: false,
            events: Map(),
        };

        const { container } = renderWithAppWrapper(<SubNavigation {...props} />);
        expect(container).toHaveTextContent(
            ['Football', '5', 'A-Z Sports', 'Search', 'Livescore', 'Betting Rules'].join(''),
        );
    });

    it('should open beteast betting rules', async () => {
        const props = {
            isInHeader: false,
            isNav: false,
            events: Map(),
        };
        vi.stubEnv('STANDALONE', 'false');

        const windowOpenMock = vi.spyOn(window, 'open').mockImplementation(() => null);

        const { getByText } = renderWithAppWrapper(<SubNavigation {...props} />);

        fireEvent.click(getByText(/betting rules/i));

        await waitFor(() => {
            expect(windowOpenMock).toHaveBeenCalledWith(
                'https://rule.beteast8.com',
                '_blank',
                `width=${1024}, height=${750}`,
            );
        });
    });

    it('should open rollin betting rules for standalone', async () => {
        const props = {
            isInHeader: false,
            isNav: false,
            events: Map(),
        };
        vi.stubEnv('STANDALONE', 'true');

        const windowOpenMock = vi.spyOn(window, 'open').mockImplementation(() => null);

        const { getByText } = renderWithAppWrapper(<SubNavigation {...props} />);

        fireEvent.click(getByText(/betting rules/i));

        await waitFor(() => {
            expect(windowOpenMock).toHaveBeenCalledWith(
                'https://www.rollin.io/en/legal-documents/jhGpFgXdDju8OnbdhDdy',
                '_blank',
                `width=${1024}, height=${750}`,
            );
        });
    });
});
