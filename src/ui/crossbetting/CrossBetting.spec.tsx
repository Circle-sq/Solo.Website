import userEvent from '@testing-library/user-event';
import { fromJS } from 'immutable';
import type { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';

import { languagesMock } from '@solo-tests/unit/mocks/languagesMock';
import '@solo-tests/unit/mocks/matchMedia.mock';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import type { AppState } from 'src/appState/AppState';
import type { RecursivePartial } from 'src/common/types/main';

import CrossBetting from './CrossBetting';
import { selectedMarketTypeAtom } from './store/atoms';

let isTablet = false;

vi.mock('@solo-hooks', () => ({
    __esModule: true,
    useWindowWidth: () => ({ isTablet }),
}));

vi.mock('src/utils/Router/Link', () => ({
    default: ({ children }: PropsWithChildren) => {
        return (
            <a href='#' data-testid='breadcrumb'>
                {children}
            </a>
        );
    },
}));

vi.mock('src/ui/crossbetting/FilterDropdown/FilterDropdown', () => ({
    default: () => {
        return <span data-testid='filter-dropdown'>dropdown</span>;
    },
}));

vi.mock('src/ui/events/containers/CrossBettingEvents/CrossBettingEvents', () => ({
    default: () => {
        return <div data-testid={'crossBettingEvents'}></div>;
    },
}));

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useEventsSort: () => ({
            onSortChange: vi.fn(),
            options: [
                {
                    id: 'sortbycompetitions',
                    label: 'League',
                },
                {
                    id: 'sortbytime',
                    label: 'Time',
                },
            ],
            sortValue: 'sortbytime',
            sortReqParams: [
                'timeSettings.startTime',
                '-sport.displayOrder',
                '-competition.globalDisplayOrder',
                'competition.name',
                'name',
            ],
        }),
        useAppStateContext: (): RecursivePartial<AppState> => ({
            language: {
                userLang: 'ko-KR',
                getLanguages: () => languagesMock,
                setUserLang: vi.fn().mockImplementation((id: string) => console.info(id)),
                getTranslation: (_langKey: string, defaultText: string) => defaultText,
            },
            reduxState: {
                getCompetitionLocationIconUrl: vi.fn(),
                competitionIcons: fromJS({}),
            },
            models: {
                getCompetitionModel: vi.fn(),
            },
            eventsCounter: {
                getEventsCounterList: vi.fn().mockReturnValue({
                    counters: [
                        {
                            id: 'football',
                            name: '축구',
                            displayOrder: 100,
                            translations: {},
                            count: 16,
                        },
                        {
                            id: 'americanfootball',
                            name: '미식 축구',
                            displayOrder: 85,
                            translations: {},
                            count: 2,
                        },
                        {
                            id: 'baseball',
                            name: '야구',
                            displayOrder: 90,
                            translations: {},
                            count: 2,
                        },
                        {
                            id: 'basketball',
                            name: '농구',
                            displayOrder: 95,
                            translations: {},
                            count: 2,
                        },
                        {
                            id: 'icehockey',
                            name: '아이스 하키',
                            displayOrder: 70,
                            translations: {},
                            count: 2,
                        },
                    ],
                }),
            },
            router: {
                redirect: vi.fn(),
                updateQueryParams: vi.fn(),
                url: '/crossbetting?sport=all&day=1&countryId=ENG',
                route: {
                    name: 'crossbetting',
                    params: {
                        sport: 'all',
                        day: '1',
                        countryId: 'ENG',
                    },
                },
                routes: [
                    {
                        url: '/',
                        matcher: {},
                        params: [],
                        name: 'homepage',
                    },

                    {
                        url: '/crossbetting',
                        matcher: {},
                        params: [],
                        name: 'crossbetting',
                    },
                    {
                        url: '/crossbetting/:sport',
                        matcher: {},
                        params: ['sport'],
                        name: 'crossbetting',
                    },
                    {
                        url: '/crossbetting/:sport/:day',
                        matcher: {},
                        params: ['sport', 'day'],
                        name: 'crossbetting',
                    },
                ],
                buildUrl: vi.fn(),
            },
        }),
        default: vi.fn(),
    };
});

describe('CrossBetting', () => {
    it('should render for desktop without filters button', () => {
        const { getByTestId, queryByTestId } = renderWithAppWrapper(<CrossBetting testId='crossbetContent' />);

        expect(getByTestId('crossbetHeader')).toBeInTheDocument();
        expect(queryByTestId('crossbetHeaderFilters')).not.toBeInTheDocument();
        expect(queryByTestId('filtersByCountryCompetitions')).not.toBeInTheDocument();
        expect(getByTestId('sort-sortbycompetitions')).toBeInTheDocument();
        expect(getByTestId('sort-sortbytime')).toBeInTheDocument();
    });

    it('should render for mobile with filters button and show filters on click', () => {
        isTablet = true;

        const { getAllByTestId, queryByTestId } = renderWithAppWrapper(<CrossBetting testId='crossbetContent' />);

        expect(queryByTestId('crossbetHeaderFilters')).not.toBeInTheDocument();
        expect(queryByTestId('filtersByCountryCompetitions')).not.toBeInTheDocument();

        expect(getAllByTestId('filter-dropdown')).toHaveLength(3);
    });

    it('should render market filter buttons', async () => {
        const DisplayFilterValue = () => {
            const id = useRecoilValue(selectedMarketTypeAtom);

            return <div data-testid='selected-market-type'>Selected Market Type: {id}</div>;
        };

        const { getByTestId } = renderWithAppWrapper(
            <>
                <CrossBetting testId='crossbetContent' />,
                <DisplayFilterValue />
            </>,
        );

        expect(getByTestId('selected-market-type')).toHaveTextContent('Selected Market Type: -');

        await userEvent.click(getByTestId('sort-winner'));
        expect(getByTestId('selected-market-type')).toHaveTextContent('Selected Market Type: twowaywinner');

        await userEvent.click(getByTestId('sort-twowayhandicap'));
        expect(getByTestId('selected-market-type')).toHaveTextContent('Selected Market Type: twowayhandicap');

        await userEvent.click(getByTestId('sort-overunder'));
        expect(getByTestId('selected-market-type')).toHaveTextContent('Selected Market Type: overunder');

        await userEvent.click(getByTestId('sort--'));
        expect(getByTestId('selected-market-type')).toHaveTextContent('Selected Market Type: -');
    });
});
