import { api } from '@sc-api/api';

import type { MyBetsPageData, SearchBetsParams, SearchBetsResponse } from './types';

export const BetsService = {
    searchMyBets: async (params: SearchBetsParams, id = 'cashout-bets'): Promise<MyBetsPageData> => {
        const { aggregations, results } = await api.post<SearchBetsResponse, SearchBetsParams>(
            '/bets/search/my-bets',
            params,
            { id },
        );

        return {
            bets: results,
            total: aggregations.total,
            pageParam: params.page,
        };
    },
};
