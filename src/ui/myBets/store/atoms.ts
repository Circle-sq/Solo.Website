import { atom } from 'recoil';

import { defaultDateRange } from './helpers';
import type { MyBetsFilters } from './types';
import { SortFilter, TabStatus } from './types';

export const myBetsFiltersAtom = atom<MyBetsFilters>({
    key: 'myBetsFiltersAtom',
    default: {
        tab: undefined,
        status: TabStatus.All,
        range: defaultDateRange(),
        sort: SortFilter.DescPLacedAt,
    },
});

export const recentlySettledBetIdAtom = atom<string | null>({
    key: 'recentlySettledBetIdAtom',
    default: null,
});
