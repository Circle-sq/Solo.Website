import styled from '@emotion/styled';
import isNil from 'lodash/isNil';

import { fontWeight, cssColor } from '@sc-ui/system';

import { PriceChange } from 'src/common/enums';

export const S_SelectionPriceAction = styled.span<{ priceChange?: PriceChange | null; isSuspended?: boolean }>`
    display: flex;
    border: none;
    align-items: center;
    padding: 5px 8px;
    height: 20px;
    font-size: 14px;
    position: relative;
    font-weight: ${fontWeight.semibold};
    color: ${cssColor('--body-text')};
    border-radius: 2px;

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
    }

    ${(props): string => {
        const { isSuspended, priceChange } = props;

        let styles = `background-color: ${cssColor('--chip-betslip-bg')};`;
        const arrowWidth = '9px';

        const getPriceChangeStyles = (priceChange: PriceChange): string => {
            const isPriceUp = priceChange === PriceChange.Up;
            const topBottomKey = isPriceUp ? 'top' : 'bottom';

            return `
                &:after {
                    animation: blink-increase 0.6s ease-out 0s 6 forwards,
                    last-blink 6s ease-out 5s 1 forwards;

                    ${topBottomKey}: 0;
                    right: 0;
                    border-${topBottomKey}: ${arrowWidth} solid ${
                        isPriceUp ? cssColor('--icon-price-up-border') : cssColor('--icon-price-down-border')
                    };
                    border-left: ${arrowWidth} solid transparent;
                }
            `;
        };

        if (!isNil(priceChange)) {
            styles += `${getPriceChangeStyles(priceChange)}`;
        }

        if (isSuspended === true) {
            styles = `
                background-color: transparent;
                pointer-events: none;
                color: ${cssColor('--chip-betslip-disabled-bg')};
            `;
        }

        return `
            border-radius: 2px;

            ${styles}
        `;
    }}
`;

export const S_SelectionStatus = styled.div`
    margin-left: auto;
    font-size: 12px;
    padding: 4px 8px;
    line-height: 1;
    text-transform: uppercase;
    max-height: 20px;
    white-space: nowrap;
    color: ${cssColor('--body-text')};
    font-weight: ${fontWeight.bold};
    background-color: ${cssColor('--box-selection-status-closed-bg')};
`;
