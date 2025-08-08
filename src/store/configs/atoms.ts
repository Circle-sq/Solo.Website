import { atom } from 'recoil';

import type { BettingConfigs } from '@solo-api/configs/types';

export const bettingConfigsAtom = atom<BettingConfigs>({
    key: 'bettingConfigsAtom',
    default: { allowInPlayBuildABet: false },
});
