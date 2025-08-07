import { api } from '@sc-api/api';

import { buildCacheUrl } from 'src/appState/utils';

export const getEventsCountByDateRange = async (query: Record<string, unknown>) => {
    return api.get<number[]>(buildCacheUrl('/event-days/search'), { query });
};
