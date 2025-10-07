import { cssColor } from '@solo-ui/system';

import { PriceChange } from 'src/common/enums';

export const getPriceChangeStyles = (priceChange: PriceChange) => {
    const isPriceUp = priceChange === PriceChange.Up;
    const topBottomKey = isPriceUp ? 'top' : 'bottom';
    const arrowWidth = 6;

    return `
        &:after {
            animation:
                blink-increase 0.6s ease-out 0s 6 forwards,
                last-blink 6s ease-out 5s 1 forwards;
            ${topBottomKey}: 0;
            right: 0;
            border: ${arrowWidth}px solid ${cssColor('--badge-generic-border')};
            border-${topBottomKey}: ${arrowWidth - 1}px solid ${cssColor('--badge-secondary-bg')};
            border-right: ${arrowWidth}px solid ${cssColor('--badge-secondary-bg')};
            border-${topBottomKey}-right-radius: 1px;
        }
    `;
};
