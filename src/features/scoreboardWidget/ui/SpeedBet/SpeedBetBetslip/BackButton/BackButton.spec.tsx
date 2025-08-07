import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { vi } from 'vitest';

import { speedBetStakeAtom } from '../../../../store/atoms';
import { resetSpeedBetMarketSelectionTask } from '../../../../store/tasks';

import BackButton from './BackButton';
vi.mock('../../../../store/tasks', () => ({
    resetSpeedBetMarketSelectionTask: vi.fn(),
}));
describe('BackButton', () => {
    it('render the initial countdown', () => {
        render(
            <RecoilRoot>
                <BackButton />
            </RecoilRoot>,
        );
        expect(screen.getByTestId('speedBetBetslipBackButton')).toBeInTheDocument();
    });
    it('resets the state when button is clicked', () => {
        const mockResetSpeedBetMarketSelection = vi.fn();

        vi.mocked(resetSpeedBetMarketSelectionTask).mockImplementation(() => mockResetSpeedBetMarketSelection);
        render(
            <RecoilRoot
                initializeState={({ set }) => {
                    set(speedBetStakeAtom, '5000');
                }}
            >
                <BackButton />
            </RecoilRoot>,
        );
        fireEvent.click(screen.getByTestId('speedBetBetslipBackButton'));
        expect(mockResetSpeedBetMarketSelection).toHaveBeenCalled();
    });
});
