import styled from '@emotion/styled';

import { breakpoints, fontWeight, GenericColors, GreyPalette, Opacities } from '@sc-ui/system';

export const S_SpeedBet = styled.div``;

export const S_SpeedBetCollapse = styled.div`
    height: 40px;
    background-color: ${GreyPalette.grey1 + Opacities.opacity25};
    padding: 0 16px;
    display: flex;
    align-items: center;
    overflow: hidden;
    cursor: pointer;

    @media (max-width: ${breakpoints.bp960}) {
        justify-content: center;
        height: 26px;
        border-bottom: 1px solid ${GenericColors.white + Opacities.opacity15};
    }

    & > svg {
        font-size: 26px;

        @media (max-width: ${breakpoints.bp960}) {
            order: 1;
        }
    }
`;

export const S_SpeedBetLabel = styled.p`
    font-size: 14px;
    color: ${GenericColors.white};
    font-weight: ${fontWeight.semibold};
    padding: 0;
    margin: 0 6px 0 0;

    @media (max-width: ${breakpoints.bp960}) {
        order: 2;
        margin-left: 6px;
        font-size: 10px;
    }
`;

export const S_MarketWrapper = styled.div`
    flex: 1;
    overflow: hidden;
    margin-left: 16px;
    margin-right: 10px;
    padding-top: 4px;
`;

export const S_MarketLabel = styled.p<{ isScrolling: boolean; containerWidth: number; animationDuration: number }>`
    color: ${GenericColors.white};
    font-size: 14px;
    font-weight: ${fontWeight.medium};
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    transform: translateX(0);

    ${({ isScrolling = false, containerWidth = 0, animationDuration = 0 }) => {
        let style = ``;

        if (isScrolling) {
            style += `
                animation: scrolling-animation linear infinite;
                animation-delay: 1s;
                animation-duration: ${animationDuration}s;

                @keyframes scrolling-animation {
                    0% {
                        transform: translateX(0);
                        animation-timing-function: ease;
                    }
                    30% {
                        transform: translateX(0);
                        animation-timing-function: ease;
                    }
                    50% {
                        transform: translateX(calc(-100% + ${containerWidth}px));
                        animation-timing-function: ease;
                    }
                    80% {
                        transform: translateX(calc(-100% + ${containerWidth}px));
                        animation-timing-function: ease-out;
                    }
                    100% {
                        transform: translateX(0);
                        animation-timing-function: ease-out;
                    }
                }
            `;
        }

        return style;
    }}
`;

export const S_ToggleButton = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    background: none;
    padding: 5px;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        font-size: 12px;
    }

    @media (max-width: ${breakpoints.bp960}) {
        margin-left: initial;
        order: 3;
        padding: 2px;

        svg {
            font-size: 8px;
        }
    }
`;
