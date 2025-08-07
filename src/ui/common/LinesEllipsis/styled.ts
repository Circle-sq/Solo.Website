import styled from '@emotion/styled';

import TooltipTruncatedText from '../TooltipTruncatedText/TooltipTruncatedText';

import type { EllipsisContainer } from './types';

export const S_EllipsisContainer = styled(TooltipTruncatedText)<EllipsisContainer>`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    word-wrap: normal;
    word-break: keep-all;
    width: -webkit-fill-available;

    ${(props): string => {
        const { lineHeight, maxLines } = props;

        return `
            max-height: calc(${lineHeight}rem * ${maxLines} + 0.3rem);
            -webkit-line-clamp: ${maxLines};
        `;
    }}
`;
