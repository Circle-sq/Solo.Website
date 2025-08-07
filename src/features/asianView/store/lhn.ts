import { atomWithStorage } from 'jotai/utils';

import { SportType } from 'src/common/enums';

import { LHNTab, type LHNTimeTab } from '../enums';

export const lhnSportAtom = atomWithStorage<SportType>('lhnSport', SportType.Football, undefined, {
    getOnInit: true,
});

export const lhnTabAtom = atomWithStorage<LHNTab>('lhnTab', LHNTab.Sports, undefined, {
    getOnInit: true,
});

export const lhnTimeTabAtom = atomWithStorage<LHNTimeTab | undefined>('lhnTimeTab', undefined, undefined, {
    getOnInit: true,
});
