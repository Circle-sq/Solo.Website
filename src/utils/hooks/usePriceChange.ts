import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import { useEffect, useRef, useState } from 'react';

import { PriceChange } from 'src/common/enums';

const blinkNumber = 5;
const blinkDuration = 500;
const lastBlinkDuration = 3000;
export const PRICE_REFRESH_TIMEOUT = blinkNumber * blinkDuration + lastBlinkDuration;

export const usePriceChange = (price: number | undefined) => {
    const [priceDirection, setPriceDirection] = useState<PriceChange | null>(null);
    const previousPrice = useRef<number | undefined | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isNumber(previousPrice.current) && isNumber(price)) {
            // TODO if timeoutRef.current present, it means that the animation is still running
            // if a new price comes in, we should reset the animation with "new" direction
            // I mean restart blinking with new direction
            if (price > previousPrice.current) {
                setPriceDirection(PriceChange.Up);
            } else if (price < previousPrice.current) {
                setPriceDirection(PriceChange.Down);
            } else {
                setPriceDirection(null);
            }

            if (!isNil(timeoutRef.current)) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setPriceDirection(null);
            }, PRICE_REFRESH_TIMEOUT);
        }

        previousPrice.current = price;
    }, [price]);

    useEffect(() => {
        return () => {
            if (isNil(timeoutRef.current)) {
                return;
            }

            clearTimeout(timeoutRef.current);
        };
    }, []);

    return { priceDirection };
};

export default usePriceChange;
