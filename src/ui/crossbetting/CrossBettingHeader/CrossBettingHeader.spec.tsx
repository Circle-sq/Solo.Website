import type { ReactNode } from 'react';

import { languagesMock } from '@solo-tests/unit/mocks/languagesMock';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import type { AppState } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import type { RecursivePartial } from 'src/common/types/main';

import CrossBettingHeader from './CrossBettingHeader';

const useSportCountersData = [
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

vi.mock('src/appState/AppState', function AppState() {
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

vi.mock('src/utils/Router/NewLink', () => ({
    default: (props: { label: string; className: string }) => {
        return <a className={props.className}>{props.label}</a>;
    },
}));

describe('CrossBettingHeader', () => {
    it('should render with default props', () => {
        const { getByTestId } = renderWithAppWrapper(<CrossBettingHeader />);

        expect(getByTestId('crossbetHeader')).toBeInTheDocument();
        expect(getByTestId('crossbetHeaderPageName')).toBeInTheDocument();
        expect(getByTestId('crossbetHeaderSportName')).toBeInTheDocument();
    });
});
