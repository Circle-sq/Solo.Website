import { screen } from '@testing-library/react';

import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';
import { DarkBluePalette, GreyPalette } from '@sc-ui/system';

import { S_Wrapper, S_PageName, S_SportLabel } from './styled';

describe('CrossBetting Header', () => {
    it('should render Container with background color - gradient 7', () => {
        renderWithTheme(<S_Wrapper data-testid='crossbetHeader' />);
        const span = screen.getByTestId('crossbetHeader');
        expect(span).toHaveStyleRule('background-color', DarkBluePalette.darkBlue4);
    });

    it('should render PageName with color 1', () => {
        renderWithTheme(<S_PageName data-testid='crossbetHeaderPageName' />);
        const span = screen.getByTestId('crossbetHeaderPageName');
        expect(span).toHaveStyleRule('color', GreyPalette.grey7);
    });

    it('should render SportLabel with color 3', () => {
        renderWithTheme(<S_SportLabel data-testid='crossbetHeaderSportName' />);
        const span = screen.getByTestId('crossbetHeaderSportName');
        expect(span).toHaveStyleRule('color', GreyPalette.grey7);
    });
});
