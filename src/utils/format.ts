import { Decimal } from 'decimal.js';
import has from 'lodash/has';

import { currencyToSymbol } from 'src/appState/utils';
import { CryptoCurrency, Currency, CurrencySymbol } from 'src/common/enums';
import type { CurrencyType } from 'src/config/types';
import { DEFAULT_DECIMAL, LANGUAGES, NUMBERS, SECONDS_IN_MINUTE } from 'src/utils/constants';

export const amountToStringFormatter = (amount: number): string => {
    return new Decimal(amount).toDecimalPlaces(DEFAULT_DECIMAL, Decimal.ROUND_DOWN).valueOf();
};

export const amountFormatter = (amount: number | null, showZero = false, currency?: CurrencyType): string => {
    if (amount === null || isNaN(amount)) {
        return 'n/a';
    }

    if (amount === 0 && !showZero) {
        return currency === Currency.KRW ? '-' : '-.--';
    }

    if (amount < 0) {
        return `-${amountToStringFormatter(Math.abs(amount))}`;
    }

    return amountToStringFormatter(amount);
};

export const percentValue = (quantity: number, totalQuantity: number): string => {
    return String(((quantity / totalQuantity) * 100).toFixed());
};

export function toCommaNumber(value: string | number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatNumber(amount: number | string | undefined | null): string {
    if (typeof amount === 'string') {
        return formatDecimal(amount, ',', '.');
    }

    if (typeof amount === 'number') {
        return formatDecimal(amount.toString(), ',', '.');
    }

    return '';
}

export function formatDecimal(amount: string, separatorIn = '.', separatorOut = ','): string {
    return amount.replace(separatorIn, separatorOut);
}

export function formatNumberByLanguage(amount: number, currency: string): string {
    return new Intl.NumberFormat(currency).format(amount);
}

export function formatStrAmountInput(amount: string, separator: string | undefined = ','): string {
    return amount.replace(/(\d)(?=(\d{3})+\.)/g, `$1${separator}`);
}

export function formatStrAmount(amount: string, separator: string | undefined = ',', currency?: CurrencyType): string {
    const isKRW = currency === Currency.KRW;

    const getAmount = (amount: string) => {
        const [numberPart, decimalPart] = amount.split(/[.]/);

        if (decimalPart === undefined) {
            return `${numberPart}.00`;
        }

        return amount;
    };

    if (amount === 'n/a') {
        return amountFormatter(0);
    }

    const result = getAmount(amount).replace(/(\d)(?=(\d{3})+\.)/g, `$1${separator}`);

    return isKRW ? removeDecimals(result) : result;
}

export function removeDecimals(str: string): string {
    return str.replace(/\.[0-9-]+/g, '');
}

const getCurrencySymbol = (currency: Currency | null, showCurrency: boolean, convertToSymbol: boolean) => {
    if (currency === null || !showCurrency) {
        return '';
    }

    if (
        (has(CurrencySymbol, currency) && convertToSymbol) ||
        (CurrencySymbol[currency] !== CurrencySymbol.KRW && !convertToSymbol)
    ) {
        return CurrencySymbol[currency];
    }

    return currency;
};

export const parseAmount = (amount: number) => (amount < 0 ? Math.abs(amount) : amount);

export function money(
    amount: number | null,
    currency: string,
    separator = ',',
    convertToSymbol = true,
    showCurrency = true,
    ceilDecimals = false,
): string {
    if (amount === null || isNaN(amount)) {
        return 'n/a';
    }

    const prefix = amount < 0 ? '-' : '';
    const currencySymbol = `${prefix + getCurrencySymbol(currency as Currency, showCurrency, convertToSymbol)}`;

    const amountValue = parseAmount(amount);

    const result = `${amountValue.toFixed(DEFAULT_DECIMAL).replace(/(\d)(?=(\d{3})+\.)/g, `$1${separator}`)}`;

    if (currency === Currency.KRW) {
        if (ceilDecimals) {
            const numberFormat = new Intl.NumberFormat('en-US');
            const ceiledResult = `${numberFormat.format(Math.ceil(amountValue))}`;

            return removeDecimals(ceiledResult);
        }

        return removeDecimals(result);
    }

    return `${result} ${currencySymbol}`;
}

export function moneyWithoutSymbol(amount: number | null, currency: string, translatedCurrency: string): string {
    if (has(CryptoCurrency, currency.toUpperCase())) {
        return `${amount} ${currency}`;
    }

    return currency === Currency.KRW && !(amount === null || isNaN(amount))
        ? `${money(amount, currency, ',', false)} ${translatedCurrency}`
        : money(amount, currency, ',', false);
}

function formatAmount(amount: number, separator: string): string {
    return amount.toFixed(DEFAULT_DECIMAL).replace(/(\d)(?=(\d{3})+\.)/g, `$1${separator}`);
}

export function moneyAccountSymbolBeforeValue(
    amount: number | null,
    currency: string,
    separator = ',',
    convertToSymbol = true,
    showCurrency = true,
    ceilDecimals = false,
): string {
    if (amount === null || isNaN(amount)) {
        return 'n/a';
    }

    const prefix = amount < 0 ? '-' : '';
    const currencySymbol = getCurrencySymbol(currency as Currency, showCurrency, convertToSymbol);
    const amountValue = parseAmount(amount);
    let formattedAmount = formatAmount(amountValue, separator);

    if (currency === Currency.KRW) {
        if (ceilDecimals) {
            formattedAmount = new Intl.NumberFormat('en-US').format(Math.ceil(amountValue));
        }

        return `${prefix}${currencySymbol} ${removeDecimals(formattedAmount)}`;
    }

    return `${prefix}${currencySymbol} ${formattedAmount}`;
}

export const getDecimalsCount = (numb: number | string): number => {
    const numbToString = numb.toString();

    return numbToString.includes('.') ? numbToString.split('.')[1].length : 0;
};

export const formatDecimalPart = (number: number | string): string => {
    const MAX_DECIMAL = 5;

    const stringNumber = String(number);
    const convertedNumber = Number(stringNumber);

    if (isNaN(convertedNumber)) {
        return stringNumber;
    }

    const decimalsCount = getDecimalsCount(convertedNumber);

    if (decimalsCount > MAX_DECIMAL && convertedNumber < NUMBERS.oneZeroOne) {
        return convertedNumber.toFixed(MAX_DECIMAL);
    }

    if (decimalsCount < DEFAULT_DECIMAL || convertedNumber > NUMBERS.oneZeroOne) {
        return convertedNumber.toFixed(DEFAULT_DECIMAL);
    }

    return convertedNumber.toFixed(decimalsCount);
};

export const capitalizeString = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const formatStake = (stake: string, isKRWCurrency = false): string => {
    const numStake = Number(stake);
    const intStake = parseInt(stake, 10) || 0;

    if (isKRWCurrency) {
        return intStake === 0 ? '' : formatNumberByLanguage(intStake, LANGUAGES.korean);
    } else {
        if (/[.]/.exec(stake) !== null) {
            return formatStrAmountInput(stake);
        } else {
            return numStake === 0 ? '' : formatNumberByLanguage(numStake, LANGUAGES.korean);
        }
    }
};

export const formatAmountWithCurrency = (amount: number, currency: CurrencyType, isFreeBetLabel = false): string => {
    const isCurrencyKRW = currency === Currency.KRW;

    const formatedAmount = isFreeBetLabel
        ? formatStake(String(Math.trunc(amount)), isCurrencyKRW)
        : money(amount, currency, ',', false, false);

    return `${currencyToSymbol(currency)} ${formatedAmount}`;
};

export const formatToSeconds = (initialTime: string) => {
    const [minutes, seconds] = initialTime.split(':');

    return Number(minutes) * SECONDS_IN_MINUTE + Number(seconds);
};
