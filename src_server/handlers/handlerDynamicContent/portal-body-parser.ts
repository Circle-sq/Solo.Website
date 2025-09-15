import type { Request, Response } from 'express';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import pick from 'lodash/pick';
import split from 'lodash/split';
import startsWith from 'lodash/startsWith';

import type { ConfigServer } from '@solo-webapi/ConfigServer';
import { AppLocals, ResponseHeaders } from '@solo-webapi/enums';
import type { PlatformApi } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';
import { unleash } from '@solo-webapi/unleash-client';

import { COOKIE_NAME, setContentSecurityPolicyAPI, setContentSecurityPolicyENV } from './contentSecurityPolicy';
import { PortalLanguageShortcuts } from './types';

export const sanitizePortalLanguage = (language: string | undefined): string => {
    if (!isString(language)) {
        return PortalLanguageShortcuts.enGB;
    }

    if (isEmpty(language)) {
        return PortalLanguageShortcuts.enGB;
    }

    if (!isEmpty(PortalLanguageShortcuts[language])) {
        return PortalLanguageShortcuts[language];
    }

    const alreadySanitizedValue = Object.keys(PortalLanguageShortcuts).some(
        (key) => PortalLanguageShortcuts[key] === language,
    );

    if (alreadySanitizedValue) {
        return language;
    }

    return PortalLanguageShortcuts.enGB;
};
const portalOptionalFields = ['redirectURL', 'userLang', 'portalMessage', 'loginjwt', 'theme', 'guestCurrency'];
const portalBodyMandatoryFields = ['logintoken', 'dateFormat', 'shortDateFormat', 'language', 'oddsFormat', 'gameId'];

export const extractPayload = (req: Request): Request['portalBody'] => {
    if (isEmpty(req) || isEmpty(req.portalBody)) {
        const defaultLanguageHeader = req?.headers?.['default-language'] as string | undefined;
        const acceptLanguageHeader = req?.headers?.['accept-language'];

        const language = sanitizePortalLanguage(defaultLanguageHeader || acceptLanguageHeader);

        return {
            loginjwt: '',
            logintoken: '',
            language: language,
        };
    }

    const { portalBody } = req;

    const payload = pick(portalBody, portalBodyMandatoryFields.concat(portalOptionalFields)) as Record<string, string>;

    const { missingProps } = groupBy(portalBodyMandatoryFields, (prop) =>
        isEmpty(payload[prop]) ? 'missingProps' : 'providedProps',
    );

    /* istanbul ignore else  */
    if (!isEmpty(missingProps)) {
        console.info('missing properties', missingProps.join(','), '_CFG:FE_WEB_ portal body parse');
    }

    return { ...payload, language: sanitizePortalLanguage(payload.language || payload.userLang) };
};

export const parseFormString = (input = ''): Record<string, string> => {
    if (isEmpty(input)) {
        return {};
    }

    const treatedInput = input.replace(/\+/g, '%20');
    const output: Record<string, string> = {};

    try {
        for (const entry of split(treatedInput, '&')) {
            const [key, value] = split(entry, '=');

            let decodedKey: string, decodedValue: string;

            try {
                decodedKey = decodeURIComponent(key);
            } catch {
                throw new Error(`Malformed key: ${key}`);
            }

            try {
                decodedValue = decodeURIComponent(value);
            } catch {
                throw new Error(`Malformed value for key '${key}': ${value}`);
            }

            output[decodedKey] = decodedValue;
        }
    } catch (error) {
        console.error('_CFG:FE_WEB_ALLOWED_HOST / URIError: URI malformed\n', error, { formDataPayload: input });

        return {};
    }

    return output;
};

export const portalBodyParser = (req: Request & { portalBody: unknown }, res: Response, next: () => void) => {
    /* istanbul ignore else  */

    if (isEmpty(res.locals[AppLocals.X_ANCESTOR_ORIGINS])) {
        res.locals[AppLocals.X_ANCESTOR_ORIGINS] = [];
    }

    if (req.method === 'GET') {
        const cookies = req.headers.cookie || '';
        const frameOriginCookie = find(cookies.split('; '), (cookie) => startsWith(cookie, COOKIE_NAME));

        if (frameOriginCookie) {
            const cookieValue = decodeURIComponent(frameOriginCookie.split('=')[1]);
            const origins = cookieValue.split(',');
            origins.forEach((origin) => res.locals[AppLocals.X_ANCESTOR_ORIGINS].push(`https://${origin}/`));
        }

        console.info(`_CFG:FE_WEB_ALLOWED_HOST / 1. COOKIE: ${res.locals[AppLocals.X_ANCESTOR_ORIGINS]}`);

        next();
    } else if (req.method === 'POST') {
        const chunks: Uint8Array[] = [];

        req.on('data', (chunk: Uint8Array) => chunks.push(chunk));

        req.on('end', () => {
            const data = Buffer.concat(chunks).toString();

            const { referer, parentReferer, ...portalBody } = parseFormString(data);
            // TODO: this probably also should be added to res.locals
            req.portalBody = portalBody;

            res.locals[AppLocals.X_ANCESTOR_ORIGINS].push(referer, parentReferer);

            console.info(`_CFG:FE_WEB_ALLOWED_HOST / 1. PAYLOAD: referer: ${referer}, parent's : ${parentReferer}`);
            next();
        });
    } else {
        next();
    }
};

export const setContentSecurityPolicy =
    (platformApi: PlatformApi, config: ConfigServer, PORTAL_HOST: string | undefined) =>
    async (req: Request, res: Response, next: () => void) => {
        if (unleash.isEnabled('SOLO-9043')) {
            console.info(`_CFG:FE_WEB_ALLOWED_HOST / 2. Validating by API`);

            return setContentSecurityPolicyAPI(platformApi, config)(req, res, next);
        }

        if (PORTAL_HOST !== undefined) {
            console.info(`_CFG:FE_WEB_ALLOWED_HOST / 2. Validating by ENV`);

            return setContentSecurityPolicyENV(PORTAL_HOST)(req, res, next);
        }

        console.info(`_CFG:FE_WEB_ALLOWED_HOST / 2. All validation methods are disabled`);
        res.set(ResponseHeaders.ContentSecurityPolicy, `frame-ancestors 'self'`);

        return next();
    };
