import type { DefaultError, QueryKey } from '@tanstack/query-core';
import type { WritableAtom, Getter } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';
import type {
    DefinedAtomWithQueryResult,
    DefinedInitialDataOptions,
    AtomWithQueryOptions,
    AtomWithQueryResult,
    UndefinedInitialDataOptions,
} from 'jotai-tanstack-query';

import { extendedQueryFn, type OptionsWithCbk } from '@solo-utils/tanstack';

export function atomWithQueryCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    getOptions: (
        get: Getter,
    ) => UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & OptionsWithCbk<TQueryFnData, TError>,
): WritableAtom<AtomWithQueryResult<TData, TError>, [], void>;

export function atomWithQueryCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    getOptions: (
        get: Getter,
    ) => DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey> & OptionsWithCbk<TQueryFnData, TError>,
): WritableAtom<DefinedAtomWithQueryResult<TData, TError>, [], void>;

export function atomWithQueryCbk<
    TQueryFnData,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    getOptions: (
        get: Getter,
    ) => AtomWithQueryOptions<TQueryFnData, TError, TData, TQueryKey> & OptionsWithCbk<TQueryFnData, TError>,
) {
    return atomWithQuery((get) => {
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
