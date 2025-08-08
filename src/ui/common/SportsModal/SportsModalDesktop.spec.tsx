import { Map as ImmutableMap } from 'immutable';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { store } from '@solo-utils/jotai';

import { isSportModalOpenAtom } from 'src/store/common/atoms';
import { MODAL_ROUTE_NAME } from 'src/utils/constants';

import SportsModalDesktop from './SportsModalDesktop';
import { liveGroupedSportsData, allCountData } from './test/mocks';

const groups = {
    b: [
        {
            id: 'boxing',
            name: 'Boxing/MMA',
            displayOrder: 89,
            translations: {},
        },
    ],
    f: [
        {
            id: 'football',
            name: 'Football',
            displayOrder: 100,
            translations: {},
        },
    ],
};

const mockPopup: string = MODAL_ROUTE_NAME.groupedSports;

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => {
            return {
                router: {
                    route: {
                        params: { popup: mockPopup },
                    },
                    buildUrl: (route: string, params: { id: string }) => {
                        if (params === undefined || params.id === undefined) {
                            return `/${route}`;
                        }

                        return `/${route}/${params.id}`;
                    },
                },
                reduxState: {
                    sportsItems: ImmutableMap()
                        .set('boxing', { id: 'boxing', name: 'Boxing/MMA', displayOrder: 45, translations: {} })
                        .set('football', { id: 'football', name: 'Football', displayOrder: 100, translations: {} }),
                },
                language: {
                    userLang: 'en-GB',
                    getTranslation: (_key: string, defaultText: string) => {
                        return defaultText;
                    },
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
                default: vi.fn(),
            };
        },
    };
});

describe('SportModalDesktop', () => {
    store.set(isSportModalOpenAtom, true);

    it('should render sport with events count on desktop', () => {
        const { container } = renderWithAppWrapper(<SportsModalDesktop groups={groups} />);
        expect(container).toHaveTextContent(['Boxing/MMA', 1, 'Football', 'LIVE', 5].join(''));
    });
});
