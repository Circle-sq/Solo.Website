import styled from '@emotion/styled';

import {
    fontWeight,
    breakpoints,
    DarkBluePalette,
    GenericColors,
    GreyPalette,
    Opacities,
    cssColor,
} from '@solo-ui/system';

import { S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import Link from 'src/utils/Router/Link';

import type { Nav, NoLink, SubNav } from './types';

export const S_SubNav = styled.div<Nav>`
    ${(props): string => {
        const { bp1280, bp960 } = breakpoints;
        const { isNav } = props;

        let styles = `
        text-align: center;

        @media(min-width: ${bp1280}) {
            ${S_SwiperContainer} {
                box-shadow: unset;
                padding: 0 24px;
            }
        }`;

        if (isNav) {
            styles += `
                box-shadow: 0 1px 3px 1px ${GenericColors.black + Opacities.opacity20};
                border-radius: 0.25rem;
                margin: 0 .5rem 1rem;

                @media(max-width: ${bp1280}) {
                    position: inherit;
                    left: 25px;
                    padding: 0;
                    z-index: 3;
                    width: 100%;
                    border-radius: 0;
                    margin: 0 0 2px 0;
                }

                @media(max-width: ${bp960}) {
                    left: 0;
                    margin: 0;
                    top: 78px;
                    &.navigationStandalone {
                    top: 0;
                }

                @media(min-width: ${bp960}) {
                    margin: 0px;
                }
            `;
        } else {
            styles += `
                padding: 0;
            `;
        }

        return styles;
    }};
`;

export const S_SubNavMenu = styled.nav<Nav>`
    text-align: left;
    flex: 100%;
    font-size: 0.8em;
    position: relative;
    user-select: none;

    .swiper-wrapper {
        align-items: center;
    }

    ${(): string => {
        const { bp600, bp1279max, bp500 } = breakpoints;

        return `
            margin-top: 0;

            @media (max-width: ${bp1279max}) {
                border-bottom: 1px solid ${cssColor('--chip-large-outlined-border')};;
                padding: 0 12px;
            }

            @media(max-width: ${bp500}) {
                padding: 0;
            }

            .header_nav {
                color: ${GenericColors.white};

                &.active {

                    background-color: ${cssColor('--tabs-tertiary-active-bg')};

                    &:after {
                        content: '';
                        height: 2px;
                        background-color: ${cssColor('--tabs-default-active-border')};
                        position: absolute;
                        width: 100%;
                    }
                }

                @media (hover: hover) and (pointer: fine) {
                    &:hover {
                        background-color: ${cssColor('--tabs-tertiary-hover-bg')};
                    }
                }

            }

            .sub_nav {
                color: ${cssColor('--badge-text')};
                font-weight: ${fontWeight.regular};

                &:after {
                    border-bottom: 1px solid ${GreyPalette.grey2};
                    border-left: 2px solid ${GreyPalette.grey2};
                }
                &.active {
                    background-color: ${GreyPalette.grey2};
                }

                &.active::after,
                &:hover::after{
                    font-weight: ${fontWeight.bold};
                };

                @media(min-width: ${bp600}) {
                    display: flex;
                    flex: 1 1 auto;
                    width: 4.9375rem;
                }

                @media(max-width: ${bp1279max}) {
                    .header_nav {
                        display: block;
                    }
                }
            }
        `;
    }};
`;

export const S_SubNavMenuLink = styled(Link)<SubNav>`
    text-decoration: none;
    cursor: pointer;
    font-size: 24px;
    position: relative;
    text-align: center;
    margin: unset;
    width: 78px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;

    ${(props): string => {
        const { iconType, isInHeader = false } = props;

        let style = `
            &.header_nav, &.sub_nav {
                img {
                    margin: 0;
                }
            }

            @media(min-width: ${breakpoints.bp1280}) {
                margin: 0;
                font-size: 20px;

                img {
                    height: 24px;
                    width: 24px;
                    margin-top: 5px;
                }
            }

            & img.mobile-header-nav {
                height: 24px;
                width: 24px;
                margin-top: 0;
                flex-direction: column;
            }
        `;

        if (iconType === 'theme-search') {
            style += `
                &:before {
                    content: "";
                    height: 46px;
                    width: 2px;
                    background: ${GreyPalette.grey2};
                    position: absolute;
                    top: 8px;
                    left: 0;
                    right: 80px;
                }

                @media(max-width: ${breakpoints.bp1280}){
                    &:before {
                        content: ${isInHeader ? '""' : 'none'};
                    }
                }
            `;
        }

        if (iconType === 'theme-mybets') {
            style += `
                border-left: 1px solid ${GreyPalette.grey7};
                padding-left: 28px;
            `;
        }

        if (!isInHeader) {
            style += 'margin: 0;';
        }

        return style;
    }}
`;

export const S_SubNavMenuNoLink = styled.span<NoLink>`
    text-decoration: none;
    cursor: pointer;
    font-size: 24px;
    position: relative;
    text-align: center;
    align-items: center;
    height: 65px !important;
    margin: unset;
    user-select: none;
    width: 74px;
    justify-content: flex-end;
    display: flex;
    flex-direction: column;

    ${(props): string => {
        const { isInHeader = false } = props;

        let style = `
            @media (min-width: ${breakpoints.bp1280}) {
                height: unset;
                margin: 0;
                font-size: 20px;

                img {
                    height: 24px;
                    width: 24px;
                    margin-top: 5px;
                }

                &.header_nav {
                    img {
                        margin: 0;
                    }
                }
            }
        `;

        if (!isInHeader) {
            style += 'margin: 0;';

            return style;
        }

        return `
            color: ${GreyPalette.grey7};
            ${style}
        `;
    }}
    &.separator {
        border-right: 1px solid ${DarkBluePalette.darkBlue5};
    }
`;

export const S_SubNavMenuSpan = styled.span<Nav>`
    font-family: inherit;
    display: block;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
    margin-bottom: 0;
    width: 100%;
    line-height: 16px;
    padding: 8px 0;
    letter-spacing: -0.04em;
    font-weight: ${fontWeight.semibold};

    ${(props): string => {
        const { isInHeader = false, isNav } = props;
        const { bp768, bp1280 } = breakpoints;

        let style = `
            @media(max-width: ${bp1280}) {
                margin-left: unset;
                width: 68px;
            }

            @media screen and (max-width: ${bp768}) {
                margin: 0;
                align-items: center;
                justify-content: center;
                line-height: 12px;
            }
        `;

        if (isNav) {
            style += `
                @media(max-width: ${bp1280}) {
                    margin-top: 3px;
                    margin-bottom: 10px;
                }
            `;
        } else {
            style += `
                @media(min-width: ${bp1280}) {
                    width: 70px;
                    font-size: 12px;
                }

            `;
        }

        if (!isInHeader) {
            style += `
                font-size: 12px;
            `;
        }

        return style;
    }};
`;

export const S_SubNavigationIconPlaceholder = styled.div`
    width: 24px;
    height: 24px;
`;

export const S_CountOfGames = styled.p`
    font-size: 10px;
    line-height: 13px;
    position: absolute;
    top: 3px;
    right: 3px;
    width: 23px;
    text-align: center;
    margin: 0;
    font-weight: ${fontWeight.medium};
    color: ${cssColor('--navlink-text')};
`;

export const S_SportIcon = styled.div`
    @media (min-width: ${breakpoints.bp1280}) {
        line-height: 0;

        :before {
            height: 24px;
            width: 24px;
            font-size: 24px;
        }
    }

    @media screen and (max-width: ${breakpoints.bp768}) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const S_AlignmentBox = styled.div`
    display: flex;
`;
