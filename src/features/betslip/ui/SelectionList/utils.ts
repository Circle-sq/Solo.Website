import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import type { ReactElement } from 'react';

import { Currency } from 'src/common/enums';
import { PriceType } from 'src/common/types/selectionPrice';
import { formatDecimalPart, formatNumber, removeDecimals } from 'src/utils/format';

import type { Leg } from '../../api/types/leg';

export const getFormattedValueWithCurrency = (
    currency: string,
    value: string,
    translateCurrency: string | ReactElement,
): string => {
    return `${currency === Currency.KRW ? removeDecimals(value) : value} ${translateCurrency}`;
};

interface PossibleReturnsParams {
    leg: Leg;
    isChecked: boolean;
    isFreeBet?: boolean;
    isSuspended?: boolean;
    stakePerLine?: number;
}

const EMPTY = 0;
const NUMERATOR_POSITION = 0;
const DECIMATOR_POSITION = 1;
const CRYPTO_DIGITS_COUNT = 8;
const DEFAULT_DIGITS_COUNT = 2;

export const getPossibleReturns = ({
    leg,
    stakePerLine,
    isChecked,
    isFreeBet = false,
    isSuspended = false,
}: PossibleReturnsParams): number => {
    if ((isChecked && isSuspended) || stakePerLine === undefined) {
        return EMPTY;
    }

    const { priceType, potentialReturns, potentialReturnsAt, eachWay = false } = leg;
    const fractionalPrice = get(leg, 'price.f', 0) as string | number;

    if (potentialReturnsAt === stakePerLine || fractionalPrice === 0 || eachWay) {
        return potentialReturns ?? EMPTY;
    }

    if (priceType === PriceType.SP) {
        return EMPTY;
    }

    const price = isString(fractionalPrice) ? fractionalPrice.split('/') : [fractionalPrice];
    const winnings = (Number(price[NUMERATOR_POSITION]) * stakePerLine) / Number(price[DECIMATOR_POSITION]);

    return isFreeBet ? winnings : winnings + stakePerLine;
};

export const getOddsPrice = (
    getTranslation: (key: string, defaultText: string) => string,
    isDecimalFormat: boolean,
    price: string | number | null | undefined,
): string => {
    if (price == null) {
        return '';
    }

    if (price === 'SP') {
        return getTranslation('selection.price.sp.value', 'SP');
    }

    if (isDecimalFormat && isNumber(price)) {
        return formatNumber(formatDecimalPart(price));
    }

    return String(price);
};

export const decimalScale = (isCurrencyCrypto: boolean, isCurrencyKRW: boolean) => {
    if (isCurrencyCrypto) {
        return CRYPTO_DIGITS_COUNT;
    }

    if (isCurrencyKRW) {
        return EMPTY;
    }

    return DEFAULT_DIGITS_COUNT;
};
