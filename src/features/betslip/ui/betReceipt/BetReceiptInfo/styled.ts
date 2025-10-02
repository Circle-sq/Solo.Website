import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_BetReceiptInfoRow = styled.div<{ highlight?: boolean }>`
    display: flex;
    justify-content: space-between;
    line-height: 22px;
    font-size: 16px;
    margin: 0 6px 5px;
    font-weight: ${fontWeight.semibold};
    color: ${({ highlight }) => (highlight ? cssColor('--alert-secondary-text') : cssColor('--text-info-color'))};
`;

export const S_BetReceiptActions = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0 8px 8px;
    font-size: 14px;
    line-height: 1em;
    margin-top: 4px;
    height: 32px;
`;

export const S_KeepBetsAction = styled.span<{ isActive?: boolean }>`
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 10px;
    line-height: 14px;
    gap: 8px;
    font-weight: ${fontWeight.medium};

    ${({ isActive }) => {
        if (isActive) {
            return;
        }

        return `color: ${cssColor('--text-muted')};`;
    }}
`;

export const S_BetReceiptInfoLabel = styled.div``;

export const S_BetReceiptInfoValue = styled(S_BetReceiptInfoLabel)``;

export const S_MarginBox = styled.div`
    margin-right: 7px;
    display: inherit;
`;
