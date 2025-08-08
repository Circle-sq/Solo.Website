import * as cookie from 'cookie';
import type * as express from 'express';
import isEmpty from 'lodash/isEmpty';
import ms from 'ms';

import type { PlatformApi } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';

import type { LangDetailsMapType } from '../../src/appState/LanguagesState';
import { convertRecordToMapDefault } from '../../src/appState/utils';
import { mutltiLanguageForUniverse } from '../../src/config/features_flags';
import { getAvailableLanguages } from '../Api/getAvailableLanguages';
import { getTranslations } from '../Api/getTranslations';
import { getUserLanguages } from '../Api/getUserLanguages';
import type { ConfigServer } from '../ConfigServer';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const translationsCache: { [langKey: string]: { data: LangDetailsMapType; timestamp: number } } = {};

const getAllTranslations = async (
    config: ConfigServer,
    platformApi: PlatformApi,
): Promise<Map<string, LangDetailsMapType>> => {
    const languages = await getAvailableLanguages(config, platformApi);

    const out: Map<string, LangDetailsMapType> = new Map();
    const groups = ['site', 'bet-types'];
    const dateNow = Date.now();

    //Cache for translations, default value 10 minutes
    let ttl = ms('10m');

    if (!isEmpty(process.env.TRANSLATIONS_CACHE_TTL)) {
        ttl = ms(`${process.env.TRANSLATIONS_CACHE_TTL}m`);
    }
    // Convert ttl to minutes
    const ttlInMinutes = ttl / (SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND);
    console.info('Translations Cache TTL', ttlInMinutes, 'minute(s)');

    for (const langKey of languages) {
        //TODO: remove this check after the en-GB language will be removed from back office
        if (langKey === 'en-GB') {
            continue;
        }

        const cachedTranslation = translationsCache[langKey];

        if (cachedTranslation && dateNow - cachedTranslation.timestamp < ttl) {
            out.set(langKey, cachedTranslation.data);
            console.info('Translations for the langKey ', langKey, ' from CACHE');

            continue;
        }

        console.info('Translations for the langKey ', langKey, ' from the API');

        const result = await Promise.all(
            groups.map(async (groupId) => getTranslations(config, platformApi, langKey, groupId)),
        );

        const translations = result.reduce((acc, result) => {
            if (result === null) {
                return acc;
            }

            if (acc === null) {
                return result;
            }

            return { ...acc, properties: { ...acc.properties, ...result.properties } };
        }, null);

        if (translations !== null) {
            translationsCache[langKey] = {
                data: {
                    description: translations.description,
                    properties: convertRecordToMapDefault(translations.properties),
                },
                timestamp: Date.now(),
            };
            out.set(langKey, translationsCache[langKey].data);
        }
    }

    return out;
};

const getLang = async (
    config: ConfigServer,
    platformApi: PlatformApi,
    req: express.Request,
): Promise<string | null> => {
    const acceptLanguageFromUserBrowser = req?.header('accept-language');
    const cookieValue = req?.headers['cookie'];
    const cookieParsed = cookie?.parse(cookieValue || '');
    const userSid = cookieParsed['website.sid'] || null;

    try {
        const [lang] = acceptLanguageFromUserBrowser !== undefined ? acceptLanguageFromUserBrowser.split(',') : [''];

        return await getUserLanguages(config, platformApi, lang.toLowerCase(), userSid);
    } catch (_e) {
        return null;
    }
};

const initLanguages = async (
    config: ConfigServer,
    platformApi: PlatformApi,
): Promise<Map<string, LangDetailsMapType>> => {
    try {
        return await getAllTranslations(config, platformApi);
    } catch (err) {
        console.error(err, '_CFG:FE_LIB_multiLanguage');
    }

    return new Map();
};

type AllTranslationDataReturn = Map<string, LangDetailsMapType>;

interface AllTranslationReturn {
    data: AllTranslationDataReturn;
}

const getAllTranslationsInit = async (
    config: ConfigServer,
    platformApi: PlatformApi,
): Promise<AllTranslationReturn> => {
    const out = {
        data: await initLanguages(config, platformApi),
    };

    return out;
};

const getAllTranslationsInitMock = (): AllTranslationReturn => {
    return {
        data: new Map(),
    };
};

const getUserMock = () => null;

export const initTranslationData = async (
    config: ConfigServer,
    platformApi: PlatformApi,
): Promise<AllTranslationReturn> => {
    if (mutltiLanguageForUniverse()) {
        return await getAllTranslationsInit(config, platformApi);
    }

    return getAllTranslationsInitMock();
};

export const initUserLang = async (config: ConfigServer, platformApi: PlatformApi, req: express.Request) => {
    if (mutltiLanguageForUniverse()) {
        return await getLang(config, platformApi, req);
    }

    return getUserMock();
};
