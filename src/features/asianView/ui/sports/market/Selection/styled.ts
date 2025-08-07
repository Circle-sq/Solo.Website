import styled from '@emotion/styled';

import { breakpoints, cssColor, GenericColors, LightBluePalette, Opacities, YellowPalette } from '@sc-ui/system';

export const S_SingleValueCell = styled.div`
    position: relative;
    height: 16px;
`;

export const S_SmallLockWrapper = styled(S_SingleValueCell)`
    margin-right: 12px;
`;

export const S_OddsChangeArrow = styled.span<{ offsetRight?: string }>`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px !important;
    height: 100%;
    background: transparent;
    right: ${({ offsetRight = '-12%' }) => offsetRight};

    @keyframes blink-increase {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes last-blink {
        0% {
            opacity: 1;
        }

        99% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    animation:
        blink-increase 0.5s ease-out 0s 6 forwards,
        last-blink 3s ease-out 3s 1 forwards;
`;

export const S_OddsRange = styled.span`
    color: ${cssColor('--text-tertiary')};
`;

export const S_ValueWithRangeCell = styled.div`
    display: flex;
    gap: 10%;
`;

const baseStyles = `
    display: inline-block;
    cursor: pointer;
    border-radius: 3px;
    padding: 0 3px;
    user-select: none;
    min-width: 48px;
`;

const highlightedStyles = `
    box-shadow: inset 0 0 0 1px ${YellowPalette.yellow1};
    background-color: ${YellowPalette.yellow2};

    &:focus {
        box-shadow: inset 0 0 0 1px ${YellowPalette.yellow1};
    }

    &:hover {
        background-color: ${YellowPalette.yellow2};
        box-shadow: inset 0 0 0 1px ${YellowPalette.yellow3};
    }
`;

export const S_OddsValue = styled.span`
    ${baseStyles};
    background: ${GenericColors.transparent};

    &:hover {
        background-color: ${GenericColors.white + Opacities.opacity20};
    }

    @media (max-width: ${breakpoints.bp1440}) {
        font-size: 12px;
    }
`;

export const S_SelectedOddsValue = styled(S_OddsValue)`
    background: ${LightBluePalette.lightBlue3};

    &:hover {
        background-color: ${LightBluePalette.lightBlue5};
    }
`;

export const S_HighlightedBuildABetOddsValue = styled(S_OddsValue)`
    ${highlightedStyles}
`;

export const S_FractionalOddsValue = styled(S_OddsValue)`
    min-width: 50px;
`;

export const S_HighlightedBuildABetFractionalOddsValue = styled(S_FractionalOddsValue)`
    ${highlightedStyles}
`;

export const S_SelectedFractionalOddsValue = styled(S_FractionalOddsValue)`
    background: ${LightBluePalette.lightBlue3};

    &:hover {
        background-color: ${LightBluePalette.lightBlue5};
    }
`;
