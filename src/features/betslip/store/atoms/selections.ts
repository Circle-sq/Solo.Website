import { atom } from 'recoil';

import { persistBetslipAtom } from 'src/common/recoil/persist';

import type { BetslipSelections } from '../types';

export const betslipSelectionsAtom = atom<BetslipSelections>({
    key: 'betslipSelectionsAtom',
    default: {},
    effects: [persistBetslipAtom],
});
