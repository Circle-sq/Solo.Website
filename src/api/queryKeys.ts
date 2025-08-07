import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import type { IconCategory } from 'src/common/enums';

import type { MyBetsQueryKeyParams } from './bets/types';
import type { UniformParams } from './uniforms/types';

export const queryKeys = createQueryKeyStore({
    bets: {
        searchMyBets: (keyParams: MyBetsQueryKeyParams) => ({ queryKey: [keyParams] }),
    },
    configs: {
        getBettingConfigs: null,
    },
    events: {
        getEventWithoutMarkets: null,
        getMarketsByIds: null,
        getActiveMarketsCounter: null,
        search: (value: string) => ({ queryKey: [value] }),
        searchByValue: (value: string) => ({ queryKey: [value] }),
    },
    icons: {
        getByCategory: (category: IconCategory) => ({ queryKey: [category] }),
    },
    streams: {
        blacklist: null,
    },
    uniforms: {
        retrieve: (keyParams: UniformParams) => ({ queryKey: [keyParams] }),
    },
});
