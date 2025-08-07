import { atom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';

import { Lines, SortBy, TimePeriod } from '../enums';

export const linesFilterAtom = atomWithStorage<Lines>('linesFilter', Lines.Three, undefined, {
    getOnInit: true,
});

export const sortByFilterAtom = atomWithStorage<SortBy>('sortByFilter', SortBy.Time, undefined, {
    getOnInit: true,
});

export const timePeriodFilterAtom = atomWithReset<TimePeriod>(TimePeriod.AllTimes);

export const competitionIdsFilterAtom = atom<number[]>([]);

export const competitionsCountAtom = atom<number>((get) => {
    const competitionIds = get(competitionIdsFilterAtom);

    return competitionIds.length;
});
