import { type Request, type Response } from 'express';
import type { Mock } from 'vitest';

import type { ConfigServer } from '@solo-webapi/ConfigServer';
import { AppLocals, ResponseHeaders } from '@solo-webapi/enums';
import type { PlatformApi } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';

import * as CSP from './contentSecurityPolicy';
import {
    extractPayload,
    sanitizePortalLanguage,
    parseFormString,
    setContentSecurityPolicy,
    portalBodyParser,
} from './portal-body-parser';

const isEnabled = vi.fn();

vi.mock('../../unleash-client.ts', () => ({
    unleashInit: vi.fn().mockResolvedValue(undefined),
    unleash: { isEnabled: () => isEnabled() },
}));

vi.mock('./contentSecurityPolicyENV.ts', () => ({
    setContentSecurityPolicyENV: () => vi.fn(),
}));

describe('PortalBodyParser', () => {
    afterAll(() => {
        vi.clearAllMocks();
    });

    it('get language', () => {
        expect(sanitizePortalLanguage('')).toBe('en-US');
        expect(sanitizePortalLanguage(undefined)).toBe('en-US');
        expect(sanitizePortalLanguage('ro')).toBe('en-US');
        expect(sanitizePortalLanguage('ko')).toBe('ko-KR');
        expect(sanitizePortalLanguage('en')).toBe('en-US');
        expect(sanitizePortalLanguage('en-US')).toBe('en-US');
        expect(sanitizePortalLanguage('ko-KR')).toBe('ko-KR');
    });

    it('should extract the payload (no data)', () => {
        const language = 'en-US';
        expect(extractPayload({} as Request)).toEqual({ logintoken: '', loginjwt: '', language });
        expect(extractPayload({ portalBody: {} } as Request)).toEqual({ logintoken: '', loginjwt: '', language });
    });

    it('should set language to "en" when Default-Language header is "en"', () => {
        // Mock request object with headers
        const req = {
            headers: {
                'default-language': 'en',
            },
        } as unknown as Request;

        // Call extractPayload function with the mock request
        const result = extractPayload(req);

        // Assert that the language property is set to 'en-US'
        expect(result.language).toBe('en-US');
    });

    it('should extract log error if some user settings is missing', () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

        expect(extractPayload({ portalBody: { logintoken: 'foo', loginjwt: 'bar' } } as Request)).toEqual({
            logintoken: 'foo',
            loginjwt: 'bar',
            language: 'en-US',
        });
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.any(String),
            ['dateFormat', 'shortDateFormat', 'language', 'oddsFormat', 'gameId'].join(),
            expect.any(String),
        );
        expect(
            extractPayload({ portalBody: { logintoken: 'bar', loginjwt: 'foo', language: 'en' } } as Request),
        ).toEqual({
            logintoken: 'bar',
            loginjwt: 'foo',
            language: 'en-US',
        });

        expect(extractPayload({ portalBody: { logintoken: 'bar', language: 'en' } } as Request)).toEqual({
            logintoken: 'bar',
            language: 'en-US',
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.any(String),
            ['dateFormat', 'shortDateFormat', 'oddsFormat', 'gameId'].join(),
            expect.any(String),
        );
        expect(consoleSpy).toHaveBeenCalledTimes(3);
    });

    it('should parse form string', () => {
        expect(
            parseFormString(
                'logintoken=a-b-c-d-e' +
                    '&dateFormat=YYYY-MM-DD+HH%3Amm&' +
                    'shortDateFormat=YYYY-MM-DD' +
                    '&language=en' +
                    '&oddsFormat=d',
            ),
        ).toEqual({
            logintoken: 'a-b-c-d-e',
            dateFormat: 'YYYY-MM-DD HH:mm',
            shortDateFormat: 'YYYY-MM-DD',
            language: 'en',
            oddsFormat: 'd',
        });
    });

    it('should handle URL encoded cookie values correctly', () => {
        const req = {
            method: 'GET',
            headers: {
                cookie: `someCookie=someValue; ${CSP.COOKIE_NAME}=stage.spotsbookblue.com%2Cstage.spotsbookwhite.com`,
            },
        } as Request;
        const res = { locals: { [AppLocals.X_ANCESTOR_ORIGINS]: [] } } as unknown as Response;
        const next = vi.fn();

        portalBodyParser(req, res, next);

        expect(res.locals[AppLocals.X_ANCESTOR_ORIGINS]).toEqual([
            'https://stage.spotsbookblue.com/',
            'https://stage.spotsbookwhite.com/',
        ]);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple cookies with URL encoded values', () => {
        const req = {
            method: 'GET',
            headers: {
                cookie: `otherCookie=value; ${CSP.COOKIE_NAME}=domain1.com%2Cdomain2.com%2Cdomain3.com; lastCookie=test`,
            },
        } as Request;
        const res = { locals: { [AppLocals.X_ANCESTOR_ORIGINS]: [] } } as unknown as Response;
        const next = vi.fn();

        portalBodyParser(req, res, next);

        expect(res.locals[AppLocals.X_ANCESTOR_ORIGINS]).toEqual([
            'https://domain1.com/',
            'https://domain2.com/',
            'https://domain3.com/',
        ]);
        expect(next).toHaveBeenCalledTimes(1);
    });
});

