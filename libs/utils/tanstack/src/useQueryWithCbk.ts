import type { DefaultError, QueryKey } from '@tanstack/query-core';
import { useQuery } from '@tanstack/react-query';
import type {
    DefinedInitialDataOptions,
    DefinedUseQueryResult,
    QueryClient,
    UndefinedInitialDataOptions,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query';

import type { OptionsWithCbk } from './types';
import { useQueryFn } from './useQueryFn';

export function useQueryWithCbk<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    options: UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & OptionsWithCbk<TQueryFnData, TError>,
    queryClient?: QueryClient,
): UseQueryResult<TData, TError>;

export function useQueryWithCbk<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & OptionsWithCbk<TQueryFnData, TError>,
    queryClient?: QueryClient,
): DefinedUseQueryResult<TData, TError>;

export function useQueryWithCbk<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    {
        queryKey,
        queryFn,
        onSuccess,
        onError,
        onSettled,
        ...options
    }: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & OptionsWithCbk<TQueryFnData, TError>,
    queryClient?: QueryClient,
) {
    const queryFnWithCbk = useQueryFn<TQueryFnData, TError, TQueryKey, never>({
        queryKey,
        queryFn,
        onSuccess,
        onError,
        onSettled,
    });

    return useQuery(
        {
            queryKey,
            queryFn: queryFnWithCbk,
            ...options,
        },
        queryClient,
    );
}
