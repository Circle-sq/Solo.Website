import styled from '@emotion/styled';

import type { IconProps } from './types';

const SvgElement = styled('svg')<IconProps>`
    height: auto;
    width: ${({ size = '32px' }): string => size};
    fill: ${({ fill = '#ffffff' }): string => fill};
`;

const FullscreenIcon = ({ size = '32px', fill = '#ffffff', className = '', onClick }: IconProps) => {
    return (
        <SvgElement
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='24'
            viewBox='0 0 41.9 30.09'
            size={size}
            fill={fill}
            className={className}
            onClick={onClick}
        >
            <g id='Layer_x0020_1'>
                <metadata id='CorelCorpID_0Corel-Layer' />
                <g id='_1505599889280'>
                    <path
                        className='fil0'
                        d='M41.9 28.33c0,0.97 -0.79,1.76 -1.76,1.76l-38.38 0c-0.97,0 -1.76,-0.79 -1.76,-1.76l0 -26.57c0,-0.97 0.79,-1.76 1.76,-1.76l25.06 0 0 13.8c0,0.97 0.79,1.76 1.76,1.76 1.11,0 13.32,0 13.32,-0l0 12.78z'
                    />
                    <path
                        className='fil1'
                        d='M31.82 11.88l7.64 -7.64 0.04 5.19 2.4 0.02 -0.01 -7.87c-0.11,-0.86 -0.77,-1.52 -1.7,-1.58l-7.64 -0 -0.08 2.44 5.14 -0.06 -7.64 7.64 1.85 1.85z'
                    />
                </g>
            </g>
        </SvgElement>
    );
};

export default FullscreenIcon;
