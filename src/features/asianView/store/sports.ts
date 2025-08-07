import { atom } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import { atomWithReset } from 'jotai/utils';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import { atomWithQueryCbk, jotaiCallback } from '@sc-utils/jotai';

import { i18nextAtom } from 'src/store/i18next';

import { queryKeys } from '../api/queryKeys';
import { defaultTerms } from '../api/sports/configs';
import { getAggregatedSportsTerms, prepareSports } from '../api/sports/helpers';
import { SportsService } from '../api/sports/services';
import type { AggregatedSport } from '../api/sports/types';
import { LHNTimeTab } from '../enums';
import { getFirstSport } from '../helpers';

import { lhnSportAtom, lhnTimeTabAtom } from './lhn';

const fetchCountAtom = atomWithReset(0);

const onAggregateSportsQuerySuccess = jotaiCallback(({ get, set }) => (sports: AggregatedSport[]) => {
    const queryClient = get(queryClientAtom);
    const fetchCount = get(fetchCountAtom);

    if (fetchCount === 0 && isEmpty(sports)) {
        const timeTab = get(lhnTimeTabAtom) ?? LHNTimeTab.Today;
        const lhnSport = get(lhnSportAtom);
        const { queryKey } = queryKeys.sports.aggregate(timeTab, lhnSport);
        void queryClient.invalidateQueries({ queryKey });

        set(lhnTimeTabAtom, LHNTimeTab.Upcoming);
    } else {
        set(lhnTimeTabAtom, (timeTab = LHNTimeTab.Today) => timeTab);
        set(lhnSportAtom, (sport) => getFirstSport(sports, sport));
    }

    set(fetchCountAtom, (prev) => prev + 1);
});

export const aggregateSportsAtomWithQuery = atomWithQueryCbk((get) => {
    const queryClient = get(queryClientAtom);
    const lhnTimeTab = get(lhnTimeTabAtom) ?? LHNTimeTab.Today;
    const lhnSport = get(lhnSportAtom);

    const { t } = get(i18nextAtom);
    const { queryKey } = queryKeys.sports.aggregate(lhnTimeTab, lhnSport);

    return {
        queryKey,
        queryFn: async (): Promise<AggregatedSport[]> => {
            const sports = await SportsService.aggregate({
                terms: { ...defaultTerms, ...getAggregatedSportsTerms(get(lhnTimeTabAtom)) },
            });

            return orderBy(prepareSports(sports, t), 'displayOrder', 'desc');
        },
        placeholderData: () => {
            const cache = queryClient.getQueriesData<AggregatedSport[]>({
                queryKey: queryKey.slice(0, -1),
                predicate: (query) => query.state.data !== undefined,
            });
            const latestEntry = cache[cache.length - 1] ?? [];
            const latestEntryData = latestEntry[1];

            return latestEntryData;
        },
        onSuccess: onAggregateSportsQuerySuccess,
    };
});

export const sportAtom = atom((get) => {
    const lhnSport = get(lhnSportAtom);
    const { data: sports } = get(aggregateSportsAtomWithQuery);

    return find(sports, (sport) => sport.id === lhnSport || sport.name === lhnSport);
});
