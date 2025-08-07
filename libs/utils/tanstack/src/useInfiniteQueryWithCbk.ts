import type { DefaultError, InfiniteData, QueryKey } from '@tanstack/query-core';
import { useInfiniteQuery } from '@tanstack/react-query';
import type {
    DefinedInitialDataInfiniteOptions,
    DefinedUseInfiniteQueryResult,
    QueryClient,
    UndefinedInitialDataInfiniteOptions,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult,
} from '@tanstack/react-query';

import type { OptionsWithCbk } from './types';
import { useQueryFn } from './useQueryFn';

export function useInfiniteQueryWithCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>(
    options: DefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> &
        OptionsWithCbk<TQueryFnData, TError>,
    queryClient?: QueryClient,
): DefinedUseInfiniteQueryResult<TData, TError>;

export function useInfiniteQueryWithCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>(
    options: UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> &
        OptionsWithCbk<TQueryFnData, TError>,
    queryClient?: QueryClient,
): UseInfiniteQueryResult<TData, TError>;

export function useInfiniteQueryWithCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>(
    options: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam> &
        OptionsWithCbk<TQueryFnData, TError>,
    queryClient?: QueryClient,
): UseInfiniteQueryResult<TData, TError>;

export function useInfiniteQueryWithCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>(
    {
        queryKey,
        queryFn,
        onSuccess,
        onError,
        onSettled,
        ...options
    }: UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam> &
        OptionsWithCbk<TQueryFnData, TError>,
    queryClient?: QueryClient,
) {
    const queryFnWithCbk = useQueryFn<TQueryFnData, TError, TQueryKey, TPageParam>({
        queryKey,
        queryFn,
        onSuccess,
        onError,
        onSettled,
    });

    return useInfiniteQuery(
        {
            queryKey,
            queryFn: queryFnWithCbk,
            ...options,
        },
        queryClient,
    );
}
