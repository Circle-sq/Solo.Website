import { screen } from '@testing-library/react';
import { fromJS } from 'immutable';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { SportType } from 'src/common/enums';
import type { LinkItem } from 'src/ui/common/NavigationPanel/types';

import SportItem from './SportItem';

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
                    buildUrl: (route: string, params: Record<string, string>): string =>
                        `/${route}/${params?.id}${params?.slug ? `/${params?.slug}` : ''}`,
                    redirect: vi.fn(),
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

const footballLink = {
    route: 'crossbetting',
    params: { sport: 'football' },
    sportId: 'football',
    icon: 'sports-icon sports-4',
    label: 'Football',
    testId: 'crossbet-football',
    count: 2,
    displayOrder: 100,
    children: [
        {
            countryId: 'ENG',
            label: 'England',
            competitions: 1,
            totalEventsCounter: 1,
            key: 'ENG',
            params: { id: 'eng-1' },
            children: [
                {
                    label: ['All', ' ', 'England'],
                    iconName: 'theme-competitions-all',
                    params: { countryId: 'ENG' },
                    displayOrder: '0',
                    eventNumber: 1,
                    country: 'ENG',
                },
                {
                    iconName: 'theme-tournaments',
                    eventNumber: 1,
                    id: '225',
                    country: 'ENG',
                    displayOrder: '9994',
                    label: 'Championship',
                    params: { countryId: 'ENG', competitionId: '225' },
                },
            ],
        },
        {
            countryId: 'ITA',
            label: 'Italy',
            competitions: 1,
            totalEventsCounter: 1,
            key: 'ITA',
            children: [
                {
                    label: ['All', ' ', 'Italy'],
                    iconName: 'theme-competitions-all',
                    params: { countryId: 'ITA' },
                    displayOrder: '0',
                    eventNumber: 1,
                    country: 'ITA',
                },
                {
                    iconName: 'theme-tournaments',
                    eventNumber: 1,
                    id: '392',
                    country: 'ITA',
                    displayOrder: '9970',
                    label: 'Serie B',
                    params: { countryId: 'ITA', competitionId: '392' },
                },
            ],
        },
    ],
} as LinkItem;

describe('SportItem', () => {
    it('should render the Top sports LHN structure correctly', async () => {
        const { container, getByTestId } = renderWithAppWrapper(
            <SportItem link={footballLink} onClick={vi.fn()} isOpen />,
        );

        expect(container).toHaveTextContent('Football');
        expect(getByTestId('countryList')).toHaveTextContent('Italy');
        expect(getByTestId('countryList')).toHaveTextContent('England');
    });

    it('should verify the sport counters', () => {
        const { container } = renderWithAppWrapper(<SportItem link={footballLink} onClick={vi.fn()} isOpen />);
        const counterElement = screen.getByTestId('sportsCounter');
        expect(container).toBeInTheDocument();
        expect(counterElement).toBeInTheDocument();
        expect(counterElement).toHaveTextContent('2');
    });
});
