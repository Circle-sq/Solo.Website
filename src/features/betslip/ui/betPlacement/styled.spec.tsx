import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';

import { PlaceButton } from './styled';

describe('PlaceButton', () => {
    const hover = { target: ':hover' };

    it('should have default state colors (primary)', () => {
        const { getByRole } = renderWithTheme(<PlaceButton>PLACE BET</PlaceButton>);
        const buttonEl = getByRole('button');

        expect(buttonEl).toHaveStyleRule('background-color', 'var(--button-brand-bg, #00FF30)');
        expect(buttonEl).toHaveStyleRule('border', `1px solid var(--button-brand-border, #00FF30)`);
        expect(buttonEl).toHaveStyleRule('color', 'var(--body-text, #00FF30)');

        // hover styles
        expect(buttonEl).toHaveStyleRule('background-color', 'var(--button-brand-hover-bg, #00FF30)', hover);
        expect(buttonEl).toHaveStyleRule('color', 'var(--body-text, #00FF30)', hover);
        expect(buttonEl).toHaveStyleRule('border', `1px solid var(--button-brand-border, #00FF30)`, hover);
    });

    it('should have disabled state colors (gray)', () => {
        const props = { disabled: true, loading: true };
        const { getByRole } = renderWithTheme(<PlaceButton {...props}>PLACE BET</PlaceButton>);
        const buttonEl = getByRole('button');

        expect(buttonEl).toHaveStyleRule('background-color', 'var(--button-loading-disabled-bg, #00FF30)');
        expect(buttonEl).toHaveStyleRule('border', `1px solid var(--button-brand-border, #00FF30)`);
        expect(buttonEl).toHaveStyleRule('color', 'var(--button-loading-disabled-text, #00FF30)');

        // hover styles
        expect(buttonEl).toHaveStyleRule('background-color', 'var(--button-loading-disabled-bg, #00FF30)', hover);
        expect(buttonEl).toHaveStyleRule('border', `1px solid var(--button-brand-border, #00FF30)`, hover);
        expect(buttonEl).toHaveStyleRule('color', 'var(--button-loading-disabled-text, #00FF30)', hover);
    });
});