describe('setContentSecurityPolicy', () => {
    const platformApi = {} as PlatformApi;
    const config = {} as ConfigServer;

    const req = {} as Request;
    const res = { set: vi.fn() } as unknown as Response;
    const next = vi.fn();

    beforeEach(() => {
        vi.spyOn(CSP, 'setContentSecurityPolicyAPI').mockImplementation(() => vi.fn());
        vi.spyOn(CSP, 'setContentSecurityPolicyENV').mockImplementation(() => vi.fn());

        vi.clearAllMocks();
    });

    it('should validate by API if FT: ON', async () => {
        isEnabled.mockReturnValueOnce(true);
        const PORTAL_HOST = undefined;

        const middleware = setContentSecurityPolicy(platformApi, config, PORTAL_HOST);
        await middleware(req, res, next);

        expect(CSP.setContentSecurityPolicyAPI).toHaveBeenCalledTimes(1);
        expect(CSP.setContentSecurityPolicyENV).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    it('should validate by ENV if FT: OFF && PORTAL_HOST: !undefined', async () => {
        isEnabled.mockReturnValueOnce(false);
        const PORTAL_HOST = 'example.com';

        const middleware = setContentSecurityPolicy(platformApi, config, PORTAL_HOST);
        await middleware(req, res, next);

        expect(CSP.setContentSecurityPolicyAPI).not.toHaveBeenCalled();
        expect(CSP.setContentSecurityPolicyENV).toHaveBeenCalledTimes(1);
        expect(next).not.toHaveBeenCalled();
    });

    it('should reject if FT: OFF && PORTAL_HOST: undefined', async () => {
        isEnabled.mockReturnValueOnce(false);
        const PORTAL_HOST = undefined;

        const middleware = setContentSecurityPolicy(platformApi, config, PORTAL_HOST);
        await middleware(req, res, next);

        expect(CSP.setContentSecurityPolicyAPI).not.toHaveBeenCalled();
        expect(CSP.setContentSecurityPolicyENV).not.toHaveBeenCalled();
        expect(res.set).toHaveBeenCalledWith(ResponseHeaders.ContentSecurityPolicy, `frame-ancestors 'self'`);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should initialize X_ANCESTOR_ORIGINS if empty', () => {
        const req = {} as Request;
        const res = { locals: {} } as Response;
        const next = vi.fn();

        portalBodyParser(req, res, next);

        expect(res.locals[AppLocals.X_ANCESTOR_ORIGINS]).toEqual([]);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should not modify X_ANCESTOR_ORIGINS if already set', () => {
        const req = {} as Request;
        const res = { locals: { [AppLocals.X_ANCESTOR_ORIGINS]: ['https://example.com/'] } } as unknown as Response;
        const next = vi.fn();

        portalBodyParser(req, res, next);

        expect(res.locals[AppLocals.X_ANCESTOR_ORIGINS]).toEqual(['https://example.com/']);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should parse cookies and set X_ANCESTOR_ORIGINS for GET requests', () => {
        const req = {
            method: 'GET',
            headers: {
                cookie: `someCookie=someValue; ${CSP.COOKIE_NAME}=example.com,another-example.com`,
            },
        } as Request;
        const res = { locals: { [AppLocals.X_ANCESTOR_ORIGINS]: [] } } as unknown as Response;
        const next = vi.fn();

        portalBodyParser(req, res, next);

        expect(res.locals[AppLocals.X_ANCESTOR_ORIGINS]).toEqual([
            'https://example.com/',
            'https://another-example.com/',
        ]);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should not modify X_ANCESTOR_ORIGINS for GET requests if frameOrigin cookie is not present', () => {
        const req = {
            method: 'GET',
            headers: {
                cookie: 'someCookie=someValue',
            },
        } as Request;
        const res = { locals: { [AppLocals.X_ANCESTOR_ORIGINS]: [] } } as unknown as Response;
        const next = vi.fn();

        portalBodyParser(req, res, next);

        expect(res.locals[AppLocals.X_ANCESTOR_ORIGINS]).toEqual([]);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('should parse form data and set X_ANCESTOR_ORIGINS for POST requests', () => {
        const req = {
            method: 'POST',
            on: vi.fn(),
        } as unknown as Request;
        const res = { locals: { [AppLocals.X_ANCESTOR_ORIGINS]: [] } } as unknown as Response;
        const next = vi.fn();

        (req.on as Mock).mockImplementation((event, callback) => {
            if (event === 'data') {
                callback(Buffer.from('referer=https://example.com&parentReferer=https://parent.com&logintoken=abc'));
            } else if (event === 'end') {
                callback();
            }
        });

        portalBodyParser(req, res, next);

        expect(req.portalBody).toEqual({ logintoken: 'abc' });
        expect(res.locals[AppLocals.X_ANCESTOR_ORIGINS]).toEqual(['https://example.com', 'https://parent.com']);
        expect(next).toHaveBeenCalledTimes(1);
    });
});

describe('parseFormString', () => {
    it('should parse a valid form string correctly', () => {
        const input = 'key1=value1&key2=value2';
        const expectedOutput = { key1: 'value1', key2: 'value2' };
        expect(parseFormString(input)).toEqual(expectedOutput);
    });

    it('should handle empty input string', () => {
        const input = '';
        const expectedOutput = {};
        expect(parseFormString(input)).toEqual(expectedOutput);
    });

    it('should handle input string with special characters', () => {
        const input = 'key1=value+1&key2=value%202';
        const expectedOutput = { key1: 'value 1', key2: 'value 2' };
        expect(parseFormString(input)).toEqual(expectedOutput);
    });

    it('should handle input string with missing values', () => {
        const input = 'key1=&key2=value2';
        const expectedOutput = { key1: '', key2: 'value2' };
        expect(parseFormString(input)).toEqual(expectedOutput);
    });

    it('should handle input string with missing keys', () => {
        const input = '=value1&key2=value2';
        const expectedOutput = { '': 'value1', key2: 'value2' };
        expect(parseFormString(input)).toEqual(expectedOutput);
    });

    it('should return an empty object and log error for malformed input', () => {
        const input = 'key1=%3UD';
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const expectedOutput = {};
        expect(parseFormString(input)).toEqual(expectedOutput);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '_CFG:FE_WEB_ALLOWED_HOST / URIError: URI malformed\n',
            new Error("Malformed value for key 'key1': %3UD"),
            { formDataPayload: input },
        );
        consoleErrorSpy.mockRestore();
    });
});
