import { PortalLanguageShortcuts } from '@solo-webapi/handlers/handlerDynamicContent/types';

import { getLanguage } from './getLanguage';

describe('GetLanguage', () => {
    it('should return ko if language is not defined', () => {
        expect(getLanguage(undefined)).toEqual(PortalLanguageShortcuts.ko);
        expect(getLanguage('')).toEqual(PortalLanguageShortcuts.ko);
        expect(getLanguage('en')).toBe('en-US');
        expect(getLanguage('en-US')).toBe('en-US');
        expect(getLanguage('ko')).toBe('ko-KR');
        expect(getLanguage('ko-KR')).toBe('ko-KR');
        expect(getLanguage('zz-ZZ')).toBe('zz-ZZ');
    });
});
