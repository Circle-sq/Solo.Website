import type { DefaultError, QueryKey } from '@tanstack/query-core';
import type { QueryFunction, QueryFunctionContext } from '@tanstack/react-query';
import { notifyManager, skipToken } from '@tanstack/react-query';

import type { OptionsWithCbk } from './types';

// Include callbacks in batch renders
const batchCallback = <T extends (...args: Parameters<T>) => ReturnType<T>>(cb?: T) =>
    cb !== undefined ? notifyManager.batchCalls(cb) : undefined;

export function extendedQueryFn<
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
    return async (context: QueryFunctionContext<TQueryKey, TPageParam>) => {
        if (queryFn === undefined || queryFn === skipToken) {
            return Promise.reject(new Error(`Missing queryFn: '${queryKey}'`));
        }

        const batchedOnSuccess = batchCallback(onSuccess);
        const batchedOnError = batchCallback(onError);
        const batchedOnSettled = batchCallback(onSettled);

        return Promise.resolve<TQueryFnData>(queryFn(context))
            .then((data) => {
                batchedOnSuccess?.(data);
                batchedOnSettled?.(data, null);

                return data;
            })
            .catch((error: TError) => {
                batchedOnError?.(error);
                batchedOnSettled?.(undefined, error);

                throw error;
            });
    };
}
