import { addDays, isSameDay } from 'date-fns';
import includes from 'lodash/includes';
import isUndefined from 'lodash/isUndefined';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { SECONDS_IN_MINUTE, sportsWithSimpleTimer, sportsWithTimer } from 'src/utils/constants';

const padThreshold = 10;

export const formatToSeconds = (initialTime: string) => {
    const [minutes, seconds] = initialTime.split(':');

    return Number(minutes) * SECONDS_IN_MINUTE + Number(seconds);
};

export const isTodayEvent = (date: string) => isSameDay(new Date(), new Date(date));

export const isTomorrowEvent = (date: string) => isSameDay(addDays(new Date(), 1), new Date(date));

export const isSportWithLiveTimer = (sport: string | undefined, period: string) => {
    if (!isUndefined(sport) && includes(sportsWithTimer, sport)) {
        return /^\d/.test(period);
    }

    return false;
};

export const isSportWithSimpleTimer = (sport: string | undefined) =>
    !isUndefined(sport) && includes(sportsWithSimpleTimer, sport);

export const hasStream = ({ media }: EventModel) => media?.streams[0] !== undefined;

export const translateStatisticsMatchMode = (
    t: (key: string, defaultText: string) => string,
    matchMode: string | undefined,
): string | undefined => {
    if (matchMode === undefined) {
        return undefined;
    }

    return t(`events.row.match-mode.${matchMode}`, matchMode);
};

export const padTime = (time = 0) => (time < padThreshold ? `0${time}` : String(time));
