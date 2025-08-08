import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@solo-ui/system';

export const S_BetBottomContainer = styled.div`
    border-top: 1px solid ${cssColor('--card-border')};
    border-bottom: 1px solid ${cssColor('--card-border')};
`;

export const S_BetBottomCol = styled.div``;

export const S_BetBottomRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    font-size: 12px;
    line-height: 1;
`;

export const S_CenterAlign = styled.div`
    text-align: center;
`;

export const S_RightAlign = styled.div`
    text-align: right;
`;

export const S_PotentialReturns = styled.span`
    font-size: 14px;
    font-weight: ${fontWeight.semibold};
`;

export const S_StakeOddTitle = styled.div`
    font-size: 14px;
    padding-bottom: 8px;
    white-space: nowrap;
    font-weight: ${fontWeight.medium};
    color: ${cssColor('--text-muted')};
`;

export const S_StakeOddValue = styled.div`
    font-size: 14px;
    font-weight: ${fontWeight.semibold};
`;

export const S_IconWrapper = styled.span<{ hasFreeBetCredits?: boolean }>`
    padding-left: ${({ hasFreeBetCredits = false }) => (hasFreeBetCredits ? '5px' : '0px')};
`;
