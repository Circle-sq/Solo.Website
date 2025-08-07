import { atom } from 'recoil';

import type { FreeBetAssignments } from '../../api/types/freeBet';

export const freeBetsAtom = atom<FreeBetAssignments>({
    key: 'freeBetsAtom',
    default: {},
});
