import { fireEvent } from '@testing-library/react';
import type { ComponentProps } from 'react';

import { isAuthenticatedAtom, userDataAtom } from '@solo-account/store/atoms';
import type { UserData } from '@solo-account/types';
import { MockStoreProvider } from '@solo-tests/unit/mocks/jotai/store';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

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
