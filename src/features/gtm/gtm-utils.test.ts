import type { PlacedBet } from '@sc-betslip/api/types/placedBet';
import { store } from 'libs/utils/jotai/src/store';
import { Currency, OddsFormat } from 'src/common/enums';
import { MarketType } from 'src/common/enums/market';
import { PriceType } from 'src/common/types/selectionPrice';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { BetslipSelections } from '../betslip/store/types';
import { sendPurchaseToGtm } from './gtm-utils';

const createMockPlacedBet = (id: string, legs: any[] = []): PlacedBet => ({
    id,
    betId: id,
    gameId: '1',
    account: {
        id: 1,
        platformId: 'test',
        type: 'user',
        name: 'Test User',
        externalId: '123',
        brandId: null,
    },
    currency: Currency.EUR,
    legs,
    numLines: 1,
    operatorStakePerLine: 10,
    operatorTotalStake: 10,
    status: 'pending',
    settleType: null,
    settledAt: null,
    settledBy: null,
    placedAt: new Date().toISOString(),
    placedBy: null,
    comment: null,
    country: 'RO',
    channel: 'web',
    affiliate: null,
    stakeFactor: 1,
    maxBet: 1000,
    cashOut: false,
    payout: null,
    operatorPayout: null,
    profit: null,
    operatorProfit: null,
    remarks: [],
    firstBet: false,
    freebet: false,
    ip: '127.0.0.1',
    gtmSelection: {
        pageType: 'examplePageType',
        urlPath: '/example/url/path',
        isLive: true,
    },
    type: 'single',
    eachWay: false,
    stakePerLine: 10,
    potentialReturns: 100,
    totalStake: 10,
});

const createMockBetslipSelection = (id: string, gtmData: any): BetslipSelections[string] => ({
    selectionId: id,
    disableCombinationsIn: [],
    eventId: 123,
    marketId: 789,
    marketRevision: 1,
    eventRevision: 1,
    price: {
        [OddsFormat.Decimal]: 2.5,
        [OddsFormat.Fractional]: '5/2',
    },
    priceType: PriceType.SP,
    marketType: MarketType.All,
    timestamp: 1717171717,
    eachWay: false,
    gtmSelection: gtmData,
});

