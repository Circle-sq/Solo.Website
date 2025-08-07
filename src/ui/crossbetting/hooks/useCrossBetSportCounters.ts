import { useMemo, useState } from 'react';
import groupBy from 'lodash/groupBy';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { getCrossBettingSports } from 'src/ui/crossbetting/CrossBetingSports/utils';
import { useAppStateContext } from 'src/appState/AppState';
import { useDateRangeFilter } from 'src/ui/crossbetting/hooks/useDateRangeFilter';
import { useBetTypeQuery } from 'src/ui/crossbetting/hooks/useBetTypeQuery';
import { SportType } from 'src/common/enums';
import type { Stream } from 'src/ui/layouts/InPlay/types';

import type { CrossSportLink } from '../CrossBetingSports/types';

import type { CountersCounterType } from './types';

const useCrossBetSportCounters = (shouldUpdateCounter?: boolean): CrossSportLink[] => {
    const { eventsCounter } = useAppStateContext();
    const dateFilter = useDateRangeFilter();
    const { betTypeReqParams } = useBetTypeQuery();
    const [crossBetCounters, setCrossBetCounter] = useState<CrossSportLink[]>([]);

    const { counters } = useMemo(() => {
        return eventsCounter.getEventsCounterList('crossbet-count', {
            ...dateFilter,
            ...betTypeReqParams,
        });
    }, [eventsCounter, dateFilter, betTypeReqParams, shouldUpdateCounter]);

    const sportsLinkCollection = useMemo(
        () => groupBy(getCrossBettingSports(counters.filter((sport: Stream) => sport.id)), 'sportId'),
        [counters],
    );

    useDeepCompareEffect(() => {
        const allEventsCounter = (counters as CountersCounterType[]).reduce(
            (acc, cv) => ({
                id: SportType.All,
                name: SportType.All,
                displayOrder: 100,
                translations: {},
                count: acc.count + cv.count,
            }),
            { id: '', name: '', displayOrder: 0, translations: {}, count: 0 },
        );

        if (!counters.length) {
            setCrossBetCounter([]);
        } else {
            const filteredCounters = [...(counters.length > 1 ? [allEventsCounter] : []), ...counters]
                .filter(({ id }) => {
                    return sportsLinkCollection[id] !== undefined && sportsLinkCollection[id].length;
                })
                .map(({ id, count, displayOrder }: CountersCounterType) => {
                    const [link] = sportsLinkCollection[id];

                    return {
                        ...link,
                        count,
                        displayOrder,
                    };
                })
                .filter((x) => x);

            setCrossBetCounter(filteredCounters);
        }
    }, [counters]);

    return crossBetCounters;
};

export default useCrossBetSportCounters;
