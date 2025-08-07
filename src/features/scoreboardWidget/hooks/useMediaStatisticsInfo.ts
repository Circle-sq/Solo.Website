import find from 'lodash/find';
import get from 'lodash/get';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import { LiveTrackerProviders } from 'src/common/enums';

import { getBetRadarStatisticUrl } from '../helpers';

const useMediaStatisticsInfo = (eventId: number) => {
    const {
        models,
        language: { userLang },
    } = useAppStateContext();

    const event = models.getEvent(eventId) as EventModel;

    const mediaStatistics = get(event, 'media.statistics', null);
    const matchId = get(event, 'media.statistics[0].id', null);
    const isActiveEvent = get(event, 'active', false);
    const isLiveEvent = get(event, 'timeSettings.started', false);

    const requestId = useMemo(() => {
        if (!mediaStatistics) {
            return null;
        }

        const betRadarStatistics = find(
            mediaStatistics,
            (statistic) => statistic.provider === LiveTrackerProviders.BetRadar,
        );

        return betRadarStatistics?.id ?? null;
    }, [mediaStatistics]);

    const betradarStatisticsUrl = useMemo(
        () => (requestId !== null ? getBetRadarStatisticUrl(requestId, userLang ?? '') : null),
        [requestId, userLang],
    );

    return {
        matchId,
        betradarStatisticsUrl,
        isActiveEvent,
        isLiveEvent,
    };
};

export default useMediaStatisticsInfo;
