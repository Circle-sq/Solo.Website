import styled from '@emotion/styled';

import { fontWeight, breakpoints, cssColor } from '@solo-ui/system';

import { S_LiveShort } from 'src/ui/common/LiveLabel/styled';
import { S_Participant } from 'src/ui/common/Participants/styled';
import { S_MarketName, S_SelectionName } from 'src/ui/common/SelectionMarketName/styled';
import { S_MyBetEventTime } from 'src/ui/myBets/MyBetEventInfographics/styled';
import { S_MyBetEventName, VerticalDivider } from 'src/ui/myBets/MyBetItem/styled';

export const S_BuildABetLiveEventInfo = styled.div`
    width: 100%;
    padding-left: 28px;
    padding-top: 20px;

    ${S_Participant} {
        margin-top: 0;
    }

    ${S_SelectionName} {
        font-weight: ${fontWeight.medium};
    }
`;

export const S_MultiBetTime = styled.span`
    color: ${cssColor('--text-muted')};
`;

export const S_MultiBetEventInfo = styled.div`
    display: flex;
    margin: 15px 0 0 0;
    font-size: 10px;
    font-weight: 500;
    align-items: flex-start;

    ${S_MyBetEventName} {
        font-size: 10px;
        line-height: 1;
        margin-right: 6px;
    }

    ${S_MultiBetTime} {
        color: ${cssColor('--text-muted')};
        min-height: 24px;
        display: inline-block;
        align-items: center;
    }

    ${VerticalDivider} {
        margin-right: 4px;
        height: 1em;
    }
`;

// TODO Improve it
export const S_MultiBetInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    grid-template-rows: minmax(max-content, auto) minmax(max-content, auto) 21px 0;

    ${S_SelectionName} {
        padding: 0;
        margin: 0 8px 0 0;
    }

    ${S_MarketName} {
        color: ${cssColor('--text-secondary')};
        margin-left: 0;
    }

    ${S_MyBetEventTime} {
        margin: 0;
        font-size: 14px;
        font-style: normal;
        padding-left: 5px;
        color: ${cssColor('--text-secondary')};
        font-weight: ${fontWeight.medium};

        @media (max-width: ${breakpoints.bp500}) {
            padding: 0;
        }
    }

    ${S_LiveShort} {
        color: ${cssColor('--text-live')};
        padding: 0;
        margin-right: 8px;
        font-size: 11px;
        font-style: italic;

        &:before {
            display: none;
        }
    }
`;
