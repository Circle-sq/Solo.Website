import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import includes from 'lodash/includes';
import isNull from 'lodash/isNull';

import { signOut } from '@sc-account/actions';
import { isAuthenticatedAtom } from '@sc-account/store/atoms';
import { resetBetslipState } from '@sc-betslip/store/tasks/betslip';
import { store } from '@sc-utils/jotai';
import { HttpStatusCode } from '@sc-webapi/enums';

import { ErrorCodes, HttpMethod } from 'src/utils/enums';
import buildStorageService, { getStorageBuilder, type ValueStorage } from 'src/utils/StorageService';

import { getDocumentLang } from '../common';
import { STORAGE_KEYS } from '../constants';
import { isTokenExpired } from '../expiredToken';
import { getTokenExpirationDate } from '../jwt';
import { sessionExpired } from '../portal-commands';
import translateGlobally from '../translateGlobally';

import { apiDebugLog, applyQueryParams, eventuallyJSON, hash, sanitizeLang } from './helpers';
import type {
    ApiPromise,
    AuthData,
    CachedRequest,
    ErrorParameter,
    HttpParams,
    Method,
    RequestOptions,
    TransformResponse,
} from './types';

class Api {
    private static instance: Api;

    FOREVER: number;
    CACHE_CONTROL: string;
    CACHE_CONTROL_NO_CACHE: string;

    readonly show_debug_logs: boolean | null = null;
    private url: string;
    private cacheRequests: Record<string, CachedRequest>;
    private temporaryRequests: Record<string, ApiPromise<unknown>>;
    private headers: AxiosRequestHeaders;
    private tokenStorage: ValueStorage<string> | null;
    private expiresTokenStorage: ValueStorage<string> | null;
    private refreshTokenStorage: ValueStorage<string> | null;
    private isInvalidRefreshToken: boolean;
    private expiresRefreshTokenStorage: ValueStorage<string> | null;
    private httpRequest: AxiosInstance;
    private httpRequestForBackgroundAuth: AxiosInstance;

    private static tokenRefreshCall: Promise<string> | null = null;
    private static anonymousTokenCall: Promise<string> | null = null;

    private constructor(url: string, headers = {}) {
        this.url = url;
        this.cacheRequests = {};
        this.temporaryRequests = {};
        this.headers = { ...headers } as AxiosRequestHeaders;
        this.refreshTokenStorage = null;
        this.expiresRefreshTokenStorage = null;
        this.tokenStorage = null;
        this.expiresTokenStorage = null;
        this.isInvalidRefreshToken = false;
        this.show_debug_logs = buildStorageService<boolean>('devtools.show_socket_logs').getItem();

        const axiosConfig: AxiosRequestConfig = {
            baseURL: this.url,
            headers: this.headers,
            transformResponse: (data: TransformResponse): TransformResponse => eventuallyJSON(data),
        };

        this.httpRequest = axios.create({ ...axiosConfig });
        this.httpRequestForBackgroundAuth = axios.create({ ...axiosConfig });
        this.initHttpRequests();

        this.FOREVER = Api.prototype.FOREVER = 30 * 24 * 3600000;
        this.CACHE_CONTROL = Api.prototype.CACHE_CONTROL = 'public,max-age=3600';
        this.CACHE_CONTROL_NO_CACHE = Api.prototype.CACHE_CONTROL_NO_CACHE = 'no-cache, must-revalidate, max-age=0';
    }

    public static getInstance(url: string, headers = {}): Api {
        if (!Api.instance) {
            Api.instance = new Api(url, headers);
        }

        return Api.instance;
    }

    getRefreshTokenStorage(): ValueStorage<string> {
        if (!this.refreshTokenStorage) {
            this.refreshTokenStorage = getStorageBuilder()(STORAGE_KEYS.refreshToken);
        }

        return this.refreshTokenStorage;
    }

    getExpiresRefreshTokenStorage(): ValueStorage<string> {
        if (!this.expiresRefreshTokenStorage) {
            this.expiresRefreshTokenStorage = getStorageBuilder()(STORAGE_KEYS.refreshTokenExpireDate);
        }

        return this.expiresRefreshTokenStorage;
    }

    getTokenStorage(): ValueStorage<string> {
        if (!this.tokenStorage) {
            this.tokenStorage = getStorageBuilder()(STORAGE_KEYS.token);
        }

        return this.tokenStorage;
    }

    getExpiresTokenStorage(): ValueStorage<string> {
        if (!this.expiresTokenStorage) {
            this.expiresTokenStorage = getStorageBuilder()(STORAGE_KEYS.tokenExpireDate);
        }

        return this.expiresTokenStorage;
    }

    clearTokensStorage() {
        this.getRefreshTokenStorage().removeItem();
        this.getExpiresRefreshTokenStorage().removeItem();
        this.getTokenStorage().removeItem();
        this.getExpiresTokenStorage().removeItem();
    }

