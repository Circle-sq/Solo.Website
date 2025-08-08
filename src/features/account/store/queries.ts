import { atomWithMutation, atomWithQuery } from 'jotai-tanstack-query';
import ms from 'ms';

import { atomWithQueryCbk, store } from '@solo-utils/jotai';

import isLocal from 'src/utils/isLocal';

import { queryKeys } from '../api/queryKeys';
import { UserService } from '../api/services';

import { isAuthenticatedAtom, userDataAtom } from './atoms';
import { updateUserData } from './helpers';
import { currencySelector, userIdSelector } from './selectors';

const DEFAULT_GC_TIME_MS = ms('1min');
const DEFAULT_STALE_TIME_MS = ms('30sec');

export const freebetCreditsAtomWithQuery = atomWithQuery((get) => {
    const userId = get(userIdSelector);

    return {
        queryKey: queryKeys.user.freebetCredits(String(userId)).queryKey,
        queryFn: async ({ signal }) => UserService.getFreebetCredits(userId, signal),
        enabled: get(isAuthenticatedAtom),
        initialData: { bonusCredits: [], totalAmount: 0 },
        gcTime: DEFAULT_GC_TIME_MS,
    };
});

export const lastDepositAtomWithMutation = atomWithMutation((get) => ({
    mutationKey: queryKeys.user.lastDeposit(String(get(userIdSelector))).queryKey,
    mutationFn: async () => UserService.getLastDeposit(get(currencySelector)),
}));

export const openBetsAtomWithQuery = atomWithQueryCbk((get) => ({
    queryKey: queryKeys.user.openBetsCount(String(get(userIdSelector))).queryKey,
    queryFn: async ({ signal }) => UserService.getOpenBetsCount(signal),
    enabled: get(isAuthenticatedAtom),
    gcTime: DEFAULT_GC_TIME_MS,
    staleTime: DEFAULT_STALE_TIME_MS,
    onSuccess: (data) => {
        store.set(userDataAtom, updateUserData({ openBets: data }));
    },
}));

export const currenciesAtomWithQuery = atomWithQuery((get) => {
    const userId = get(userIdSelector);

    return {
        queryKey: queryKeys.user.userCurrencies(String(userId)).queryKey,
        queryFn: async () => UserService.getAvailableCurrencies(userId),
        staleTime: Infinity,
        enabled: isLocal(),
    };
});
