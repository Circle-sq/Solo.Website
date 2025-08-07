import { api } from '@sc-api/api';

import type { BlacklistResponse } from './types';

export const StreamsBlacklistService = {
    getBlacklistedProviders: async (brandName: string): Promise<BlacklistResponse> => {
        return api.post('/streams/blacklist/brands/providers', { brandName });
    },
};
