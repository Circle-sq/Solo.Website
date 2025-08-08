import styled from '@emotion/styled';

import { fontWeight, cssColor } from '@solo-ui/system';

import { S_Item } from 'src/ui/common/DropdownList/styled';

export const S_Toolbar = styled.div<{ isDisabled: boolean }>`
    display: flex;
    flex-direction: row;
    padding: 2px 0;
    font-weight: ${fontWeight.medium};

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
            ${S_Item} {
                padding: 7px 0 6px 8px;
                background-color: ${cssColor('--list-bg')};
                font-weight: ${fontWeight.semibold};

                &:hover {
                    background-color: ${cssColor('--dropdown-option-active-bg')};
                }
            }

            ${styles}
        `;
    }}
`;

export const S_Option = styled.div`
    display: flex;
    flex: 1 0;
    white-space: nowrap;
    font-size: 14px;
`;
