import MockComponent from '@solo-tests/unit/mocks/MockComponent';
import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';
import { cssColor } from '@solo-ui/system';

import { S_BuildABetSelectionAction } from './styled';

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));
vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({ default: MockComponent }));

describe('styled', () => {
    const testId = 'selectionAction-testId';
    const hover = { target: ':hover' };

    it('should have specific bg if (BuildABetSelectionItem) selection is selected', () => {
        const defaultProps = {
            isSuspended: false,
            isSelected: true,
            priceChange: null,
            isDisplay: true,
        };
        const { getByTestId } = renderWithTheme(<S_BuildABetSelectionAction {...defaultProps} data-testid={testId} />);
        const selection = getByTestId(testId);

        expect(selection).toHaveStyleRule('background-color', cssColor('--button-warning-bg'));
        expect(selection).toHaveStyleRule('background-color', cssColor('--button-warning-hover-bg'), hover);
        expect(selection).toHaveStyleRule('border-radius', '0');
    });
});
