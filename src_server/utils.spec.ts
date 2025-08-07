import { filterHostPortalsAPI, filterHostPortalsENV } from '@sc-webapi/utils';

import type { ConfigServer } from './ConfigServer';
import type { PlatformApi } from './realtime-server/PlatformApi/PlatformApi';

const buildRefAPI = (domain: string): string[] => [`https://${domain}/`];
const buildRefENV = (domain: string): string => `https://${domain}/`;

const originalError = console.error;
const originalInfo = console.info;

beforeAll(() => {
    console.error = vi.fn();
    console.info = vi.fn();
});
afterAll(() => {
    console.error = originalError;
    console.info = originalInfo;
});

const platformApi = {
    fetchPost: ({ url, postBody }: { url: string; postBody: string[] }) => {
        if (url === 'api/betting-configs/skycity/domains/whitelisted' && postBody.includes('foo')) {
            return { status: 200, bodyJson: { foo: true } };
        } else {
            return { status: 200, bodyJson: { [postBody[0]]: false } };
        }
    },
} as unknown as PlatformApi;

const config = {
    universe: 'skycity',
    API_URL: 'api',
} as ConfigServer;

describe('utils/filterHostPortalsAPI', () => {
    const allowedHost = 'foo';
    const nonAllowedHost = 'bar';

    const expectAllowedHost = [{ domain: 'foo', isAllowed: true }];
    const expectNonAllowedHost = [{ domain: 'bar', isAllowed: false }];

    it('should generate random portal if referer is not listed', async () => {
        const noReferer1 = await filterHostPortalsAPI([], platformApi, config);
        const noReferer2 = await filterHostPortalsAPI([], platformApi, config);

        expect(noReferer1).not.toEqual(noReferer2);
    });

    it(`should only domain/referer if it's listed in system`, async () => {
        const allowed = await filterHostPortalsAPI(buildRefAPI(allowedHost), platformApi, config);
        const nonAllowed = await filterHostPortalsAPI(buildRefAPI(nonAllowedHost), platformApi, config);

        expect(allowed).toEqual(expectAllowedHost);
        expect(nonAllowed).toEqual(expectNonAllowedHost);
    });
});

describe('utils/filterHostPortalsENV', () => {
    const portalHosts = 'foo bar';
    const allowedHost = 'foo';
    const nonAllowedHost = 'baz';

    it('should return null if referer is undefined', async () => {
        const noReferer1 = filterHostPortalsENV(portalHosts);
        const noReferer2 = filterHostPortalsENV(portalHosts);

        expect(noReferer1).toEqual(null);
        expect(noReferer2).toEqual(null);
    });

    it('should return null if referer is not listed', async () => {
        const noReferer1 = filterHostPortalsENV(portalHosts, buildRefENV(nonAllowedHost));
        const noReferer2 = filterHostPortalsENV(portalHosts, buildRefENV(nonAllowedHost));

        expect(noReferer1).toEqual(null);
        expect(noReferer2).toEqual(null);
    });

    it(`should only domain/referer if it's listed in system`, async () => {
        expect(filterHostPortalsENV(portalHosts, buildRefENV(allowedHost))).toEqual(allowedHost);
        expect(filterHostPortalsENV(portalHosts, buildRefENV(nonAllowedHost))).toEqual(null);
    });
});
