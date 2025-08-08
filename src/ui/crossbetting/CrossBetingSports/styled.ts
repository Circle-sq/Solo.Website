import styled from '@emotion/styled';

import { fontWeight, breakpoints, GenericColors, DarkBluePalette, GreyPalette, cssColor } from '@solo-ui/system';

import { S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import { S_SubNavMenu, S_SubNavMenuSpan, S_SubNavMenuLink } from 'src/ui/common/SubNavigation/styled';
import TabsBar from 'src/ui/common/TabsBar/TabsBar';

export const Container = styled(TabsBar.Container)`
    position: relative;
    margin-bottom: 8px;
    display: block;
    background-color: ${GenericColors.transparent};

    @media (max-width: ${breakpoints.bp500}) {
        margin: 0;
    }

    @media (max-width: ${breakpoints.bp960}) {
        border-bottom: unset;
    }
`;

export const CrossbetSubNavSpan = styled(S_SubNavMenuSpan)`
    margin: 0 !important;
    padding: 2px 0;

    ${(): string => {
        const { bp768, bp1279, bp1280 } = breakpoints;

        return `
            @media(min-width: ${bp768}) and (max-width: ${bp1279}), (min-width: ${bp1280}) {
                font-size: 12px;
            }
        `;
    }}
`;

export const S_NavMenuLink = styled(S_SubNavMenuLink)`
    position: relative;

    &.sub_nav {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
        padding: 0 12px;
    }

    &:after {
        display: none;
    }

    &.sports-all:before {
        display: none;
    }

    ${(props): string => {
        const { isActive = false } = props;

        let style = `
            font-weight: ${fontWeight.medium};
            color: ${cssColor('--link-text')};
            font-size: 14px;
            padding: 4px 6px;

            &.sub_nav {
                @media (max-width: ${breakpoints.bp768}) {
                    display: flex;
                    height: 48px;
                    justify-content: space-between;
                    padding-top: 8px;
                }
            }

            & img.crossbet-sub-nav {
                margin: 8px 0 0 0;
                width: 24px;
                height: 24px;

                @media (max-width: ${breakpoints.bp768}) {
                    margin-bottom: 3px;
                }
            }

            &:hover {
                @media (min-width: ${breakpoints.bp768}) {
                    background-color: ${cssColor('--navlink-bg')};
                }
            }

            &: .sub_nav.active {
                color: ${GreyPalette.grey7}

                @media (max-width: ${breakpoints.bp768}) {
                    display: flex;
                    margin-bottom: 4px;
                }
            }

            &: .sub_nav {
                color: ${cssColor('--navlink-text')};
            }

            @media (max-width: ${breakpoints.bp768}) {
                padding: 6px;
                span {
                    margin-bottom: 2px;
                }
            }

            p.count-of-games {
                margin: 0;
                padding: 0;
                position: absolute;
                font-size: 10px;
                color: ${cssColor('--navlink-text')};
                font-weight: ${fontWeight.medium};
                top: 0;
                right: -5px;
            }

            @media (min-width: ${breakpoints.bp1280}) {
                flex-direction: column;
            }
        `;

        if (isActive) {
            style += `
                background-color: ${cssColor('--navlink-bg')};

                &::before {
                    position: absolute;
                    z-index: 99;
                    left: 0;
                    right: 0;
                    bottom: -1px;
                    content: '';
                    border-bottom: 2px solid ${cssColor('--tab-active-border')};
                }
            `;
        }

        return style;
    }}
`;

export const CrossbetSubNavMenu = styled(S_SubNavMenu)`
    &&& {
        margin: 0;
        border-bottom: 1px solid ${cssColor('--chip-large-outlined-border')};
    }

    @media (max-width: ${breakpoints.bp1279max}) {
        padding: 0;
    }

    ${S_SwiperContainer} {
        box-shadow: unset;
        overflow: visible;

        .swiper {
            overflow: visible;
        }
    }

    .sub_nav {
        font-weight: ${fontWeight.medium};
        color: ${GreyPalette.grey7};
        font-size: 24px;
        width: 65px;
        justify-content: center;
        align-items: center;

        @media (max-width: ${breakpoints.bp768}) {
            width: 64px;
            height: 29px;
            display: flex;
            flex-direction: column;
            padding-top: 10px;
            margin-bottom: 6px;
        }

        &.active {
            background-color: ${DarkBluePalette.darkBlue2};
            font-weight: ${fontWeight.medium};
            color: ${GreyPalette.grey7};
            font-size: 24px;
        }
    }

    span {
        min-width: unset;
        line-height: 20px;

        @media (max-width: ${breakpoints.bp768}) {
            width: 70px;
        }
    }
`;

export const S_NavMenuLinkContainer = styled.div`
    display: flex;
    padding: 0;
    position: relative;
    width: 100%;
    justify-content: center;

    &:before {
        margin-left: 2px;
    }
`;
