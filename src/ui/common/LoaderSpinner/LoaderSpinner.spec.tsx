import { render, screen } from '@testing-library/react';

import LoaderSpinner from 'src/ui/common/LoaderSpinner/LoaderSpinner';

describe('LoaderSpinner', () => {
    const wrapperTestId = 'loader-spinner-testId';
    const svgTestId = 'loader-spinner-svg-testId';

    const defaultProps = {
        className: 'test-className',
        height: 100,
        weight: 100,
        color: 'red',
        testId: 'testId',
    };

    it('should render a svg', () => {
        render(<LoaderSpinner {...defaultProps} />);
        const wrapper = screen.getByTestId(wrapperTestId);

        expect(wrapper).toBeVisible();
        expect(wrapper).toContainHTML('svg');
    });

    it('should be hidden when isVisible is false', () => {
        render(<LoaderSpinner {...defaultProps} isVisible={false} />);
        const wrapper = screen.getByTestId(wrapperTestId);

        expect(wrapper).not.toBeVisible();
    });

    it('should have a correct attributes', () => {
        render(<LoaderSpinner {...defaultProps} />);
        const wrapper = screen.getByTestId(svgTestId);

        expect(wrapper).toHaveAttribute('height');
        expect(wrapper).toHaveAttribute('width');
        expect(wrapper).toHaveAttribute('stroke');
        expect(wrapper).toHaveAttribute('viewBox');
    });
});
