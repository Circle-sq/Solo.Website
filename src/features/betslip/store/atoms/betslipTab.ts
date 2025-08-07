import { atom } from 'recoil';

import { BetslipTab } from 'src/common/enums';
import { persistBetslipAtom } from 'src/common/recoil/persist';

export const betslipActiveTabAtom = atom<BetslipTab>({
    key: 'betslipActiveTabAtom',
    default: BetslipTab.Single,
    effects: [persistBetslipAtom],
});

export const isTabSelectedByUserAtom = atom<boolean>({
    key: 'isTabSelectedByUserAtom',
    default: false,
});
