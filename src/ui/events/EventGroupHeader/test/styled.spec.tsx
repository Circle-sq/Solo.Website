import { screen } from '@testing-library/react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';
import { DarkBluePalette, GreyPalette } from '@solo-ui/system';

import { S_HeaderGroup, S_SelectionColumnLabel } from '../styled';

vi.mock('src/utils/Router/NewLink', () => ({ default: vi.fn }));

describe('Market label', () => {
    it('should have default state color', () => {
        renderWithTheme(<S_HeaderGroup data-testid='target' />);
        const label = screen.getByTestId('target');

        expect(label).toHaveStyleRule('color', GreyPalette.grey4);
    });
    it('should have default sport styles', () => {
        renderWithTheme(<S_SelectionColumnLabel data-testid='target' isAmericanSports={false} />);
        const label = screen.getByTestId('target');

        expect(label).toHaveStyleRule('margin-right', '0');
        expect(label).toHaveStyleRule('color', DarkBluePalette.darkBlue6);
        expect(label).not.toHaveStyleRule('width', expect.any(String));
        expect(label).not.toHaveStyleRule('margin-left', expect.any(String));
    });
    it('should have american sport styles', () => {
        renderWithTheme(<S_SelectionColumnLabel data-testid='target' isAmericanSports={true} />);
        const label = screen.getByTestId('target');

        expect(label).toHaveStyleRule('margin-right', '8px');
        expect(label).toHaveStyleRule('color', DarkBluePalette.darkBlue6);
        expect(label).not.toHaveStyleRule('width', expect.any(String));
        expect(label).not.toHaveStyleRule('margin-left', expect.any(String));
    });
});
