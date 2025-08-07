import map from 'lodash/map';

import type { MarketItem } from 'src/store/events/types';

import { sortMarkets } from './sort';

describe('sortMarkets', () => {
    it('should return an empty array (use case #1 - if input is undefined)', () => {
        expect(sortMarkets(undefined)).toEqual([]);
    });

    it('should return an empty array (use case #2 - if input array is empty)', () => {
        expect(sortMarkets([])).toEqual([]);
    });

    it('should sort in ascending order (use case #1 - by template id)', () => {
        const markets = [
            { name: 'Market 2', template: { id: 'bet-radar-2' } },
            { name: 'Market 1', template: { id: 'bet-radar-1' } },
            { name: 'Market 3', template: { id: 'bet-radar-3' } },
        ] as MarketItem[];

        const sorted = sortMarkets(markets);

        expect(map(sorted, 'name')).toEqual(['Market 1', 'Market 2', 'Market 3']);
    });

    it('should sort in descending order (use case #2 - by line with the same template id)', () => {
        const markets = [
            { name: 'Market 2', template: { id: 'bet-radar-1' }, line: 2 },
            { name: 'Market 1', template: { id: 'bet-radar-1' }, line: 1 },
        ] as MarketItem[];

        const sorted = sortMarkets(markets);

        expect(map(sorted, 'name')).toEqual(['Market 2', 'Market 1']);
    });

    it('should keep same order (use case #1 - line is null)', () => {
        const markets = [
            { name: 'Market 1', template: { id: 'bet-radar-1' }, line: null },
            { name: 'Market 2', template: { id: 'bet-radar-1' }, line: null },
            { name: 'Market 3', template: { id: 'bet-radar-1' }, line: null },
        ] as unknown as MarketItem[];

        const sorted = sortMarkets(markets);

        expect(sorted).toEqual(markets);
    });

    it('should keep same order (use case #2 - same templateId and line)', () => {
        const markets = [
            { name: 'Market 1', template: { id: 'bet-radar-1' }, line: 1 },
            { name: 'Market 2', template: { id: 'bet-radar-1' }, line: 1 },
        ] as MarketItem[];

        const sorted = sortMarkets(markets);

        expect(sorted).toEqual(markets);
    });

    it('should place market first (use case #1 - if missing template)', () => {
        const markets = [
            { name: 'Market 2', template: { id: 'bet-radar-2' } },
            { name: 'Market 3', template: undefined },
            { name: 'Market 1', template: { id: 'bet-radar-1' } },
        ] as MarketItem[];

        const sorted = sortMarkets(markets);

        expect(map(sorted, 'name')).toEqual(['Market 3', 'Market 1', 'Market 2']);
    });

    it('should place market first (use case #2 - if missing line)', () => {
        const markets = [
            { name: 'Market 2', template: { id: 'bet-radar-1' }, line: 2 },
            { name: 'Market 3', template: { id: 'bet-radar-1' }, line: undefined },
            { name: 'Market 1', template: { id: 'bet-radar-1' }, line: 1 },
        ] as MarketItem[];

        const sorted = sortMarkets(markets);

        expect(map(sorted, 'name')).toEqual(['Market 2', 'Market 1', 'Market 3']);
    });

    it('should place market first (use case #3 - templateId is null)', () => {
        const markets = [
            { name: 'Market 2', template: { id: 'bet-radar-2' } },
            { name: 'Market 3', template: { id: null } } as unknown as MarketItem,
            { name: 'Market 1', template: { id: 'bet-radar-1' } },
        ] as MarketItem[];

        const sorted = sortMarkets(markets);

        expect(map(sorted, 'name')).toEqual(['Market 3', 'Market 1', 'Market 2']);
    });

    it('should place market last (use case #1 - line is null)', () => {
        const markets = [
            { name: 'Market 2', template: { id: 'bet-radar-1' }, line: 2 },
            { name: 'Market 3', template: { id: 'bet-radar-1' }, line: null },
            { name: 'Market 1', template: { id: 'bet-radar-1' }, line: 1 },
        ] as MarketItem[];

        const sorted = sortMarkets(markets);

        expect(map(sorted, 'name')).toEqual(['Market 2', 'Market 1', 'Market 3']);
    });
});
