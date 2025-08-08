import styled from '@emotion/styled';

import {
    fontWeight,
    radius,
    breakpoints,
    DarkBluePalette,
    GenericColors,
    GreyPalette,
    cssColor,
} from '@solo-ui/system';

import Link from 'src/utils/Router/NewLink';

type Theme = 'dark' | 'grey';

interface HeaderProps {
    styleTheme: Theme;
}

export const S_PanelLink = styled(Link)`
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    text-decoration: none;
    margin: 0 10px;
    position: relative;
    width: 220px;
    height: 32px;

    border-bottom: 1px solid ${cssColor('--list-az-item-border')};

    ${(props): string => {
        const { disabled } = props;

        let styles = `
            font-weight: ${fontWeight.regular};

            @media (max-width: ${breakpoints.bp1279}) {
                height: auto;
                padding: 7px 10px 7px 15px;
                flex-basis: 50%;
                margin-right: 0;
                align-items: flex-start;
                &:nth-last-of-type {
                    border: none;
                }

                &:nth-last-of-type(-n + 2) {
                    border: none;
                }
            }

            @media (max-width: ${breakpoints.bp600}) {
                flex-basis: 100%;
                &:nth-last-of-type(-n + 2) {
                    border-bottom: 1px solid ${cssColor('--list-az-item-border')};
                }

                &:last-child {
                    border: none;
                }
            }
        `;

        styles += disabled
            ? `cursor: default;`
            : `
            &:hover {
                background-color: ${cssColor('--list-az-item-hover-bg')};
            }
        `;

        return styles;
    }}
`;

export const S_LiveText = styled.span`
    margin-right: 8px;
    height: 6px;
    line-height: 6px;
    align-self: center;
    font-size: 8px;
    text-transform: uppercase;
    text-wrap: nowrap;
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
    color: ${cssColor('--text-live')};
`;

export const S_EventsCount = styled.span`
    height: 12px;
    min-width: 10px;
    padding: 0 3px;
    line-height: 12px;
    font-size: 9px;
    border-radius: 2px;
    align-self: center;
    text-align: center;
    margin-right: 8px;
    font-weight: ${fontWeight.semibold};
    background: ${cssColor('--chip-az-bg')};
    color: ${cssColor('--body-text')};

    @media (max-width: ${breakpoints.bp1279}) {
        width: 28px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        margin-right: 0;
    }
`;

export const S_EventsWrapper = styled.div`
    width: 70px;
    display: flex;
    justify-content: flex-end;
`;

export const S_Label = styled.span`
    display: flex;
    align-items: center;
    font-weight: ${fontWeight.regular};
    color: ${cssColor('--body-text')};

    @media not (max-width: ${breakpoints.bp1279}) {
        padding-left: 5px;
        font-size: 12px;
    }
`;

export const S_SportIcon = styled.span`
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 7px;
    width: 16px;

    @media (max-width: ${breakpoints.bp1279}) {
        font-size: 16px;
    }
`;

export const S_ContainerForLargeScreen = styled.div<{ sportsCount?: number; isVisible?: boolean }>`
    position: absolute;
    top: 65px;
    width: 100%;
    display: flex;
    justify-content: start;
    left: 50%;
    transform: translate(-50%);
    z-index: 9999;

    ${(props): string => {
        const { sportsCount, isVisible = false } = props;

        let height = 143;
        let templateRows = 4;

        if (sportsCount) {
            if (sportsCount > 20) {
                height += 32;
                templateRows += 1;
            }

            if (sportsCount > 25) {
                height += 32;
                templateRows += 1;
            }
        }

        return `
            visibility: ${isVisible ? 'visible' : 'hidden'};
            height: ${height}px;
            overflow-y: hidden;
            max-width: ${breakpoints.bp1920};

            ${S_Window} {
                background-color: ${cssColor('--body-bg')};
                transition: all 0.5s ease;
                top: ${isVisible ? '0' : '-200'}px;
            }

            ${S_LinkWrapper} {
                grid-template-rows: repeat(${templateRows}, auto);
            }

            @media(max-width: ${breakpoints.bp1279}) {
                display: none;
            }
        `;
    }}
`;

export const S_LinkWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(5, auto);

    @media (max-width: ${breakpoints.bp1279}) {
        height: 100%;
    }
`;

export const S_Window = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 9999;
    border-radius: 0;
    min-width: 233px;
    background-color: ${GreyPalette.grey1};

    @media not screen and (max-width: ${breakpoints.bp1279}) {
        height: inherit;
        left: 24px;
        max-width: 1205px;
    }

    @media (max-width: ${breakpoints.bp600}) {
        height: 100%;
    }

    @media (max-width: ${breakpoints.bp1279}) {
        border-radius: ${radius.main};
        transform: translateY(-50%);
        top: 50%;
        height: 100%;
        max-width: 768px;
        box-shadow: none;
        background-color: ${GreyPalette.grey1};
        left: 0;
        right: 0;
        margin: 0 auto;
    }
`;

export const S_Header = styled.div<{ styleTheme: Theme }>`
    display: flex;
    justify-content: space-between;
    padding: 11px 15px;
    line-height: 1.7;
    align-items: center;
    min-height: 50px;

    ${(props): string => {
        const { styleTheme } = props;

        let styles = '';

        if (styleTheme === 'grey') {
            styles += `
                line-height: 1;
                padding-top: 10px;
                padding-bottom: 10px;
                text-align: center;
                background-color: ${DarkBluePalette.darkBlue4};
            `;
        }

        return `
            color: ${GenericColors.white};
            @media(min-width: calc(${breakpoints.bp1280} + 1px)) {
                position: absolute;
                right: 0;
                z-index: 999;
                cursor: pointer;
            }
            ${styles};
        `;
    }}
`;

export const Title = styled.h3`
    font-size: 14px;
    margin: 0;
    padding: 0;
    color: ${GenericColors.white};
    font-weight: ${fontWeight.regular};
`;

export const S_Content = styled.div<HeaderProps>`
    text-align: left;
    height: inherit;

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
            @media(max-width: ${breakpoints.bp1279}) {
                padding: 0 10px;
                overflow: scroll;
                height: 100%;
            }

            ${styles};
        `;
    }}
`;

export const S_ScrolledContent = styled.div`
    padding: 0 0 40px 0;

    @media not screen and (max-width: ${breakpoints.bp1279}) {
        height: inherit;
    }
`;
