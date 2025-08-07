import type { RawAxiosRequestHeaders } from 'axios';
import isPlainObject from 'lodash/isPlainObject';
import qs from 'query-string';

import type { EventsCollectionQuery as EventsQuery } from 'src/appState/EventsCollection/types';

import { LANGUAGE_SHORTCUTS } from '../constants';

import type { Method } from './types';

export const hash = <T = Record<string, unknown>>(
    method: Method,
    url: string,
    { data, headers }: { data: T; headers?: RawAxiosRequestHeaders },
): string => {
    return JSON.stringify({ method, url, data, headers });
};

export function eventuallyJSON<T = unknown>(x: T): T {
    try {
        if (typeof x === 'string') {
            return JSON.parse(x);
        }

        return x;
    } catch (_e) {
        return x;
    }
}

export const stringifyQS = (rawData: EventsQuery): string => {
    const data = { ...rawData };

    for (const key of Object.keys(data)) {
        const currentField = data[key as keyof EventsQuery];

        if (currentField !== undefined && isPlainObject(currentField)) {
            for (const inner of Object.keys(currentField)) {
                Object.assign(data, {
                    [`${key}[${inner}]`]: currentField[inner as keyof typeof currentField],
                });
            }

            delete data[key as keyof EventsQuery];
        }
    }

    return qs.stringify(data);
};

export const applyQueryParams = (url: string, data: EventsQuery): string => {
    let queryString = '';

    if (Object.keys(data ?? {}).length) {
        queryString += url.indexOf('?') === -1 ? '?' : '&';

        queryString += stringifyQS(data);
    }

    return queryString;
};

export const apiDebugLog = (message: string) => {
    console.info(`%c           APIDEBUG >>> ${message}`, 'color: #00f;background-color: #ff0;');
};

/**
 * Sanitizes language codes to their full locale format
 * param: language Input language code (e.g., 'en', 'ja', 'ko-KR')
 * returns: Standardized locale format (e.g., 'en-US', 'ja-JP', 'ko-KR')
 */
export const sanitizeLang = (language: string | null): string => {
    if (!language || typeof language !== 'string' || !language.trim()) {
        return LANGUAGE_SHORTCUTS.default;
    }

    if (LANGUAGE_SHORTCUTS[language]) {
        return LANGUAGE_SHORTCUTS[language];
    }

    const isAlreadySanitized = Object.values(LANGUAGE_SHORTCUTS).some((fullCode) => fullCode === language);

    if (isAlreadySanitized) {
        return language;
    }

    return LANGUAGE_SHORTCUTS.default;
};
