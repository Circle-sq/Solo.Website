import styled from '@emotion/styled';

import type { DebugElementAlignment } from '../types';

import type { DebugColor } from './configs';

export const S_Frame = styled('div', {
    shouldForwardProp: (prop) => prop !== 'color',
})<{ color: DebugColor }>`
    width: 100%;
    background-color: ${({ color }) => color};
    padding: 1px;
`;

export const BorderBox = styled.div<{ color: DebugColor; align?: DebugElementAlignment }>`
    display: block;
    background-color: #181818;
    width: 100%;
    position: relative;

    &:before {
        content: attr(data-label);
        display: inline-block;
        color: white;
        padding: 0 2px;
        position: absolute;
        font-size: 10px;
        white-space: nowrap;
        z-index: 999;
        opacity: 0.75;
        background: ${({ color }) => color};
        ${({ align = 'right' }) =>
            align.startsWith('inline-')
                ? `
                    top: 0;
                    ${align.includes('left') ? 'left: 0;' : 'right: 0;'}
                `
                : `
                    top: -24px;
                  ${align}: -1px;
                `}
    }

    &:hover:before {
        opacity: 1;
        z-index: 1000;
        font-weight: bold;
        font-size: 14px;
    }
`;
