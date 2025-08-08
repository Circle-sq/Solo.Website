import { screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { store } from '@solo-utils/jotai';

import { isLiveSportsModalOpenAtom } from 'src/store/common/atoms';

import LiveSportsModal from './LiveSportsModal';

const sportsData = [
    {
        id: 'tabletennis',
        name: 'Table Tennis',
        displayOrder: 91,
        translations: {},
        count: 6,
        countries: [
            {
                key: 'CZE',
                count: 4,
                label: 'Czech Republic',
            },
            {
                key: 'International',
                count: 2,
                label: 'International',
            },
        ],
    },
];

const activeSports = [
    {
        id: 'tabletennis',
        name: 'Table Tennis',
        displayOrder: 91,
        translations: {},
        count: 5,
        countries: [
            {
                key: 'CZE',
                count: 3,
                label: 'Czech Republic',
            },
            {
                key: 'International',
                count: 2,
                label: 'International',
            },
        ],
    },
];

vi.mock('src/ui/common/Portal/Portal', () => ({
    default: ({ children }: { children: ReactNode }) => {
        return <div>{children}</div>;
    },
}));

vi.mock('@solo-hooks', () => ({
    __esModule: true,
    useWindowWidth: () => ({ isLaptop: false }),
}));

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => {
            return {
                router: {
                    route: {
                        params: {
                            id: 'betting',
                        },
                    },
                    buildUrl: (route: string, params: { id: string }) => {
                        if (params === undefined || params.id === undefined) {
                            return `/${route}`;
                        }

                        return `/${route}/${params.id}`;
                    },
                },
                sportsList: {
                    sports: [
                        {
                            id: 'tabletennis',
                        },
                    ],
                },
                reduxState: {
                    getEventsCounter: vi.fn().mockImplementation(() => {
                        return activeSports;
                    }),
                    getSportName: vi.fn().mockImplementation(() => {
                        return 'Table Tennis';
                    }),
                },
                language: {
                    userLang: 'en-US',
                    getTranslation(_key: string, defaultValue: string) {
                        return defaultValue;
                    },
                },
                currency: 10000000,
                eventsCounter: {
                    getEventsCounterList: vi.fn().mockImplementation(() => {
                        return {
                            counters: sportsData,
                            isLoading: true,
                            total: 1,
                        };
                    }),
                },
                default: vi.fn(),
            };
        },
    };
});

const renderComponent = () => renderWithAppWrapper(<LiveSportsModal />);

describe('LiveSportsModal', () => {
    store.set(isLiveSportsModalOpenAtom, true);

    it('should render live sports with events count on desktop', () => {
        renderComponent();

        const tableTennisCount = activeSports[0].count.toString();
        const tableTennisName = activeSports[0].name;

        const sportName = screen.getByTestId('nav-activeazsports-tabletennis');
        const sportCount = screen.getByTestId('activeazsports-tabletennis-count');

        expect(sportName).toHaveTextContent(tableTennisName);
        expect(sportCount).toHaveTextContent(tableTennisCount);
    });
});
