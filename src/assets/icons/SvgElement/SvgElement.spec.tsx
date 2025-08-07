import { render, cleanup } from '@testing-library/react';

import SvgElement from 'src/assets/icons/SvgElement/SvgElement';

describe('SvgElement', () => {
    afterAll(cleanup);

    it('should render the SvgElement with children', () => {
        const { getByTestId } = render(
            <SvgElement>
                <path d='' data-testid='svg-path-testId' />
            </SvgElement>,
        );

        const svgElement = getByTestId('svg-element-testId');

        expect(svgElement).toBeInTheDocument();
        expect(svgElement.getAttribute('fill')).toBe('none');
        expect(svgElement.getAttribute('width')).toBe('16');
        expect(svgElement.getAttribute('height')).toBe('16');
        expect(svgElement.getAttribute('viewBox')).toBe('0 0 16 16');
        expect(getByTestId('svg-path-testId')).toBeInTheDocument();
    });
});
