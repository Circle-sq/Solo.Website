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

const totalStake = 5000;
const potentialReturns = 980000;

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
});
