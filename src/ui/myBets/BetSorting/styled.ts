import styled from '@emotion/styled';

import { cssColor } from '@solo-ui/system';

export const S_BetSortingWrapper = styled.div`
    margin: 16px 8px 0 16px;
    display: flex;
    gap: 8px;
`;

export const S_BetSortingLabel = styled.p`
    font-size: 12px;
    margin: 0;
`;

export const S_GroupSortingWrapper = styled.div`
    display: flex;
    gap: 8px;
`;

export const S_GroupSortingItem = styled.button<{ active: boolean }>`
    cursor: pointer;
    padding: 3px 12px;
    font-size: 12px;
    max-height: 24px;
    line-height: 16px;
    border-radius: 20px;
    color: ${cssColor('--body-text')};
    transition: 0.2s ease background-color;

    ${({ active }) => {
        if (active) {
            return `
                border: 1px solid ${cssColor('--chip-large-active-border')};
                background-color: ${cssColor('--chip-large-active-bg')};

                &:hover {
                    background-color: ${cssColor('--chip-large-active-hover-bg')};
                    border: 1px solid ${cssColor('--chip-large-active-hover-border')};
                }
            `;
        }

        return `
            border: 1px solid ${cssColor('--chip-large-outlined-border')};
            background-color: ${cssColor('--chip-large-outlined-bg')};

            &:hover {
                background-color: ${cssColor('--chip-large-outlined-hover-bg')};
            }
        `;
    }}
`;