    isExpiredRefreshToken(): boolean {
        const expires = this.getExpiresRefreshTokenStorage().getItem();

        if (expires) {
            const currentDate = new Date().getTime();
            const expiresTime = new Date(expires).getTime();

            if (expiresTime < currentDate) {
                if (store.get(isAuthenticatedAtom)) {
                    void signOut();
                    resetBetslipState();
                }

                return true;
            }
        }

        return false;
    }

    async getToken() {
        if (!this.tokenStorage) {
            this.tokenStorage = getStorageBuilder()(STORAGE_KEYS.token);
        }

        const refreshToken = this.getRefreshTokenStorage();

        if (this.isExpiredRefreshToken() || !refreshToken.getItem()) {
            if (refreshToken.getItem()) {
                this.clearTokensStorage();
            }

            return null;
        }

        if (isTokenExpired()) {
            await this.refreshAccessToken();
        }

        if (this.isInvalidRefreshToken) {
            return null;
        }

        return this.tokenStorage.getItem();
    }

    initHttpRequests() {
        this.httpRequest.interceptors.request.use(
            async ({ headers: requestHeaders, method, data, url = '', ...config }) => {
                const userLang = window.localStorage.getItem('userLang') ?? getDocumentLang();
                const storageToken = await this.getToken();
                const token = await (storageToken ? Promise.resolve(storageToken) : this.anonymousToken());

                const headers = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...(userLang ? { 'Accept-Language': sanitizeLang(userLang) } : {}),
                    ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
                };

                return {
                    ...config,
                    method,
                    headers: { ...requestHeaders, ...headers },
                    url: method?.toUpperCase() === HttpMethod.GET ? `${url}${applyQueryParams(url, data)}` : url,
                    data: method?.toUpperCase() === HttpMethod.GET ? null : data,
                } as InternalAxiosRequestConfig;
            },
            async (error) => {
                return Promise.reject(error);
            },
        );

