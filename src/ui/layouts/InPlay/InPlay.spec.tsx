import { fromJS, List, Map } from 'immutable';
import map from 'lodash/map';

import MockComponent from '@sc-tests/unit/mocks/MockComponent';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import InPlay from './InPlay';

const spyRedirect = vi.fn();
const template1 = 'bet-radar-186';
const template2 = 'bet-radar-237';
const template3 = 'bet-radar-238';
const twoField_twowaywinner = 'twowaywinner';
const treeField_twowayhandicap = 'twowayhandicap';
const treeField_overunder = 'overunder';

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext() {
            return {
                language: {
                    userLang: 'en-US',
                    getTranslation(_key: string, defaultValue: string) {
                        return defaultValue;
                    },
                },
                currency: 10000000,
                eventsCounter: {
                    getEventsCounterList: vi.fn().mockImplementation((_label, dynamicParams) => {
                        return {
                            ...dynamicParams,
                            counters: [
                                {
                                    id: 'baseball',
                                    count: 5,
                                },
                            ],
                            isLoading: true,
                            total: 1,
                            currentLoadedPageNumber: 1,
                        };
                    }),
                },
                sportsList: {
                    sports: [
                        {
                            id: 'football',
                        },
                    ],
                },
                router: {
                    route: {
                        name: 'inplay',
                        params: {
                            id: 'football',
                        },
                    },
                    redirect: spyRedirect,
                    buildUrl: vi.fn().mockImplementation(() => {
                        return 'url';
                    }),
                    url: 'url',
                },
                reduxState: {
                    getSportTemplates: vi.fn().mockReturnValue(
                        fromJS({
                            Winner: [template1, twoField_twowaywinner],
                            'Point handicap': [template2, treeField_twowayhandicap],
                            'Total points': [template3, treeField_overunder],
                        }),
                    ),
                    getCompetitionIconUrl: vi.fn().mockReturnValue('url'),
                    contentIcons: List(),
                    recentlyViewedSports: [1],
                    dispatch: vi.fn(),
                },
                models: {
                    getEvent: vi.fn().mockReturnValue({ sport: 'football' }),
                },
            };
        },
        default: vi.fn(),
    };
});

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));
vi.mock('src/utils/Router/Link', () => ({ default: MockComponent }));
vi.mock('src/ui/events/Search/Search', () => ({ default: MockComponent }));
vi.mock('src/ui/common/SportsModal/SportsModal', () => ({ default: MockComponent }));
vi.mock('src/ui/common/LiveSportsModal/LiveSportsModal', () => ({ default: MockComponent }));

vi.mock('src/ui/events/Selection/Selection', () => ({
    default: () => (
        <div>
            <button></button>
        </div>
    ),
}));

vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: ({ options }: { options: Record<string, string>[] }) => {
        return (
            <div>
                <ul>
                    {map(options, ({ label }) => (
                        <li data-testid={label} key={label}>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
}));

vi.mock('src/ui/common/Carousel/Carousel', () => MockComponent);

const initState = {
    sports: Map().setIn(['countryList', 'items'], List()).setIn(['tournamentList', 'items'], List()),
    content: Map().setIn(['icons', 'items'], List()),
    events: Map().set('items', Map()),
};

describe('InPlayLayout', () => {
    it('should call redirect function', () => {
        renderWithAppWrapper(<InPlay />, initState);

        expect(spyRedirect).toHaveBeenCalled();
    });
});
