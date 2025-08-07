import type { AxiosError, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

import type { HttpMethod } from 'src/utils/enums';

export type Method = keyof typeof HttpMethod;

export type TransformResponse = string | Record<string, unknown>;

export interface RequestOptions {
    headers: RawAxiosRequestHeaders;
    cache: number;
    id: string | number;
}

export interface AuthData {
    token: string;
    refresh_token: string;
    expires: string;
}

export interface HttpParams<T = Record<string, unknown>> extends Partial<RequestOptions> {
    data: Partial<T>;
}

export interface CustomResponse<T = unknown> {
    response: {
        res?: T;
        err?: AxiosError;
    };
}

export type ApiPromise<T> = Promise<T> & Partial<CustomResponse<T>>;

export interface CachedRequest<T = unknown> {
    expires: number;
    promise: ApiPromise<T>;
}

interface ErrorConfig extends AxiosRequestConfig<unknown> {
    url: string;
    headers: RequestOptions['headers'];
    _retry?: boolean;
}

export interface ErrorParameter {
    config: ErrorConfig;
    request: XMLHttpRequest;
    response: XMLHttpRequest['response'];
}
