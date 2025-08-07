import type { MyBet, MyCrossBetLeg } from 'src/common/types/myBet';

export const sportName = 'Football';
export const competitionName = 'Liga I';

export const selectionNameLeg1 = 'Liverpool';
export const selectionNameLeg2 = 'over 2.5';
export const marketNameLeg1 = '1x2';
export const marketNameLeg2 = 'Total';

export const eventNameText = 'Liverpool vs Chelsea';
export const startTimeSpecialFormat = '2023-03-10T10:00:00Z';

export const getCrossbetMock = (isLive = false) => {
    let timeSettings = null;

    if (isLive) {
        timeSettings = {
            started: 'true',
        };
    }

    return {
        id: '0a6e3155-cb8e-466f-9c10-f12d96805f4f',
        betId: '114SW2KQOB',
        type: 'DBL',
        status: 'open',
        cashOut: false,
        eachWay: false,
        placedAt: '2023-03-10T08:00:37Z',
        settledAt: null,
        stakePerLine: 10000,
        totalStake: 500000,
        currency: 'KRW',
        payout: null,
        potentialReturns: 95140,
        balanceDelta: null,
        comment: null,
        settleType: null,
        affiliate: null,
        transaction: {
            id: null,
            type: null,
            status: null,
            currency: null,
            amount: null,
            totalAmount: null,
            assetFlows: [
                {
                    id: '436fc4cb-6810-4e9f-b1d9-9218a05a5b40',
                    date: '2023-03-10T08:00:37Z',
                    type: 'bet-placement',
                    balanceDelta: -10000,
                    balanceAfter: null,
                    currency: 'KRW',
                },
            ],
            tags: {
                selections: [34393845, 34393853, 34389233, 34389132],
                freebetCredits: [],
                bonuses: [],
            },
        },
        numLines: 1,
        legs: [
            {
                id: '98668',
                type: 'crossBet',
                appliedInPlayDelay: 0,
                inPlay: false,
                priceType: 'priceType',
                price: {
                    d: 2.68,
                    f: '42/25',
                },
                spPrice: null,
                winReduction: null,
                placeReduction: null,
                result: null,
                eachWayTerms: null,
                sport: {
                    id: 'football',
                    name: sportName,
                },
                competition: {
                    id: 4501,
                    name: competitionName,
                },
                event: {
                    id: 98668,
                    name: eventNameText,
                    startTime: startTimeSpecialFormat,
                    statistics: null,
                    timeSettings: timeSettings,
                    tags: null,
                },
                market: null,
                selection: null,
                eventCountry: ['ENG'],
                marketsAndSelections: [
                    {
                        market: {
                            id: 12983892,
                            name: marketNameLeg1,
                            url: null,
                            provider: 'bet-radar',
                            templateId: 'bet-radar-1',
                            templateMarketTypeGeneric: 'threewaywinner',
                            templateName: '1x2 (1)',
                            metadata: {
                                nameTranslations: {
                                    'ko-KR': '승무패',
                                },
                            },
                        },
                        selection: {
                            id: 34393845,
                            name: selectionNameLeg1,
                            price: null,
                            metadata: {
                                nameTranslations: {
                                    'ko-KR': '리버풀',
                                },
                            },
                            line: null,
                        },
                        price: {
                            d: 2,
                            f: '1/1',
                        },
                        result: null,
                        winningSelection: null,
                    },
                    {
                        market: {
                            id: 12983895,
                            name: marketNameLeg2,
                            url: null,
                            provider: 'bet-radar',
                            templateId: 'bet-radar-18',
                            templateMarketTypeGeneric: 'overunder',
                            templateName: 'Total (18)',
                            metadata: {
                                nameTranslations: {
                                    'ko-KR': '오버언더',
                                },
                            },
                        },
                        selection: {
                            id: 34393853,
                            name: selectionNameLeg2,
                            price: null,
                            metadata: {
                                nameTranslations: {
                                    'ko-KR': '오버 2.5',
                                },
                            },
                            line: null,
                        },
                        price: {
                            d: 2.5,
                            f: '6/4',
                        },
                        result: null,
                        winningSelection: null,
                    },
                ],
                stakeFactor: 1,
                termsWithBet: false,
            },
        ],
        tax: null,
        cashout: {
            id: '0a6e3155-cb8e-466f-9c10-f12d96805f4f',
            enabled: false,
            value: 0,
        },
    } as unknown as MyBet<MyCrossBetLeg>;
};
