import type { InfiniteData, QueryKey } from '@tanstack/query-core';
import type { QueryClient } from '@tanstack/react-query';

type InfiniteQueryData<TQueryFnData> = InfiniteData<TQueryFnData, number>;

export const updateInfiniteEventsQueryCache =
    (queryClient: QueryClient) =>
    <TQueryFnData, TQueryKey extends QueryKey>(
        queryKey: TQueryKey,
        pageUpdater: (page: TQueryFnData) => TQueryFnData,
    ) => {
        queryClient.setQueryData<InfiniteQueryData<TQueryFnData>>(
            queryKey,
            (data?: InfiniteQueryData<TQueryFnData>): InfiniteQueryData<TQueryFnData> | undefined => {
                if (data === undefined) {
                    return;
                }

                const { pageParams, pages } = data;

                return {
                    pageParams,
                    pages: pages.map(pageUpdater),
                };
            },
        );
    };
