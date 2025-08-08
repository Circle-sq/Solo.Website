import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@solo-ui/system';

export const S_StandardBetSelectionMarket = styled.div`
    justify-content: space-between;
    display: flex;
    font-weight: ${fontWeight.medium};
`;

export const S_MultipleBetStatus = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const S_MultipleBetContentItem = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    padding: 16px 10px;

    ${S_MultipleBetStatus} {
        padding-top: 2.5px;

        svg {
            margin-right: 8px;
            margin-left: 4px;
        }
    }
`;

export const S_BetLegDivider = styled.div`
    border-bottom: ${cssColor('--card-betslip-border')};
`;

export const S_MultiCrossBetLegEvent = styled.div`
    display: flex;
    gap: 4px;
`;
