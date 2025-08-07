import styled from '@emotion/styled';

import { breakpoints, GenericColors, GreyPalette, LightBluePalette, DarkBluePalette, Opacities } from '@sc-ui/system';

import { Image, SlideAnchor } from '../../content/Banners/components/styled';

import type { ArrowSize } from './types';

export interface NavigationButton {
    position: 'left' | 'right';
    isHidden?: boolean;
    colorTheme?: 'dark';
    offset: number;
    size?: ArrowSize;
}

export interface ContainerProps {
    showButtonsOnHover?: boolean;
    isNav?: boolean;
}

export interface ProgressBarProps {
    duration: number;
    isPaused: boolean;
    isReset: boolean;
}

export const S_NavigationButton = styled.button<NavigationButton>`
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: none;
    outline: 0;
    padding: 0;
    position: absolute;
    text-align: center;
    top: 50%;
    z-index: 3;
    font-size: 1.1em;
    line-height: 2em;
    width: 2em;
    height: 2em;

    &.slick-disabled {
        visibility: hidden;
    }

    &:hover,
    &:focus {
        outline: 0;
    }

    &.slick-arrow,
    &.swiper-arrow {
        display: flex !important;
        align-items: center;
        justify-content: center;
    }

    ${(props): string => {
        const { position, isHidden, colorTheme, offset, size } = props;

        const minimumOffset = 50;
        let defaultMargin = '10px';

        let styles = `
            background-color: ${GenericColors.white};
            color: ${GreyPalette.grey5};
        `;

        switch (size) {
            case 'small':
                defaultMargin = '0px';
                styles += `
                    transform: translateY(-50%) scale(0.6);
                `;

                break;

            default:
                styles += `
                    transform: translateY(-50%);
                `;
        }

        if (position === 'left') {
            styles += `
                left: ${defaultMargin};
                ${offset > minimumOffset ? `left: calc(${offset}px - 2.5em);` : ''}
            `;
        } else if (position === 'right') {
            styles += `
                right: ${defaultMargin};
                ${offset > minimumOffset ? `right: calc(${offset}px - 2.5em);` : ''}
            `;
        }

        if (isHidden === true) {
            styles += `
                visibility: hidden;
            `;
        }

        if (colorTheme === 'dark') {
            styles += `
                background-color: ${GenericColors.black};
                color: ${GenericColors.white};
            `;
        }

        return `
            box-shadow: 0 2px 5px 2px ${GenericColors.black + Opacities.opacity20};
            @media (max-width: ${breakpoints.bp600}) {
                visibility: hidden;
            }
            ${styles};
        `;
    }}
`;

export const S_Container = styled.div<ContainerProps>`
    position: relative;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    z-index: 0;

    .slick-dots {
        bottom: -25px;
        width: 100%;
        margin: 0;
        list-style: none;
        text-align: center;

        li {
            position: relative;
            display: inline-block;
            width: 20px;
            height: 20px;
            margin: 0 5px;
            padding: 0;
            cursor: pointer;
        }

        button {
            font-size: 0;
            line-height: 0;
            display: block;
            width: 20px;
            height: 20px;
            padding: 5px;
            cursor: pointer;
            color: transparent;
            border: 0;
            outline: 0;

            &:focus,
            &:hover {
                outline: 0;
                opacity: 1;
            }
        }
    }

    .slick-list,
    .slick-slider {
        position: relative;
        display: block;
    }

    .slick-loading {
        .slick-slide,
        .slick-track {
            visibility: hidden;
        }
    }

    .slick-slider {
        box-sizing: border-box;
        user-select: none;
        -webkit-touch-callout: none;
        -ms-touch-action: pan-y;
        touch-action: pan-y;
        -webkit-tap-highlight-color: transparent;
    }

    .slick-list {
        overflow: hidden;
        margin: 0;
        padding: 0;

        &:focus {
            outline: 0;
        }

        &.dragging {
            cursor: hand;
        }
    }

    .slick-track {
        top: 0;
        left: 0;
        display: flex;
        overflow: hidden;
        min-width: 100%;

        &:before,
        &:after {
            display: table;
            content: '';
        }
    }

    .slick-track:after {
        clear: both;
    }

    .slick-slide {
        float: left;
        min-height: 1px;

        img {
            display: block;
            object-fit: contain;
        }

        &.slick-loading img {
            display: none;
        }

        &.dragging img {
            pointer-events: none;
        }
    }

    [dir='rtl'] .slick-slide {
        float: right;
    }

    .slick-initialized .slick-slide {
        display: block;
    }

    .slick-vertical .slick-slide {
        display: block;
        height: auto;
    }

    .slick-arrow.slick-hidden {
        display: none;
    }

    ${(props): string => {
        const { showButtonsOnHover, isNav } = props;

        let styles = ``;

        if (showButtonsOnHover === true) {
            styles += `
                .slick-arrow {
                    visibility: hidden;
                }

                &:hover .slick-arrow {
                    visibility: visible;
                }
            `;
        }

        if (isNav) {
            styles += `
                @media(min-width: ${breakpoints.bp1280}){
                    .slick-track {
                        justify-content: unset;
                    }
                }
                `;
        }

        return `
            ${styles};
        `;
    }}
`;

