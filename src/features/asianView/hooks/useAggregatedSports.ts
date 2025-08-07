import { useAtomValue } from 'jotai';
import find from 'lodash/find';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import ms from 'ms';
import { useMemo } from 'react';
import { useInterval } from 'usehooks-ts';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';

import { asianViewExcludedSports } from '../constants';
import { groupLHNSports } from '../helpers';
import { aggregateSportsAtomWithQuery } from '../store/sports';
import type { AggregatedSport, Counter } from '../types';

const REFETCH_INTERVAL = ms('30s');

const addLiveProp = (sports: AggregatedSport[] = [], liveSports: Counter[]) => {
    const eSoccerEventCount = find(sports, { id: SportType.ESoccer })?.eventCount ?? 0;

    return sports.map((sport) => {
        const result = {
            ...sport,
            hasLiveEvents: some(liveSports, ({ id }) => id === sport.id),
        };

        if (sport.id !== SportType.Football) {
            return result;
        }

        return {
            ...result,
            eventCount: sport.eventCount + eSoccerEventCount,
        };
    });
};

const useAggregatedSports = () => {
    const { eventsCounter } = useAppStateContext();
    const { data: sports, isLoading } = useAtomValue(aggregateSportsAtomWithQuery);

    const { counters: liveSports, loadMore } = useMemo<{ counters: Counter[]; loadMore: () => void }>(() => {
        return eventsCounter.getEventsCounterList('home-count-live-highlights', {});
    }, [eventsCounter]);

    const preparedSports = useMemo(() => {
        if (isEmpty(sports)) {
            return [];
        }

        const allSports = addLiveProp(sports, liveSports);
        const groupedSports = groupLHNSports(allSports);

        return groupedSports.filter((sport) => !includes(asianViewExcludedSports, sport.id));
    }, [liveSports, sports]);

    useInterval(loadMore, REFETCH_INTERVAL);

    return { sports: preparedSports, isLoading };
};

export default useAggregatedSports;
