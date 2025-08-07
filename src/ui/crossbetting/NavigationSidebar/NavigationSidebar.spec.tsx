import { fromJS } from 'immutable';
import type { PropsWithChildren } from 'react';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import NavigationSidebar from './NavigationSidebar';

vi.mock('src/ui/crossbetting/hooks/useDataCountryCompetitions', () => {
    return {
        __esModule: true,
        useDataCountryCompetitions: (): unknown => ({}),
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
    default: (props: PropsWithChildren<{ className: string }>) => {
        return <div className={props.className}>{props.children}</div>;
    },
}));

vi.mock('src/ui/common/NavigationList/NavigationList', () => ({
    default: (props: PropsWithChildren<{ className: string }>) => {
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
                        params: { sport: 'football', day: '1' },
                        name: 'route-name',
                    },
                    redirect: vi.fn(),
                },
                language: {
                    getTranslation: vi.fn().mockImplementation((_label, str) => str),
                    getTranslationsReverse: vi.fn().mockImplementation((keys: string[]) => keys.reverse()),
                },
                reduxState: {
                    getCompetitionLocationIconUrl: (_key: string, _label: string) => 'url',
                    getContent: fromJS({}),
                },
            };
        },
        default: vi.fn(),
    };
});

describe('NavigationSidebar', () => {
    it('should render properly', () => {
        const { container, getByTestId, getByText, getByLabelText } = renderWithAppWrapper(<NavigationSidebar />);

        expect(container.querySelector('.navigation-sidebar__content')).toBeInTheDocument();
        expect(getByTestId('allCountries')).toBeInTheDocument();
        expect(getByLabelText('downArrowIcon')).toBeInTheDocument();
        expect(getByTestId('countryListItemCounter')).toBeInTheDocument();
        expect(getByTestId('toggleLHNCountryCompetitions')).toBeInTheDocument();
        expect(getByText('USA')).toBeInTheDocument();
    });
});
