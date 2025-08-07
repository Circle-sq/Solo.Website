import { atom } from 'jotai';

import type { SearchCompetitionsKeyParams } from '../api/competitions/types';
import type { SearchEventsKeyParams } from '../api/events/types';

import { competitionIdsFilterAtom, sortByFilterAtom, timePeriodFilterAtom } from './filters';
import { lhnSportAtom, lhnTimeTabAtom } from './lhn';

export const competitionsQueryKeyParamsAtom = atom<SearchCompetitionsKeyParams>((get) => {
    const sport = get(lhnSportAtom);
    const timeTab = get(lhnTimeTabAtom);
    const timePeriod = get(timePeriodFilterAtom);

    return { sport, timeTab, timePeriod };
});

export const eventsQueryKeyParamsAtom = atom<SearchEventsKeyParams>((get) => {
    const sport = get(lhnSportAtom);
    const timeTab = get(lhnTimeTabAtom);
    const timePeriod = get(timePeriodFilterAtom);
    const competitionIds = get(competitionIdsFilterAtom);
    const sortBy = get(sortByFilterAtom);

    return { sport, timeTab, timePeriod, sortBy, competitionIds };
});
