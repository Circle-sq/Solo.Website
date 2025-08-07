import { createPromiseBox } from '@sc-webapi/mobx-utils/createPromiseBox';
import { readFile } from '@sc-webapi/mobx-utils/stdfs';
import { timeout } from '@sc-webapi/mobx-utils/timeout';

import type { GetParamsWithoutToken, PostParamWithoutToken, FetchGeneralResponseType } from '../../fetch';
import { fetchGeneral, decodeResponse } from '../../fetch';

import { getBackendToken, decodeApiConfig } from './api';
import type { ProgramConfigType } from './api';

const RETRY_CREATE_TOKEN = 5;
const RETRY_CREATE_TIMEOUT = 2000;

const RETRAY_METHOD_COUNT = 3;
const RETRAY_METHOD_TIMEOUT = 2000;

const runWithRetry = async <T>(
    label: string,
    retry_left: number,
    retry_timeout: number,
    run: () => Promise<T>,
): Promise<T> => {
    console.info(`${label} (retry left ${retry_left})`);

    try {
        return await run();
    } catch (err) {
        if (retry_left > 0) {
            console.error(err);
            await timeout(RETRY_CREATE_TIMEOUT);

            return runWithRetry(label, retry_left - 1, retry_timeout, run);
        }

        return Promise.reject(err);
    }
};

const parseJSON = (data: string) => {
    try {
        return JSON.parse(data);
    } catch (_err) {
        return new Error('config.json - parse error');
    }
};

class TokenRequest {
    readonly tokenPromise: Promise<string>;
    isValid: boolean;

    constructor(config: ProgramConfigType) {
        const promiseControl = createPromiseBox<string>();
        this.tokenPromise = promiseControl.promise;
        this.isValid = true;

        (async () => {
            const tokenValue = await runWithRetry(
                'Get backend token',
                RETRY_CREATE_TOKEN,
                RETRY_CREATE_TIMEOUT,
                async () => getBackendToken(config),
            );

            promiseControl.resolve(tokenValue);
        })();
    }
}

type MethodType = (token: string) => Promise<FetchGeneralResponseType>;

export class TokenManager {
    public readonly config: ProgramConfigType;
    private token: null | TokenRequest;

    constructor(config: ProgramConfigType) {
        this.config = config;
        this.token = null;
    }

    static async initTokenManager(apiHost: string, path: string): Promise<Map<string, TokenManager>> {
        const configContent = await readFile(path);

        const configContentJSON = parseJSON(configContent);

        if (configContentJSON instanceof Error) {
            return Promise.reject(configContentJSON);
        }

        const configDecoded = decodeApiConfig(configContentJSON);

        if (configDecoded instanceof Error) {
            return Promise.reject(configDecoded);
        }

        const result = new Map();

        for (const [universe, universeBody] of Object.entries(configDecoded)) {
            result.set(
                universe,
                new TokenManager({
                    host: apiHost,
                    user: universeBody.api_username,
                    pass: universeBody.api_password,
                    universe,
                }),
            );
        }

        return result;
    }

    private getToken = (): TokenRequest => {
        const token = this.token;

        if (token && token.isValid) {
            return token;
        }

        this.token = new TokenRequest(this.config);

        return this.token;
    };

    private runWithRetry = async (method: MethodType, retryLeft: number): Promise<FetchGeneralResponseType> => {
        const token: TokenRequest = this.getToken();
        const apiToken: string = await token.tokenPromise;

        const result = await method(apiToken);

        if (result.status === 401) {
            token.isValid = false;

            if (retryLeft > 0) {
                await timeout(RETRAY_METHOD_TIMEOUT);

                return this.runWithRetry(method, retryLeft - 1);
            }
        }

        return result;
    };

    private run = async (method: MethodType): Promise<FetchGeneralResponseType> => {
        return this.runWithRetry(method, RETRAY_METHOD_COUNT);
    };

    fetchGet = async <R extends { status: number }>(params: GetParamsWithoutToken<R>): Promise<R> => {
        const response = await this.run(async (token) =>
            fetchGeneral('GET', {
                ...params,
                backendToken: token,
            }),
        );

        return decodeResponse(response, params.decode);
    };

    fetchGetWithoutToken = async <R extends { status: number }>(params: GetParamsWithoutToken<R>): Promise<R> => {
        return decodeResponse(
            await fetchGeneral('GET', {
                ...params,
                backendToken: null,
            }),
            params.decode,
        );
    };

    fetchPost = async <P, R extends { status: number }>(params: PostParamWithoutToken<P, R>): Promise<R> => {
        const response = await this.run(async (token) =>
            fetchGeneral('POST', {
                ...params,
                backendToken: token,
            }),
        );

        return decodeResponse(response, params.decode);
    };

    fetchPatch = async <P, R extends { status: number }>(params: PostParamWithoutToken<P, R>): Promise<R> => {
        const response = await this.run(async (token) =>
            fetchGeneral('PATCH', {
                ...params,
                backendToken: token,
            }),
        );

        return decodeResponse(response, params.decode);
    };
}
