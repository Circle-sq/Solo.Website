import { screen } from '@testing-library/react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import { S_Content, S_FiltersContainer, S_Header } from './styled';

describe('Settled tab Range Filter', () => {
    it('should render FiltersContainer with width 95% and min-height 140px', () => {
        renderWithTheme(<S_FiltersContainer data-testid='filtersContainer' />);
        const span = screen.getByTestId('filtersContainer');
        expect(span).toHaveStyleRule('width', '95%');
        expect(span).toHaveStyleRule('min-height', '140px');
    });

    it('should render Content with corresponding padding', () => {
        renderWithTheme(<S_Content data-testid='filtersContent' />);
        const span = screen.getByTestId('filtersContent');
        expect(span).toHaveStyleRule('padding', '8px 6px 12px 12px');
    });

    it('should render Header with corresponding padding and border-radius', () => {
        renderWithTheme(<S_Header data-testid='filtersHeader' />);
        const span = screen.getByTestId('filtersHeader');
        expect(span).toHaveStyleRule('padding', '10px');
        expect(span).toHaveStyleRule('border-top-left-radius', '6px');
        expect(span).toHaveStyleRule('border-top-right-radius', '6px');
    });
});
