import set from 'lodash/set';
import times from 'lodash/times';

import { buildMMockEvent, ONE_BAB_AND_ONE_NOT_BAB_MARKET } from '../tests/mocks/mockData';
import type { MockEvent, MockMarket } from '../tests/mocks/types';

import { filterBuildABetMarkets, isBuildABetMarket } from './helpers';

const mockEventWith1BABMarket = buildMMockEvent(ONE_BAB_AND_ONE_NOT_BAB_MARKET);

test('should detect is market is build-a-bet- market', () => {
    expect(isBuildABetMarket(mockEventWith1BABMarket.markets[1])).toBe(false);
    expect(isBuildABetMarket(mockEventWith1BABMarket.markets[0])).toBe(true);
});

test('should count build-b-bet markets', () => {
    const mockEvent: MockEvent = {
        eventId: 111,
        markets: times(7, (id) => {
            const market: MockMarket = { id, value: `1.${id}`, marketData: { tags: {} }, visible: true };

            if (id % 2 === 0) {
                set(market, 'marketData', { tags: { 'build-a-bet': ['yes'] } });
            }

            return market;
        }),
    };

    expect(filterBuildABetMarkets(mockEventWith1BABMarket.markets).length).toEqual([0].length);
    expect(filterBuildABetMarkets(mockEvent.markets).length).toEqual([0, 2, 4, 6].length);
});
