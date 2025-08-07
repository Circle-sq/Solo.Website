import type { ReactElement } from 'react';

import type { BetStatus } from 'src/common/enums';
import type { DateRange, RangeType } from 'src/ui/myBets/store/types';
import type { Testable } from 'src/utils/Testable/types';

export interface BetStatusFilters extends Testable {
    value: BetStatus | '';
    label: ReactElement;
}

interface DateInPast<T> {
    isDateInPast: (range: DateRange) => T;
}

interface DateInFuture<T> {
    isDateInFuture: (range: DateRange) => T;
}

type DatePeriod<T extends RangeType, K> = T extends 'from' ? DateInPast<K> : DateInFuture<K>;

export type Rules<T extends RangeType> = DatePeriod<T, boolean> & {
    isValidDateRange: (range: DateRange) => boolean;
};

export type Values<T extends RangeType> = DatePeriod<T, DateRange> & {
    isValidDateRange: (range: DateRange) => DateRange;
};

export interface ValidationRule<T extends RangeType> {
    rules: Rules<T>;
    values: Values<T>;
}

export interface RangeValidationRules {
    from: ValidationRule<'from'>;
    to: ValidationRule<'to'>;
}
