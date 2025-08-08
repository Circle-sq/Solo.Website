import { addDays, endOfDay, startOfDay } from 'date-fns';

import { DayOffset, TimePeriod } from '@solo-asianView/enums';

const startDate = (date: Date, dayOffset: number) => startOfDay(addDays(date, dayOffset)).toISOString();

const endDate = (date: Date, dayOffset: number) => endOfDay(addDays(date, dayOffset)).toISOString();

export const getQueryStartTimes = (date: Date, timePeriod?: TimePeriod): { startDate: string; endDate: string } => {
    const startTime = (dayOffset: DayOffset) => ({
        startDate: startDate(date, dayOffset),
        endDate: endDate(date, dayOffset),
    });

    switch (timePeriod) {
        case TimePeriod.Day1: {
            return startTime(DayOffset.One);
        }

        case TimePeriod.Day2: {
            return startTime(DayOffset.Two);
        }

        case TimePeriod.Day3: {
            return startTime(DayOffset.Three);
        }

        case TimePeriod.Day4: {
            return startTime(DayOffset.Four);
        }

        case TimePeriod.Day5: {
            return startTime(DayOffset.Five);
        }

        case TimePeriod.Onwards: {
            return { startDate: startDate(date, DayOffset.Six), endDate: '9999-12-30T21:59:59.000Z' };
        }

        default: {
            return { startDate: startDate(date, DayOffset.One), endDate: '9999-12-30T21:59:59.000Z' };
        }
    }
};
