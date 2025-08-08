import styled from '@emotion/styled';

import { radius, cssColor } from '@solo-ui/system';

export const S_BottomSection = styled.div<{ minHeight?: number }>`
    padding: 6px;
    position: relative;
    background: ${cssColor('--list-bg')};
    min-height: ${({ minHeight = 0 }) => `${minHeight}px`};
    border-bottom-left-radius: ${radius.wrapper};
    border-bottom-right-radius: ${radius.wrapper};
`;