export const SwiperContainer = styled.div<ContainerProps>`
    position: relative;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    z-index: 0;
    background: ${DarkBluePalette.darkBlue1};

    .swiper {
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;

        .swiper-wrapper {
            margin: 0;
            padding: 5px 0 0 0;

            &:focus {
                outline: 0;
            }

            .swiper-slide {
                ${SlideAnchor} {
                    height: 240px;
                    width: 700px;
                    margin: 0 auto;

                    @media (max-width: ${breakpoints.bp680}) {
                        height: auto;
                        width: auto;
                    }

                    ${Image} {
                        height: 100%;
                        width: 100%;
                    }
                }
            }
        }
    }

    ${({ showButtonsOnHover }): string => {
        return showButtonsOnHover
            ? `
            .swiper-arrow {
                visibility: hidden;
            }

            &:hover {
                .swiper-arrow {
                    visibility: visible;
                }
            }
        `
            : '';
    }}
`;

export const S_ProgressBar = styled.div<ProgressBarProps>`
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    height: 4px;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 10;
    background-color: ${LightBluePalette.lightBlue1};

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 0;
        border-radius: 20px;
    }

    @keyframes slide-progress {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }

    ${(props): string => {
        const { duration, isPaused, isReset } = props;

        return `
            &:after {
                background-color: ${LightBluePalette.lightBlue6};
                animation: slide-progress ${duration}s linear 1;
                ${isReset ? 'animation: none' : ''}
                animation-play-state: ${isPaused ? 'paused' : 'running'};
            }
        `;
    }}
`;

export const S_SwiperContainer = styled.div`
    width: 100%;
    overflow: hidden;

    .swiper-slide {
        width: auto;
    }

    .swiper-button-prev,
    .swiper-button-next {
        font-family: 'icons';
        border-radius: 50%;
        border: none;
        cursor: pointer;
        outline: 0;
        padding: 0;
        position: absolute;
        text-align: center;
        top: 50%;
        z-index: 3;
        font-size: 1.1em;
        line-height: 2em;
        width: 2em;
        height: 2em;
        transform: translateY(-50%);
        background-color: ${GenericColors.white};
        color: ${GreyPalette.grey5};
        box-shadow: 0 2px 5px 2px ${GenericColors.black + Opacities.opacity20};
        margin-top: auto;

        @media (max-width: ${breakpoints.bp600}) {
            visibility: hidden;
        }

        &.swiper-button-disabled {
            display: none;
        }

        &:after {
            content: none;
        }
    }

    .swiper-button-prev {
        left: 0;

        &:before {
            content: '';
            color: ${GenericColors.black};
        }
    }

    .swiper-button-next {
        right: 0;

        &:before {
            content: '';
            color: ${GenericColors.black};
        }
    }
`;
