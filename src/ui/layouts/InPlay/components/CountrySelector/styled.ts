import styled from '@emotion/styled';

import {
    fontWeight,
    breakpoints,
    Opacities,
    GreyPalette,
    LightBluePalette,
    GenericColors,
    cssColor,
} from '@solo-ui/system';

import Link from 'src/utils/Router/NewLink';

export const S_CountriesContainer = styled.div`
    padding: 16px 0 16px 0;
    font-size: 12px;

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
        font-size: 1em;
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
            color: ${GreyPalette.grey5};
        }
    }

    .swiper-button-next {
        right: 0;
        &:before {
            content: '';
            color: ${GreyPalette.grey5};
        }
    }
`;

export const S_Country = styled(Link)<{ selected?: boolean }>`
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    color: ${cssColor('--navlink-text')};
    text-decoration: none;
    font-size: 12px;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.200008);
    border-radius: 1.05em;
    padding: 0 1.05em;
    margin-right: 8px;
    text-align: center;
    font-weight: ${fontWeight.medium};
    border: 1px solid ${cssColor('--chip-large-outlined-border')};

    ${({ selected }): string => {
        return `
            background-color: ${selected ? cssColor('--chip-filters-active-bg') : cssColor('--chip-filters-bg')};
            ${selected ? 'pointer-events: none;' : ''}
            ${selected ? `border-color: ${GenericColors.transparent};` : ''}

            &:hover {
                background-color: ${LightBluePalette.lightBlue3};
                border-color: ${GenericColors.transparent};
            }
        `;
    }};
`;
