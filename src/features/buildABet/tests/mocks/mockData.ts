import set from 'lodash/set';
import times from 'lodash/times';

import type { MockEvent, MockMarket } from './types';

export const ONE_BAB_AND_ONE_NOT_BAB_MARKET = 2;

export const TOTAL_MARKETS_COUNT = 7;

export const buildMMockEvent = (marketsCount: number, odd = 1): MockEvent => ({
    eventId: 111,
    markets: times(marketsCount, (id) => {
        const market: MockMarket = { id, value: `${odd}.${id}`, marketData: { tags: {} }, visible: true };

        if (id % 2 === 0) {
            set(market, 'marketData', { tags: { 'build-a-bet': ['yes'] } });
        }

        return market;
    }),
});

export const mockEvent = buildMMockEvent(TOTAL_MARKETS_COUNT);

export const mockEventWith1BABMarket = buildMMockEvent(ONE_BAB_AND_ONE_NOT_BAB_MARKET, 3);
