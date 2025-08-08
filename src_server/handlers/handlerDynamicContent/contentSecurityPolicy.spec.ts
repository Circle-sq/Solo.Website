/* eslint-disable no-console */
import express from 'express';
import toLower from 'lodash/toLower';
import request from 'supertest';
import type { Mock } from 'vitest';

import { server } from '@solo-tests/unit/mocks/server.setup';
import type { ConfigServer } from '@solo-webapi/ConfigServer';
import { AppLocals, ResponseHeaders } from '@solo-webapi/enums';
import type { PlatformApi } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';

import { setContentSecurityPolicyAPI, setContentSecurityPolicyENV } from './contentSecurityPolicy';

const ENABLE_DEBUG_LOG = false;

const log = (level: 'info' | 'error', message: string, data?: unknown) => {
    if (ENABLE_DEBUG_LOG) {
        console[level](`[ContentSecurityPolicy Test] ${message}`, data || '');
    }
};

beforeEach(() => {
    if (!ENABLE_DEBUG_LOG) {
        console.log = vi.fn();
        console.info = vi.fn();
        console.error = vi.fn();
    }
});

beforeAll(() => server.close());
afterAll(() => server.listen());

describe('setContentSecurityPolicyENV', () => {
    const createTestApp = (portalHost: string) => {
        const app = express();

        // Middleware for processing X-Ancestor-Origins
        app.use((req, res, next) => {
            const origins = req.headers['x-ancestor-origins'];
            res.locals[AppLocals.X_ANCESTOR_ORIGINS] = origins ? JSON.parse(origins as string) : [];
            next();
        });

        app.use(setContentSecurityPolicyENV(portalHost));
        app.get('/some-endpoint', (_, res) => res.send('OK'));

        return app;
    };

    it('should set Content-Security-Policy header when allowedHosts is not empty', async () => {
        const app = createTestApp('portal1.com portal2.com portal3.com');

        const response = await request(app)
            .get('/some-endpoint')
            .set('X-Ancestor-Origins', JSON.stringify(['https://portal1.com', 'https://portal2.com']));

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `frame-ancestors 'self' portal1.com portal2.com`,
        );
    });

    it('should set Content-Security-Policy header when allowedHosts is empty', async () => {
        const app = createTestApp('');
        const response = await request(app)
            .get('/some-endpoint')
            .set('X-Ancestor-Origins', JSON.stringify(['https://portal1.com']));

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(`frame-ancestors 'self'`);
    });

    it('should set Content-Security-Policy header when allowedHosts is *', async () => {
        const app = createTestApp('*');
        const response = await request(app)
            .get('/some-endpoint')
            .set('X-Ancestor-Origins', JSON.stringify(['https://portal1.com', 'https://portal2.com']));

        log('info', 'Response received:', {
            status: response.status,
            headers: response.headers,
        });

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `frame-ancestors 'self' portal1.com portal2.com`,
        );
        expect(response.headers['set-cookie']?.[0]).toMatch(/^frameOrigin=portal1.com%2Cportal2.com/);
    });

    it('should handle hosts with special characters correctly', async () => {
        const app = createTestApp('test.domain.com another.domain.com');
        const response = await request(app)
            .get('/some-endpoint')
            .set(
                'X-Ancestor-Origins',
                JSON.stringify(['https://test.domain.com/path%20with%20spaces/', 'https://another.domain.com/']),
            );

        log('info', 'Response received:', {
            status: response.status,
            headers: response.headers,
        });

        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `frame-ancestors 'self' test.domain.com another.domain.com`,
        );
    });

    it('should handle URL encoded values in ancestor origins', async () => {
        const app = createTestApp('*');
        const response = await request(app)
            .get('/some-endpoint')
            .set(
                'X-Ancestor-Origins',
                JSON.stringify(['https://stage.sportsbookblue.com%2C/', 'https://stage.sportsbookwhite.com/']),
            );

        log('info', 'Response received:', {
            status: response.status,
            headers: response.headers,
        });

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `frame-ancestors 'self' stage.sportsbookblue.com stage.sportsbookwhite.com`,
        );
    });
});

describe('setContentSecurityPolicyAPI', () => {
    const platformApi = {
        fetchPost: vi.fn(),
    } as unknown as PlatformApi;

    const config = {
        API_URL: 'http://test.com',
        universe: 'test',
    } as unknown as ConfigServer;

    const createTestApp = (config: ConfigServer) => {
        const app = express();

        app.use((req, res, next) => {
            const origins = req.headers['x-ancestor-origins'];
            res.locals[AppLocals.X_ANCESTOR_ORIGINS] = origins ? JSON.parse(origins as string) : [];
            next();
        });

        app.use(setContentSecurityPolicyAPI(platformApi, config));
        app.get('/some-endpoint', (_, res) => res.send('OK'));

        return app;
    };

    it('should set Content-Security-Policy header for valid hosts', async () => {
        const app = createTestApp(config);

        (platformApi.fetchPost as Mock).mockResolvedValue({
            status: 200,
            bodyJson: {
                'portal1.com': true,
            },
        });

        const response = await request(app)
            .get('/some-endpoint')
            .set('X-Ancestor-Origins', JSON.stringify(['https://portal1.com']));

        log('info', 'Response received:', {
            status: response.status,
            headers: response.headers,
        });

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `frame-ancestors 'self' portal1.com`,
        );
    });

    it('should handle URL encoded values', async () => {
        const app = createTestApp(config);

        (platformApi.fetchPost as Mock).mockResolvedValue({
            status: 200,
            bodyJson: {
                'stage.spotsbookblue.com': true,
                'stage.spotsbookwhite.com': true,
            },
        });

        const response = await request(app)
            .get('/some-endpoint')
            .set(
                'X-Ancestor-Origins',
                JSON.stringify(['https://stage.spotsbookblue.com%2C/', 'https://stage.spotsbookwhite.com/']),
            );

        expect(response.status).toBe(200);
        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `frame-ancestors 'self' stage.spotsbookblue.com stage.spotsbookwhite.com`,
        );
    });

    it('should decode URLs before sending to API', async () => {
        const app = createTestApp(config);

        (platformApi.fetchPost as Mock).mockResolvedValue({
            status: 200,
            bodyJson: {
                'test.domain.com': true,
                'another-domain.com': true,
            },
        });

        const response = await request(app)
            .get('/some-endpoint')
            .set(
                'X-Ancestor-Origins',
                JSON.stringify(['https://test%2Edomain%2Ecom/', 'https://another%2Ddomain%2Ecom/']),
            );

        expect(platformApi.fetchPost).toHaveBeenCalledWith({
            url: expect.any(String),
            decode: expect.any(Function),
            postBody: ['test.domain.com', 'another-domain.com'],
        });

        expect(response.headers[toLower(ResponseHeaders.ContentSecurityPolicy)]).toEqual(
            `frame-ancestors 'self' test.domain.com another-domain.com`,
        );
    });
});
