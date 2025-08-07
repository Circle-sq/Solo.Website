import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';
import { screen } from '@testing-library/react';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { SportType } from 'src/common/enums';
import TranslationsStore from 'src/appState/TranslationsStore';
import { LanguagesState } from 'src/appState/LanguagesState';

import EventTime from 'src/ui/common/EventInfographics/EventTime';

const translationsStore = new TranslationsStore(LanguagesState.createForContext());

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                language: {
                    getTranslation: vi.fn().mockImplementation((_label, defaultText) => {
                        return defaultText;
                    }),
                },
                translationsStore: translationsStore,
            };
        },
        default: vi.fn(),
    };
});

describe('EventTime', () => {
    it('renders the score', () => {
        const scoreSet = '1 - 0';
        const defaultProps = {
            event: { timeSettingsStarted: false, sport: SportType.Football, scoreSet } as EventModel,
            isLivePeriod: false,
            showLiveIcon: false,
        };

        const { getByText } = renderWithTheme(<EventTime {...defaultProps} />);

        expect(getByText(scoreSet, { exact: false })).toBeInTheDocument();
    });

    it('renders the live label', () => {
        const props = {
            event: { timeSettingsStarted: true, sport: SportType.Baseball } as EventModel,
            isLivePeriod: true,
            showLiveIcon: false,
        };

        const { getByTestId } = renderWithTheme(<EventTime {...props} />);
        expect(getByTestId('liveLabel')).toBeInTheDocument();
        expect(screen.getByTestId('liveLabel')).toHaveTextContent('LIVE');
    });

    it('renders the live icon', () => {
        const props = {
            event: { timeSettingsStarted: true, sport: SportType.Basketball } as EventModel,
            isLivePeriod: true,
            showLiveIcon: true,
        };

        const { getByTestId } = renderWithTheme(<EventTime {...props} />);

        expect(getByTestId('liveIcon-testId')).toBeInTheDocument();
    });
});
