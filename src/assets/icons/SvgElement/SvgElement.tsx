import type { PropsWithChildren } from 'react';

import type { IconProps } from 'src/assets/icons/types';

const SvgElement = ({
    children,
    className,
    width = '16',
    height = '16',
    viewBox = '0 0 16 16',
    testId = 'testId',
}: PropsWithChildren<IconProps>) => (
    <svg
        fill='none'
        width={width}
        height={height}
        viewBox={viewBox}
        className={className}
        xmlns='http://www.w3.org/2000/svg'
        data-testid={`svg-element-${testId}`}
    >
        {children}
    </svg>
);

export default SvgElement;
