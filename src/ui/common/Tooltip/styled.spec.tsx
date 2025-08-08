import { screen } from '@testing-library/react';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import { S_Title } from './styled';

describe('Title', () => {
    it('should have default state properties', () => {
        const props = { textWrap: false };
        renderWithTheme(<S_Title {...props} data-testid='tooltip-title' />);
        const label = screen.getByTestId('tooltip-title');

        expect(label).toHaveStyleRule('font-size', `10px`);
        expect(label).toHaveStyleRule('margin-right', `8px`);
    });
});
