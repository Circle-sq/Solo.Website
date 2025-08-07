import * as t from 'io-ts';
import ms from 'ms';

import { assertNever } from '@sc-webapi/mobx-utils/assertNever';
import { buildValidator } from '@sc-webapi/mobx-utils/buildValidator';
import type { PlatformApi } from '@sc-webapi/realtime-server/PlatformApi/PlatformApi';

import { SPORT_REMAPPING as SPORT_REMAPPING_DEFAULT } from 'src/config/config';

const ProgramSessionResponseIO = t.interface({
    status: t.literal(201),
    bodyJson: t.interface({
        access_token: t.string,
    }),
});

const decodeProgramSessionResponse = buildValidator('ProgramSessionResponseIO', ProgramSessionResponseIO);

const REFRESH_TIMEOUT_DEFAULT = ms('6s');
const ACCOUNT_UPDATE_DELAY_TIMEOUT_DEFAULT = ms('2s');

const FETCH_MARKETS_GROUP_SIZE_DEFAULT = 200;

export class ConfigServer {
    readonly universe: string;
    readonly platformApi: PlatformApi;
    readonly configUser: string;
    readonly configPassword: string;

    constructor(platformApi: PlatformApi, configUser: string, configPassword: string) {
        if (typeof window !== 'undefined') {
            throw Error('Server configuration can only be read on the server side');
        }

        this.universe = process.env.UNIVERSE || '';

        this.platformApi = platformApi;

        this.configUser = configUser;

        this.configPassword = configPassword;
    }

    static get universe(): string {
        return process.env.UNIVERSE || '';
    }

    static API_URL(): string {
        const API_URL = process.env.API_URL;

        if (typeof API_URL === 'string') {
            return API_URL;
        }

        throw Error('Missing process.env.API_HOST');
    }

    get API_URL(): string {
        const API_URL = process.env.API_URL;

        if (typeof API_URL === 'string') {
            return API_URL;
        }

        throw Error('Missing process.env.API_HOST');
    }

    static get API_USERNAME(): string | null {
        const API_USERNAME = process.env.API_USERNAME;

        if (typeof API_USERNAME === 'string') {
            return API_USERNAME;
        }

        return null;
    }

    get API_USERNAME(): string | null {
        const API_USERNAME = process.env.API_USERNAME;

        if (typeof API_USERNAME === 'string') {
            return API_USERNAME;
        }

        return null;
    }

    static get API_PASSWORD(): string | null {
        const API_PASSWORD = process.env.API_PASSWORD;

        if (typeof API_PASSWORD === 'string') {
            return API_PASSWORD;
        }

        return null;
    }

    get API_PASSWORD(): string | null {
        const API_PASSWORD = process.env.API_PASSWORD;

        if (typeof API_PASSWORD === 'string') {
            return API_PASSWORD;
        }

        return null;
    }

    get OPERATOR(): string {
        const OPERATOR = process.env.OPERATOR;

        if (typeof OPERATOR === 'string') {
            return OPERATOR;
        }

        throw Error('Missing process.env.OPERATOR');
    }

    static get OPERATOR(): string {
        const OPERATOR = process.env.OPERATOR;

        if (typeof OPERATOR === 'string') {
            return OPERATOR;
        }

        throw Error('Missing process.env.OPERATOR');
    }

    get WEBSOCKET_HOST(): string {
        const WEBSOCKET_HOST = process.env.WEBSOCKET_HOST;

        if (typeof WEBSOCKET_HOST === 'string') {
            return WEBSOCKET_HOST;
        }

        throw Error('Missing process.env.WEBSOCKET_HOST');
    }

    get CASHOUT_WEBSOCKET_HOST(): string {
        const CASHOUT_WEBSOCKET_HOST = process.env.CASHOUT_WEBSOCKET_HOST;

        if (typeof CASHOUT_WEBSOCKET_HOST === 'string') {
            return CASHOUT_WEBSOCKET_HOST;
        }

        throw Error('Missing process.env.CASHOUT_WEBSOCKET_HOST');
    }

