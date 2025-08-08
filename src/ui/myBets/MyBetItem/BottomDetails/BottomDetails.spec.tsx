import { isAuthenticatedAtom, userDataAtom } from '@solo-account/store/atoms';
import type { UserData } from '@solo-account/types';
import { MockStoreProvider } from '@solo-tests/unit/mocks/jotai/store';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import type { LanguageStore } from 'src/appState/LanguageStore';
import { OddsFormatLong } from 'src/common/enums';
import type { MyBet } from 'src/common/types/myBet';

import BottomDetails from './BottomDetails';

const priceSingleBet = {
    d: 1.96,
    f: '24/25',
};

const priceSP = {
    d: 1.5,
    f: '1/2',
};

const priceCrossbetLeg1 = {
    d: 2.68,
    f: '42/25',
};

const priceCrossbetLeg2 = {
    d: 3.55,
    f: '51/20',
};

const totalStake = 5000;
const totalStakeCrossbet = 500000;
const potentialReturns = 980000;
const potentialReturnsCrossbet = 95140;

const getSingleBetLeg = (priceType = 'fp', spPrice: unknown = null) => {
    return [
        {
            priceType: priceType,
            price: priceSingleBet,
            spPrice: spPrice,
            placeReduction: null,
            selection: {
                id: 7685308,
                name: 'Lake Macquarie FC (0)',
                metadata: {
                    nameTranslations: {
                        'ko-KR': '레이크 매쿠아리 FC (0)',
                    },
                },
            },
            appliedInPlayDelay: 2,
            sport: {
                id: 'football',
                name: 'Football',
            },
            winReduction: null,
            eachWayTerms: null,
            inPlay: true,
            event: {
                id: 12654,
                name: 'Lake Macquarie FC vs Adamstown Rosebud FC',
                startTime: '2022-08-03T09:00:00Z',
                statistics: {
                    score: {
                        home: 0,
                        away: 1,
                    },
                    'red-cards': {
                        home: 0,
                        away: 0,
                    },
                    'yellow-cards': {
                        home: 0,
                        away: 0,
                    },
                    substitution: {
                        home: 0,
                        away: 0,
                    },
                    timer: {
                        value: '81:58',
                    },
                    period: {
                        value: '2nd half',
                    },
                },
                timeSettings: {
                    startTime: '2022-08-03T09:00:00.000Z',
                    timeZone: 'UTC',
                    started: true,
                    timeline: 'Started',
                    tradedInPlay: true,
                    offAtStartTime: false,
                },
            },
            type: 'standard',
            id: '7685308',
            market: {
                id: 2903426,
                name: 'Handicap',
                type: null,
            },
            eventCountry: ['AUS'],
            totalStake: 500000,
            stakePerLine: 500000,
            result: null,
            competition: {
                id: 120,
                name: 'Northern NSW NPL',
            },
        },
    ];
};

const getSingleBetMock = (legs = getSingleBetLeg()): MyBet => {
    return {
        legs: legs,
        settleType: null,
        potentialReturns: potentialReturns,
        payout: null,
        tax: null,
        betId: '116XUBV9UW',
        settledAt: null,
        affiliate: null,
        eachWay: false,
        placedAt: '2022-08-03T09:39:42Z',
        currency: 'KRW',
        status: 'open',
        totalStake: totalStake,
        stakePerLine: 500000,
        numLines: 1,
        type: 'SGL',
        id: '8c5cdeb6-f94f-4507-b725-8ae47e5da0c2',
        cashOut: false,
        cashout: {
            id: '8c5cdeb6-f94f-4507-b725-8ae47e5da0c2',
            enabled: false,
            value: 0,
        },
        balanceDelta: null,
        transaction: {
            id: null,
            type: null,
            status: null,
            currency: null,
            amount: null,
            totalAmount: null,
            assetFlows: [
                {
                    id: 'b63a2bd1-9374-40b3-ba4c-3257b37e67e3',
                    date: '2022-08-03T09:39:42Z',
                    type: 'bet-placement',
                    balanceDelta: -500000,
                    balanceAfter: null,
                    currency: 'KRW',
                },
            ],
            tags: {
                selections: [7685308],
                freebetCredits: [],
                bonuses: [],
            },
        },
        comment: null,
    } as unknown as MyBet;
};

