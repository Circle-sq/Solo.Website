import styled from '@emotion/styled';

import { breakpoints, fontWeight, GenericColors, GreyPalette, cssColor } from '@solo-ui/system';

import { S_PageContent } from 'src/layouts/MainWrapper/styled';
import { S_Container, S_SwiperContainer } from 'src/ui/common/Carousel/styled';
import { S_SubNavMenu, S_SubNavMenuSpan } from 'src/ui/common/SubNavigation/styled';

export const S_InPlayPageContent = styled(S_PageContent)`
    flex-direction: column;
    margin-top: 0;

    @media (max-width: ${breakpoints.bp1279max}) {
        margin-top: 0px;
    }
`;

export const S_SportPanel = styled.div`
    margin-bottom: -10px;
    &:empty {
        margin-bottom: 0;
    }
`;

export const S_Heading = styled.h4`
    margin: 30px 0 0 24px;
    font-weight: ${fontWeight.medium};
    color: ${GreyPalette.grey7};

    @media (max-width: ${breakpoints.bp500}) {
        margin: 10px 0 0 17px;
    }
`;

export const S_Message = styled.div`
    position: relative;
    padding: 10px 5px;
    text-align: center;
    font-size: 14px;
    color: ${GenericColors.white};
`;

export const S_SportsNavigationWrapper = styled.div<{ bg?: string }>`
    ${(): string => {
        const { bp1279max, bp1280, bp960, bp500 } = breakpoints;

        return `
            @media (max-width: ${bp1279max}) {
                margin: 0 12px;
                overflow-x: hidden;
            }

            @media (max-width: ${bp500}) {
                margin: 0;
            }

            ${S_SwiperContainer} {
                box-shadow: unset;
                overflow: visible;

                .swiper {
                    overflow: visible;
                }
            }

            ${S_SubNavMenu} {
                position: relative;

                margin: 0;
                padding: 0;

                @media (min-width: ${bp960}) {
                    border: unset;
                }

                &:after {
                    content: '';
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                }

                .sub_nav {
                    padding-top: 12px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-end;

                    ${S_SubNavMenuSpan} {
                        font-size: 12px;
                        margin-bottom: 10px;

                        @media (max-width: ${bp1280}) {
                            margin: 0;
                        }
                    }

                    &.active {
                        background-color: ${cssColor('--navlink-bg')};

                        &:after {
                            content: '';
                            width: 100%;
                            border-left: 0;
                            position: absolute;
                            left: 0;
                            right: 0;
                            bottom: -1px;
                            border-bottom-left-radius: 0;
                            border-bottom: 2px solid ${cssColor('--tab-active-border')};
                        }
                    }

                    @media (min-width: ${bp960}) {
                        &:hover {
                            background-color: ${cssColor('--navlink-bg')};

                            &:after {
                                height: 1px;
                                background-color: ${GreyPalette.grey2};
                            }
                        }
                    }
                }

                .slick-track {
                    padding: 0;
                }
            }

            ${S_Container} {
                z-index: 2;
            }
        `;
    }}
`;