    get REFRESH_TIMEOUT(): number {
        const REFRESH_TIMEOUT = process.env.REFRESH_TIMEOUT;

        if (typeof REFRESH_TIMEOUT === 'string') {
            return parseInt(REFRESH_TIMEOUT);
        }

        return REFRESH_TIMEOUT_DEFAULT;
    }

    get ACCOUNT_UPDATE_DELAY_TIMEOUT(): number {
        const ACCOUNT_UPDATE_DELAY_TIMEOUT = process.env.ACCOUNT_UPDATE_DELAY_TIMEOUT;

        if (typeof ACCOUNT_UPDATE_DELAY_TIMEOUT === 'string') {
            return parseInt(ACCOUNT_UPDATE_DELAY_TIMEOUT);
        }

        return ACCOUNT_UPDATE_DELAY_TIMEOUT_DEFAULT;
    }

    get IMG_API_URL(): string {
        const IMG_API_URL = process.env.IMG_API_URL;

        if (typeof IMG_API_URL === 'string') {
            return IMG_API_URL;
        }

        throw Error('Missing process.env.IMG_API_URL');
    }

    static get MAINTENANCE_PAGE(): boolean {
        const value = process.env.MAINTENANCE_PAGE;

        return value === 'true';
    }

    get FETCH_MARKETS_GROUP_SIZE(): number {
        const FETCH_MARKETS_GROUP_SIZE = process.env.FETCH_MARKETS_GROUP_SIZE;

        if (typeof FETCH_MARKETS_GROUP_SIZE === 'string') {
            return parseInt(FETCH_MARKETS_GROUP_SIZE, 10);
        }

        return FETCH_MARKETS_GROUP_SIZE_DEFAULT;
    }

    get SHOULD_REFRESH_EVENT(): boolean {
        const SHOULD_REFRESH_EVENT = process.env.SHOULD_REFRESH_EVENT;

        if (typeof SHOULD_REFRESH_EVENT === 'string') {
            return SHOULD_REFRESH_EVENT === 'true';
        }

        return false;
    }

    get FEATURE_TOGGLING_PROXY_URI(): string {
        const FEATURE_TOGGLING_PROXY_URI = process.env.FEATURE_TOGGLING_PROXY_URI;

        if (typeof FEATURE_TOGGLING_PROXY_URI === 'string') {
            return FEATURE_TOGGLING_PROXY_URI;
        }

        throw Error('Missing process.env.FEATURE_TOGGLING_PROXY_URI');
    }

    get FEATURE_TOGGLING_PROXY_TOKEN(): string {
        const FEATURE_TOGGLING_PROXY_TOKEN = process.env.FEATURE_TOGGLING_PROXY_TOKEN;

        if (typeof FEATURE_TOGGLING_PROXY_TOKEN === 'string') {
            return FEATURE_TOGGLING_PROXY_TOKEN;
        }

        throw Error('Missing process.env.FEATURE_TOGGLING_PROXY_TOKEN');
    }

    get SPORT_REMAPPING(): Map<string, string> {
        const SPORT_REMAPPING = process.env.SPORT_REMAPPING;

        if (typeof SPORT_REMAPPING === 'string') {
            return SPORT_REMAPPING.split(',').reduce((map, it) => {
                const entryString = it.split(':');

                return map.set(entryString[0], entryString[1]);
            }, new Map<string, string>());
        }

        return SPORT_REMAPPING_DEFAULT;
    }

    static getConfig(platformApi: PlatformApi, configUser: string, configPassword: string): ConfigServer {
        return new ConfigServer(platformApi, configUser, configPassword);
    }

    async getProgramToken(): Promise<string> {
        const accountType = 'program';

        const resp = await this.platformApi.fetchPost({
            url: `${this.API_URL}/sessions/${this.universe}/${accountType}`,
            postBody: {
                username: this.configUser,
                password: this.configPassword,
                grant_type: 'password',
            },
            decode: decodeProgramSessionResponse,
        });

        if (resp.status === 201) {
            return resp.bodyJson.access_token;
        }

        return assertNever('getProgramToken', resp.status);
    }
}