const crossbetMock = {
    id: '0a6e3155-cb8e-466f-9c10-f12d96805f4f',
    betId: '114SW2KQOB',
    type: 'DBL',
    status: 'open',
    cashOut: false,
    eachWay: false,
    placedAt: '2023-03-10T08:00:37Z',
    settledAt: null,
    stakePerLine: 10000,
    totalStake: totalStakeCrossbet,
    currency: 'KRW',
    payout: null,
    potentialReturns: potentialReturnsCrossbet,
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
            price: priceCrossbetLeg1,
            spPrice: null,
            winReduction: null,
            placeReduction: null,
            result: null,
            eachWayTerms: null,
            sport: {
                id: 'football',
                name: 'Football',
            },
            competition: {
                id: 4501,
                name: 'csgo Competition',
            },
            event: {
                id: 98668,
                name: 'Liverpool vs Chelsea',
                startTime: '2023-03-10T10:00:00Z',
                statistics: null,
                timeSettings: null,
                tags: null,
            },
            market: null,
            selection: null,
            eventCountry: ['ENG'],
            marketsAndSelections: [
                {
                    market: {
                        id: 12983892,
                        name: '1x2',
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
                        name: 'Liverpool',
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
                        name: 'Total',
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
                        name: 'over 2.5',
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
        {
            id: '55464',
            type: 'crossBet',
            appliedInPlayDelay: 0,
            inPlay: false,
            priceType: 'fp',
            price: priceCrossbetLeg2,
            spPrice: null,
            winReduction: null,
            placeReduction: null,
            result: {
                type: 'lost',
                place: null,
                dividends: null,
                winReduction: null,
                placeReduction: null,
                r4Deductions: null,
            },
            eachWayTerms: null,
            sport: {
                id: 'basketball',
                name: 'Basketball',
            },
            competition: {
                id: 129,
                name: 'KBL',
            },
            event: {
                id: 55464,
                name: 'Ulsan Hyundai Mobis vs Seoul SK',
                startTime: '2023-03-10T10:00:00Z',
                statistics: null,
                timeSettings: null,
                tags: null,
            },
            market: null,
            selection: null,
            eventCountry: ['KOR'],
            marketsAndSelections: [
                {
                    market: {
                        id: 12982128,
                        name: 'Winner (incl. overtime)',
                        url: null,
                        provider: 'bet-radar',
                        templateId: 'bet-radar-219',
                        templateMarketTypeGeneric: 'twowaywinner',
                        templateName: 'Winner (incl. overtime) (219)',
                        metadata: {
                            nameTranslations: {
                                'ko-KR': '승패(연장 포함)',
                            },
                        },
                    },
                    selection: {
                        id: 34389233,
                        name: 'Ulsan Hyundai Mobis',
                        price: null,
                        metadata: {
                            nameTranslations: {
                                'ko-KR': '울산 현대모비스',
                            },
                        },
                        line: null,
                    },
                    price: {
                        d: 1.83,
                        f: '83/100',
                    },
                    result: {
                        type: 'lost',
                        place: null,
                        dividends: {
                            forecast: [],
                            tricast: [],
                        },
                        winReduction: null,
                        placeReduction: null,
                        r4Deductions: null,
                    },
                    winningSelection: {
                        id: 34389234,
                        name: 'Seoul SK',
                        metadata: {
                            nameTranslations: {
                                'ko-KR': '서울 SK',
                            },
                        },
                        line: null,
                    },
                },
                {
                    market: {
                        id: 12982083,
                        name: 'Total (incl. overtime)',
                        url: null,
                        provider: 'bet-radar',
                        templateId: 'bet-radar-225',
                        templateMarketTypeGeneric: 'overunder',
                        templateName: 'Total (incl. overtime) (225)',
                        metadata: {
                            nameTranslations: {
                                'ko-KR': '오버언더(연장 포함)',
                            },
                        },
                    },
                    selection: {
                        id: 34389132,
                        name: 'over 164.5',
                        price: null,
                        metadata: {
                            nameTranslations: {
                                'ko-KR': '오버 164.5',
                            },
                        },
                        line: null,
                    },
                    price: {
                        d: 1.91,
                        f: '91/100',
                    },
                    result: {
                        type: 'lost',
                        place: null,
                        dividends: {
                            forecast: [],
                            tricast: [],
                        },
                        winReduction: null,
                        placeReduction: null,
                        r4Deductions: null,
                    },
                    winningSelection: {
                        id: 34389234,
                        name: 'Seoul SK',
                        metadata: {
                            nameTranslations: {
                                'ko-KR': '서울 SK',
                            },
                        },
                        line: null,
                    },
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
} as unknown as MyBet;

vi.mock('src/appState/AppState', function AppState() {
    const language: LanguageStore = { getTranslation: (_key: string, defaultText) => defaultText };

    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                language,
            };
        },
        default: vi.fn(),
    };
});

const getInitState = (oddsFormat: OddsFormatLong) => ({ oddsFormat }) as UserData;

const getProps = (bet: MyBet, isSettledOrCancelledBet = false, hasFreeBetCredits = false) => {
    return {
        bet: bet,
        isSettledOrCancelledBet: isSettledOrCancelledBet,
        hasFreeBetCredits: hasFreeBetCredits,
    };
};

const render = (props: ReturnType<typeof getProps>, initState: UserData) => {
    return renderWithAppWrapper(
        <MockStoreProvider
            values={[
                [isAuthenticatedAtom, true],
                [userDataAtom, initState],
            ]}
        >
            <BottomDetails {...props} />
        </MockStoreProvider>,
    );
};

describe('BottomDetails', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should provide single bet details', () => {
        const initState = getInitState(OddsFormatLong.Decimal);

        const defaultProps = getProps(getSingleBetMock());

        const { getByTestId } = render(defaultProps, initState);

        const stakeValue = getByTestId('stakeValue');
        const stakeFormatted = Number(totalStake).toLocaleString();
        expect(stakeValue.innerHTML).toBe(`${stakeFormatted} KRW`);

        const oddsDecimal = priceSingleBet.d.toString();
        expect(getByTestId('totalOdds').innerHTML).toEqual(oddsDecimal);

        const potentialReturnsFormatted = Number(potentialReturns).toLocaleString();
        expect(getByTestId('possibleWinnings').innerHTML).toBe(`${potentialReturnsFormatted} KRW`);
    });

    it('should provide single bet free bet details', () => {
        const initState = getInitState(OddsFormatLong.Decimal);

        const defaultProps = getProps(getSingleBetMock(), false, true);

        const { getByTestId } = render(defaultProps, initState);

        const stakeValue = getByTestId('stakeValue');
        const stakeFormatted = Number(totalStake).toLocaleString();
        expect(stakeValue).toHaveTextContent(`Free bet!`);
        expect(stakeValue).toHaveTextContent(`₩ ${stakeFormatted}`);

        const oddsDecimal = priceSingleBet.d.toString();
        expect(getByTestId('totalOdds').innerHTML).toEqual(oddsDecimal);

        const potentialReturnsFormatted = Number(potentialReturns).toLocaleString();
        expect(getByTestId('possibleWinnings').innerHTML).toBe(`${potentialReturnsFormatted} KRW`);
    });

    it('should provide settled or cancelled bet details', () => {
        const initState = getInitState(OddsFormatLong.Decimal);

        const defaultProps = getProps(getSingleBetMock(), true, true);

        const { getByTestId } = render(defaultProps, initState);

        const stakeValue = getByTestId('stakeValue');
        const stakeFormted = Number(totalStake).toLocaleString();
        expect(stakeValue).toHaveTextContent(`Free bet!`);
        expect(stakeValue).toHaveTextContent(`₩ ${stakeFormted}`);

        const oddsDecimal = priceSingleBet.d.toString();
        expect(getByTestId('totalOdds').innerHTML).toEqual(oddsDecimal);

        expect(getByTestId('possibleWinnings').innerHTML).toBe(`n/a`);
    });

    it('should provide bet details when no legs', () => {
        const initState = getInitState(OddsFormatLong.Decimal);

        const defaultProps = getProps(getSingleBetMock([]));

        const { getByTestId } = render(defaultProps, initState);

        const stakeValue = getByTestId('stakeValue');
        const stakeFormted = Number(totalStake).toLocaleString();
        expect(stakeValue.innerHTML).toBe(`${stakeFormted} KRW`);

        const potentialReturnsFormted = Number(potentialReturns).toLocaleString();
        expect(getByTestId('possibleWinnings').innerHTML).toBe(`${potentialReturnsFormted} KRW`);
    });

    it('should provide bet details with spPrice = null', () => {
        const initState = getInitState(OddsFormatLong.Decimal);

        const defaultProps = getProps(getSingleBetMock(getSingleBetLeg('sp')));

        const { getByTestId } = render(defaultProps, initState);

        const stakeValue = getByTestId('stakeValue');
        const stakeFormted = Number(totalStake).toLocaleString();
        expect(stakeValue.innerHTML).toBe(`${stakeFormted} KRW`);

        expect(getByTestId('totalOdds').innerHTML).toBe(`SP`);

        expect(getByTestId('possibleWinnings').innerHTML).toBe(`n/a`);
    });

    it('should provide bet details with spPrice (not null)', () => {
        const initState = getInitState(OddsFormatLong.Decimal);

        const defaultProps = getProps(getSingleBetMock(getSingleBetLeg('sp', priceSP)));

        const { getByTestId } = render(defaultProps, initState);

        const stakeValue = getByTestId('stakeValue');
        const stakeFormted = Number(totalStake).toLocaleString();
        expect(stakeValue.innerHTML).toBe(`${stakeFormted} KRW`);

        const oddsDecimal = priceSP.d.toFixed(2).toString();
        expect(getByTestId('totalOdds').innerHTML).toEqual(oddsDecimal);

        expect(getByTestId('possibleWinnings').innerHTML).toBe(`n/a`);
    });

    it('should provide cross bet details when oddsFormat = decimal', () => {
        const initState = getInitState(OddsFormatLong.Decimal);

        const defaultProps = getProps(crossbetMock);

        const { getByTestId } = render(defaultProps, initState);

        const stakeValue = getByTestId('stakeValue');
        const stakeFormted = Number(totalStakeCrossbet).toLocaleString();
        expect(stakeValue.innerHTML).toBe(`${stakeFormted} KRW`);

        const oddsDecimal = (priceCrossbetLeg1.d * priceCrossbetLeg2.d).toFixed(2).toString();
        expect(getByTestId('totalOdds').innerHTML).toEqual(oddsDecimal);
        const potentialReturnsFormatted = Number(potentialReturnsCrossbet).toLocaleString();

        expect(getByTestId('possibleWinnings').innerHTML).toBe(`${potentialReturnsFormatted} KRW`);
    });

    it('should provide cross bet details when oddsFormat = fractional', () => {
        const initState = getInitState(OddsFormatLong.Fractional);

        const defaultProps = getProps(crossbetMock);

        const { getByTestId } = render(defaultProps, initState);

        const stakeValue = getByTestId('stakeValue');
        const stakeFormted = Number(totalStakeCrossbet).toLocaleString();
        expect(stakeValue.innerHTML).toBe(`${stakeFormted} KRW`);

        expect(getByTestId('totalOdds').innerHTML).toBe('4257/500');
        const potentialReturnsFormted = Number(potentialReturnsCrossbet).toLocaleString();

        expect(getByTestId('possibleWinnings').innerHTML).toBe(`${potentialReturnsFormted} KRW`);
    });
});
