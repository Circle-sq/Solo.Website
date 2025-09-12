import { SORT_OPTIONS, SORT_VALUE } from 'src/ui/events/EventsList/config';
import { useAppStateContext } from 'src/appState/AppState';
import { SportType } from 'src/common/enums';

import type { SortOption } from '../EventsList/types';

interface EventSort {
    options: SortOption[];
    sortValue?: string;
    onSortChange: (value?: string) => void;
    sortReqParams?: string[];
    betType?: string;
    betTypeReqParams?: Record<string, unknown>;
}

const sortQueries = {
    [SORT_VALUE.competitions]: [
        '-competition.displayOrder',
        'timeSettings.startTime',
        '-sport.displayOrder',
        'competition.name',
    ],
    [SORT_VALUE.time]: [
        'timeSettings.startTime',
        '-sport.displayOrder',
        '-competition.displayOrder',
        'competition.name',
        'name',
    ],
    [SORT_VALUE.globalCompetitions]: [
        '-competition.globalDisplayOrder',
        'timeSettings.startTime',
        '-sport.displayOrder',
        'competition.name',
    ],
    [SORT_VALUE.globalTime]: [
        'timeSettings.startTime',
        '-sport.displayOrder',
        '-competition.globalDisplayOrder',
        'competition.name',
        'name',
    ],
};

export const useEventsSort = (): EventSort => {
    const { router } = useAppStateContext();
    const { sortBy, ...params } = router.route.params;
    const isAllTab = params.sport === SportType.All;

    const onSortChange = (value?: string) => {
        router.redirect(router.route.name, { ...params, sortBy: value });
    };

    const value = sortBy ?? SORT_VALUE.time;

    return {
        options: SORT_OPTIONS,
        sortValue: value,
        onSortChange,
        sortReqParams: sortQueries[isAllTab ? `global${value}` : value],
    };
};
