import { computed, makeObservable, observable } from 'mobx';

import type { FindRouteType, ParamsType, ParseResult, ReadonlyRoute, RoutePartialType, RouteType } from './types';
import { buildQueryUrl, parseUrl } from './url';

function parseRoute(route: string): RoutePartialType {
    const params: string[] = [];

    const matcher = new RegExp(
        `^${route.replace(/:([^\s/.]+)/g, function (_$0, $1) {
            params.push($1);

            return '([\\w-:]+)';
        })}$`,
    );

    return {
        url: route,
        matcher,
        params,
    };
}

const convertRoute = (routes: Record<string, string>): RouteType[] => {
    return Object.keys(routes).map(
        (route): RouteType => ({
            ...parseRoute(route),
            name: routes[route],
        }),
    );
};

const defaultFindRoute = {
    name: 'error',
    params: {
        code: '404',
    },
};

const replaceSpaceCharacter = (value: string, replacement = ''): string => value.replace(/%20/g, replacement);

const sanitizeUrl = (url: ParseResult) => {
    const updatedUrlObject = { ...url };

    if (updatedUrlObject.path && updatedUrlObject.path.startsWith('/country/')) {
        const countryId = updatedUrlObject.path.split('/').pop()!;
        updatedUrlObject.params = { countryId: replaceSpaceCharacter(countryId, ' ') };
    }
    updatedUrlObject.url = replaceSpaceCharacter(updatedUrlObject.url);
    updatedUrlObject.path = replaceSpaceCharacter(updatedUrlObject.path);

    return updatedUrlObject;
};

const handle = (routes: RouteType[], originalUrl: ParseResult): FindRouteType => {
    const url = sanitizeUrl(originalUrl);

    for (const route of routes) {
        const match = route.matcher.exec(url.path);

        if (match) {
            const newRoute = {
                name: route.name,
                params: { ...url.query },
            };

            route.params.forEach((name, idx) => {
                newRoute.params[name] = match[idx + 1];
            });

            if (url?.params?.countryId) {
                newRoute.params.countryId = url?.params?.countryId;
            }

            return newRoute;
        }
    }

    return defaultFindRoute;
};

const clearParams = (params: ParamsType): Record<string, string> => {
    const out: Record<string, string> = {};

    for (const [key, value] of Object.entries(params)) {
        if (typeof value === 'string') {
            out[key] = value;
        } else if (typeof value === 'number') {
            out[key] = value.toString();
        }
    }

    return out;
};

export class Router {
    readonly routes: RouteType[];

    private routeInner: FindRouteType;

    constructor(url: string, routes: Record<string, string>) {
        makeObservable<Router, 'routeInner'>(this, {
            routeInner: observable.ref,
            url: computed,
        });

        this.routes = convertRoute(routes);

        this.routeInner = handle(this.routes, parseUrl(url));
    }

    static createForContext(): Router {
        return new Router('/', { '/error/:code': 'error' });
    }

    setUrl(url: string) {
        this.routeInner = handle(this.routes, parseUrl(url));
    }

    redirect(route: string | undefined | null, params: ParamsType = {}) {
        if (typeof route === 'string') {
            this.routeInner = {
                name: route,
                params: clearParams(params),
            };
        } else {
            this.routeInner = {
                name: this.routeInner.name,
                params: clearParams({
                    ...this.routeInner.params,
                    ...params,
                }),
            };
        }
    }

    updateQueryParams(params: { [key: string]: string }) {
        this.routeInner = {
            name: this.routeInner.name,
            params: {
                ...this.routeInner.params,
                ...params,
            },
        };
    }

    buildUrl = (route: string | undefined | null, params: ParamsType = {}): string => {
        if (typeof route === 'string') {
            return buildQueryUrl(this.routes, route, clearParams(params));
        } else {
            return buildQueryUrl(
                this.routes,
                this.routeInner.name,
                clearParams({
                    ...this.routeInner.params,
                    ...params,
                }),
            );
        }
    };

    get url(): string {
        return buildQueryUrl(this.routes, this.routeInner.name, this.routeInner.params);
    }

    get route(): ReadonlyRoute {
        return this.routeInner;
    }

    destroy() {}
}

export default Router;
