import MockComponent from '@sc-tests/unit/mocks/MockComponent';
import { renderWithTheme } from '@sc-tests/unit/mocks/renderMocks';
import { cssColor, GreyPalette } from '@sc-ui/system';

import { S_SelectionAction } from 'src/ui/events/Selection/SelectionAction/styled';

import { SelectionsContainer } from '../EventRow/styled';

import { S_Label } from './IdentifierLabel/styled';
import { S_SelectionInlineLine } from './styled';

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));
vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({ default: MockComponent }));

describe('SelectionInlineLine', () => {
    it('should have default state color', () => {
        const defaultProps = {
            isHighlighted: false,
            isSelected: false,
            children: '+2.5',
            isGameLines: true,
        };
        const { getByText } = renderWithTheme(<S_SelectionInlineLine {...defaultProps} />);
        const label = getByText(/\+2.5/i);

        expect(label).toHaveStyleRule('color', cssColor('--text-tertiary'));
    });
});

describe('IdentifierLabel', () => {
    it('should render with styles', () => {
        const { getByTestId } = renderWithTheme(<S_Label data-testid='target' />);
        const label = getByTestId('target');

        expect(label).toHaveStyleRule('font-size', '8px');
        expect(label).toHaveStyleRule('width', '16px');
        expect(label).toHaveStyleRule('background-color', cssColor('--badge-default-bg'));
        expect(label).toHaveStyleRule('display', 'inline-block');
        expect(label).toHaveStyleRule('padding', '2px 4px');
    });
});

//TODO: To include @emotion/babel-plugin in JEST config https://codefactorygroup.atlassian.net/browse/SC-7713

describe('SelectionAction', () => {
    const hover = { target: ':hover' };
    const testId = 'selectionAction-testId';

    //TODO: SC-15784
    it.skip('should have default state background color and different hover background color', () => {
        const defaultProps = {
            isSuspended: false,
            isSelected: false,
            priceChange: null,
        };
        const { getByTestId } = renderWithTheme(<S_SelectionAction {...defaultProps} data-testid={testId} />);
        const selection = getByTestId(testId);

        expect(selection).toHaveStyleRule('background-color', GreyPalette.grey2);
        expect(selection).toHaveStyleRule('background-color', GreyPalette.grey4, hover);
    });

    it('should have specific background color if isSuspended === true and same color on hover', () => {
        const defaultProps = {
            isSuspended: true,
            isSelected: false,
            priceChange: null,
        };
        const { getByTestId } = renderWithTheme(
            <SelectionsContainer>
                <S_SelectionAction {...defaultProps} data-testid={testId} />
            </SelectionsContainer>,
        );
        const selection = getByTestId(testId);

        expect(selection).toHaveStyleRule('background-color', cssColor('--button-bg'));
        expect(selection).toHaveStyleRule('background-color', cssColor('--button-bg'), hover);
    });

    it.skip('should have specific background color if isSelected === true', () => {
        const defaultProps = {
            isSuspended: false,
            isSelected: true,
            priceChange: null,
            isDisplay: true,
        };
        const { getByTestId } = renderWithTheme(<S_SelectionAction {...defaultProps} data-testid={testId} />);
        const selection = getByTestId(testId);

        expect(selection).toHaveStyleRule('background-color', cssColor('--button-selected-bg'));
        expect(selection).toHaveStyleRule('background-color', cssColor('--button-selected-hover-bg'), hover);
    });

    it.skip('should have specific background color if crossBet === true', () => {
        const defaultProps = {
            isSuspended: false,
            isSelected: false,
            priceChange: null,
            isCrossBet: true,
        };
        const { getByTestId } = renderWithTheme(<S_SelectionAction {...defaultProps} data-testid={testId} />);
        const selection = getByTestId(testId);

        expect(selection).toHaveStyleRule('background-color', GreyPalette.grey2);
    });
});
