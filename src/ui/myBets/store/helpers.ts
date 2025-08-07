import { addHours, subDays } from 'date-fns';
import isEmpty from 'lodash/isEmpty';

import type { DateRange, MyBetsFilters } from './types';

const MIN_DATE_RANGE = 30;
const TWENTY_THREE_HOURS = 23;

export const defaultDateRange = (): DateRange => ({
    from: subDays(new Date(), MIN_DATE_RANGE),
    to: addHours(new Date(), TWENTY_THREE_HOURS),
    isTouched: false,
});

export const getDateRange = (range: DateRange): Pick<MyBetsFilters, 'range'> | Record<string, never> => {
    if (isEmpty(range)) {
        return {};
    }

    return {
        range: {
            from: new Date(range.from ?? '').toISOString(),
            to: addHours(new Date(range.to ?? ''), TWENTY_THREE_HOURS).toISOString(),
        },
    };
};
