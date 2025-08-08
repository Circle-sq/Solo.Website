import styled from '@emotion/styled';

import { breakpoints, cssColor, fontWeight, radius } from '@solo-ui/system';

import { PriceChange } from 'src/common/enums';
import { incrementBreakpointValue } from 'src/common/helpers/styled';
import { EventLink, SelectionsContainer } from 'src/ui/events/EventRow/styled';
import { S_Footer } from 'src/ui/events/EventsHighlightCarousel/MarqueeCard/styled';

import { S_MarketGroupSpacing } from '../../MarketGroup/styled';
import { S_SelectionInlineLine } from '../styled';

import { getPriceChangeStyles } from './helpers';

interface BaseSelectionActionProps {
    priceChange?: PriceChange | null;
    isSelected?: boolean;
    isSuspended?: boolean;
    isDisplay?: boolean;
    isHighlightedBuildABet?: boolean;
}

export const S_BaseSelectionAction = styled.button<BaseSelectionActionProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: auto;
    border: none;
    height: 100%;
    width: 100%;
    position: relative;
    text-align: center;
    padding: 0;

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

        50% {
            opacity: 1;
        }

        100% {
            opacity: 1;
        }
    }

    &:after {
        content: '';
        position: absolute;
        right: 0;
    }

    ${({ priceChange, isSelected = false, isSuspended = false, isDisplay = false }) => {
        const isActive = !isSuspended && isDisplay;

        let styles = `
            background-color: ${cssColor('--button-base-bg')};
            color: ${cssColor('--body-text')};
            font-weight: ${fontWeight.bold};
            border-radius: ${radius.selection};

            &:hover {
                ${S_SelectionInlineLine} {
                    color: ${cssColor('--text-tertiary')};
                }
            }

            @media screen and (min-width: ${incrementBreakpointValue(breakpoints.bp960)}) {
                &:hover {
                    background-color: ${cssColor('--button-hover-bg')};

                    ${S_SelectionInlineLine} {
                        color: ${cssColor('--body-text')};
                    }
                }
            }
        `;

        if (isSuspended || !isDisplay) {
            styles += `
                font-size: 12px;
                pointer-events: none;
                color: ${cssColor('--text-secondary')};
                background-color: ${cssColor('--button-bg')};

                &:hover {
                    background-color: ${cssColor('--button-bg')};
                }
            `;
        }

        if (isSelected) {
            styles += `
                font-weight: ${fontWeight.bold};
                border-radius: 4px;

                &&& {
                    background-color: ${cssColor('--button-selected-bg')};

                    &:hover {
                        background-color: ${cssColor('--button-selected-hover-bg')};

                        ${S_SelectionInlineLine} {
                            color: ${cssColor('--body-text')};
                        }
                    }
                }
            `;
        }

        if (!isSelected && isActive) {
            styles += `
                ${EventLink} ${SelectionsContainer} & {
                    background-color: ${cssColor('--button-bg')};

                    &:hover {
                        background-color: ${cssColor('--button-hover-bg')};

                        ${S_SelectionInlineLine} {
                            color: ${cssColor('--body-text')}
                        }
                    }
                }

                ${EventLink}:hover & {
                    background-color: ${cssColor('--button-active-bg')};
                }

                ${S_Footer} & {
                    background-color: ${cssColor('--button-bg')};

                    &:hover {
                        background-color: ${cssColor('--button-hover-bg')};
                    }
                }
            `;
        }

        styles += `
            ${S_MarketGroupSpacing} & {
                border-radius: 0;
            }
        `;

        if (priceChange === PriceChange.Up && isActive) {
            styles += `
                ${getPriceChangeStyles(PriceChange.Up)}
            `;
        } else if (priceChange === PriceChange.Down && isActive) {
            styles += `
                ${getPriceChangeStyles(PriceChange.Down)}
            `;
        }

        return styles;
    }}
`;

export const S_SelectionAction = styled(S_BaseSelectionAction)`
    @media screen and (min-width: ${incrementBreakpointValue(breakpoints.bp960)}) {
        &:hover {
            & > span {
                color: ${cssColor('--text-default-color')};
            }
        }
    }

    && > span {
        font-size: 12px;
        color: ${cssColor('--text-default-color')};
    }
`;
