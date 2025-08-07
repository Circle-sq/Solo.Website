import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { NotificationType, NotificationTitle } from 'src/common/enums';

import { filterByClientLabel } from '../utils';

import type { Notification } from './types';

export const useNotifications = (
    notificationType: NotificationType,
    notificationTitle: NotificationTitle[] = [],
): [Notification[], Dispatch<SetStateAction<Notification[]>>] => {
    const {
        language: { userLang },
        apiWrapper,
    } = useAppStateContext();

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = async () => {
        try {
            const data = await apiWrapper.getNotifications({
                contentTypeName: notificationType,
                lang: userLang,
                published: true,
                title: notificationTitle,
            });

            if (Array.isArray(data)) {
                const updatedData = data.filter(filterByClientLabel).map((item) => ({
                    ...item,
                    open: true,
                }));
                setNotifications(updatedData as Notification[]);
            }
        } catch (error) {
            console.error('Error fetching notifications', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return [notifications, setNotifications];
};
