import type { DefaultError, QueryKey } from '@tanstack/query-core';
import type { QueryFunction, skipToken } from '@tanstack/react-query';
import { useCallback } from 'react';

import { extendedQueryFn } from './queryFn';
import type { OptionsWithCbk } from './types';

export function useQueryFn<
    TQueryFnData,
    TError = DefaultError,
    TQueryKey extends QueryKey = QueryKey,
    TPageParam = unknown,
>({
    queryKey,
    queryFn,
    onSuccess,
    onError,
    onSettled,
}: OptionsWithCbk<TQueryFnData, TError> & {
    queryKey: TQueryKey;
    queryFn?: QueryFunction<TQueryFnData, TQueryKey, TPageParam> | typeof skipToken;
}) {
    return useCallback<QueryFunction<TQueryFnData, TQueryKey, TPageParam>>(
        async (context) =>
            extendedQueryFn({
                queryKey,
                queryFn,
                onSuccess,
                onError,
                onSettled,
            })(context),
        [queryKey, queryFn, onSuccess, onError, onSettled],
    );
}
