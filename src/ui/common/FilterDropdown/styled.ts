import styled from '@emotion/styled';

import {
    fontWeight,
    breakpoints,
    DarkBluePalette,
    GreyPalette,
    GenericColors,
    YellowPalette,
    Opacities,
    cssColor,
} from '@solo-ui/system';

import Link from 'src/utils/Router/Link';

import type { Market, DropdownOptionsContainer } from './types';

export const S_DropDownFilterContainer = styled.div<Market>`
    ${(props): string => {
        const { isMarket } = props;
        const num100 = 100,
            num200 = 200;

        return `
            width: ${isMarket !== undefined ? num100 : num200}px;

            @media (max-width: ${breakpoints.bp960}) {
                width: 100%;

                & > div {
                    margin: 0;
                }
            }
        `;
    }}
`;

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

export const S_DropdownOptionsContainer = styled.div<DropdownOptionsContainer>`
    border-radius: 4px;
    font-size: 12px;
    padding: 0;
    overflow: hidden;
    width: 100%;
    background-color: ${GreyPalette.grey2};
    color: ${GreyPalette.grey7};
    height: ${({ showAllItems }) => (showAllItems === false ? '245px' : 'auto')};
`;

export const S_MarketDropdownValueContainer = styled.div<Market>`
    border-radius: 4px;
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 20px;
    width: 100%;
    color: ${GreyPalette.grey7};
    border: 1px solid ${cssColor('--dropdown-border')};
    font-weight: ${fontWeight.medium};
    // FIXME - ditch isMarket - https://bitbucket.org/code-factory-group/sc-website/pull-requests/4344/diff#comment-573918360
    background-color: ${({ isMarket }) => (isMarket ? GenericColors.transparent : cssColor('--dropdown-bg'))};

    &:hover {
        background-color: ${DarkBluePalette.darkBlue4};
    }

    & > div {
        display: flex;
    }
`;

export const S_DropdownLinkOption = styled(Link)`
    display: flex;
    box-sizing: border-box;
    font-size: 14px;
    padding: 3px 10px;
    text-decoration: none;
    position: relative;
    background-color: ${GreyPalette.grey4};
    border-bottom: 1px solid ${GreyPalette.grey5};
    color: ${GenericColors.white};

    &.active::after,
    &:hover::after {
        content: '';
        height: 100%;
        width: 3px;
        left: 0;
        position: absolute;
        bottom: 0;
    }

    &.active::after,
    &:hover::after {
        background-color: ${YellowPalette.yellow4};
    }

    &:hover {
        background-color: ${GenericColors.white + Opacities.opacity10};
    }

    &.active {
        font-weight: ${fontWeight.bold};
    }
`;

export const S_DropdownSingleValueContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const S_DropdownSingleValue = styled.div`
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;

    & > div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 75%;
    }
`;
