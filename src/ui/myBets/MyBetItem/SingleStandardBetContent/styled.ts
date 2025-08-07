import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

import TooltipTruncatedText from 'src/ui/common/TooltipTruncatedText/TooltipTruncatedText';
import { VerticalDivider } from 'src/ui/myBets/MyBetItem/styled';

export const S_StandardBetHeader = styled.div`
    display: flex;
    flex-direction: row;

    ${VerticalDivider} {
        height: auto;
    }
`;

export const S_StandardBetHeaderTitle = styled.div`
    display: flex;
    align-items: center;
    padding-right: 8px;
    white-space: nowrap;
    line-height: 1em;
    font-weight: ${fontWeight.semibold};
`;

export const S_StandardBetHeaderText = styled(TooltipTruncatedText)`
    padding-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 1px;
    color: ${cssColor('--text-muted')};
`;
