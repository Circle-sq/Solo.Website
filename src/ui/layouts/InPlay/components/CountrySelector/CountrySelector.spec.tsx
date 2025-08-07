import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';

import CountrySelector from './CountrySelector';

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => ({
        router: {
            route: { params: null },
            buildUrl: vi.fn(),
        },
        language: { getTranslation: vi.fn },
        reduxState: {
            getCompetitionLocationIconUrl: vi.fn(),
        },
    }),
}));

describe('CountrySelector component', () => {
    const locations = [
        { key: 'uk', label: 'United Kingdom', count: 10 },
        { key: 'us', label: 'United States', count: 20 },
    ];
    const selectedId = 'uk';
    const sport = 'football';

    it('does not display All button when there is only one country', () => {
        const { queryByTestId } = renderWithTheme(
            <CountrySelector locations={[locations[0]]} selectedId={selectedId} sportId={sport} />,
        );
        expect(queryByTestId('country-selector__item--all')).not.toBeInTheDocument();
    });
});
