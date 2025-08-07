import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';
import { useMemo } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';
import { useBetTypeQuery } from 'src/ui/crossbetting/hooks/useBetTypeQuery';
import useCrossBetSportCounters from 'src/ui/crossbetting/hooks/useCrossBetSportCounters';
import { useDateRangeFilter } from 'src/ui/crossbetting/hooks/useDateRangeFilter';

import type { DataCountryCompetition } from './types';

export const useDataCountryCompetitions = (): DataCountryCompetition => {
    const counterLinks = useCrossBetSportCounters();
    const [, ...countersSortedFilter] = orderBy(counterLinks, 'displayOrder', 'desc');
    const { eventsCounter, router } = useAppStateContext();
    const dateFilter = useDateRangeFilter();
    const { betTypeReqParams } = useBetTypeQuery();
    const { sport, day } = router.route.params;
    const sportsList = countersSortedFilter.map((country) => country.sportId);

    const { country, competitions } = useMemo<DataCountryCompetition>(() => {
        if (sport === undefined) {
            return {
                counters: [],
                isLoading: false,
            };
        }

        return eventsCounter.getEventsCounterList(`crossbet-competition-country-${sport}-${day}`, {
            ...dateFilter,
            ...betTypeReqParams,
            sport: sport === SportType.All ? sportsList : sport,
        });
    }, [betTypeReqParams, dateFilter, day, eventsCounter, sport, sportsList]);

    const uniqueCountries = uniqBy(country, 'id');

    return { countries: country, uniqueCountries, competitions };
};
