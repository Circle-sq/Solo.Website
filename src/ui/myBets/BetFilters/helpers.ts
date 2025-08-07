import { addDays, addHours, differenceInDays, format, isDate, isValid, parse, subDays, subHours } from 'date-fns';

import type { DateRange, RangeType } from 'src/ui/myBets/store/types';
import { DATE_FORMAT } from 'src/utils/constants';

import type { RangeValidationRules, Rules } from './types';

const MAX_DATE_RANGE = 90;

export const getDiff = (dateA: Date | string = '', dateB: Date | string = ''): number =>
    differenceInDays(new Date(dateA), new Date(dateB));

const rangeValidationRules: Readonly<RangeValidationRules> = {
    from: {
        rules: {
            isValidDateRange: ({ from, to }) => Math.abs(getDiff(from, to)) > MAX_DATE_RANGE,
            isDateInPast: ({ from, to }): boolean => getDiff(from, to) > 0,
        },
        values: {
            isValidDateRange: ({ from = '' }) => ({
                to: format(addHours(addDays(new Date(from), MAX_DATE_RANGE), 23), DATE_FORMAT.NUMERIC_DATE),
                isValid: false,
            }),
            isDateInPast: ({ from = '' }) => ({
                from: format(new Date(from), DATE_FORMAT.NUMERIC_DATE),
                to: format(addHours(new Date(from), 23), DATE_FORMAT.NUMERIC_DATE),
                isValid: false,
            }),
        },
    },
    to: {
        rules: {
            isValidDateRange: ({ from, to }) => Math.abs(getDiff(to, from)) > MAX_DATE_RANGE,
            isDateInFuture: ({ from, to }) => getDiff(to, from) < 0,
        },
        values: {
            isValidDateRange: ({ to = '' }) => ({
                from: format(subDays(new Date(to), MAX_DATE_RANGE), DATE_FORMAT.NUMERIC_DATE),
                isValid: false,
            }),
            isDateInFuture: ({ to = '' }) => ({
                from: format(new Date(to), DATE_FORMAT.NUMERIC_DATE),
                to: format(addHours(new Date(to), 23), DATE_FORMAT.NUMERIC_DATE),
                isValid: false,
            }),
        },
    },
};

export const validateDateRange = (type: RangeType, values: DateRange): DateRange => {
    const { rules, values: rangeValues } = rangeValidationRules[type];
    const rulesKeys = Object.keys(rules) as (keyof Rules<RangeType>)[];

    return rulesKeys.reduce((acc: DateRange, rule) => {
        const isValid = rules[rule];
        const getValidationValues = rangeValues[rule];

        return { ...acc, ...(isValid(values) ? getValidationValues(values) : {}) };
    }, {});
};

export const emptyDateValidation = ({ from = '', to = '' }: DateRange): DateRange => {
    switch (true) {
        case !isValid(new Date(from)) && !isValid(new Date(to)):
            return {
                isTouched: false,
            };

        case !isValid(new Date(from)):
            return {
                from: format(subDays(new Date(to), MAX_DATE_RANGE), DATE_FORMAT.NUMERIC_DATE),
            };

        case !isValid(new Date(to)):
            return {
                to: format(subHours(new Date(from), 23), DATE_FORMAT.NUMERIC_DATE),
            };

        default:
            return {};
    }
};

export const formatRangeValue = (range: DateRange): string => {
    const { from, to } = range;

    if (from && to) {
        const fromDate = format(new Date(from), DATE_FORMAT.NUMERIC_DATE);
        const toDate = format(new Date(to), DATE_FORMAT.NUMERIC_DATE);

        return `${fromDate} - ${toDate}`;
    }

    return '';
};

export const parseDateFormat = (date: Date | string): Date | null => {
    if (isDate(date)) {
        return date;
    }

    return parse(date, DATE_FORMAT.NUMERIC_DATE, new Date());
};
