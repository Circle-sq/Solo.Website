import { api } from '@sc-api/api';

import type { AggregatedSport, AggregatedSportParams } from './types';

export const SportsService = {
    aggregate: async (params: AggregatedSportParams): Promise<AggregatedSport[]> => {
        return api.post('/sports/aggregated', params);
    },
};
