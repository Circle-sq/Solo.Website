import styled from '@emotion/styled';

import { GreyPalette, fontWeight, cssColor, breakpoints } from '@solo-ui/system';

import { ThemeNames } from 'src/common/enums';
import type { ThemeName } from 'src/typings/react-select';
import { S_BottomSection } from 'src/ui/common/Header/BurgerMenu/BottomSection/styled';

export interface Themes {
    themeName?: ThemeName;
}

interface DropdownProps extends Themes {
    showAllItems?: boolean;
}

export const S_DropdownOption = styled.div<{ isSelected: boolean }>`
    position: relative;
    box-sizing: border-box;
    font-size: 12px;
    padding: 6px 12px;
    display: flex;
    white-space: nowrap;
    line-height: 18px;
    width: 100%;
    background-color: ${cssColor('--list-bg')};

    &:hover {
        background-color: ${cssColor('--dropdown-option-hover-bg')};
    }

    .competition-filter & {
        div {
            max-width: 143px;
            padding: 0 1px 0 2px;
        }
    }

    .country-filter & {
        div {
            max-width: 109px;
        }
    }

    @media (max-width: ${breakpoints.bp500}) {
        white-space: normal;
    }

    &:first-of-type {
        border-radius: 3px 3px 0 0;
    }

    &:last-of-type {
        border-radius: 0 0 3px 3px;
    }

    ${(props): string => {
        const { isSelected = false } = props;

        let styles = '';

        if (isSelected) {
            styles = `
                font-weight: ${fontWeight.bold};
                background-color: ${cssColor('--dropdown-option-active-bg')};`;
        }

        return styles;
    }}
`;

export const S_DropdownOptionsContainer = styled.div<DropdownProps>`
    border-radius: 4px;
    font-size: 14px;
    padding: 0;
    cursor: pointer;
    width: 100%;

    color: ${cssColor('--body-text')};
    background-color: ${cssColor('--list-bg')};

    ${(props): string => {
        const { themeName, showAllItems } = props;

        let styles = `
          ${showAllItems === false ? 'height: 120px;' : ''}
        `;

        if (themeName !== ThemeNames.Dark && themeName !== ThemeNames.Dark2) {
            styles += `
                height: ${themeName === ThemeNames.Media ? '200px' : '120px'};
            `;
        }

        return `
            ${styles}
        `;
    }}
`;

export const S_ScrollBarInner = styled.div<Themes>`
    ${(props): string => {
        const { themeName } = props;

        let styles = '';

        if (themeName !== ThemeNames.Dark && themeName !== ThemeNames.Dark2) {
            styles += `
                width: 100%;
            `;
        }

        // TODO fix:THEME - investigate - do we have dropdowns scrollbar defined ?
        return `
            ${styles};
        `;
    }}
`;

export const S_DropdownValueContainer = styled.div<Themes>`
    display: flex;
    border-radius: 6px;
    font-size: 14px;
    max-height: 39px;
    width: 100%;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    align-items: center;

    background-color: ${cssColor('--dropdown-bg')};
    border: 1px solid ${cssColor('--dropdown-border')};

    &:hover {
        background-color: ${cssColor('--dropdown-hover-bg')};
    }

    ${S_BottomSection} & {
        background-color: ${cssColor('--dropdown-language-bg')};
        border: 1px solid ${cssColor('--dropdown-language-border')};

        &:hover {
            background-color: ${cssColor('--dropdown-language-hover-bg')};
        }
    }

    > div {
        display: flex;
        flex-wrap: nowrap;
    }

    .filter__single-value {
        & > div {
            font-size: 14px;
            color: ${GreyPalette.grey7};
            font-weight: ${fontWeight.bold};
        }
    }
`;

export const S_PaddingBox = styled.div`
    padding: 0 7px;
    display: flex;
`;

export const S_DropdownIconWrapper = styled.div`
    padding-right: 10px;
    display: flex;
    pointer-events: none;

    svg path {
        fill: ${GreyPalette.grey7};
    }
`;
