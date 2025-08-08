import styled from '@emotion/styled';

import { cssColor, fontWeight } from '@solo-ui/system';

export const S_BetslipTabs = styled.div`
    display: flex;
    padding: 16px 16px 0 16px;
`;

export const S_TabItem = styled.a<{ isActive: boolean; isDisabled: boolean }>`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 14px;
    height: 32px;
    width: 110px;
    line-height: 16px;
    text-align: center;
    text-decoration: none;
    flex: 1;
    padding: 6px 10px;
    border-radius: 6px;
    margin-right: 10px;
    font-weight: ${fontWeight.medium};
    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--button-contained-betslip-bg')};
    border: 1px solid ${cssColor('--button-contained-betslip-border')};

    &:hover {
        background-color: ${cssColor('--button-contained-betslip-hover-bg')};
    }

    &:last-child {
        margin-right: 0;
    }

    ${({ isActive, isDisabled }) => {
        let styles = ``;

        if (isActive) {
            styles += `
                background-color: ${cssColor('--button-outlined-betslip-bg')};
                border: 1px solid ${cssColor('--button-outlined-betslip-border')};
            `;
        }

        if (isDisabled) {
            styles += `
                color: ${cssColor('--text-secondary')};
                background-color: ${cssColor('--button-disabled-betslip-bg')};
                border: 1px solid ${cssColor('--button-disabled-betslip-border')};
                padding: 6px 10px;
                cursor: not-allowed;
                pointer-events: none;
                user-select: none;
            `;
        }

        return styles;
    }}
`;

export const S_SystemInfoLink = styled.button<{ disabledTab?: boolean }>`
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    border: 0;
    width: 16px;
    height: 16px;
`;
