import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@solo-ui/system';

import { S_CommonCell } from '../styled';

export const S_EventMoreCell = styled(S_CommonCell)`
    cursor: pointer;
    border-right: none;
`;

export const S_MoreMarketsButton = styled.button`
    display: flex;
    height: 26px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    padding: 8px 6px;
    font-size: 14px;
    font-weight: ${fontWeight.bold};
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--button-contained-default-bg')};
`;
