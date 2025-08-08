import express from 'express';
import toLower from 'lodash/toLower';
import request from 'supertest';
import { describe, it, vi } from 'vitest';

import { server } from '@solo-tests/unit/mocks/server.setup';
import type { PlatformIdTypes } from '@solo-webapi/enums';
import { Endpoints, ResponseHeaders } from '@solo-webapi/enums';
import { assignAppEndpoints } from '@solo-webapi/handlers/entryPointRouter';

import type { ConfigServer } from './ConfigServer';
import { CSP_DEFAULT_POLICY } from './handlers/handlerDynamicContent/contentSecurityPolicy';
import type { PlatformApi } from './realtime-server/PlatformApi/PlatformApi';

const originalError = console.error;
const originalInfo = console.info;

vi.mock('./unleash-client.ts', () => ({
    unleashInit: vi.fn().mockResolvedValue(undefined),
    unleash: { isEnabled: vi.fn().mockReturnValue(true) },
}));

beforeAll(() => {
    server.close();
    console.error = vi.fn();
    console.info = vi.fn();
});
afterAll(() => {
    server.listen();
    console.error = originalError;
    console.info = originalInfo;
});

const platformApi = {
    fetchPost: ({ url, postBody }: { url: string; postBody: string[] }) => {
        if (url === 'api/betting-configs/solo/domains/whitelisted') {
            return {
                status: 200,
                bodyJson: { [supermarketDomain]: postBody[1] === 'foo', [sportsbookDomain]: postBody[0] === 'bar' },
            };
        } else {
            return { status: 200, bodyJson: { [supermarketDomain]: false, [sportsbookDomain]: false } };
        }
    },
} as unknown as PlatformApi;

const config = {
    universe: 'solo',
    API_URL: 'api',
} as ConfigServer;

const appBuilder = (env: NodeJS.ProcessEnv) => {
    const app: express.Express = express();

    const renderResponse = (platformId: PlatformIdTypes) => (_req: express.Request, res: express.Response) => {
        try {
            res.status(200).send(`${platformId} it is ok!`);
        } catch (_err) {
            res.status(500).send(`${platformId} it is NOT ok!`);
        }
    };

    assignAppEndpoints(app, env, (platformId) => renderResponse(platformId), platformApi, config);

    return app;
};

const supermarketDomain = 'foo';
const sportsbookDomain = 'bar';
const validPayload = [`parentReferer=https://${supermarketDomain}`, `referer=https://${sportsbookDomain}`].join('&');
const invalidPayload = [`parentReferer=https://${supermarketDomain}`, `referer=https://unknown.host`].join('&');
const allowedHosts = `${supermarketDomain} ${sportsbookDomain}`;

describe('Content-Security-Policy', () => {
    const emptyEnv = {} as NodeJS.ProcessEnv;

    it('should set Content-Security-Policy with "parent" and "grandparent"', async () => {
        const response = await request(appBuilder(emptyEnv)).post(Endpoints.SportsbookLogin).send(validPayload);

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `${CSP_DEFAULT_POLICY} ${allowedHosts}`,
        );
    });

    it('should set Content-Security-Policy with valid domain', async () => {
        const response = await request(appBuilder(emptyEnv)).post(Endpoints.SportsbookLogin).send(invalidPayload);

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `${CSP_DEFAULT_POLICY} ${supermarketDomain}`,
        );
    });

    it('should set Content-Security-Policy with "parent"', async () => {
        const response = await request(appBuilder(emptyEnv))
            .post(Endpoints.SportsbookLogin)
            .send(`referer=https://${sportsbookDomain}`);

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `${CSP_DEFAULT_POLICY} ${sportsbookDomain}`,
        );
    });

    it(`should have set Content-Security-Policy - old endpoint "/" only`, async () => {
        const response = await request(appBuilder(emptyEnv)).post(Endpoints.root).send(validPayload);

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `${CSP_DEFAULT_POLICY} ${allowedHosts}`,
        );
    });
});
