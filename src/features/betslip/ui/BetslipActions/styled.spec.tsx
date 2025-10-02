import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import { S_CheckboxSection } from './styled';

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
