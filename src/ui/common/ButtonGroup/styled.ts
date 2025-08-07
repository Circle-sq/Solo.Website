import styled from '@emotion/styled';

import { cssColor } from '@sc-ui/system';

interface ItemProps {
    selected: boolean | undefined;
}

export const S_Container = styled.div`
    display: flex;
    gap: 8px;
    user-select: none;
    font-size: 12px;
    flex-wrap: wrap;
    text-transform: capitalize;
`;

export const S_Item = styled.div<ItemProps>`
    cursor: pointer;
    border-radius: 20px;
    font-weight: normal;
    line-height: normal;
    padding: 2.5px 12px;

    background-color: ${cssColor('--chip-filters-bg')};
    border-color: ${cssColor('--chip-filters-border')};

    ${({ selected }): string => {
        return selected
            ? `
                cursor: default;
                background-color: ${cssColor('--chip-filters-active-bg')};
                border-color: ${cssColor('--chip-filters-active-border')}
            `
            : ``;
    }};
`;
