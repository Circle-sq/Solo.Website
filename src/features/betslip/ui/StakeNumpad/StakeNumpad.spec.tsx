import { fireEvent } from '@testing-library/react';
import type { ComponentProps } from 'react';

import { isAuthenticatedAtom, userDataAtom } from '@sc-account/store/atoms';
import type { UserData } from '@sc-account/types';
import { MockStoreProvider } from '@sc-tests/unit/mocks/jotai/store';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { formatPresetValue, PRESETS } from './config';
import StakeNumpad from './StakeNumpad';

const render = (props: ComponentProps<typeof StakeNumpad>) =>
    renderWithAppWrapper(
        <MockStoreProvider
            values={[
                [isAuthenticatedAtom, true],
                [userDataAtom, { id: 1 } as UserData],
            ]}
        >
            <StakeNumpad {...props} />
        </MockStoreProvider>,
    );

describe('StakeNumpad', () => {
    const defaultProps = {
        numpadId: 'summaryStakeNumpad',
        hasMaxBetButton: false,
        onPresetChange: vi.fn(),
        onNumpadKeyboardChange: vi.fn(),
        onNumpadKeyboardClear: vi.fn(),
        onMaxBetClick: vi.fn(),
        onChange: vi.fn(),
        resetStakes: vi.fn(),
    };

    it('should render StakeNumpad', () => {
        const { getByTestId } = render({ ...defaultProps });
        expect(getByTestId('stakeNumpad')).toBeInTheDocument();
    });

    it('should display presets and calls event listener', () => {
        const { getByTestId } = render({ ...defaultProps });
        const presetButtons = PRESETS.map((preset) => getByTestId(`preset-${formatPresetValue(preset)('KRW').value}`));

        presetButtons.forEach((button, index) => {
            fireEvent.click(button);
            expect(defaultProps.onPresetChange).toHaveBeenCalledWith(formatPresetValue(PRESETS[index])('KRW').value);
        });
    });

    it('should fire action when Max bet button is clicked', () => {
        const { getByText } = render({ ...defaultProps, hasMaxBetButton: true });
        fireEvent.click(getByText('Max bet'));
        expect(defaultProps.onMaxBetClick).toHaveBeenCalled();
    });
});
