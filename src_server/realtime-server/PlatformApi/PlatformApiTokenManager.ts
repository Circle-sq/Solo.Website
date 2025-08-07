import type { TokenManager } from './TokenManager/TokenManager';

export interface PostParam<P, R> {
    url: string;
    postBody: P;
    decode: (data: unknown) => R | Error;
    extraHeaders?: Record<string, string>;
}

export interface GetParams<R> {
    url: string;
    decode: (data: unknown) => R | Error;
    extraHeaders?: Record<string, string>;
}

export class PlatformApiTokenManager {
    private tokenManager: TokenManager;

    constructor(tokenManager: TokenManager) {
        this.tokenManager = tokenManager;
    }

    async fetchPost<P, R extends { status: number }>(params: PostParam<P, R>): Promise<R> {
        return this.tokenManager.fetchPost(params);
    }

    async fetchPatch<P, R extends { status: number }>(params: PostParam<P, R>): Promise<R> {
        return this.tokenManager.fetchPatch(params);
    }

    async fetchGet<R extends { status: number }>(params: GetParams<R>): Promise<R> {
        return this.tokenManager.fetchGet(params);
    }

    async fetchGetWithoutToken<R extends { status: number }>(params: GetParams<R>): Promise<R> {
        return this.tokenManager.fetchGetWithoutToken(params);
    }
}
