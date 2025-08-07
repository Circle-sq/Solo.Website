import { PlatformApiTokenManager } from './PlatformApiTokenManager';
import { TokenManager } from './TokenManager/TokenManager';

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
    withoutToken?: boolean;
}

interface DriverType {
    fetchPost: <P, R extends { status: number }>(params: PostParam<P, R>) => Promise<R>;
    fetchPatch: <P, R extends { status: number }>(params: PostParam<P, R>) => Promise<R>;
    fetchGet: <R extends { status: number }>(params: GetParams<R>) => Promise<R>;
    fetchGetWithoutToken: <R extends { status: number }>(params: GetParams<R>) => Promise<R>;
}

export interface ConfigJsonAccess {
    username: string;
    password: string;
    api: PlatformApi;
}

export class PlatformApi {
    private driver: DriverType;

    constructor(driver: DriverType) {
        this.driver = driver;
    }

    static async fromConfigJson(apiHost: string, path: string): Promise<Map<string, ConfigJsonAccess>> {
        const tokens = await TokenManager.initTokenManager(apiHost, path);

        const newMap: Map<string, ConfigJsonAccess> = new Map();

        for (const [key, item] of tokens.entries()) {
            newMap.set(key, {
                username: item.config.user,
                password: item.config.pass,
                api: new PlatformApi(new PlatformApiTokenManager(item)),
            });
        }

        return newMap;
    }

    async fetchPost<P, R extends { status: number }>(params: PostParam<P, R>): Promise<R> {
        return this.driver.fetchPost(params);
    }

    async fetchPatch<P, R extends { status: number }>(params: PostParam<P, R>): Promise<R> {
        return this.driver.fetchPatch(params);
    }

    async fetchGet<R extends { status: number }>(params: GetParams<R>): Promise<R> {
        return this.driver.fetchGet(params);
    }

    async fetchGetWithoutToken<R extends { status: number }>(params: GetParams<R>): Promise<R> {
        return this.driver.fetchGetWithoutToken(params);
    }
}
