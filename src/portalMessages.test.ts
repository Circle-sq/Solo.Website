import { parseUrlParam, removeQueryParam } from './portalMessages';

describe('parseUrlParam function', () => {
    test('should return undefined if URL has no query parameters', () => {
        const urlPath = '/event/1162';
        const param = 'selectionId';
        expect(parseUrlParam(urlPath, param)).toBeUndefined();
    });

    test('should return undefined if parameter is not found in the URL', () => {
        const urlPath = '/event/1162?foo=bar';
        const param = 'selectionId';
        expect(parseUrlParam(urlPath, param)).toBeUndefined();
    });

    test('should return the value of the parameter if found in the URL', () => {
        const urlPath = '/event/1162?selectionId=161028';
        const param = 'selectionId';
        expect(parseUrlParam(urlPath, param)).toBe('161028');
    });

    test('should return undefined if the value of the parameter is empty', () => {
        const urlPath = '/event/1162?selectionId=';
        const param = 'selectionId';
        expect(parseUrlParam(urlPath, param)).toBeUndefined();
    });

    test('should return the value of the parameter even if it has special characters', () => {
        const urlPath = '/event/1162?selectionId=%2Fsome%2Fvalue';
        const param = 'selectionId';
        expect(parseUrlParam(urlPath, param)).toBe('/some/value');
    });
});
describe('removeQueryParam function', () => {
    test('should return the original URL if the parameter to remove is not found', () => {
        const url = '/event/1162?foo=bar';
        const paramToRemove = 'selectionId';
        expect(removeQueryParam(url, paramToRemove)).toBe(url);
    });

    test('should remove the parameter from the URL if it exists', () => {
        const url = '/event/1162?selectionId=161028&foo=bar';
        const paramToRemove = 'selectionId';
        const expectedUrl = '/event/1162?foo=bar';
        expect(removeQueryParam(url, paramToRemove)).toBe(expectedUrl);
    });

    test('should handle URLs with no existing query parameters', () => {
        const url = '/event/1162';
        const paramToRemove = 'selectionId';
        expect(removeQueryParam(url, paramToRemove)).toBe(url);
    });

    test('should handle URLs with special characters in query parameters', () => {
        const url = '/event/1162?selectionId=%2Fsome%2Fvalue&foo=bar';
        const paramToRemove = 'selectionId';
        const expectedUrl = '/event/1162?foo=bar';
        expect(removeQueryParam(url, paramToRemove)).toBe(expectedUrl);
    });
});
