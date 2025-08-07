import { render, cleanup } from '@testing-library/react';

import { cssColor } from '@sc-ui/system';

import { BetStatus } from 'src/common/enums';

import BetStatusIcon from './BetStatusIcon';

describe('BetStatusIcon', () => {
    afterEach(cleanup);

    const renderIconWithTests = (status: BetStatus | undefined, fillSelector: string, isMultiBet?: boolean) => {
        const { container, getByTestId } = render(<BetStatusIcon status={status} isMultiBet={isMultiBet} />);
        const iconElement = getByTestId(`bet-status-icon-${status ?? 'testId'}`);

        expect(iconElement).toBeInTheDocument();
        expect(container.querySelector(fillSelector)).toBeInTheDocument();
    };

    it('should render the WonIcon', () => {
        renderIconWithTests(BetStatus.Won, '[fill="#8BD97F"]');
    });

    it('should render the HalfWonIcon', () => {
        renderIconWithTests(BetStatus.HalfWon, '[fill="#8BD97F"]');
    });

    it('should render the LostIcon', () => {
        renderIconWithTests(BetStatus.Lost, '[fill="#D34F44"]');
    });

    it('should render the HalfLostIcon', () => {
        renderIconWithTests(BetStatus.HalfLost, '[fill="#FEBE3F"]');
    });

    it('should render the VoidIcon', () => {
        renderIconWithTests(BetStatus.Void, '[fill="#FEBE3F"]');
    });

    it('should render the CancelledIcon', () => {
        renderIconWithTests(BetStatus.Cancelled, '[fill="#FEBE3F"]');
    });

    it('should render the CashedOutIcon', () => {
        renderIconWithTests(BetStatus.CashOut, '[fill="#00A3FE"]');
    });

    it('should render the BetOpenIcon', () => {
        renderIconWithTests(undefined, `[fill="${cssColor('--icon-chain-link-bg')}"]`, true);
    });

    it('should render the ResultIcon', () => {
        renderIconWithTests(undefined, `[fill="${cssColor('--icon-chain-link-bg')}"]`, true);
    });
});
