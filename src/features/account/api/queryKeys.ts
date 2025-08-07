import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const queryKeys = createQueryKeyStore({
    user: {
        freebetCredits: (id: string) => ({ queryKey: [id] }),
        lastDeposit: (id: string) => ({ queryKey: [id] }),
        openBetsCount: (id: string) => ({ queryKey: [id] }),
        userCurrencies: (id: string) => ({ queryKey: [id] }),
    },
});
