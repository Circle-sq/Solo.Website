import { useMutation } from '@tanstack/react-query';

import type { RequestError } from 'src/common/types/error';
import type { CashOutBet, MyBet } from 'src/common/types/myBet';

import { CASHOUT_API_KEY } from '../apiKeys';

import { CashOutService } from './services';

export const useMakeCashOutApi = () => {
    return useMutation<void, RequestError, MyBet>({
        mutationKey: [CASHOUT_API_KEY.MAKE],
        mutationFn: async ({ id, cashout }) => CashOutService.make({ betId: id, value: cashout.value }),
    });
};

export const useRetrieveCashOutApi = () => {
    return useMutation<CashOutBet, RequestError, string>({
        mutationKey: [CASHOUT_API_KEY.GET_LIST],
        mutationFn: async (betId) => {
            const { cashouts } = await CashOutService.getList([betId]);

            return cashouts[betId];
        },
    });
};
