import type { CookieOptions, Request, Response } from 'express';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import some from 'lodash/some';

import type { ConfigServer } from '@sc-webapi/ConfigServer';
import { AppLocals, ResponseHeaders } from '@sc-webapi/enums';
import type { PlatformApi } from '@sc-webapi/realtime-server/PlatformApi/PlatformApi';
import { filterHostPortalsAPI, filterHostPortalsENV } from '@sc-webapi/utils';

export const CSP_DEFAULT_POLICY = `frame-ancestors 'self'`;
export const COOKIE_NAME = 'frameOrigin';
export const COOKIE_PAYLOAD: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,
};

export const setContentSecurityPolicyENV =
    (PORTAL_HOST: string) => (_req: Request, res: Response, next: () => void) => {
        const allowedHosts = map(res.locals[AppLocals.X_ANCESTOR_ORIGINS], (host: string) => {
            try {
                const decodedHost = decodeURIComponent(host);
                const filteredHost = filterHostPortalsENV(PORTAL_HOST, decodedHost);

                return filteredHost?.replace(/[,]/g, '');
            } catch (error) {
                console.error('_CFG:FE_WEB_PORTAL_HOST / 4. ERROR: processing host:', error);

                return null;
            }
        });

        const validHosts = compact(allowedHosts);
        const hasValidHosts = !isEmpty(validHosts);

        if (hasValidHosts) {
            const csp = `${CSP_DEFAULT_POLICY} ${validHosts.join(' ')}`.trim();
            console.info(`_CFG:FE_WEB_PORTAL_HOST / 4. CONTENT-SECURITY-POLICY: [${csp}]`);

            res.set(ResponseHeaders.ContentSecurityPolicy, csp);
            res.cookie(COOKIE_NAME, validHosts.join(','), COOKIE_PAYLOAD);
        } else {
            console.error(`_CFG:FE_WEB_PORTAL_HOST / 4. ERROR: allowedHosts is empty`);
            res.set(ResponseHeaders.ContentSecurityPolicy, CSP_DEFAULT_POLICY);
            res.clearCookie(COOKIE_NAME, COOKIE_PAYLOAD);
        }

        next();
    };

export const setContentSecurityPolicyAPI =
    (platformApi: PlatformApi, config: ConfigServer) => async (_req: Request, res: Response, next: () => void) => {
        try {
            const originalHosts = res.locals[AppLocals.X_ANCESTOR_ORIGINS] || [];

            if (!Array.isArray(originalHosts) || originalHosts.length === 0) {
                console.error('_CFG:FE_WEB_ALLOWED_HOST / 4. ERROR: No hosts provided');
                res.set(ResponseHeaders.ContentSecurityPolicy, CSP_DEFAULT_POLICY);
                res.clearCookie(COOKIE_NAME, COOKIE_PAYLOAD);
                next();

                return;
            }

            const validHosts = originalHosts
                .filter((host): host is string => typeof host === 'string' && host.length > 0)
                .map((host) => {
                    try {
                        return decodeURIComponent(host);
                    } catch (error) {
                        console.error('_CFG:FE_WEB_ALLOWED_HOST / 4. ERROR: processing host:', host, error);

                        return null;
                    }
                })
                .filter((host): host is string => host !== null);

            const uniqueHosts = [...new Set(validHosts)];

            if (uniqueHosts.length === 0) {
                console.error('_CFG:FE_WEB_ALLOWED_HOST / 4. ERROR: No valid hosts after processing');
                res.set(ResponseHeaders.ContentSecurityPolicy, CSP_DEFAULT_POLICY);
                res.clearCookie(COOKIE_NAME, COOKIE_PAYLOAD);
                next();

                return;
            }

            try {
                const hostList = await filterHostPortalsAPI(uniqueHosts, platformApi, config);

                if (!hostList || !Array.isArray(hostList)) {
                    throw new Error('Invalid response from API');
                }

                const hasValidHosts = some(hostList, { isAllowed: true });

                if (hasValidHosts) {
                    const allowedHosts = hostList
                        .filter(({ isAllowed }) => isAllowed)
                        .map(({ domain }) => {
                            try {
                                return domain
                                    .replace(/^https?:\/\//, '')
                                    .split('/')[0]
                                    .replace(/[,]/g, '')
                                    .trim();
                            } catch (error) {
                                console.error('_CFG:FE_WEB_ALLOWED_HOST / 4. ERROR: processing domain:', domain, error);

                                return null;
                            }
                        })
                        .filter((domain): domain is string => domain !== null && domain.length > 0);

                    if (allowedHosts.length > 0) {
                        const csp = `${CSP_DEFAULT_POLICY} ${allowedHosts.join(' ')}`.trim();
                        console.info(`_CFG:FE_WEB_ALLOWED_HOST / 4. CONTENT-SECURITY-POLICY: [${csp}]`);

                        res.set(ResponseHeaders.ContentSecurityPolicy, csp);
                        res.cookie(COOKIE_NAME, allowedHosts.join(','), COOKIE_PAYLOAD);
                    } else {
                        throw new Error('No valid hosts after cleaning');
                    }
                } else {
                    throw new Error('No allowed hosts from API');
                }
            } catch (error) {
                console.error('_CFG:FE_WEB_ALLOWED_HOST / 4. ERROR:', error);
                res.set(ResponseHeaders.ContentSecurityPolicy, CSP_DEFAULT_POLICY);
                res.clearCookie(COOKIE_NAME, COOKIE_PAYLOAD);
            }
        } catch (error) {
            console.error('_CFG:FE_WEB_ALLOWED_HOST / 4. ERROR:', error);
            res.set(ResponseHeaders.ContentSecurityPolicy, CSP_DEFAULT_POLICY);
            res.clearCookie(COOKIE_NAME, COOKIE_PAYLOAD);
        }

        next();
    };
