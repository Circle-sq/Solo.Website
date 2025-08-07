import type { InfiniteData, InitialDataFunction, Updater } from '@tanstack/query-core';

export type QueryCacheUpdater<T> = Updater<T, T>;

export type StringBoolean = 'true' | 'false';

export type YesNo = 'yes' | 'no';

export interface InfiniteQueryParams {
    page: number;
    perPage: number;
}

export interface Aggs {
    [key: string]: {
        type: 'aggregation';
        size: number;
        aggs?: Aggs;
    };
}

export interface MatchTermParam<T> {
    type: 'match';
    value: T;
}

export interface ShouldMatchTermParam<T> {
    type: 'shouldMatch';
    values: readonly T[];
}

export interface RangeTermParam {
    type: 'range';
    from: string;
    to: string;
}

export interface MarketTagsParam {
    [tag: string]: [YesNo];
}

export interface SortParam {
    field: string;
    order: 'asc' | 'desc';
}

export interface QueryOptions<TQueryFnData, TData = TQueryFnData> {
    enabled?: boolean;
    select?: (data: TQueryFnData) => TData;
}

export interface InfiniteQueryOptions<TQueryFnData, TData = TQueryFnData> {
    enabled?: boolean;
    initialData?: InfiniteData<TQueryFnData, number> | InitialDataFunction<InfiniteData<TQueryFnData, number>>;
    select?: (data: InfiniteData<TQueryFnData, number>) => InfiniteData<TData, number>;
}
