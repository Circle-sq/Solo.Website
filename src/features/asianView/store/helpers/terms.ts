import { endOfDay, startOfDay, subDays } from 'date-fns';

import type { SearchEventsTermsByTimeTab } from '@solo-api/events/types';

import { getQueryStartTimes } from '../../api/helpers/date';
import { DayOffset, LHNTimeTab, type TimePeriod } from '../../enums';

export const getEventListTermsByTab = (timeTab?: LHNTimeTab, timePeriod?: TimePeriod): SearchEventsTermsByTimeTab => {
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
            marketIndex: { type: 'exists' },
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
        marketIndex: { type: 'exists' },
        'timeSettings.startTime': {
            type: 'range',
            from: startOfDay(date).toISOString(),
            to: endOfDay(date).toISOString(),
        },
    };
};
