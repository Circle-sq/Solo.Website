import * as t from 'io-ts';
import filter from 'lodash/filter';
import find from 'lodash/find';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import map from 'lodash/map';
import split from 'lodash/split';
import toPairs from 'lodash/toPairs';
import { v4 as uuidv4 } from 'uuid';

import type { ConfigServer } from './ConfigServer';
import { buildValidator } from './mobx-utils/buildValidator';
import type { PlatformApi } from './realtime-server/PlatformApi/PlatformApi';
import type { OperatorConfig, Operators } from './types';

export const getOperatorConfigs = (
    operators: Operators,
    referer: string,
): [OperatorConfig, string | undefined] | void => {
    const pattern = /(http)s?:\/\/(www)?\.?(\w*\.\w*)/;
    const parsedReferer = pattern.exec(referer);

    const [url, , , domain] = parsedReferer !== null ? parsedReferer : [];

    let isAllWildcard = false;

    for (const operator in operators) {
        const { domains = [] } = operators[operator];

        isAllWildcard = includes(domains, '*');

        // Get operator configurations based on domain
        if (includes(domains, domain) || isAllWildcard) {
            return [operators[operator], isAllWildcard ? '*' : url];
        }
    }
};

export function getDomainFromUrl(url = '::'): string {
    /*
      'https://portal:3333/'.split('/')
      ['https:', '', 'portal:3333', '']
                       ^
                       +--- we need this one (index: 2)
    */

    const DOMAIN_INDEX = 2;

    return url.split('/')[DOMAIN_INDEX];
}

export const filterHostPortalsENV = (portalHosts: string, referer = ''): string | null => {
    if (isEmpty(referer)) {
        return null;
    }

    const domain = getDomainFromUrl(referer);
    const hosts = split(portalHosts, ' ');

    if (portalHosts === '*') {
        return domain;
    }

    const host = find(hosts, (trustedHost: string) => trustedHost === domain);

    if (isUndefined(host)) {
        console.error(`_CFG:FE_WEB_PORTAL_HOST / 3. FILTER - '${domain}' is not in the list:  [${hosts.join(',')}]`);

        return null;
    }

    return host;
};

interface DomainValidation {
    domain: string;
    isAllowed: boolean;
}

export const filterHostPortalsAPI = async (
    referers: string[] = [],
    platformApi: PlatformApi,
    config: ConfigServer,
    defaultValue = `${uuidv4()}.com`,
): Promise<DomainValidation[]> => {
    if (isEmpty(referers)) {
        return [{ domain: `3mpty73ffe7l-${defaultValue}`, isAllowed: false }];
    }

    const domains = map(referers, getDomainFromUrl);
    const result = await validateDomain(domains, platformApi, config);

    if (result.status === 200) {
        const noramlizedList = map(toPairs(result.bodyJson), ([k, v]) => ({ domain: k, isAllowed: v }));

        const allowedDomains = filter(noramlizedList, { isAllowed: true }).map(({ domain }) => domain);
        const notAllowedDomains = filter(noramlizedList, { isAllowed: false }).map(({ domain }) => domain);

        if (!isEmpty(allowedDomains)) {
            console.info(`_CFG:FE_WEB_ALLOWED_HOST / 3. FILTER - 'Allowed domains: [${allowedDomains.join(' ')}]'`);
        }

        if (!isEmpty(notAllowedDomains)) {
            console.error(
                `_CFG:FE_WEB_ALLOWED_HOST / 3. FILTER - 'Not allowed domains: [${notAllowedDomains.join(' ')}]'`,
            );
        }

        return Promise.resolve(noramlizedList);
    }

    return Promise.resolve([{ domain: defaultValue, isAllowed: false }]);
};

const DomainResponseIO = t.union([
    t.interface({
        status: t.literal(200),
        bodyJson: t.record(t.string, t.boolean),
    }),
    t.interface({
        status: t.literal(404),
    }),
]);

type DomainResponseType = t.TypeOf<typeof DomainResponseIO>;
const decodeDomainResponseType = buildValidator<DomainResponseType>('DomainResponseType', DomainResponseIO, true);

const validateDomain = async (
    domains: string[],
    platformApi: PlatformApi,
    config: ConfigServer,
): Promise<DomainResponseType> =>
    platformApi.fetchPost({
        url: `${config.API_URL}/betting-configs/${config.universe}/domains/whitelisted`,
        decode: decodeDomainResponseType,
        postBody: domains,
    });
