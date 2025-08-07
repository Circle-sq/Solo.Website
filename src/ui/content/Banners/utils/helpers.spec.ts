import { addHours, addMinutes, differenceInSeconds } from 'date-fns';
import map from 'lodash/map';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId';

import type { Notification } from 'src/appState/redux/types';

import { filterAndOrderBanners, formatDate, generateTargetName, secondsToFirstExpire } from './helpers';

const now = new Date();
const one_hour_ago = addHours(now, -1);
const in_1_hour = addHours(now, 1);
const in_1_5_hour = addHours(now, 1.5);
const in_2_hours = addHours(now, 2);
const start_1_hour_ago_and_1min_late = addMinutes(one_hour_ago, 1);
const start_1_hour_ago_and_5min_late = addMinutes(one_hour_ago, 5);
const in_3_hours = addHours(now, 3);

const format = (date: Date): string => date.toISOString();

const buildBanner = (props: Record<string, string | number | null>): Notification =>
    ({
        published: true,
        openUrl: 'new_tab',
        dateStart: format(one_hour_ago),
        ...props,
    }) as Notification;

const banner_id_1_order_0_expire_in_1_hour = buildBanner({ id: 1, displayOrder: 0, dateStop: format(in_1_hour) });
const banner_id_2_order_1_expire_in_2_hours = buildBanner({ id: 2, displayOrder: 1, dateStop: format(in_2_hours) });
const banner_id_3_order_1_expire_in_1_hour = buildBanner({ id: 3, displayOrder: 1, dateStop: format(in_1_hour) });
const banner_id_4_order_3_expire_in_1_hour = buildBanner({ id: 4, displayOrder: 3, dateStop: format(in_1_hour) });
const banner_id_5_order_4_expire_in_2_hours = buildBanner({ id: 5, displayOrder: 4, dateStop: format(in_2_hours) });
const banner_id_6_order_4_expire_in_3_hours = buildBanner({ id: 6, displayOrder: 4, dateStop: format(in_3_hours) });
const banner_id_7_order_4_expire_in_2_hours_starts_1min_late = buildBanner({
    id: 7,
    displayOrder: 4,
    dateStop: format(in_2_hours),
    dateStart: format(start_1_hour_ago_and_1min_late),
});

const banner_id_8_order_4_expire_in_2_hours_starts_5min_late = buildBanner({
    id: 8,
    displayOrder: 4,
    dateStop: format(in_2_hours),
    dateStart: format(start_1_hour_ago_and_5min_late),
});

// SHUFFLE ALL YOU WANT
const shuffledBanners: Notification[] = [
    banner_id_6_order_4_expire_in_3_hours,
    banner_id_4_order_3_expire_in_1_hour,
    banner_id_2_order_1_expire_in_2_hours,
    banner_id_5_order_4_expire_in_2_hours,
    banner_id_1_order_0_expire_in_1_hour,
    banner_id_3_order_1_expire_in_1_hour,
];

const generatedRandomUrlWithUniqueId = uniqueId('https://some-random.com/something/');
const randomId = uniqueId();

describe('Banners sorting and filtering helpers', () => {
    it('should check how moment works', () => {
        expect(map([one_hour_ago, in_1_hour, in_1_5_hour, in_2_hours, in_3_hours], format).join('-')).toEqual(
            map([-1, 1, 1.5, 2, 3], (hours) => format(addHours(now, hours))).join('-'),
        );
    });

    it('should sort banners by display order and time: start < date < end', () => {
        const orderedByDisplayOrderAndStartDate: Notification[] = [
            banner_id_1_order_0_expire_in_1_hour,
            banner_id_2_order_1_expire_in_2_hours,
            banner_id_3_order_1_expire_in_1_hour,
            banner_id_4_order_3_expire_in_1_hour,
            banner_id_8_order_4_expire_in_2_hours_starts_5min_late,
            banner_id_7_order_4_expire_in_2_hours_starts_1min_late,
            banner_id_6_order_4_expire_in_3_hours,
            banner_id_5_order_4_expire_in_2_hours,
        ];

        expect(
            map(
                filterAndOrderBanners([
                    banner_id_7_order_4_expire_in_2_hours_starts_1min_late,
                    banner_id_6_order_4_expire_in_3_hours,
                    banner_id_4_order_3_expire_in_1_hour,
                    banner_id_2_order_1_expire_in_2_hours,
                    banner_id_5_order_4_expire_in_2_hours,
                    banner_id_1_order_0_expire_in_1_hour,
                    banner_id_3_order_1_expire_in_1_hour,
                    banner_id_8_order_4_expire_in_2_hours_starts_5min_late,
                ]),
                'id',
            ).join('-'),
        ).toEqual(map(orderedByDisplayOrderAndStartDate, 'id').join('-'));
    });

    describe('firstToExpire', () => {
        const data = [
            banner_id_7_order_4_expire_in_2_hours_starts_1min_late,
            ...shuffledBanners,
            banner_id_8_order_4_expire_in_2_hours_starts_5min_late,
        ];
        const badData = times(3, (id: number) => ({ id }));

        it('should return null when empty array is used', () => {
            expect(secondsToFirstExpire([])).toBeNull();
        });

        it('should return null when no items with dateStart is provide', () => {
            expect(secondsToFirstExpire(badData as Notification[])).toBeNull();
        });

        it('should return time till first expire', () => {
            expect(secondsToFirstExpire(data, now)).toEqual(differenceInSeconds(in_1_hour, now));

            expect(
                secondsToFirstExpire([...badData, banner_id_5_order_4_expire_in_2_hours] as Notification[], now),
            ).toEqual(differenceInSeconds(in_2_hours, now));
        });
    });

    describe('link opener helper', () => {
        it('should generate a string from url and id', () => {
            const targetName = generateTargetName(generatedRandomUrlWithUniqueId, Number(randomId));

            expect(targetName).toBe(`${generatedRandomUrlWithUniqueId}(${randomId})`);
        });
    });
});

describe('formatDate (LITERAL_DAY_MONTH_FULL_TIME) dd MMM HH:mm:ss - 25 May 15:20:45', () => {
    it('should format a valid date string correctly', () => {
        const dateStr = '2023-10-10T10:00:00Z';
        const formattedDate = formatDate(dateStr);
        expect(formattedDate).toBe('10 Oct 13:00:00');
    });

    it('should handle an invalid date string gracefully', () => {
        const dateStr = 'invalid-date';
        expect(() => formatDate(dateStr)).toThrow();
    });

    it('should handle an empty date string gracefully', () => {
        const dateStr = '';
        expect(() => formatDate(dateStr)).toThrow();
    });

    it('should handle a date string with different timezone correctly', () => {
        const dateStr = '2023-10-10T10:00:00+02:00';
        const formattedDate = formatDate(dateStr);
        expect(formattedDate).toBe('10 Oct 11:00:00');
    });
});
