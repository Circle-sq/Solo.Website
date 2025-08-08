import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

export const S_BaseBetStatus = styled.div`
    font-size: 12px;
    line-height: 1;
    white-space: nowrap;
    text-transform: uppercase;
    margin-left: auto;
    padding: 6px 8px;
    max-height: 24px;
    border-radius: 2px;
    color: ${cssColor('--chip-warning-color')};
`;

export const S_CancelledBetStatus = styled(S_BaseBetStatus)`
    background-color: ${cssColor('--chip-warning-bg')};
`;

export const S_CashOutBetStatus = styled(S_BaseBetStatus)`
    background-color: ${cssColor('--chip-primary-bg')};
`;

export const S_WonBetStatus = styled(S_BaseBetStatus)`
    background-color: ${cssColor('--chip-success-bg')};
`;

export const S_LostBetStatus = styled(S_BaseBetStatus)<{ isHalfLost?: boolean }>`
    ${({ isHalfLost = false }) => {
        return `
            background-color: ${isHalfLost ? cssColor('--chip-warning-bg') : cssColor('--chip-default-bg')};
        `;
    }}
`;
