import { screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { SportType } from 'src/common/enums';

import TopSportsNavigationSidebar from './TopSportsNavigationSidebar';

const eventCountryCompetitions = {
    country: [
        { id: 'USA', count: 69, sportId: 'basketball' },
        { id: 'ARG', count: 3, sportId: 'basketball' },
        { id: 'AUS', count: 1, sportId: 'baseball' },
        { id: 'ENG', count: 1, sportId: 'football' },
        { id: 'ITA', count: 1, sportId: 'football' },
    ],
    competitions: [
        {
            id: '16',
            sportId: 'basketball',
            count: 62,
            name: 'NCAA, Regular Season',
            country: 'USA',
            displayOrder: '0',
        },

        {
            id: '335',
            sportId: 'baseball',
            count: 1,
            name: 'ABL',
            country: 'AUS',
            displayOrder: '0',
        },
        {
            id: '367',
            sportId: 'basketball',
            count: 3,
            name: 'LNB',
            country: 'ARG',
            displayOrder: '0',
        },

        {
            id: '66',
            sportId: 'basketball',
            count: 7,
            name: 'NBA',
            country: 'USA',
            displayOrder: '150',
        },
    ],
};

let useSportCountersData = [
    {
        route: 'crossbetting',
        params: { sport: SportType.All },
        sportId: SportType.All,
        icon: '',
        label: 'All Sports',
        testId: 'crossbet-all-sports',
        count: 75,
        displayOrder: 100,
    },
    {
        route: 'crossbetting',
        params: { sport: 'basketball' },
        sportId: 'basketball',
        icon: 'sports-icon sports-7',
        label: 'Basketball',
        testId: 'crossbet-basketball',
        count: 72,
        displayOrder: 99,
    },
    {
        route: 'crossbetting',
        params: { sport: 'football' },
        sportId: 'football',
        icon: 'sports-icon sports-4',
        label: 'Football',
        testId: 'crossbet-football',
        count: 2,
        displayOrder: 100,
    },
    {
        route: 'crossbetting',
        params: { sport: 'baseball' },
        sportId: 'baseball',
        icon: 'sports-icon sports-23',
        label: 'Baseball',
        testId: 'crossbet-baseball',
        count: 1,
        displayOrder: 97,
    },
];

vi.mock('src/utils/Router/url', () => ({
    buildQueryUrl: () => {
        return '/crossbetting?sport=all&day=1';
    },
}));

vi.mock('src/ui/crossbetting/hooks/useCrossBetSportCounters', () => ({
    default: (): {
        route: string;
        params: {
            sport: string;
        };
        sportId: string;
        icon: string;
        label: ReactNode;
        testId: string;
        count: number;
        displayOrder: number;
    }[] => useSportCountersData,
}));

vi.mock('src/ui/crossbetting/hooks/useDataCountryCompetitions', () => {
    return {
        __esModule: true,
        useDataCountryCompetitions: (): unknown => eventCountryCompetitions,
        default: vi.fn(),
    };
});

vi.mock('src/ui/crossbetting/NavigationSidebar/buildNavigationLinks', () => {
    return {
        __esModule: true,
        default: vi.fn(),
        buildCrossBetNavigationLinks: () => [
            {
                countryId: 'USA',
                label: 'USA',
                competitions: 2,
                totalEventsCounter: 2,
                key: 'USA',
                children: [
                    {
                        label: ['United States', ' ', 'All'],
                        iconName: 'theme-competitions-all',
                        params: {
                            countryId: 'USA',
                        },
                        displayOrder: '0',
                        eventNumber: 2,
                        country: 'USA',
                    },
                    {
                        iconName: 'theme-tournaments',
                        eventNumber: 2,
                        id: '7',
                        country: 'USA',
                        displayOrder: '100',
                        label: 'MLB',
                        params: {
                            countryId: 'USA',
                            competitionId: '7',
                        },
                    },
                ],
            },
        ],
    };
});

vi.mock('src/utils/Router/NewLink', () => ({
    default: (props: { children: ReactNode; className: string }): ReactNode => {
        return <div className={props.className}>{props.children}</div>;
    },
}));

vi.mock('src/ui/common/NavigationList/NavigationList', () => ({
    default: (props: { children: ReactNode; className: string }): ReactNode => {
        return <div className={props.className}>{props.children}</div>;
    },
}));

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                router: {
                    route: {
                        params: { sport: SportType.All, day: '1' },
                        name: 'route-name',
                    },
                    redirect: vi.fn(),
                },
                eventsCounter: {
                    getEventsCounterList: () => eventCountryCompetitions,
                },
                language: { getTranslation: vi.fn() },
                reduxState: {
                    getCompetitionLocationIconUrl: () => 'url',
                },
            };
        },
        default: vi.fn(),
    };
});

describe('TopSportsNavigationSidebar', () => {
    it('should Top sports is displayed in the LHN', () => {
        const { container } = renderWithAppWrapper(<TopSportsNavigationSidebar />);

        expect(container.querySelector('.navigation-sidebar__content')).toBeInTheDocument();
        expect(screen.getByTestId('topSports')).toBeInTheDocument();

        const topSports = screen.getByTestId('topSports');

        expect(topSports).toHaveTextContent('Football');
        expect(topSports).toHaveTextContent('Basketball');
        expect(topSports).toHaveTextContent('Baseball');
        expect(topSports).not.toHaveTextContent('Icehockey');
    });

    it('should Top sports is not displayed in the LHN', () => {
        useSportCountersData = useSportCountersData.filter((sport) => sport.sportId === 'basketball');
        const { container } = renderWithAppWrapper(<TopSportsNavigationSidebar />);

        const TopSportsContainer = container.querySelector('.navigation-sidebar__content');

        expect(TopSportsContainer).toBeInTheDocument();
        expect(TopSportsContainer).toBeEmptyDOMElement();
    });
});
