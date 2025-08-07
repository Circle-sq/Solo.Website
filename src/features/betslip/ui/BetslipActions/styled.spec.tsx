import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';
import { GenericColors } from '@sc-ui/system';

import { S_CheckboxIcon, S_CheckboxSection } from './styled';

describe('CheckboxIcon', () => {
    it('should have default state (disabled) properties', () => {
        const { getByRole } = renderWithTheme(<S_CheckboxIcon isChecked={false}></S_CheckboxIcon>);
        const buttonEl = getByRole('button');

        expect(buttonEl).toHaveStyleRule('background-color', GenericColors.transparent);
        expect(buttonEl).toHaveStyleRule('font-size', `16px`);
        expect(buttonEl).toHaveStyleRule('margin-left', `-1px`);
    });
    it('should have enabled state properties', () => {
        const before = { target: ':before' };
        const props = { isChecked: true };
        const { getByRole } = renderWithTheme(<S_CheckboxIcon {...props}></S_CheckboxIcon>);
        const buttonEl = getByRole('button');

        expect(buttonEl).toHaveStyleRule('background-color', 'var(--icon-selected-bg, #00FF30)', before);
        expect(buttonEl).toHaveStyleRule('color', 'black', before);
        expect(buttonEl).toHaveStyleRule('border-radius', `15%`, before);
    });
});

describe('CheckboxSection', () => {
    it('should render CheckboxSection with correct properties', () => {
        const { getByTestId } = renderWithTheme(<S_CheckboxSection data-testid='checkboxSection' />);
        const label = getByTestId('checkboxSection');

        expect(label).toHaveStyleRule('margin-bottom', `2px`);
        expect(label).toHaveStyleRule('font-size', `10px`);
        expect(label).toHaveStyleRule('left', `35px`);
        expect(label).toHaveStyleRule('text-align', `center`);
    });
});
