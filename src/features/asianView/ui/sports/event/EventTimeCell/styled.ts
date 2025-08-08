import styled from '@emotion/styled';

import { fontWeight, GenericColors } from '@solo-ui/system';

import { S_CommonCell } from '../styled';

export const S_EventTimeCell = styled(S_CommonCell)`
    gap: unset;
`;

export const S_ScoreboardContainer = styled.div`
    display: flex;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: flex-start;
    text-align: center;
    font-size: 14px;

    & > span {
        margin-right: 8px;

        &.sets-info-score {
            & > span {
                justify-content: center;
            }
        }
    }
`;

export const S_PeriodContainer = styled.div`
    font-style: normal;
    font-weight: ${fontWeight.bold};
`;

export const S_Period = styled.span`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: ${fontWeight.medium};
`;

export const S_Timer = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 8px;
`;

export const S_PeriodTitle = styled.span`
    font-size: 10px;
    font-weight: ${fontWeight.medium};
`;

export const S_EventTime = styled.span`
    font-size: 12px;
    font-weight: ${fontWeight.bold};
    padding-bottom: 4px;
`;

export const S_PeriodWithDateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-of-type {
        color: ${GenericColors.white};
        font-weight: ${fontWeight.bold};
    }
`;
