import type { IconProps } from '../types';

import { StyledSvg } from './styled';

const LogoNew = (props: IconProps) => {
    const { className, width = '138px', height = '39px' } = props;

    return (
        <StyledSvg
            className={className}
            viewBox='0 0 499.999 140.909'
            fill='none'
            x='0px'
            y='0px'
            xmlns='http://www.w3.org/2000/svg'
            xmlSpace='preserve'
            width={width}
            height={height}
        ></StyledSvg>
    );
};

export default LogoNew;
