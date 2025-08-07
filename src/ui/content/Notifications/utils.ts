import { isWithinInterval, parseISO } from 'date-fns';
import orderBy from 'lodash/orderBy';

import type { Notification } from './types';

export const filterNotifications = (notifications: Notification[]) => {
    const availableNotifications = notifications.filter(({ dateStart, dateStop }) =>
        isWithinInterval(new Date(), {
            start: new Date(parseISO(dateStart)),
            end: new Date(parseISO(dateStop)),
        }),
    );

    return orderBy(availableNotifications, 'displayOrder', 'desc');
};
