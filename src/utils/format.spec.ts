import { Currency } from '../common/enums';

import {
    money,
    formatNumber,
    formatDecimalPart,
    getDecimalsCount,
    formatAmountWithCurrency,
    amountFormatter,
    amountToStringFormatter,
    percentValue,
    toCommaNumber,
    moneyAccountSymbolBeforeValue,
} from './format';

describe('Format utils', () => {
    it('should format amount value to use dot instead of comma', () => {
        expect(formatNumber(null)).toBe('');
        expect(formatNumber(undefined)).toBe('');
        expect(formatNumber('4,56')).toBe('4.56');
        expect(formatNumber('')).toBe('');
    });

    it('should format the decimal part', () => {
        expect(formatDecimalPart('4.566666666666')).toBe('4.57');
        expect(formatDecimalPart('4.5')).toBe('4.50');
        expect(formatDecimalPart('4.33')).toBe('4.33');
        expect(formatDecimalPart('')).toBe('0.00');
        expect(formatDecimalPart('random')).toBe('random');
        expect(formatDecimalPart('1.001')).toBe('1.001');
        expect(formatDecimalPart('4.567')).toBe('4.57');
        expect(formatDecimalPart('1.0056665')).toBe('1.00567');
        expect(formatDecimalPart('1.00510')).toBe('1.0051');
    });

    it('should return the decimal count', () => {
        expect(getDecimalsCount('4.566666666666')).toBe(12);
        expect(getDecimalsCount('4.5')).toBe(1);
        expect(getDecimalsCount('4.33')).toBe(2);
    });

    it('should format currency with and without symbol', () => {
        expect(moneyAccountSymbolBeforeValue(123, 'KRW')).toBe('₩ 123');
        expect(moneyAccountSymbolBeforeValue(1000000, 'KRW')).toBe('₩ 1,000,000');
    });

    it('should format a currency with symbol for any currency (that we support)', () => {
        //CurrencyType = 'GBP' | 'EUR' | 'XTS' | 'CAD' | 'NZD' | 'USD' | 'KRW';

        expect(money(100, 'GBP')).toBe(`£ 100.00`);
        expect(money(100, 'EUR')).toBe(`€ 100.00`);
        expect(money(100, 'XTS')).toBe(`X 100.00`);
        expect(money(100, 'CAD')).toBe(`$ 100.00`);
        expect(money(100, 'NZD')).toBe(`$ 100.00`);
        expect(money(100, 'USD')).toBe(`$ 100.00`);
    });

    it('should format the amount and currency', () => {
        expect(formatAmountWithCurrency(100, Currency.KRW, true)).toBe(`₩ 100`);
        expect(formatAmountWithCurrency(1000, Currency.EUR, true)).toBe(`€ 1,000`);
        expect(formatAmountWithCurrency(10000, Currency.USD, true)).toBe(`$ 10,000`);
    });

    it('should format amount value to comma number format', () => {
        expect(toCommaNumber(100)).toBe('100');
        expect(toCommaNumber(1000)).toBe('1,000');
        expect(toCommaNumber(100000)).toBe('100,000');
        expect(toCommaNumber(1000000)).toBe('1,000,000');
        expect(toCommaNumber('100.10')).toBe('100.10');
        expect(toCommaNumber('10000.10')).toBe('10,000.10');
        expect(toCommaNumber('1000000.10')).toBe('1,000,000.10');
        expect(toCommaNumber('999999/2')).toBe('999,999/2');
        expect(toCommaNumber('1000000/125')).toBe('1,000,000/125');
        expect(toCommaNumber('1000000/1250')).toBe('1,000,000/1,250');
    });

    it('should format the amount according to its value and currency', () => {
        expect(amountFormatter(null, false, Currency.KRW)).toBe('n/a');
        expect(amountFormatter(0, false, Currency.KRW)).toBe('-');
        expect(amountFormatter(0, false, Currency.USD)).toBe('-.--');
        expect(amountFormatter(-1, true, Currency.USD)).toBe('-1');
        expect(amountFormatter(-1, false, Currency.USD)).toBe('-1');
        expect(amountFormatter(1, true, Currency.KRW)).toBe('1');
        expect(amountFormatter(1, false, Currency.KRW)).toBe('1');
    });

    it('should convert to string', () => {
        expect(amountToStringFormatter(1000)).toBe('1000');
        expect(amountToStringFormatter(100)).toBe('100');
        expect(amountToStringFormatter(1)).toBe('1');
        expect(amountToStringFormatter(10)).toBe('10');
        expect(amountToStringFormatter(-10)).toBe('-10');
    });

    it('should show percentage value based on quantity and totalQuantity', () => {
        expect(percentValue(120, 100)).toBe('120');
        expect(percentValue(10, 100)).toBe('10');
        expect(percentValue(5, 35)).toBe('14');
        expect(percentValue(-5, 35)).toBe('-14');
    });
});

describe('moneyAccountSymbolBeforeValue', () => {
    it('returns "n/a" when amount is null', () => {
        const result = moneyAccountSymbolBeforeValue(null, 'USD');
        expect(result).toBe('n/a');
    });

    it('formats positive amount with USD currency', () => {
        const result = moneyAccountSymbolBeforeValue(100940179849, 'USD');
        expect(result).toBe('$ 100,940,179,849.00');
    });

    it('formats negative amount with EUR currency', () => {
        const result = moneyAccountSymbolBeforeValue(-9876, 'EUR');
        expect(result).toBe('-€ 9,876.00');
    });

    test('formats KRW amount with convertToSymbol', () => {
        const result = moneyAccountSymbolBeforeValue(12345, 'KRW', ',', true);
        expect(result).toBe('₩ 12,345');
    });

    test('formats KRW amount without convertToSymbol', () => {
        const result = moneyAccountSymbolBeforeValue(1234555.67, 'KRW', ',', false);
        expect(result).toBe('KRW 1,234,555');
    });

    test('formats KRW amount with ceilDecimals', () => {
        const result = moneyAccountSymbolBeforeValue(123434, 'KRW', ',', false, true, true);
        expect(result).toBe('KRW 123,434');
    });
});
