import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import type { Props } from './SelectionValue';
import SelectionValue from './SelectionValue';

const props: Props = {
    displayPrice: '2.1',
    isCrossBet: false,
    isLocked: true,
    isSuspended: true,
    isDisplay: true,
};

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
        useWindowWidth: () => ({ isTabletSmall: false }),

        default: vi.fn(),
    };
});
describe('SelectionValue', () => {
    it(`should render padlock`, () => {
        const { getByTestId } = renderWithAppWrapper(<SelectionValue {...props} />);
        const lockIcon = getByTestId('lock-icon');
        expect(lockIcon).toBeInTheDocument();
    });
});
