import { atom } from 'recoil';

import type { BettingConfigs } from '@sc-api/configs/types';

export const bettingConfigsAtom = atom<BettingConfigs>({
    key: 'bettingConfigsAtom',
    default: { allowInPlayBuildABet: false },
});
