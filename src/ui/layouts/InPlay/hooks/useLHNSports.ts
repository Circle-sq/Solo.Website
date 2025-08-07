import ms from 'ms';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';

import { useAppStateContext } from 'src/appState/AppState';
import { sportsSportsItemsSelector } from 'src/modules/sports/selectors';

import type { LHNSport } from '../types';

const REFETCH_INTERVAL = ms('30s');

export const useLHNSports = () => {
    const { eventsCounter } = useAppStateContext();
    const { counters, isLoading, loadMore } = useMemo(() => {
        const collection = eventsCounter.getEventsCounterList('in-play-count-lhn', {
            aggregations: ['sport'],
        });

        return collection as { counters: { id: string; count: number }[]; isLoading: boolean; loadMore: () => void };
    }, [eventsCounter]);

    const sportItems = useSelector(sportsSportsItemsSelector);
    const sports: LHNSport[] = useMemo(() => {
        return Object.values(sportItems)
            .map((sport) => {
                const counter = counters.find(({ id }) => id === sport.id);

                if (counter === undefined || counter.count === 0) {
                    return null;
                }

                return {
                    id: sport.id,
                    displayOrder: sport.displayOrder,
                    name: sport.name,
                    count: counter.count,
                };
            })
            .filter((sport) => sport !== null)
            .sort((a, b) => b.displayOrder - a.displayOrder);
    }, [sportItems, counters]);

    useInterval(loadMore, REFETCH_INTERVAL);

    return {
        sports,
        isLoading: isLoading && counters.length === 0,
    };
};
