import type { Testable } from 'src/utils/Testable/types';

import { getPath, getViewBoxSize } from './utils';
import { Wrapper } from './styled';

/**
 * The radius of the circle
 * The Loader size is set with the width and height of the SVG
 */
const RADIUS = 20;

const DEFAULT_SIZE = 16;

interface Props extends Testable {
    className?: string;
    isVisible?: boolean;
    height?: string | number;
    width?: string | number;
    strokeWidth?: string | number;
    strokeWidthSecondary?: string | number;
    color?: string;
    secondaryColor?: string;
}

const LoaderSpinner = ({
    className,
    isVisible,
    height = DEFAULT_SIZE,
    width = DEFAULT_SIZE,
    color = '#007ACC',
    secondaryColor = '#2F2F2F',
    strokeWidth = '3',
    strokeWidthSecondary,
    testId = 'testId',
}: Props) => {
    const strokeWidthSize = Number(strokeWidthSecondary || strokeWidth);
    const viewBoxSize = getViewBoxSize(Number(strokeWidth), strokeWidthSize, RADIUS);

    return (
        <Wrapper isVisible={isVisible} className={className} data-testid={`loader-spinner-${testId}`}>
            <svg
                width={width}
                height={height}
                stroke={color}
                viewBox={viewBoxSize}
                xmlns='http://www.w3.org/2000/svg'
                data-testid={`loader-spinner-svg-${testId}`}
            >
                <g fill='none' fillRule='evenodd'>
                    <g transform='translate(1 1)' strokeWidth={strokeWidthSize}>
                        <circle cx='0' cy='0' r={RADIUS} stroke={secondaryColor} strokeWidth={strokeWidth} />
                        <path d={getPath(RADIUS)}>
                            <animateTransform
                                attributeName='transform'
                                repeatCount='indefinite'
                                type='rotate'
                                from='0 0 0'
                                to='360 0 0'
                                dur='1s'
                            />
                        </path>
                    </g>
                </g>
            </svg>
        </Wrapper>
    );
};

export default LoaderSpinner;
