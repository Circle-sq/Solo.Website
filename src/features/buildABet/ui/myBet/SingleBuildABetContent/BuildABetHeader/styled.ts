import styled from '@emotion/styled';

import { cssColor } from '@sc-ui/system';

export const S_BuildABetHeaderText = styled.div`
    display: inline-block;
    font-size: 16px;
    text-transform: none;
    margin: 0 8px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 198px;
    color: ${cssColor('--text-muted')};
`;

export const S_BuildABetStatus = styled.div`
    margin-left: auto;
`;
