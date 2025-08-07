import { Decimal } from 'decimal.js';
import get from 'lodash/get';

import { OddsFormat } from 'src/common/enums';
import { formatDecimalPart } from 'src/utils/format';

import type { BaseLeg } from '../api/types/leg';
import { DASH } from '../configs';

const digitsAfterDot = 2;
const oneZeroOne = 1.01;
const twoElements = 2;

const greaterCommonDominator = (num1: number, num2: number): number => {
    return num2 === 0 ? num1 : greaterCommonDominator(num2, num1 % num2);
};

const reduce = (num: number, dom: number): [number, number] => {
    const result = greaterCommonDominator(num, dom);

    return [num / result, dom / result];
};

const calcTotalFractional = <T extends BaseLeg>(bets: T[]): string => {
    const [a, b] = bets.reduce(
        ([accA, accB], { price }) => {
            if (price === undefined) {
                return [1, 1];
            }

            const f = get(price, 'f', '0/0');
            const fs = f.split('/');

            const validFraction = fs.length === twoElements;

            if (validFraction) {
                return [accA * (parseFloat(fs[0]) + parseFloat(fs[1])), accB * parseFloat(fs[1])];
            } else {
                return [1, 1];
            }
        },
        [1, 1],
    );

    const [num, dom] = reduce(a - b, b);

    return `${num}/${dom}`;
};

const calcTotalDecimal = <T extends BaseLeg>(bets: T[]): number =>
    bets.reduce((total: number, leg) => {
        if (leg.price === undefined) {
            return total;
        }

        const price = new Decimal(get(leg, 'price.d', 0)).abs();
        const totalIn = new Decimal(total);

        return price.mul(totalIn).toNumber();
    }, 1);

export const calcTotalOdds = <T extends BaseLeg>(bets: T[] | undefined, oddFormat: OddsFormat): string => {
    if (bets === undefined || bets.length === 0) {
        return DASH;
    }

    switch (oddFormat) {
        case OddsFormat.Decimal: {
            const totalDecimal = calcTotalDecimal(bets);
            const decimalPrice = formatDecimalPart(totalDecimal);

            return totalDecimal < oneZeroOne ? decimalPrice : Number(decimalPrice).toFixed(digitsAfterDot);
        }

        case OddsFormat.Fractional:
            return calcTotalFractional(bets);

        default:
            return '';
    }
};
