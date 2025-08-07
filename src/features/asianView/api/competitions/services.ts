import { api } from '@sc-api/api';

import type { CompetitionsWithEventsResponse, SearchCompetitionsWithEventsQueryParams } from './types';

export const CompetitionsService = {
    searchWithEvents: async (
        params: SearchCompetitionsWithEventsQueryParams,
    ): Promise<CompetitionsWithEventsResponse> => {
        return api.post('/competitions/search/with-events', params);
    },
};
