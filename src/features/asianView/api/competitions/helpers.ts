import { endOfDay, startOfDay, subDays } from 'date-fns';

import { DayOffset, LHNTimeTab, type TimePeriod } from '@solo-asianView/enums';

import { getQueryStartTimes } from '../helpers/date';

import type { SearchCompetitionsWithEventsTermsByTimeTab } from './types';

export const getCompetitionTermsByTimeTab = (
    timeTab?: LHNTimeTab,
    timePeriod?: TimePeriod,
): SearchCompetitionsWithEventsTermsByTimeTab => {
    const date = new Date();

    if (timeTab === LHNTimeTab.Live) {
        return {
            'market.tradedInPlay': {
                type: 'match',
                value: 'true',
            },
            'timeSettings.tradedInPlay': {
                type: 'match',
                value: 'true',
            },
            'timeSettings.started': {
                type: 'match',
                value: 'true',
            },
            'timeSettings.startTime': {
                type: 'range',
                from: subDays(date, DayOffset.Six).toISOString(),
                to: date.toISOString(),
            },
        };
    }

    if (timeTab === LHNTimeTab.Upcoming) {
        const { startDate, endDate } = getQueryStartTimes(date, timePeriod);

        return {
            'market.tradedInPlay': {
                type: 'match',
                value: 'false',
            },
            'timeSettings.started': {
                type: 'match',
                value: 'false',
            },
            'timeSettings.startTime': {
                type: 'range',
                from: startDate,
                to: endDate,
            },
        };
    }

    return {
        'timeSettings.startTime': {
            type: 'range',
            from: startOfDay(date).toISOString(),
            to: endOfDay(date).toISOString(),
        },
    };
};
