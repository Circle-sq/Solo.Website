import { screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';

import { S_NameContainer, S_Score, S_TeamImage } from './MarqueeCard/CardContent/styled';
import { S_Footer, S_Header, S_Time, S_MarketName } from './MarqueeCard/styled';

vi.mock('src/utils/Router/NewLink', () => ({
    default: ({ children }: { children: ReactNode }) => {
        return <a href='#'>{children}</a>;
    },
}));

describe('styles', () => {
    describe('Header', () => {
        const after = { target: '::after' };

        it('should have ::after pseudo-element with styles', () => {
            renderWithTheme(<S_Header data-testid='target' />);
            const borderEl = screen.getByTestId('target');

            // after styles
            expect(borderEl).toHaveStyleRule('background', 'var(--card-marquee-border, #00FF30)', after);
            expect(borderEl).toHaveStyleRule('width', '280px', after);
            expect(borderEl).toHaveStyleRule('height', '1px', after);
        });
    });

    describe('Footer', () => {
        const before = { target: ':before' };

        it('should have ::before pseudo-element with styles', () => {
            renderWithTheme(<S_Footer data-testid='target' />);
            const crossbarEl = screen.getByTestId('target');

            // before styles
            expect(crossbarEl).toHaveStyleRule('background', 'var(--card-marquee-border, #00FF30)', before);
            expect(crossbarEl).toHaveStyleRule('width', '280px', before);
            expect(crossbarEl).toHaveStyleRule('height', '1px', before);
        });
    });

    describe('MarketName', () => {
        it('should render with styles', () => {
            renderWithTheme(<S_MarketName data-testid='target' />);
            const text = screen.getByTestId('target');

            expect(text).toHaveStyleRule('font-size', '10px');
        });
    });

    describe('Time', () => {
        it('should render with styles', () => {
            renderWithTheme(<S_Time isLive={true} data-testid='target' />);
            const text = screen.getByTestId('target');

            expect(text).toHaveStyleRule('color', 'var(--body-text, #00FF30)');
            expect(text).toHaveStyleRule('background', 'var(--card-marquee-bg, #00FF30)');
            expect(text).toHaveStyleRule('left', '50%');
            expect(text).toHaveStyleRule('bottom', '0');
        });
    });

    describe('CardContent', () => {
        it('participant container should have max-width of 72px with uniforms', () => {
            renderWithTheme(<S_NameContainer isWithUniform data-testid='target' />);
            const text = screen.getByTestId('target');
            expect(text).toHaveStyleRule('max-width', '72px');
        });
        it('participant container should have max-width of 96px without uniforms', () => {
            renderWithTheme(<S_NameContainer data-testid='target' />);
            const text = screen.getByTestId('target');
            expect(text).toHaveStyleRule('max-width', '96px');
        });
        it('score container should have width of 56px', () => {
            renderWithTheme(<S_Score data-testid='target' />);
            const text = screen.getByTestId('target');
            expect(text).toHaveStyleRule('width', '56px');
        });
        it('team image container should have width of 24px', () => {
            renderWithTheme(<S_TeamImage alt='target' src='https://url.com' />);
            const img = screen.getByAltText('target');
            expect(img).toHaveStyleRule('width', '24px');
        });
    });
});