describe('sendPurchaseToGtm', () => {
    // Setup for window.dataLayer
    beforeEach(() => {
        // Mock window.dataLayer
        window.dataLayer = {
            push: vi.fn(),
        };

        // Mock jotai store for currency
        vi.spyOn(store, 'get').mockReturnValue('EUR');

        // Suppress all logs in tests
        vi.spyOn(console, 'info').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should not push to dataLayer if window.dataLayer.push is undefined', () => {
        window.dataLayer = {
            push: undefined as unknown as (data: Record<string, unknown>) => void,
        };
        const bets = [createMockPlacedBet('123', [])];
        const selections: BetslipSelections = {};

        sendPurchaseToGtm(bets, selections);
        expect(window.dataLayer.push).toBeUndefined();
    });

    it('should push correct purchase data to dataLayer', () => {
        const mockDate = '2024-03-20T10:00:00.000Z';
        vi.useFakeTimers();
        vi.setSystemTime(new Date(mockDate));

        const bets = [
            createMockPlacedBet('bet123', [
                {
                    selection: { id: '456' },
                    event: { name: 'Test Event' },
                },
            ]),
        ];

        const selections: BetslipSelections = {
            '456': createMockBetslipSelection('456', {
                pageType: 'Sport',
                urlPath: '/sport/football',
                isLive: true,
                isHighlight: true,
            }),
        };

        sendPurchaseToGtm(bets, selections);

        // Verify
        expect(window.dataLayer.push).toHaveBeenCalledTimes(2);
        expect(window.dataLayer.push).toHaveBeenNthCalledWith(1, { ecommerce: null });
        expect(window.dataLayer.push).toHaveBeenNthCalledWith(2, {
            event: 'purchase',
            ecommerce: {
                transaction_id: 'bet123',
                value: 1,
                currency: 'EUR',
                coupon: 'EUR',
                items: [
                    {
                        item_id: '456',
                        item_name: 'Test Event',
                        item_created_at: mockDate,
                        item_page: 'Sport',
                        item_is_live: true,
                        item_is_highlight: true,
                        item_url_path: '/sport/football',
                        item_category: 'Sport',
                        item_category2: true,
                        item_category3: true,
                        item_category4: '/sport/football',
                        item_category5: mockDate,
                        price: 1,
                        quantity: 1,
                    },
                ],
            },
            noAutoTrack: true,
        });

        vi.useRealTimers();
    });

    it('should handle multiple bets and selections', () => {
        const mockDate = '2024-03-20T10:00:00.000Z';
        vi.useFakeTimers();
        vi.setSystemTime(new Date(mockDate));

        const bets = [
            createMockPlacedBet('bet123', [
                {
                    selection: { id: '456' },
                    event: { name: 'Event 1' },
                },
                {
                    selection: { id: '789' },
                    event: { name: 'Event 2' },
                },
            ]),
        ];

        const selections: BetslipSelections = {
            '456': createMockBetslipSelection('456', {
                pageType: 'Sport',
                urlPath: '/sport/football',
                isLive: true,
                isHighlight: false,
            }),
            '789': createMockBetslipSelection('789', {
                pageType: 'Event',
                urlPath: '/event/123',
                isLive: false,
                isHighlight: true,
            }),
        };

        sendPurchaseToGtm(bets, selections);

        // Verify
        expect(window.dataLayer.push).toHaveBeenCalledTimes(2);
        expect(window.dataLayer.push).toHaveBeenNthCalledWith(2, {
            event: 'purchase',
            ecommerce: {
                transaction_id: 'bet123',
                value: 2,
                currency: 'EUR',
                coupon: 'EUR',
                items: expect.arrayContaining([
                    expect.objectContaining({
                        item_id: '456',
                        item_name: 'Event 1',
                        item_is_live: true,
                        item_is_highlight: false,
                    }),
                    expect.objectContaining({
                        item_id: '789',
                        item_name: 'Event 2',
                        item_is_live: false,
                        item_is_highlight: true,
                    }),
                ]),
            },
            noAutoTrack: true,
        });

        vi.useRealTimers();
    });

    it('should handle crossBet legs', () => {
        const mockDate = '2024-03-20T10:00:00.000Z';
        vi.useFakeTimers();
        vi.setSystemTime(new Date(mockDate));

        const bets = [
            createMockPlacedBet('bet123', [
                {
                    type: 'crossBet',
                    event: { name: 'Cross Bet Event' },
                    marketsAndSelections: [{ selection: { id: '101' } }, { selection: { id: '102' } }],
                },
            ]),
        ];

        const selections: BetslipSelections = {
            '101': createMockBetslipSelection('101', {
                pageType: 'Cross',
                urlPath: '/cross/event1',
                isLive: true,
                isHighlight: true,
            }),
            '102': createMockBetslipSelection('102', {
                pageType: 'Cross',
                urlPath: '/cross/event2',
                isLive: false,
                isHighlight: false,
            }),
        };

        sendPurchaseToGtm(bets, selections);

        // Verify
        expect(window.dataLayer.push).toHaveBeenCalledTimes(2);
        expect(window.dataLayer.push).toHaveBeenNthCalledWith(2, {
            event: 'purchase',
            ecommerce: {
                transaction_id: 'bet123',
                value: 2,
                currency: 'EUR',
                coupon: 'EUR',
                items: expect.arrayContaining([
                    expect.objectContaining({
                        item_id: '101',
                        item_name: 'Cross Bet Event',
                        item_page: 'Cross',
                    }),
                    expect.objectContaining({
                        item_id: '102',
                        item_name: 'Cross Bet Event',
                        item_page: 'Cross',
                    }),
                ]),
            },
            noAutoTrack: true,
        });

        vi.useRealTimers();
    });

    it('should handle buildABet legs', () => {
        const mockDate = '2024-03-20T10:00:00.000Z';
        vi.useFakeTimers();
        vi.setSystemTime(new Date(mockDate));

        const bets = [
            createMockPlacedBet('bet123', [
                {
                    type: 'buildABet',
                    event: { name: 'Build A Bet Event' },
                    marketsAndSelections: [{ selection: { id: '201' } }, { selection: { id: '202' } }],
                },
            ]),
        ];

        const selections: BetslipSelections = {
            '201': createMockBetslipSelection('201', {
                pageType: 'BuildABet',
                urlPath: '/build-a-bet/event1',
                isLive: true,
                isHighlight: false,
            }),
            '202': createMockBetslipSelection('202', {
                pageType: 'BuildABet',
                urlPath: '/build-a-bet/event2',
                isLive: false,
                isHighlight: true,
            }),
        };

        sendPurchaseToGtm(bets, selections);

        // Verify
        expect(window.dataLayer.push).toHaveBeenCalledTimes(2);
        expect(window.dataLayer.push).toHaveBeenNthCalledWith(2, {
            event: 'purchase',
            ecommerce: {
                transaction_id: 'bet123',
                value: 2,
                currency: 'EUR',
                coupon: 'EUR',
                items: expect.arrayContaining([
                    expect.objectContaining({
                        item_id: '201',
                        item_name: 'Build A Bet Event',
                        item_page: 'BuildABet',
                    }),
                    expect.objectContaining({
                        item_id: '202',
                        item_name: 'Build A Bet Event',
                        item_page: 'BuildABet',
                    }),
                ]),
            },
            noAutoTrack: true,
        });

        vi.useRealTimers();
    });

    it('should handle mixed leg types in the same bet', () => {
        const mockDate = '2024-03-20T10:00:00.000Z';
        vi.useFakeTimers();
        vi.setSystemTime(new Date(mockDate));

        const bets = [
            createMockPlacedBet('bet123', [
                {
                    selection: { id: '301' },
                    event: { name: 'Regular Event' },
                },
                {
                    type: 'crossBet',
                    event: { name: 'Cross Bet Event' },
                    marketsAndSelections: [{ selection: { id: '302' } }],
                },
                {
                    type: 'buildABet',
                    event: { name: 'Build A Bet Event' },
                    marketsAndSelections: [{ selection: { id: '303' } }],
                },
            ]),
        ];

        const selections: BetslipSelections = {
            '301': createMockBetslipSelection('301', {
                pageType: 'Regular',
                urlPath: '/regular',
                isLive: true,
                isHighlight: true,
            }),
            '302': createMockBetslipSelection('302', {
                pageType: 'Cross',
                urlPath: '/cross',
                isLive: false,
                isHighlight: true,
            }),
            '303': createMockBetslipSelection('303', {
                pageType: 'BuildABet',
                urlPath: '/build-a-bet',
                isLive: true,
                isHighlight: false,
            }),
        };

        sendPurchaseToGtm(bets, selections);

        // Verify
        expect(window.dataLayer.push).toHaveBeenCalledTimes(2);
        expect(window.dataLayer.push).toHaveBeenNthCalledWith(2, {
            event: 'purchase',
            ecommerce: {
                transaction_id: 'bet123',
                value: 3,
                currency: 'EUR',
                coupon: 'EUR',
                items: expect.arrayContaining([
                    expect.objectContaining({
                        item_id: '301',
                        item_name: 'Regular Event',
                    }),
                    expect.objectContaining({
                        item_id: '302',
                        item_name: 'Cross Bet Event',
                    }),
                    expect.objectContaining({
                        item_id: '303',
                        item_name: 'Build A Bet Event',
                    }),
                ]),
            },
            noAutoTrack: true,
        });

        vi.useRealTimers();
    });

    it('should log error when no relevant selections found', () => {
        const consoleSpy = vi.spyOn(console, 'error');

        const bets = [
            createMockPlacedBet('bet123', [
                {
                    selection: { id: '404' },
                    event: { name: 'Not Found Event' },
                },
            ]),
        ];

        const selections: BetslipSelections = {
            // We don't have the selection 404 in the list
            '999': createMockBetslipSelection('999', {
                pageType: 'Sport',
                urlPath: '/sport',
                isLive: true,
                isHighlight: false,
            }),
        };

        sendPurchaseToGtm(bets, selections);

        // Verify that the error was logged
        expect(consoleSpy).toHaveBeenCalledWith(
            '[GTM_ERROR] Failed to send purchase data',
            expect.objectContaining({
                error: expect.objectContaining({
                    message: 'No relevant selections found',
                }),
                service: 'gtm',
                action: 'sendPurchaseToGtm',
            }),
        );
    });

    it('should handle errors gracefully', () => {
        const consoleSpy = vi.spyOn(console, 'error');
        window.dataLayer.push = vi.fn().mockImplementation(() => {
            throw new Error('Forced error');
        });

        const bets = [
            createMockPlacedBet('bet123', [
                {
                    selection: { id: '456' },
                    event: { name: 'Test Event' },
                },
            ]),
        ];

        const selections: BetslipSelections = {
            '456': createMockBetslipSelection('456', {
                pageType: 'Sport',
                urlPath: '/sport/football',
                isLive: true,
                isHighlight: true,
            }),
        };

        sendPurchaseToGtm(bets, selections);

        // Verify
        expect(consoleSpy).toHaveBeenCalledWith(
            '[GTM_ERROR] Failed to send purchase data',
            expect.objectContaining({
                error: expect.any(Error),
                service: 'gtm',
                action: 'sendPurchaseToGtm',
            }),
        );

        vi.restoreAllMocks();
    });
});
