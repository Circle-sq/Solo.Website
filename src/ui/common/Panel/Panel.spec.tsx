import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';

import Panel from './Panel';

describe('Panel', () => {
    const defaultProps = {
        title: 'panel-title',
        testId: 'panel-testId',
        children: <span>Test item</span>,
    };

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should not render children component on firing onToggle if id and isToggle !== undefined', async () => {
        renderWithTheme(<Panel {...defaultProps} isToggle id='panel-id' />);

        const header = screen.getByTestId(`header-${defaultProps.testId}`);
        expect(header).toBeInTheDocument();

        const children = screen.queryByText(/Test item/i);
        expect(children).toBeInTheDocument();

        await userEvent.click(header);

        expect(children).not.toBeInTheDocument();
    });

    it('should not firing onToggle if id or isToggle === undefined', async () => {
        renderWithTheme(<Panel {...defaultProps} />);

        const header = screen.getByTestId(`header-${defaultProps.testId}`);

        await userEvent.click(header);

        const children = screen.queryByText(/Test item/i);
        expect(children).toBeInTheDocument();
    });
});
