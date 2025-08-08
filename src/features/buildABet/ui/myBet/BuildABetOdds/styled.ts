import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@solo-ui/system';

export const S_BuildABetOdd = styled.span`
    background-color: ${cssColor('--chip-betslip-bg')};
    font-weight: ${fontWeight.bold};
    position: absolute;
    padding: 1px 8px;
    right: 15px;
    top: 15px;
    min-width: 88px;
    line-height: 1;
    text-align: center;
    font-size: 14px;
    border-radius: 2px;
`;
