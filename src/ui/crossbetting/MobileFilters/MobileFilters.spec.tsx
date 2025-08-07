import userEvent from '@testing-library/user-event';
import { List as ImmutableList, Map as ImmutableMap } from 'immutable';

import '@sc-tests/unit/mocks/matchMedia.mock';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import FiltersByCountryCompetitionsMobile from 'src/ui/crossbetting/MobileFilters/MobileFilters';

import { mockedCountries } from './test/mocks';

vi.mock('src/utils/Router/NewLink', () => ({
    default: () => {
        return <span data-testid='new-link' />;
    },
}));

vi.mock('src/ui/events/EventsList/SortControllerDesktop', () => ({
    default: () => {
        return <span data-testid='sort-controller' />;
    },
}));

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => ({
            router: {
                route: {
                    params: { sport: 'football', day: '1' },
                    name: 'route-name',
                },
                redirect: vi.fn(),
            },
            reduxState: {
                competitionHighlight: ImmutableList([
                    {
                        id: 1,
                        platformObject: {
                            id: '02_sr:tournament:17782',
                            name: 'ITF Italy F10, Men Singles',
                            externalId: {
                                instance: 'skycity',
                                provider: 'bet-radar',
                                feedId: 'sr:tournament:17782',
                                sportId: 'bet-radar',
                            },
                        },
                    },
                ]),
                contentIcons: ImmutableMap().set('02_sr:simple_tournament:101786', {
                    id: 26761,
                    label: null,
                    url: 'https://blabla.com',
                    width: 33,
                    height: 33,
                    caption: null,
                    sha1: 'qweasdzxc',
                    altText: null,
                }),
                getCompetitionLocationIconUrl: (_key: string, _label: string) => 'url',
            },
            language: {
                getTranslation: (_label: string, defaultText: string) => defaultText,
            },
        }),
        default: vi.fn(),
    };
});

vi.mock('src/ui/crossbetting/hooks/useDataCountryCompetitions', () => {
    return {
        __esModule: true,
        useDataCountryCompetitions: () => ({ countries: mockedCountries, competitions: [] }),
        default: vi.fn(),
    };
});

const renderComponent = () => renderWithAppWrapper(<FiltersByCountryCompetitionsMobile />);

describe('FiltersByCountryCompetitionsMobile', () => {
    it.skip('should order countries in country dropdown filter with count DESC, with the exception of World and Korea which are always at the top', async () => {
        const { getAllByRole, container } = renderComponent();

        const DROPDOWN_COUNT = 3;

        const dropdowns = getAllByRole('combobox');

        expect(dropdowns).toHaveLength(DROPDOWN_COUNT);

        await userEvent.click(dropdowns[1]);

        let textContent = container.textContent || '';

        const startIndex = textContent.indexOf('All') + 'All'.length;
        const endIndex = textContent.lastIndexOf('All');

        if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
            textContent = textContent.substring(startIndex, endIndex);
        }
        const countriesSorted = ['World', 'Korea (South)', 'Hungary', 'Germany', 'England', 'Poland', 'Netherland'];

        expect(textContent).toEqual(['All', ...countriesSorted].join(''));
    });
});
