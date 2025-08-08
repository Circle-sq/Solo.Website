import { waitFor } from '@testing-library/react';
import get from 'lodash/get';
import { http, HttpResponse } from 'msw';

import { api } from '@solo-api/api';
import { server } from '@solo-tests/unit/mocks/server.setup';
import { HttpStatusCode } from '@solo-webapi/enums';

import type { AppState } from 'src/appState/AppState';
import type { ReduxState } from 'src/appState/redux/ReduxState';

import { LANGUAGE_SHORTCUTS } from '../constants';
import { encodeJwt } from '../jwt';

import { sanitizeLang } from './helpers';

const getNewDate = () => new Date(Math.trunc(new Date().getTime() / 1000) * 1000);

let token: string | null = null;
const expireDate = getNewDate();
let newToken: string | null = null;
const newExpireDate = getNewDate();

const handlers = [
    http.post('/api', async () => {
        return HttpResponse.json({});
    }),
    http.post('/api/session', async ({ request }) => {
        const payload = (await request.json()) as { refresh_token: string };

        if (get(payload, 'refresh_token', '') === 'invalid_refresh_token') {
            return new HttpResponse('error', { status: HttpStatusCode.Unauthorized });
        }

        newExpireDate.setDate(newExpireDate.getDate() + 1);
        newToken = encodeJwt({ exp: Math.trunc(newExpireDate.getTime() / 1000) });

        return HttpResponse.json({
            token: newToken,
            refresh_token: 'refresh_token',
            expires: newExpireDate.toISOString(),
        });
    }),
    http.delete('/api/session', async () => {
        return HttpResponse.json({});
    }),
    http.post('/api/create-anonymous-session', async () => {
        expireDate.setDate(expireDate.getDate() + 1);

        token = encodeJwt({ exp: Math.trunc(expireDate.getTime() / 1000) });

        return HttpResponse.json({
            accountId: null,
            accountName: 'anonymous',
            accountType: 'anonymous',
            refresh_token: 'refresh_token',
            expires: expireDate.toISOString(),
            token,
        });
    }),
];

server.use(...handlers);

const originalConsoleInfo = console.info;
const originalConsoleError = console.error;
const originalPromiseReject = Promise.reject;

beforeAll(() => {
    const reduxState = { dispatch: vi.fn() } as unknown as ReduxState;
    window['$appState'] = { reduxState } as AppState;
    console.info = vi.fn();
    console.error = vi.fn();
    Promise.reject = (error) => error;
});

afterAll(() => {
    localStorage.clear();
    console.info = originalConsoleInfo;
    console.error = originalConsoleError;
    Promise.reject = originalPromiseReject;
});

describe('Api', () => {
    it('should create anonymous session', async () => {
        await api.post('');

        await waitFor(() => {
            expect(token).not.toBeNull();
            expect(localStorage.getItem('refresh_token')).toBe('refresh_token');
            expect(localStorage.getItem('token_expireDate')).toEqual(expireDate.toISOString());
        });
    });

    it('should create new access token', async () => {
        const expiredDate = getNewDate();
        expiredDate.setDate(expiredDate.getDate() - 1);
        const expiredToken = encodeJwt({ exp: Math.trunc(expiredDate.getTime() / 1000) });
        localStorage.setItem('token', expiredToken);
        localStorage.setItem('token_expireDate', expiredDate.toISOString());

        await api.post('');

        await waitFor(() => {
            expect(newToken).not.toBeNull();
            expect(localStorage.getItem('token')).toEqual(newToken);
            expect(localStorage.getItem('token_expireDate')).toEqual(newExpireDate.toISOString());
            expect(localStorage.getItem('refresh_token_expireDate')).toEqual(newExpireDate.toISOString());
        });
    });

    it('should logout and regenerate refresh token', async () => {
        const expiredDate = getNewDate();
        expiredDate.setDate(expiredDate.getDate() - 1);

        const accessToken = encodeJwt({ exp: Math.trunc(expiredDate.getTime() / 1000) });

        localStorage.setItem('refresh_token', 'invalid_refresh_token');
        localStorage.setItem('token', accessToken);
        localStorage.setItem('token_expireDate', expiredDate.toISOString());

        await api.post('');

        await waitFor(() => {
            expect(localStorage.getItem('refresh_token')).toBe('refresh_token');
            expect(localStorage.getItem('refresh_token_expireDate')).toEqual(expireDate.toISOString());
        });
    });

    // Tests for sanitizeLang function
    describe('sanitizeLang', () => {
        it('should return default language for null input', () => {
            expect(sanitizeLang(null)).toBe(LANGUAGE_SHORTCUTS.default);
        });

        it('should return default language for empty string', () => {
            expect(sanitizeLang('')).toBe(LANGUAGE_SHORTCUTS.default);
        });

        it('should return default language for whitespace string', () => {
            expect(sanitizeLang('   ')).toBe(LANGUAGE_SHORTCUTS.default);
        });

        it('should convert short language code "en" to full locale', () => {
            expect(sanitizeLang('en')).toBe(LANGUAGE_SHORTCUTS.en);
        });

        it('should convert short language code "ko" to full locale', () => {
            expect(sanitizeLang('ko')).toBe(LANGUAGE_SHORTCUTS.ko);
        });

        it('should convert short language code "ja" to full locale', () => {
            expect(sanitizeLang('ja')).toBe(LANGUAGE_SHORTCUTS.ja);
        });

        it('should preserve already sanitized full locale codes', () => {
            expect(sanitizeLang('en-US')).toBe('en-US');
            expect(sanitizeLang('ko-KR')).toBe('ko-KR');
            expect(sanitizeLang('ja-JP')).toBe('ja-JP');
        });

        it('should return default language for unknown language code', () => {
            expect(sanitizeLang('fr')).toBe(LANGUAGE_SHORTCUTS.default);
            expect(sanitizeLang('fr-FR')).toBe(LANGUAGE_SHORTCUTS.default);
        });
    });
});
