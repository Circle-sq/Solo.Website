import styled from '@emotion/styled';

import { breakpoints, cssColor, DarkBluePalette, fontWeight, GenericColors, radius } from '@solo-ui/system';

import type { Theme } from './types';

interface HeaderProps {
    styleTheme: Theme;
}

type ContentProps = HeaderProps;

export const S_Window = styled.div<{ isFullScreen: boolean }>`
    border-radius: 0.25em;
    display: flex;
    flex-direction: column;
    top: 0;
    position: fixed;
    margin: auto;
    overflow: hidden;
    left: 0;
    right: 0;
    z-index: 9998;
    background-color: ${cssColor('--modal-search-bg')};

    &.navigationStandalone {
        height: 100%;
        top: 0;
    }

    ${(props): string => {
        const { isFullScreen } = props;

        let styles = '';

        if (isFullScreen) {
            styles += `
                top: 48px;
            `;
        } else {
            styles += `
                border-radius: ${radius.main};
                transform: translateY(-50%);
                top: 50%;
                height: calc(100% - 56px);
                max-width: 768px;

                @media(max-width: ${breakpoints.bp600}) {
                    height: 100%;
                }
            `;
        }

        return `
            ${styles}
        `;
    }}
`;

export const S_Header = styled.div<HeaderProps>`
    display: flex;
    justify-content: space-between;
    padding: 11px 15px;
    line-height: 1.7;
    align-items: center;
    height: 38px;
    position: relative;
    background-color: ${cssColor('--modal-header-bg')};

    ${(props): string => {
        const { styleTheme } = props;

        let styles = '';

        if (styleTheme === 'grey') {
            styles += `
                line-height: 1;
                padding-top: 10px;
                padding-bottom: 10px;
                text-align: center;
            `;
        }

        return `
            ${styles};
        `;
    }}
`;

export const S_IconButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: auto;
    border: none;
    padding: 0;
    color: currentColor;
    background-color: transparent;
    font-size: 14px;
    width: 50px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    &:hover {
        opacity: 0.75;
    }
`;

export const S_Title = styled.h3`
    font-size: 16px;
    margin: 0;
    padding: 0;
    flex: 1;
    font-weight: ${fontWeight.semibold};
`;

export const S_Content = styled.div<ContentProps>`
    text-align: left;
    height: 90vh;
    padding-left: 10px;

    &.navigationStandalone {
        height: 100vh;
    }

    ${(props): string => {
        const { styleTheme } = props;

        let styles = '';

        if (styleTheme === 'grey') {
            styles += `
                padding: 0;

                @media(min-width: ${breakpoints.bp600}) {
                    padding-right: 0;
                }
            `;
        }

        return `
            @media(min-width: ${breakpoints.bp600}) {
                padding-right: 20px;
            }

            ${styles};
        `;
    }}
`;

export const S_Footer = styled.div`
    display: flex;
    height: 3.125em;
    line-height: 3.125em;
    padding: 5px 20px;
    width: 100%;
    margin-top: auto;
    background-color: ${DarkBluePalette.darkBlue4};
    color: ${GenericColors.white};
`;

export const S_ScrolledContent = styled.div`
    padding: 0 0 20px 0;
`;
