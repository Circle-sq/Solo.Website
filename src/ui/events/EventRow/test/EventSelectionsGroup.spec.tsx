import { screen } from '@testing-library/react';

import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import EmptySelection from 'src/ui/events/Selection/EmptySelection';
import { formatNumber } from 'src/utils/format';

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext() {
            return {
                language: {
                    getTranslation(_key: string, defaultValue: string) {
                        return defaultValue;
                    },
                },
            };
        },

        default: vi.fn(),
    };
});

describe('EmptySelection', () => {
    it('should display "asianInPlayLine" value on live events', () => {
        const asianInPlayLineValue = 5;
        renderWithAppWrapper(<EmptySelection value={formatNumber(asianInPlayLineValue)} testId='marketLine' />);

        const emptySelection = screen.getByTestId('marketLine');
        expect(emptySelection).toHaveTextContent(formatNumber(asianInPlayLineValue));
    });

    it('should display "line" value on pre-match events', () => {
        const lineValue = 4.5;
        renderWithAppWrapper(<EmptySelection value={formatNumber(lineValue)} testId='marketLine' />);

        const emptySelection = screen.getByTestId('marketLine');
        expect(emptySelection).toHaveTextContent(formatNumber(lineValue));
    });
});
