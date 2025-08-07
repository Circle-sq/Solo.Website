import map from 'lodash/map';
import { useEffect, useState } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { Notification as Banner } from 'src/appState/redux/types';
import { NotificationType } from 'src/common/enums';

import { filterByClientLabel } from '../../utils';

import { filterAndOrderBanners } from './helpers';

const useGetBanners = (isDebug: boolean, today?: Date) => {
    const {
        language: { userLang },
        apiWrapper,
    } = useAppStateContext();
    const [banners, setBanners] = useState<Banner[]>([]);

    const fetchBanners = async () => {
        try {
            const data = await apiWrapper.getNotifications({
                contentTypeName: NotificationType.Banner,
                lang: userLang,
                published: true,
            });

            const filteredData = data.filter(filterByClientLabel);

            if (isDebug) {
                const mappedData = map(filteredData, (banner) => ({
                    ...banner,
                    content: `displayOrder:${banner.displayOrder}`,
                }));

                setBanners(filterAndOrderBanners(mappedData, today));
            } else {
                setBanners(filterAndOrderBanners(filteredData, today));
            }
        } catch (error) {
            console.error('Error (fetching banners)', error);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, [isDebug]);

    return { banners };
};

export default useGetBanners;
