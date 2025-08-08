import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_EventName = styled.div`
    font-size: 10px;
    line-height: 14px;
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.medium};
`;

export const S_OddPrice = styled.div`
    font-size: 14px;
    padding: 0 8px;
    height: 20px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${cssColor('--list-primary-bg')};
    font-weight: ${fontWeight.semibold};
`;

export const S_BetLegInfo = styled.div`
    display: flex;
    flex-basis: 100%;
`;

export const S_EventInfo = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
`;

export const S_BaseBetLegContent = styled.div`
    display: flex;
    padding: 16px;
    border-bottom: 1px solid ${cssColor('--box-primary-border')};

    &:last-of-type {
        border-bottom: 0 none;
    }
`;

export const S_StandardBetLegContent = styled(S_BaseBetLegContent)`
    flex-wrap: wrap;
`;

export const S_CrossBetLegContent = styled(S_BaseBetLegContent)`
    flex-wrap: unset;
`;

export const S_CrossBetAmount = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
`;

export const S_SelectionOdd = styled.div`
    margin-bottom: 16px;
    line-height: 1em;
`;

export const S_BetReceiptItems = styled.div`
    margin-top: 16px;
`;
