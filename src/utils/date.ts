import { addDays } from 'date-fns';
import times from 'lodash/times';

export const getDateRange = (range = 0, startDate: Date = new Date()): Date[] =>
    times(range, (days) => addDays(startDate, days));

export const WeekDayName = (date: Date): string => {
    const arrayOfWeekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const weekdayNumber = date.getDay();

    return arrayOfWeekdays[weekdayNumber];
};

export const parseCustomDate = (date: string): Date => {
    const [year, month, day] = date.split('.');

    return new Date(Number(year), Number(month) - 1, Number(day));
};
