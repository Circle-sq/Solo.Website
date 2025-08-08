import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_LabelWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 2px 4px;
    border-radius: 2px;
    background: ${cssColor('--box-speedbet-label-bg')};
`;

export const S_LabelText = styled.span`
    font-size: 10px;
    line-height: 1.3;
    text-transform: uppercase;
    color: ${cssColor('--box-speedbet-label-text')};
    font-weight: ${fontWeight.semibold};
    font-style: italic;
`;
