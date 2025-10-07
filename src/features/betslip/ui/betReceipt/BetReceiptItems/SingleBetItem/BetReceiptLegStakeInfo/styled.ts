import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_AmountLabel = styled.span`
    display: inline-block;
    white-space: nowrap;
`;

export const S_AmountValue = styled.span`
    white-space: nowrap;
`;

export const S_TotalStake = styled.div`
    font-size: 14px;
    white-space: nowrap;
    line-height: 20px;
    font-weight: ${fontWeight.medium};
`;

export const S_PossibleWinnings = styled.div`
    font-size: 10px;
    line-height: 14.5px;
    margin-top: 2px;
    max-width: 120px;
    text-align: right;
    font-weight: ${fontWeight.medium};
    color: ${cssColor('--body-text')};
`;
