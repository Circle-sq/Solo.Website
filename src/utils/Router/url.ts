import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

import type { ParamsType, ParseResult, RouteType } from './types';

function parseQueryString(query: string): ParseResult['query'] {
    if (isEmpty(query)) {
        return {};
    }

    const queryParts = query.split('&');

    return queryParts.reduce((acc, part) => {
        const [key, value] = part.split('=').map(decodeURIComponent);

        return { ...acc, [key]: value || 'true' };
    }, {});
}

export function parseUrl(url: string): ParseResult {
    const urlParts = url.split('?');
    const path = urlParts[0];
    const query = parseQueryString(urlParts[1] || '');
    const result = { url, path, query };

    return result;
}

export function buildQueryString(data: Record<string, string | number | undefined | true | null>): string {
    if (isEmpty(data)) {
        return '';
    }

    return Object.entries(data)
        .reduce<string[]>((acc, [key, value]) => {
            if (isNil(value)) {
                return acc;
            }

            const queryPart = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

            return acc.concat(queryPart);
        }, [])
        .join('&');
}

const findRoute = (routes: RouteType[], route: string | null | undefined, params: ParamsType): RouteType | null => {
    for (const r of routes) {
        if (r.name === route && !r.params.filter((p) => params[p] === void 0).length) {
            return r;
        }
    }

    return null;
};

export const buildQueryUrl = (routes: RouteType[], route: string, params: ParamsType = {}): string => {
    const routing = findRoute(routes, route, params);

    if (routing !== null) {
        const url = routing.url.replace(/:([^\s/.]+)/g, (_$0, $1) => {
            const param = params[$1] ?? '';

            return param.toString();
        });

        const urlParams = { ...params };

        Object.keys(urlParams)
            .filter((key) => routing.params.indexOf(key) !== -1)
            .forEach((key) => delete urlParams[key]);

        const qs = buildQueryString(urlParams);

        if (qs) {
            return `${url}?${qs}`;
        }

        return url;
    }

    return '/';
};
