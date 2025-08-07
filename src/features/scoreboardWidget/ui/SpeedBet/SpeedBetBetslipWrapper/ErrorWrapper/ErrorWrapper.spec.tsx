import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { SpeedBetStatus } from 'src/features/scoreboardWidget/enums';

import ErrorWrapper from './ErrorWrapper';
vi.mock('./AnimatedIcons/NextBetAnimatedIcon', () => ({
    NextBetAnimatedIcon: () => <div data-testid='NextBetAnimatedIcon' />,
}));
vi.mock('./AnimatedIcons/NoBetsAnimatedIcon', () => ({
    NoBetsAnimatedIcon: () => <div data-testid='NoBetsAnimatedIcon' />,
}));
describe('ErrorWrapper', () => {
    it('renders comming soon error', () => {
        render(<ErrorWrapper type={SpeedBetStatus.ComingSoon} />);
        expect(screen.getByTestId('NextBetAnimatedIcon')).toBeInTheDocument();
        expect(screen.getByText('Next speed bet')).toBeInTheDocument();
        expect(screen.getByText('is coming soon')).toBeInTheDocument();
    });
    it('renders default Error', () => {
        render(<ErrorWrapper />);
        expect(screen.getByTestId('NoBetsAnimatedIcon')).toBeInTheDocument();
        expect(screen.getByText('Sorry, no speed bets are available')).toBeInTheDocument();
    });
});
