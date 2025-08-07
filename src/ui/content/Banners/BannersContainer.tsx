import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import { useEffect, useState } from 'react';

import { useBannersDevTool } from '@sc-devtools/hooks';

import type { Notification as Banner } from 'src/appState/redux/types';
import useTimer, { TimerStatus } from 'src/utils/hooks/useTimer';

import { BaseBanners, DebugBanners } from './components';
import { filterActiveBanners, secondsToFirstExpire } from './utils/helpers';
import useGetBanners from './utils/useGetBanners';

const BannersContainer = () => {
    const DEFAULT_INTERVAL = 3000;

    const { toggle: toggleDebugBanners, debug_banners: isDebugBanners } = useBannersDevTool();

    const { banners } = useGetBanners(isDebugBanners);
    const [bannersToDisplay, setBannersToDisplay] = useState<Banner[]>([]);

    const [earliestToExpire, setEarliestToExpire] = useState<number>(DEFAULT_INTERVAL);

    const firstExpire = secondsToFirstExpire(banners);

    const { start, status } = useTimer({
        endTime: earliestToExpire,
        step: earliestToExpire,
        interval: earliestToExpire,
        onTimeOver: () => {
            if (!isNull(firstExpire)) {
                setEarliestToExpire(Math.ceil(firstExpire));
            }
        },
    });

    useEffect(() => {
        setBannersToDisplay(filterActiveBanners(banners));

        if (status === TimerStatus.Stopped) {
            start();
        }
    }, [banners, earliestToExpire, status, start]);

    if (isEmpty(bannersToDisplay)) {
        return null;
    }

    return (
        <>
            {isDebugBanners && (
                <DebugBanners
                    banners={bannersToDisplay}
                    earliestToExpire={earliestToExpire}
                    onClose={toggleDebugBanners}
                />
            )}
            <BaseBanners banners={bannersToDisplay} />
        </>
    );
};

export default BannersContainer;
