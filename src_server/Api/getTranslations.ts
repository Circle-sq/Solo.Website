import * as t from 'io-ts';
import { buildValidator } from '@sc-webapi/mobx-utils/buildValidator';
import type { PlatformApi } from '@sc-webapi/realtime-server/PlatformApi/PlatformApi';
import type { ConfigServer } from '../ConfigServer';
import * as tags from 'language-tags';
import type { LangDetailsRecordType } from '../../src/appState/LanguagesState';

const getLanguageName = (tag: string): string => {
    try {
        if (/[^-]+-.+/.exec(tag)) {
            const [language, region] = tag.split('-');
            const tagLanguage = tags.language(language)?.descriptions()[0];
            const tagRegion = tags.region(region)?.descriptions()[0];

            if (tagLanguage !== undefined && tagRegion !== undefined) {
                return `${tagLanguage} (${tagRegion})`;
            }
        } else {
            const tagLanguage = tags.language(tag)?.descriptions()[0];

            if (tagLanguage !== undefined) {
                return tagLanguage;
            }
        }

        return tag;
    } catch {
        return tag;
    }
};

const TranslationsResponseIO = t.union([
    t.interface({
        status: t.literal(200),
        bodyJson: t.interface({
            description: t.union([t.string, t.undefined]),
            properties: t.record(t.string, t.string),
        }),
    }),
    t.interface({
        status: t.literal(404),
    }),
]);

type TranslationsResponseType = t.TypeOf<typeof TranslationsResponseIO>;
const decodeTranslationsResponseType = buildValidator<TranslationsResponseType>(
    'TranslationsResponseType',
    TranslationsResponseIO,
    true,
);

export const getTranslations = async (
    config: ConfigServer,
    platformApi: PlatformApi,
    lang: string,
    groupId: string,
): Promise<LangDetailsRecordType | null> => {
    const extraHeaders = {
        'Accept-Encoding': 'gzip, deflate, br',
    };
    const result = await platformApi.fetchGet({
        url: `${config.API_URL}/translations/${config.OPERATOR}/${groupId}/${lang}`,
        decode: decodeTranslationsResponseType,
        extraHeaders: extraHeaders,
    });

    if (result.status === 200) {
        const description = result.bodyJson.description;
        const properties = result.bodyJson.properties;

        if (description) {
            return {
                description: description,
                properties: properties,
            };
        }

        return {
            description: getLanguageName(lang),
            properties: properties,
        };
    }

    return null;
};
