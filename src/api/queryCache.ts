import type { QueryKey } from '@tanstack/query-core';
import { useQueryClient } from '@tanstack/react-query';
import isFunction from 'lodash/isFunction';
import { useMemo } from 'react';

import type { QueryCacheUpdater } from './types';

interface UseQueryCache {
    getQueryCache: <T, K extends QueryKey = QueryKey>(queryKey: K) => T | undefined;
    setQueryCache: <T, K extends QueryKey = QueryKey>(queryKey: K, updater: QueryCacheUpdater<T>) => T | undefined;
    invalidateQueries: <K extends QueryKey = QueryKey>(queryKey: K) => Promise<void>;
}

export const useQueryCache = () => {
    const queryClient = useQueryClient();

    return useMemo<UseQueryCache>(
        () => ({
            getQueryCache: (queryKey) => queryClient.getQueryData(queryKey),
            setQueryCache: (queryKey, updater) =>
                queryClient.setQueryData(queryKey, (cacheData) => {
                    if (cacheData !== undefined) {
                        return isFunction(updater) ? updater(cacheData) : updater;
                    }
                }),
            invalidateQueries: async (queryKey) => {
                void queryClient.invalidateQueries({ queryKey });
            },
        }),
        [queryClient],
    );
};
