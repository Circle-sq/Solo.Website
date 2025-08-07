import * as t from 'io-ts';
import { buildValidator } from '@sc-webapi/mobx-utils/buildValidator';
import type { PlatformApi } from '@sc-webapi/realtime-server/PlatformApi/PlatformApi';
import type { ConfigServer } from '../ConfigServer';

const UserLangageIO = t.union([
    t.interface({
        status: t.literal(200),
        bodyJson: t.interface({
            languageTag: t.string,
        }),
    }),
    t.interface({
        status: t.literal(401),
        bodyJson: t.interface({
            code: t.literal('invalid_token'),
            //message: 'Session is gone, expired or terminated.'
        }),
    }),
    t.interface({
        status: t.literal(404),
        //bodyJson: { message: 'The requested resource could not be found.' }
    }),
]);

type UserLangageType = t.TypeOf<typeof UserLangageIO>;
const decodeUserLangageType = buildValidator<UserLangageType>('UserLangage', UserLangageIO);

export const getUserLanguages = async (
    config: ConfigServer,
    platformApi: PlatformApi,
    acceptLanguage: string,
    backendToken: string | null,
): Promise<string | null> => {
    const extraHeaders = {
        'Accept-Encoding': 'gzip, deflate, br',
        'accept-language': acceptLanguage,
    };
    const params = {
        url: `${config.API_URL}/user-translations/${config.OPERATOR}/site?justTag`,
        backendToken,
        decode: decodeUserLangageType,
        extraHeaders: extraHeaders,
    };

    const response = await platformApi.fetchGet(params);

    if (response.status === 200) {
        return response.bodyJson.languageTag;
    }

    return null;
};
