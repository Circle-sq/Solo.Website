import { atom } from 'jotai';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

import { getSportTerm } from '@sc-api/helpers/params';
import { atomWithQueryCbk, store } from '@sc-utils/jotai';

import { defaultTerms } from '../api/competitions/configs';
import { getCompetitionTermsByTimeTab } from '../api/competitions/helpers';
import { CompetitionsService } from '../api/competitions/services';
import type { CompetitionsWithEventsResponse } from '../api/competitions/types';
import { queryKeys } from '../api/queryKeys';

import { competitionIdsFilterAtom, timePeriodFilterAtom } from './filters';
import { lhnSportAtom, lhnTimeTabAtom } from './lhn';

export const competitionLocationsAtomWithQuery = atomWithQueryCbk((get) => {
    const sport = get(lhnSportAtom);
    const timeTab = get(lhnTimeTabAtom);
    const timePeriod = get(timePeriodFilterAtom);

    return {
        queryKey: queryKeys.competitions.searchWithEvents({ sport, timeTab, timePeriod }).queryKey,
        queryFn: async () =>
            CompetitionsService.searchWithEvents({
                terms: {
                    ...defaultTerms,
                    ...getCompetitionTermsByTimeTab(timeTab, timePeriod),
                    ...getSportTerm(sport),
                },
                marketTags: {
                    'asian-view': ['yes'],
                },
            }),
        onSuccess: ({ results }: CompetitionsWithEventsResponse) => {
            store.set(competitionIdsFilterAtom, sortBy(map(results.elements, 'id')));
        },
        staleTime: 0,
        refetchOnMount: false,
    };
});

export const competitionLocationsCountAtom = atom((get) => {
    const { data: competitionLocations } = get(competitionLocationsAtomWithQuery);

    return competitionLocations?.totalHints ?? 0;
});
