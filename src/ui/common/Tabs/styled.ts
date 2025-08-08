import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

export const S_Tab = styled.li<{ active: boolean }>`
    width: 50%;
    line-height: 2;
    text-align: center;

    ${(props): string => {
        const { active } = props;

        if (!active) {
            return `
                background-color: ${cssColor('--tab-betting-bg')};
            `;
        }

        return `
            background-color: ${cssColor('--tab-betting-active-bg')};
        `;
    }}
`;

export const S_TabButton = styled.button<{ active: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 10px;
    font-size: 16px;
    text-decoration: none;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.semibold};
`;
