import { fireEvent, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { renderWithTheme } from '@solo-ui/system';

import Pitcher from './Pitcher';

const mockPitchers = { home: 'Home Pitcher', away: 'Away Pitcher' };

describe('Pitcher component', () => {
    it('should render the pitcher name correctly for home', () => {
        renderWithTheme(<Pitcher type='home' pitchers={mockPitchers} />);
        const pitcherName = screen.getByText(mockPitchers.home);
        expect(pitcherName).toBeInTheDocument();
    });

    it('should render the pitcher name correctly for away', () => {
        renderWithTheme(<Pitcher type='away' pitchers={mockPitchers} />);
        const pitcherName = screen.getByText(mockPitchers.away);
        expect(pitcherName).toBeInTheDocument();
    });

    it('should apply invert transformation to the icon', () => {
        renderWithTheme(<Pitcher type='home' pitchers={mockPitchers} invert />);
        const icon = screen.getByTestId('pitcher-icon');
        expect(icon).toHaveStyle({ transform: 'rotate(180deg)' });
    });

    it('should position the icon correctly on the left by default', () => {
        renderWithTheme(<Pitcher type='home' pitchers={mockPitchers} />);
        const icon = screen.getByTestId('pitcher-icon');
        expect(icon).toHaveStyle({ order: '0' });
    });

    it('should position the icon correctly on the right', () => {
        renderWithTheme(<Pitcher type='home' pitchers={mockPitchers} iconPosition='right' />);
        const icon = screen.getByTestId('pitcher-icon');
        expect(icon).toHaveStyle({ order: '1' });
    });

    it('should display tooltip when text overflows', () => {
        renderWithTheme(<Pitcher type='home' pitchers={mockPitchers} />);
        const pitcherNameElement = screen.getByText(mockPitchers.home);

        Object.defineProperty(pitcherNameElement, 'scrollWidth', { get: () => 300 });
        Object.defineProperty(pitcherNameElement, 'offsetWidth', { get: () => 200 });

        fireEvent.mouseOver(pitcherNameElement);

        const tooltip = screen.getByTestId('pitcher-tooltip');
        expect(tooltip).toHaveTextContent(mockPitchers.home);
    });
});