        this.httpRequest.interceptors.response.use(
            (response): AxiosResponse['data'] => {
                return eventuallyJSON(response.data);
            },
            async (error: ErrorParameter) => {
                const completedRequest = 4;
                const originalRequest = error.config;
                const xhr = error.request;

                if (xhr?.readyState === completedRequest) {
                    if (xhr?.status !== 0) {
                        error.response.data = eventuallyJSON(error.response.data);
                    } else {
                        error.response.data = { errors: { network: "Network connection doesn't exist!" } };
                    }
                }

                if (error.response?.status === HttpStatusCode.Unauthorized && originalRequest._retry !== true) {
                    originalRequest._retry = true;
                    const token = await this.refreshAccessToken();

                    originalRequest.headers['Authorization'] = `Bearer ${token}`;

                    // this is needed because axious keeps appending base url, f.e /api/change-odds => /api/api/change-odds
                    // VA: temporary investigation
                    if (includes(originalRequest.url, '/api/api')) {
                        console.warn('OMG, axios added /api. Again!!!', originalRequest.url);
                        originalRequest.url = originalRequest.url.substr(this.url.length);
                    }

                    return this.httpRequest(originalRequest);
                }

                return Promise.reject({ ...error.response?.data, body: eventuallyJSON(error.response?.data) });
            },
        );
    }

    private forceLogout() {
        try {
            this.getRefreshTokenStorage().removeItem();

            void signOut();
            resetBetslipState();
        } catch (e) {
            console.error('Failed to dispatch logout request', e);
        }
    }

    async anonymousToken(): Promise<string> {
        if (isNull(Api.anonymousTokenCall)) {
            if (this.show_debug_logs) {
                apiDebugLog('POST anonymous token start');
            }

            Api.anonymousTokenCall = this.httpRequestForBackgroundAuth
                .request<AuthData>({
                    method: HttpMethod.POST,
                    url: '/create-anonymous-session',
                    data: {},
                })
                .then((res) => {
                    const { token, refresh_token, expires } = res.data;

                    if (!this.getRefreshTokenStorage().getItem() || !this.getTokenStorage().getItem()) {
                        this.getRefreshTokenStorage().setItem(refresh_token);
                        this.getExpiresRefreshTokenStorage().setItem(expires);
                        this.getTokenStorage().setItem(token);
                        this.getExpiresTokenStorage().setItem(getTokenExpirationDate(token));
                    }

                    this.isInvalidRefreshToken = false;

                    if (this.show_debug_logs) {
                        apiDebugLog('POST anonymous token set');
                    }

                    return token;
                })
                .catch(async (err) => {
                    console.error('Failed to get anonymous token...', err);

                    if (this.show_debug_logs) {
                        apiDebugLog('POST anonymous token failed');
                    }

                    return Promise.reject(err);
                })
                .finally(() => {
                    Api.anonymousTokenCall = null;
                });
        }

        return Api.anonymousTokenCall;
    }

    async refreshAccessToken(): Promise<string> {
        if (isNull(Api.tokenRefreshCall)) {
            if (!this.getRefreshTokenStorage().getItem()) {
                return Promise.reject("Can't get new access token because refresh token is not set. ");
            }
            Api.tokenRefreshCall = this.httpRequestForBackgroundAuth
                .request<AuthData>({
                    method: HttpMethod.POST,
                    url: '/session',
                    data: {
                        refresh_token: this.getRefreshTokenStorage().getItem(),
                    },
                })
                .then(async (res) => {
                    const { token, refresh_token, expires } = res.data;
                    this.clearTokensStorage();

                    this.getRefreshTokenStorage().setItem(refresh_token);
                    this.getTokenStorage().setItem(token);
                    this.getExpiresRefreshTokenStorage().setItem(expires);
                    this.getExpiresTokenStorage().setItem(getTokenExpirationDate(token));

                    return token;
                })
                .catch(async (err) => {
                    if (err.response?.data?.errors?.code === ErrorCodes.InvalidExternalToken) {
                        alert(
                            translateGlobally((getTranslation) =>
                                getTranslation(
                                    'window.session-is-finished-or-started-on-a-different-device',
                                    'Session is finished or started on a different device.',
                                ),
                            ),
                        );
                    }

                    this.isInvalidRefreshToken = true;

                    sessionExpired();

                    console.error('Refresh token request failed. Initiating logout...', err);

                    this.forceLogout();

                    return err;
                })
                .finally(() => {
                    Api.tokenRefreshCall = null;
                });
        }

        return Api.tokenRefreshCall;
    }

    async handleCacheRequest<T>(requestId: string): Promise<T> {
        const promise = this.cacheRequests[requestId].promise;

        if (promise !== undefined && promise.response !== undefined) {
            const { res, err } = promise.response;

            if (err !== undefined) {
                return Promise.reject(err);
            }

            if (res !== undefined) {
                return Promise.resolve<T>(res as T);
            }
        }

        return (this.cacheRequests[requestId] as CachedRequest<T>).promise;
    }

    async request<R, D>(
        method: Method,
        url: string,
        { data, headers, cache, id: requestId }: HttpParams<D>,
        signal?: AbortSignal,
    ): Promise<R> {
        const id = hash(method, url, { data, headers });
        const casheValue = cache && (cache < 100 ? 100 : Number(cache));
        const isCached = Boolean(casheValue && this.cacheRequests[id] && this.cacheRequests[id].expires >= Date.now());

        if (isCached) {
            return this.handleCacheRequest<R>(id);
        }

        /*
         * TODO: Fix chache requests for temporary array currently this was removed because it causes
         * for load more on sport pages
         */

        // if (requestId !== null && this.temporaryRequests[requestId] !== undefined) {
        //     source.cancel();

        //     return this.temporaryRequests[requestId];
        // }

        const promise: ApiPromise<R> = this.httpRequest
            .request<never, AxiosResponse<R>['data']>({
                method,
                url,
                data,
                headers,
                signal,
            })
            .then((res) => {
                promise.response = { res };

                return res;
            })
            .catch(async (err) => {
                promise.response = { ...promise.response, err };

                return Promise.reject(err);
            });

        if (cache) {
            this.cacheRequests[id] = {
                expires: Date.now() + cache,
                promise,
            };
        }

        if (requestId !== undefined) {
            this.temporaryRequests[requestId] = promise;
        }

        return promise;
    }

    async get<R = unknown, D = Record<string, unknown>>(
        url: string,
        data: Partial<D> = {},
        options: Partial<RequestOptions> = {},
        signal?: AbortSignal,
    ): Promise<R> {
        return this.request<R, D>(HttpMethod.GET, url, { ...options, data }, signal);
    }

    async post<R = unknown, D = Record<string, unknown>>(
        url: string,
        data: Partial<D> = {},
        options: Partial<RequestOptions> = {},
        signal?: AbortSignal,
    ): Promise<R> {
        return this.request<R, D>(HttpMethod.POST, url, { ...options, data }, signal);
    }

    async put<R = unknown, D = Record<string, unknown>>(
        url: string,
        data: Partial<D> = {},
        options: Partial<RequestOptions> = {},
        signal?: AbortSignal,
    ): Promise<R> {
        return this.request<R, D>(HttpMethod.PUT, url, { ...options, data }, signal);
    }

    async patch<R = unknown, D = Record<string, unknown>>(
        url: string,
        data: Partial<D> = {},
        options: Partial<RequestOptions> = {},
        signal?: AbortSignal,
    ): Promise<R> {
        return this.request<R, D>(HttpMethod.PATCH, url, { ...options, data }, signal);
    }
}

export default Api;
