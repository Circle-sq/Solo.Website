import { HttpMethod } from 'src/utils/enums';

import { applyQueryParams, eventuallyJSON, hash, stringifyQS } from './helpers';

describe('Api helpers', () => {
    const data = {
        'market.display': true,
        'market.popular': '1,2',
        page: 1,
        sort: ['timeSettings.startTime'],
        state: 'open',
        'tags.skycity-events': { from: 1, to: 20 },
        time: undefined,
    } as Record<string, unknown>;

    const url = '/events/search';
    const expectedQueryParams =
        'market.display=true&market.popular=1%2C2&page=1&sort=timeSettings.startTime&state=open&tags.skycity-events%5Bfrom%5D=1&tags.skycity-events%5Bto%5D=20';

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('hash', () => {
        // eslint-disable-next-line prettier/prettier,no-useless-escape
        const expected = '{"method":"GET","url":"/events/search","data":{"page":1,"state":"open"}}';

        it('should return properly stringified object into a query string', () => {
            const actual = hash(HttpMethod.GET, url, { data: { page: 1, state: 'open' } });
            expect(actual).toEqual(expected);
        });
    });

    describe('eventuallyJSON', () => {
        it('should return JSON object if a string is passed', () => {
            const jsonString = '{"method":"GET","url":"/events/search","data":{"page":1,"state":"open"}}';
            const expected = { data: { page: 1, state: 'open' }, method: 'GET', url: '/events/search' };
            expect(eventuallyJSON(jsonString)).toEqual(expected);
        });

        it('should return the same result as passed', () => {
            expect(eventuallyJSON([])).toEqual([]);
        });
    });

    describe('stringifyQS', () => {
        it('should return properly stringified object into a query string', () => {
            expect(stringifyQS(data)).toEqual(expectedQueryParams);
        });

        it('should return empty query string if object has only undefined values', () => {
            expect(stringifyQS({ sport: undefined, time: undefined })).toBe('');
        });
    });

    describe('applyQueryParams', () => {
        it('should return properly concatenated queryParams', () => {
            expect(applyQueryParams(url, data)).toBe(`?${expectedQueryParams}`);
        });

        it('should return empty query string if object is empty', () => {
            expect(applyQueryParams(url, {})).toBe('');
        });
    });
});
