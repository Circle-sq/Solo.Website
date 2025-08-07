import { differenceInDays, differenceInSeconds, format, isAfter, isEqual, isWithinInterval } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import min from 'lodash/min';
import orderBy from 'lodash/orderBy';

import type { Notification as Banner } from 'src/appState/redux/types';
import { DATE_FORMAT } from 'src/utils/constants';

export const generateTargetName = (url: string, id: number): string => `${url}(${id})`;

export const filterActiveBanners = (items: Banner[], date = new Date()): Banner[] => {
    return filter(items, ({ dateStart, dateStop, published }) => {
        return published && isWithinInterval(date, { start: new Date(dateStart), end: new Date(dateStop) });
    });
};

export const orderBanners = (items: Banner[]): Banner[] => {
    return orderBy(items, ['displayOrder', ({ dateStart }): number => new Date(dateStart).getTime()], ['asc', 'desc']);
};

export const filterAndOrderBanners = (banners: Banner[], date = new Date()): Banner[] => {
    const filteredActiveBanners = filterActiveBanners(banners, date);

    return orderBanners(filteredActiveBanners);
};

export const secondsToFirstExpire = (banners: Banner[], now = new Date()): number | null => {
    if (isEmpty(banners)) {
        return null;
    }

    const withStopDate = filter(banners, 'dateStop');

    if (isEmpty(withStopDate)) {
        return null;
    }

    const first = min(map(withStopDate, ({ dateStop }) => new Date(dateStop)));

    if (first !== undefined && (isAfter(first, now) || isEqual(first, now))) {
        return differenceInSeconds(first, now);
    }

    return null;
};

export const showETA = (stopAt: string, expireAt?: number): string => {
    if (expireAt === undefined) {
        return '--';
    }

    const asDays = differenceInDays(new Date(stopAt), expireAt);

    if (asDays < 0) {
        return '< 0';
    }

    return Math.floor(asDays).toString();
};

export const formatDate = (d: string): string => {
    const date = toZonedTime(d, 'Europe/Chisinau');

    return format(date, DATE_FORMAT.LITERAL_DAY_MONTH_FULL_TIME);
};
