import styled from '@emotion/styled';

import { breakpoints, fontWeight, cssColor } from '@solo-ui/system';

export const S_BetslipActions = styled.div<{ isDisabled: boolean }>`
    min-height: 36px;
    padding: 5px 12px 20px;
    font-size: 12px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -2px;

    ${(props): string => {
        const { isDisabled } = props;

        let styles = '';

        if (isDisabled) {
            styles += `
                opacity: 0.5;
                pointer-events: none;
            `;
        }

        return `
            ${styles}
        `;
    }}
`;

export const Button = styled.button`
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;
`;

export const S_ActionButtons = styled.div`
    display: flex;
    padding-right: 5px;
    gap: 16px;
`;

export const S_ConfirmDeleteBtn = styled(Button)`
    display: flex;
    align-items: center;
    font-size: 10px;
    line-height: 0;
    border-radius: 14px;
    background: ${cssColor('--button-bg')};
    padding: 6px 12px;
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.medium};
`;

export const S_CheckboxSection = styled.span`
    width: auto;
    text-align: center;
    font-size: 10px;
    margin-bottom: 2px;
    left: 35px;
    color: ${cssColor('--text-muted')};

    @media (max-width: ${breakpoints.bp500}) {
        left: 40px;
    }
`;

export const S_CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const S_MarginBox = styled.div`
    display: flex;
    margin-left: 8px;
`;
