import styled from '@emotion/styled';

import { fontWeight, GenericColors, GreyPalette, LightBluePalette, Opacities } from '@solo-ui/system';

export const S_Statistics = styled.div<{ height?: number }>`
    flex: 1;
    overflow: auto;
    padding-right: 6px;

    height: ${({ height }) => (height ? `${height}px` : '326px')};

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${GreyPalette.grey7 + Opacities.opacity15};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${GreyPalette.grey7 + Opacities.opacity70};
        border-radius: 3px;
    }

    .sr-bb {
        background: ${GenericColors.transparent};
        font-family: 'Noto Sans', sans-serif;
    }

    .sr-bb .sr-general-statistics__wrapper {
        padding: 0;
    }

    .sr-bb .sr-general-statistics__matchheader-wrapper {
        border-color: ${GenericColors.white + Opacities.opacity15};
        padding: 0;
        margin-bottom: 10px;
    }

    .sr-bb .sr-matchteamheader__image.sr-crest-jersey {
        width: 16px;
    }

    .sr-bb .sr-matchteamheader__team {
        font-size: 12px;
        font-weight: ${fontWeight.semibold};
        color: ${GenericColors.white};
        margin-top: 0;
    }

    .sr-bb .sr-general-statistics__title {
        font-size: 10px;
        font-weight: ${fontWeight.regular};
        color: ${GreyPalette.grey7};
        text-transform: capitalize;
    }

    .sr-bb .sr-general-statistics__label-val {
        font-size: 12px;
        font-weight: ${fontWeight.regular};
        color: ${GenericColors.white};
    }

    .sr-bb .sr-general-statistics__labels {
        padding-bottom: 6px;
        padding-left: 16px;
        padding-right: 16px;
    }

    .sr-bb .srt-home-1 {
        background-color: ${GenericColors.white};
        margin-left: 0;
    }

    .sr-bb .srt-away-1 {
        background-color: ${LightBluePalette.lightBlue12 + Opacities.opacity40};
        margin-right: 0;
    }

    .sr-bb .sr-general-statistics__group-content {
        padding: 0;
    }

    .sr-bb .srt-neutral-9 {
        background-color: ${GenericColors.white + Opacities.opacity8};
        border-bottom: 1px solid ${GenericColors.white + Opacities.opacity10};
        border-top: none;
        padding: 2px;
        margin-bottom: 8px;
    }

    .sr-bb .sr-headersection__label {
        font-size: 10px;
        color: ${GreyPalette.grey7};
        text-transform: uppercase;
    }

    .sr-bb .sr-general-statistics__group-wrapper:not(:last-child) {
        padding-bottom: 12px;
    }

    .sr-bb .sr-general-statistics__statstypes-wrapper:not(:last-child) {
        padding-bottom: 10px;
    }

    .sr-bb .sr-error__icon-wrapper {
        height: auto;
        flex: auto;
        padding-top: 0;
        padding-bottom: 5px;

        svg {
            opacity: 1;
            max-width: 52px;

            path {
                fill: ${GreyPalette.grey7};
            }
        }
    }

    .sr-bb .srt-text-secondary {
        opacity: 1;
    }

    .sr-bb .sr-error__message-wrapper p {
        font-size: 12px;
        font-weight: ${fontWeight.medium};
        color: ${GreyPalette.grey7};
    }

    .sr-widget-2 {
        height: 100%;
    }

    .sr-bb {
        height: 100%;
    }

    .sr-bb .sr-loader__container {
        height: 100%;
    }

    .sr-bb .sr-error__container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sr-bb .sr-error__icon-wrapper {
        max-height: 60px;
    }

    .sr-bb .sr-error__message-wrapper {
        padding-bottom: 0;
    }
`;

export const S_Error = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;

    svg {
        font-size: 52px;
        margin-bottom: 5px;

        path {
            fill: ${GreyPalette.grey7};
        }
    }
`;

export const S_ErrorLabel = styled.p`
    font-size: 12px;
    font-weight: ${fontWeight.medium};
    color: ${GreyPalette.grey7};
    margin: 0;
`;
