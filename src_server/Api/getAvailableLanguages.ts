import * as t from 'io-ts';
import { buildValidator } from '@sc-webapi/mobx-utils/buildValidator';
import type { PlatformApi } from '@sc-webapi/realtime-server/PlatformApi/PlatformApi';
import type { ConfigServer } from '../ConfigServer';

const LanguagesResponseIO = t.union([
    t.interface({
        status: t.literal(200),
        bodyJson: t.interface({
            site: t.array(t.string),
        }),
    }),
    t.interface({
        status: t.literal(404),
    }),
]);

type LanguagesResponseType =
    | {
          status: 200;
          bodyJson: {
              site: string[];
          };
      }
    | {
          status: 404;
      };

const decodeLanguagesResponseType = buildValidator<LanguagesResponseType>(
    'LanguagesResponse',
    LanguagesResponseIO,
    true,
);

export const getAvailableLanguages = async (
    config: ConfigServer,
    platformApi: PlatformApi,
): Promise<readonly string[]> => {
    // INFO: in PlatformApi the default headers is application/json
    const extraHeaders = {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
    };

    const params = {
        url: `${config.API_URL}/translations/${config.OPERATOR}/tags`,
        decode: decodeLanguagesResponseType,
        extraHeaders: extraHeaders,
    };

    const result = await platformApi.fetchGet(params);

    console.info(`${config.API_URL}/translations/${config.OPERATOR}/tags`);

    if (result.status === 200) {
        const languages = result.bodyJson.site;

        if (!languages) {
            return [];
        }

        return languages;
    }

    if (result.status === 404) {
        return [];
    }

    return [];
};
