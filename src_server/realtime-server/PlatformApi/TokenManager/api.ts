import { fetchPost } from '../../fetch';
import * as t from 'io-ts';
import { buildValidator } from '@solo-webapi/mobx-utils/buildValidator';

export interface ProgramConfigType {
    readonly host: string;
    readonly user: string;
    readonly pass: string;
    readonly universe: string;
}

export const AutorizationResponse = t.union([
    t.interface({
        status: t.literal(200),
        bodyJson: t.interface({
            access_token: t.string,
        }),
    }),
    t.interface({
        status: t.literal(201),
        bodyJson: t.interface({
            access_token: t.string,
        }),
    }),
]);

export type AutorizationResponseType = t.TypeOf<typeof AutorizationResponse>;

export const decodeAutorizationResponse = buildValidator<AutorizationResponseType>(
    'AutorizationResponse',
    AutorizationResponse,
    true,
);

const ApiConfigItem = t.interface({
    api_username: t.string,
    api_password: t.string,
});

const ApiConfig = t.record(t.string, ApiConfigItem);

export type ApiConfigType = t.TypeOf<typeof ApiConfig>;

export const decodeApiConfig = buildValidator<ApiConfigType>('ApiConfig', ApiConfig);

/*
    Manager for tokenID to backend...

    annonimus           - annonimus
    coustomer           - user on website
    staff               - backoffice
    program             - super admin
*/

export const getBackendToken = async (config: ProgramConfigType) => {
    const { host, user, pass, universe } = config;

    const post = {
        username: user,
        password: pass,
        grant_type: 'password',
    };

    const api_url = `${host}/sessions/${universe}/program`;

    console.info(`FETCH-API call ${api_url} (username=${user})`);

    const result = await fetchPost({
        url: `${host}/sessions/${universe}/program`,
        backendToken: null,
        postBody: post,
        decode: decodeAutorizationResponse,
    });

    return result.bodyJson.access_token;
};
