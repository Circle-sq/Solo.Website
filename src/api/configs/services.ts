import { api } from '@sc-api/api';

import type { BettingConfigs } from './types';

export const ConfigsService = {
    bettingConfigs: async (): Promise<BettingConfigs> => {
        return api.get('/betting-configs');
    },
};
