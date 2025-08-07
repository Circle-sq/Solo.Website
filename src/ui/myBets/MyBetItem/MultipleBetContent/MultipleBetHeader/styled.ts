import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

import { S_BetHeaderBase } from 'src/ui/myBets/MyBetItem/styled';

export const S_MultipleBetHeader = styled(S_BetHeaderBase)`
    cursor: pointer;
    pointer-events: auto;
    -webkit-tap-highlight-color: transparent;
`;

export const S_MultipleBetHeaderText = styled.span`
    font-size: 16px;
    text-transform: none;
    margin-left: 8px;
    flex: 1;
    color: ${cssColor('--text-muted')};
    font-weight: ${fontWeight.regular};
`;

export const S_MultipleBetStatus = styled.div`
    margin-left: auto;
    margin-right: 16px;
`;
