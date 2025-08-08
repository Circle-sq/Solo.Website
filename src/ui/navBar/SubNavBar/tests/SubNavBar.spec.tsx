import '@solo-tests/unit/mocks/matchMedia.mock';
import type { PropsWithChildren } from 'react';
import { Map, List } from 'immutable';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { RouteName, SportType } from 'src/common/enums';
import SubNavBar from 'src/ui/navBar/SubNavBar/SubNavBar';
import { mockUseAppStateContext } from 'src/ui/navBar/SubNavBar/tests/test-helpers';

const createAppStateContext = vi.fn();

const counters = [
    { id: 'icehockey', name: '아이스 하키', displayOrder: 94, translations: {}, count: 11 },
    { id: 'basketball', name: '농구', displayOrder: 99, translations: {}, count: 4 },
    { id: 'football', name: '축구', displayOrder: 100, translations: {}, count: 3 },
];

const defaultAppStateContext = mockUseAppStateContext({
    router: { route: { name: 'sport', params: { id: 'football' } } },
});

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => createAppStateContext(),
        default: vi.fn(),
    };
});

vi.mock('src/utils/Router/Link', () => ({
    default: (props: PropsWithChildren<{ route: string; params: Record<string, unknown>; testId: string }>) => {
        const href = defaultAppStateContext.router.buildUrl(props.route, props.params);

        return (
            <a href={href} data-testid={props.testId}>
                {props.children}
            </a>
        );
    },
}));

let isDesktop = false;
let isTablet = true;

vi.mock('@solo-hooks', () => ({
    __esModule: true,
    useWindowWidth: () => ({ isDesktop, isTablet }),
}));

describe('SubNavBar', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should generate mobile competitions link', () => {
        createAppStateContext.mockReturnValue(defaultAppStateContext);
        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competition');
        expect(competitionLink).toHaveAttribute('href', '/allcountries/football');
    });

    it('should generate desktop competitions link', async () => {
        isTablet = false;
        isDesktop = false;

        createAppStateContext.mockReturnValue(defaultAppStateContext);
        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competitions');
        expect(competitionLink).toHaveAttribute('href', '/competition//football');
    });

    it('should generate tennis competition link', () => {
        isTablet = false;
        isDesktop = true;

        const eventId = 1;
        const competitionId = 2;
        const appStateContext = mockUseAppStateContext({
            router: {
                route: { name: RouteName.Event, params: { id: eventId, slug: 'wta-chennai-india-women-singles-2022' } },
            },
        });

        createAppStateContext.mockReturnValue(appStateContext);

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />, {
            events: Map().set(
                'items',
                Map().set(
                    eventId,
                    Map()
                        .set('sport', SportType.Tennis)
                        .set('competition', competitionId)
                        .set('tags', Map().set('tennis-tour', List(['wta']))),
                ),
            ),
        });

        expect(getByTestId('competitions')).toHaveAttribute('href', `/country/tennis/wta/${competitionId}`);
    });

    it('should generate football competition link', () => {
        const eventId = 1;
        const competitionId = 2;
        const appStateContext = mockUseAppStateContext({
            router: {
                route: { name: RouteName.Event, params: { id: eventId, slug: 'uefa-europa-league' } },
            },
        });

        createAppStateContext.mockReturnValue(appStateContext);

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />, {
            events: Map().set(
                'items',
                Map().set(
                    eventId,
                    Map()
                        .set('sport', SportType.Football)
                        .set('competition', competitionId)
                        .set('tags', Map().set('country', List(['WRL']))),
                ),
            ),
        });

        const competitionLink = getByTestId('competitions');
        expect(competitionLink).toHaveAttribute('href', `/country/football/WRL/${competitionId}`);
    });
});

describe('SubNavBar AllCountries route', () => {
    const sportId = SportType.Football;

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should generate mobile football competitions link on AllCountries page', () => {
        const appStateContext = mockUseAppStateContext({
            router: { route: { name: RouteName.AllCountries, params: { id: sportId, sportId } } },
        });

        createAppStateContext.mockReturnValue(appStateContext);
        isTablet = true;
        isDesktop = false;

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competition');
        expect(competitionLink).toHaveAttribute('href', '/allcountries/football');
    });

    it('Should generate tablet football competition link on AllCountries page', () => {
        const appStateContext = mockUseAppStateContext({
            router: { route: { name: RouteName.AllCountries, params: { id: sportId, sportId } } },
        });

        createAppStateContext.mockReturnValue(appStateContext);
        isTablet = false;

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competition');
        expect(competitionLink).toHaveAttribute('href', '/allcountries/football');
    });
});

describe('SubNavBar country route', () => {
    const sportId = SportType.Football;

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('Should generate mobile football competition link on country page', () => {
        isDesktop = false;
        isTablet = true;

        const countryId = 'ENG';
        const competitionId = 2;
        const appStateContext = mockUseAppStateContext({
            router: {
                route: {
                    name: RouteName.Country,
                    params: { sportId, countryId, competitionId },
                },
            },
        });

        createAppStateContext.mockReturnValue(appStateContext);

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competition');
        expect(competitionLink).toHaveAttribute('href', '/allcountries/football');
    });

    it('Should generate tablet football competition link on country page', () => {
        isTablet = false;

        const countryId = 'ENG';
        const competitionId = 2;
        const appStateContext = mockUseAppStateContext({
            router: {
                route: {
                    name: RouteName.Country,
                    params: { sportId, countryId, competitionId },
                },
            },
        });

        createAppStateContext.mockReturnValue(appStateContext);

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competitions');
        expect(competitionLink).toHaveAttribute('href', `/country/${sportId}/${countryId}/${competitionId}`);
    });

    it('Should generate desktop football competition link on country page', () => {
        isDesktop = true;

        const countryId = 'ENG';
        const competitionId = 2;
        const appStateContext = mockUseAppStateContext(
            {
                router: {
                    route: {
                        name: RouteName.Country,
                        params: { sportId, countryId, competitionId },
                    },
                },
            },
            {
                getEventsCounterList: () => {
                    return {
                        counters,
                    };
                },
            },
        );

        createAppStateContext.mockReturnValue(appStateContext);

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competitions');
        expect(competitionLink).toHaveAttribute('href', `/country/${sportId}/${countryId}/${competitionId}`);
    });
});

describe('SubNavBar competition route', () => {
    const slug = 'wta-chennai-india-women-singles-2022';

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should generate mobile competition link', () => {
        isTablet = true;
        isDesktop = false;

        const eventId = 1;
        const appStateContext = mockUseAppStateContext({
            router: {
                route: { name: RouteName.Competition, params: { id: eventId, slug } },
            },
        });

        createAppStateContext.mockReturnValue(appStateContext);

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competition');
        expect(competitionLink).toHaveAttribute('href', `/allcountries/${slug}`);
    });

    it('should generate desktop competition link', () => {
        isTablet = false;

        const competitionId = 2;
        const appStateContext = mockUseAppStateContext({
            router: {
                route: { name: RouteName.Competition, params: { id: competitionId, slug } },
            },
        });

        createAppStateContext.mockReturnValue(appStateContext);

        const { getByTestId } = renderWithAppWrapper(<SubNavBar />);

        const competitionLink = getByTestId('competitions');
        expect(competitionLink).toHaveAttribute('href', `/competition/${competitionId}/${slug}`);
    });
});
