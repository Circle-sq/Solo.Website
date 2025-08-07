import styled from '@emotion/styled';

import { cssColor } from '@sc-ui/system';

export const CardContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

export const CardContentFreeBetsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CardContentMainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
`;

export const ContentFirstColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const CheckboxIcon = styled.span<{ isChecked: boolean }>`
    padding-right: 11px;
    cursor: pointer;
    align-self: flex-start;

    ${({ isChecked }): string => {
        let styles = `
            background-color: transparent;
            &:before {
                background-color: ${isChecked ? cssColor('--icon-selected-bg') : 'transparent'};
                color: ${isChecked ? 'black' : cssColor('--text-secondary')};
                border-radius: 15%;

            }
        `;

        if (!isChecked) {
            styles += `
                &:hover {
                    &:before {
                        color: ${cssColor('--body-text')};
                    }
                }
            `;
        }

        return styles;
    }}
`;
