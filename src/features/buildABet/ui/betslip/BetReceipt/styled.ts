import styled from '@emotion/styled';

import { S_BaseBetLegContent } from '@solo-betslip/ui/betReceipt/BetReceiptItems/styled';
import { cssColor } from '@solo-ui/system';

export const S_BuildABetSelection = styled(S_BaseBetLegContent)`
    flex-wrap: unset;
`;

export const S_BuildABetContent = styled.div`
    gap: 15px;
`;

export const S_BuildABetEventName = styled.div`
    font-size: 10px;
    line-height: 1em;
    margin-top: 15px;
    max-width: 215px;
    display: flex;
    align-items: center;
    gap: 8px;

    div:only-child {
        padding-left: 16px;
    }
`;

export const S_BuildABetAmountContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
`;

export const S_BuildABetAmount = styled.div`
    display: flex;
    gap: 3px;
    font-size: 14px;
    white-space: nowrap;
    line-height: 1em;
`;

export const S_BuildABetPossibleWinAmount = styled.div`
    font-size: 10px;
    line-height: 1em;
    margin-top: 8px;
    max-width: 120px;
    text-align: right;
    color: ${cssColor('--text-success')};
`;

export const S_BuildABetAmountLabel = styled.span`
    display: inline-block;
    white-space: nowrap;
`;

export const S_BuildABetAmountValue = styled.span`
    white-space: nowrap;
`;

export const S_BuildABetSelectionOdd = styled.div`
    background-color: ${cssColor('--chip-small-bg')};
    font-size: 14px;
    padding: 2px 8px;
    margin-bottom: 10px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const S_IconWrapper = styled.div`
    align-self: flex-start;
`;

export const TextWrapper = styled.div``;

export const S_SingleBuildABetHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    text-transform: capitalize;
`;
