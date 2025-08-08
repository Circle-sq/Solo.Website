import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';

export const S_CrossBetStatus = styled.div`
    margin-left: auto;
`;

export const S_CrossBetHeaderText = styled(TooltipTruncatedText)`
    color: ${cssColor('--text-muted')};
    display: inline-block;
    font-size: 16px;
    text-transform: none;
    margin: 0 8px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 198px;
`;

export const S_MarginBox = styled.div`
    display: flex;
    margin-right: 8px;
`;
