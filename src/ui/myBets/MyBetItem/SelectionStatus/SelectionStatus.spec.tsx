import { screen } from '@testing-library/react';

import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';

import { BetStatus } from 'src/common/enums';

import SelectionStatus from './SelectionStatus';

describe('SelectionStatus', () => {
    it('BetSelectionStatus should display lost status', () => {
        renderWithTheme(<SelectionStatus status={BetStatus.Lost} />);
        const message = screen.getByText('lost');
        expect(message).toBeTruthy();
    });
    it('BetSelectionStatus should display cash out status', () => {
        renderWithTheme(<SelectionStatus status={BetStatus.CashOut} />);
        const message = screen.getByText('cashed out');
        expect(message).toBeTruthy();
    });
    it('BetSelectionStatus should display won status', () => {
        renderWithTheme(<SelectionStatus status={BetStatus.Won} />);
        const message = screen.getByText('won');
        expect(message).toBeTruthy();
    });
    it('BetSelectionStatus should display cancelled status', () => {
        renderWithTheme(<SelectionStatus status={BetStatus.Cancelled} />);
        const message = screen.getByText('cancelled');
        expect(message).toBeTruthy();
    });
    it('BetSelectionStatus should display half won status', () => {
        renderWithTheme(<SelectionStatus status={BetStatus.HalfWon} />);
        const message = screen.getByText('half won');
        expect(message).toBeTruthy();
    });
    it('BetSelectionStatus should display half lost status', () => {
        renderWithTheme(<SelectionStatus status={BetStatus.HalfLost} />);
        const message = screen.getByText('half lost');
        expect(message).toBeTruthy();
    });
    it('BetSelectionStatus should be empty when status is settled', () => {
        const { container } = renderWithTheme(<SelectionStatus status={BetStatus.Settled} />);
        expect(container).toBeEmptyDOMElement();
    });
});
