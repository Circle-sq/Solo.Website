import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@sc-ui/system';

export const SummaryContainer = styled.div`
    padding-bottom: 16px;
`;

export const S_SummaryTotal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    height: 22px;
    color: ${cssColor('--alert-success-text')};

    &:not(:last-child) {
        margin-bottom: 4px;
    }
`;

export const S_StakeAmount = styled.div`
    font-weight: ${fontWeight.bold};
`;

export const S_StakeInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 32px;
    font-size: 15px;
    border-radius: 3px;
    width: 27%;
    margin-bottom: 8px;
`;

export const FreeBetsSummaryWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
`;

export const StakeContainer = styled.div`
    margin-bottom: 16px;
`;

export const S_StakeErrorContainer = styled.div`
    display: flex;
    justify-content: end;
`;

export const S_SummaryStakeWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const S_CombinationStakeLabel = styled.span`
    font-size: 14px;
    line-height: 1;
    flex: 1;
    font-weight: ${fontWeight.semibold};
    color: ${cssColor('--body-text')};
`;

export const S_CountBets = styled.span`
    font-size: 14px;
    padding-top: 4px;
    display: block;
    color: ${cssColor('--text-muted')};
`;

export const S_MaxBetText = styled.div`
    font-size: 10px;
    line-height: normal;
    text-align: right;
    margin-bottom: 2px;
    color: ${cssColor('--text-muted')};
    font-weight: 900;
`;

export const S_TextBold = styled.span`
    font-weight: ${fontWeight.bold};
`;
