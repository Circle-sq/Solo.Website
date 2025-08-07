import styled from '@emotion/styled';

import { GenericColors, GreyPalette, LightBluePalette, Opacities, fontWeight, breakpoints } from '@sc-ui/system';

export const S_NumpadContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
    margin-bottom: 12px;

    button:nth-of-type(11) {
        grid-column: 6 / 7;
        grid-row: 1 / 2;
    }

    button:nth-of-type(12) {
        grid-column: 6 / 7;
        grid-row: 2 / 3;
    }
`;

export const S_Button = styled.button`
    outline: none;
    border: none;
    background: ${GreyPalette.grey7 + Opacities.opacity30};
    color: ${GenericColors.white};
    font-size: 12px;
    font-weight: ${fontWeight.regular};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 42px;
    padding: 0;

    &:hover {
        background: ${GreyPalette.grey7 + Opacities.opacity40};
    }

    &:focus,
    &:active {
        background: ${LightBluePalette.lightBlue3};
        border: 1px solid ${LightBluePalette.lightBlue9};
    }

    &[disabled] {
        cursor: default;
        background: ${GreyPalette.grey7 + Opacities.opacity20};
        color: ${GenericColors.white + Opacities.opacity30};
        border: none;

        svg path {
            fill: ${GenericColors.white + Opacities.opacity30};
        }

        &:hover,
        &:focus,
        &:active {
            background: ${GreyPalette.grey7 + Opacities.opacity20};
            color: ${GenericColors.white + Opacities.opacity30};
            border: none;
        }
    }
`;

export const S_PresetButton = styled(S_Button)`
    border: 1px solid ${LightBluePalette.lightBlue9};
    background: ${GenericColors.white};
    color: ${LightBluePalette.lightBlue9};

    &:hover {
        background: ${GenericColors.white};
        border: 2px solid ${LightBluePalette.lightBlue9};
    }

    &:focus,
    &:active {
        background: ${LightBluePalette.lightBlue9};
        color: ${GenericColors.white};
    }

    &[disabled] {
        background: ${GreyPalette.grey2};
        color: ${GenericColors.white + Opacities.opacity40};

        &:hover,
        &:focus,
        &:active {
            background: ${GreyPalette.grey2};
            color: ${GenericColors.white + Opacities.opacity40};
        }
    }

    @media (hover: none) {
        &:hover {
            border-width: 1px;
        }
    }
`;

export const S_MarketLabel = styled.p`
    font-size: 14px;
    line-height: 19px;
    color: ${GenericColors.white};
    font-weight: ${fontWeight.medium};
    text-align: center;
    margin: 0 0 10px;
`;

export const S_PresetContainer = styled.div`
    width: 100%;
    margin: 20px auto 12px;

    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;

    & > button:nth-of-type(1) {
        grid-column: span 2 / span 2;
    }
    & > button:nth-of-type(2) {
        grid-column: span 2 / span 2;
        grid-column-start: 3;
    }
    & > button:nth-of-type(3) {
        grid-column: span 2 / span 2;
        grid-column-start: 5;
    }

    @media (max-width: ${breakpoints.bp960}) {
        margin-bottom: 8px;
    }

    @supports (-webkit-touch-callout: none) {
        grid-template-columns: repeat(6, 51px);
    }
`;
