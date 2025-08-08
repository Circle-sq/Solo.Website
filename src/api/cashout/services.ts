import { api } from '@solo-api/api';

import type { CashOutBet } from 'src/common/types/myBet';

export const CashOutService = {
    make: async (queryParams: { betId: string; value?: number }): Promise<void> => {
        return api.post('/cashout', queryParams);
    },
    getList: async (queryParams: string[]): Promise<{ cashouts: Record<string, CashOutBet> }> => {
        return api.post('/cashouts', queryParams);
    },
};
