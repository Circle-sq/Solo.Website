import type { DefaultError, InfiniteData, QueryKey } from '@tanstack/query-core';
import type { WritableAtom, Getter } from 'jotai';
import type {
    AtomWithInfiniteQueryOptions,
    AtomWithInfiniteQueryResult,
    DefinedAtomWithInfiniteQueryResult,
    DefinedInitialDataInfiniteOptions,
    UndefinedInitialDataInfiniteOptions,
} from 'jotai-tanstack-query';
import { atomWithInfiniteQuery } from 'jotai-tanstack-query';

import { extendedQueryFn, type OptionsWithCbk } from '@solo-utils/tanstack';

export function atomWithInfiniteQueryCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>(
    getOptions: (
        get: Getter,
    ) => UndefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> &
        OptionsWithCbk<TQueryFnData, TError>,
): WritableAtom<AtomWithInfiniteQueryResult<TData, TError>, [], void>;

export function atomWithInfiniteQueryCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>(
    getOptions: (
        get: Getter,
    ) => DefinedInitialDataInfiniteOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam> &
        OptionsWithCbk<TQueryFnData, TError>,
): WritableAtom<DefinedAtomWithInfiniteQueryResult<TData, TError>, [], void>;

export function atomWithInfiniteQueryCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>(
    getOptions: (
        get: Getter,
    ) => AtomWithInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam> &
        OptionsWithCbk<TQueryFnData, TError>,
): WritableAtom<AtomWithInfiniteQueryResult<TData, TError>, [], void>;

export function atomWithInfiniteQueryCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = InfiniteData<TQueryFnData>,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>(
    getOptions: (
        get: Getter,
    ) => AtomWithInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey, TPageParam> &
        OptionsWithCbk<TQueryFnData, TError>,
) {
    return atomWithInfiniteQuery((get) => {
        const { queryKey, queryFn, onSuccess, onError, onSettled, ...options } = getOptions(get);

        return {
            queryKey,
            queryFn: extendedQueryFn({
                queryKey,
                queryFn,
                onSuccess,
                onError,
                onSettled,
            }),
            ...options,
        };
    });
}
