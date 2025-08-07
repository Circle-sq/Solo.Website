import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import type { Statistics } from 'src/common/types/statistics';

import { StatisticType, EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG } from '../../../constants';

export interface StatsItem {
    id: number;
    type: string;
    icon: string;
    count: number;
}

export const updateFootballStatistics = (statistics: Statistics) => {
    if (isEmpty(statistics)) {
        return EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG;
    }

    const {
        'corner-kicks': cornerKicks,
        'red-cards': redCards,
        'yellow-cards': yellowCards,
        'yellow-red-cards': yellowRedCards,
    } = statistics;

    const updatedTemplate = { ...EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG };

    const teams: ('home' | 'away')[] = ['home', 'away'];

    teams.forEach((teamSide) => {
        const yellowRedCardsNum = !isEmpty(yellowRedCards) ? Number(yellowRedCards[teamSide]) : 0;

        const updateCount = (statsItem: StatsItem, value: string | number | undefined, additionalValue = 0) => {
            if (value !== undefined) {
                return Number(value) + additionalValue;
            }

            return statsItem.count;
        };

        updatedTemplate[teamSide] = updatedTemplate[teamSide].map((statsItem) => {
            switch (statsItem.type) {
                case StatisticType.YellowCards:
                    return {
                        ...statsItem,
                        count: updateCount(statsItem, yellowCards?.[teamSide], yellowRedCardsNum),
                    };

                case StatisticType.RedCards:
                    return {
                        ...statsItem,
                        count: updateCount(statsItem, redCards?.[teamSide], yellowRedCardsNum),
                    };

                case StatisticType.CornerKicks:
                    return {
                        ...statsItem,
                        count: updateCount(statsItem, cornerKicks?.[teamSide]),
                    };

                default:
                    return statsItem;
            }
        });
    });

    return updatedTemplate;
};

const useFootballStatistics = (eventId: number) => {
    const { models } = useAppStateContext();

    return useMemo(() => {
        const event = models.getEvent(Number(eventId))!;
        const statistics = event.stats;

        return updateFootballStatistics(statistics);
    }, [eventId, models]);
};

export default useFootballStatistics;
