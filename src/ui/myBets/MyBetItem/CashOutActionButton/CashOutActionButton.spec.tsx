import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import type { MyBet } from 'src/common/types/myBet';

import CashOutActionButton from './CashOutActionButton';

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext() {
            return {
                language: {
                    getTranslation(_key: string, defaultValue: string) {
                        return defaultValue;
                    },
                },
            };
        },
        default: vi.fn(),
    };
});

const betMock = {
    legs: [
        {
            priceType: 'fp',
            price: {
                d: 1.96,
                f: '24/25',
            },
            spPrice: null,
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
            marketsAndSelections: [],
            result: null,
            competition: {
                id: 120,
                name: 'Northern NSW NPL',
            },
        },
    ],
    settleType: null,
    potentialReturns: 980000,
    payout: null,
    tax: null,
    betId: '116XUBV9UW',
    settledAt: null,
    affiliate: null,
    eachWay: false,
    placedAt: '2022-08-03T09:39:42Z',
    currency: 'KRW',
    status: 'open',
    totalStake: 500000,
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

describe('CashOutActionButton', () => {
    const defaultProps = {
        bet: betMock,
        onCashOutBet: vi.fn(),
        isConfirmed: false,
        isSuccess: true,
    };

    it('CashOutActionButton should be rendered without errors', function () {
        const { getByTestId } = renderWithAppWrapper(<CashOutActionButton {...defaultProps} />);

        const cashoutBtnWrapper = getByTestId('cashout');
        expect(cashoutBtnWrapper).toBeInTheDocument();
    });

    it('Cashout button should have text message - Cash out locked', function () {
        const { getByText } = renderWithAppWrapper(<CashOutActionButton {...defaultProps} />);

        const message = getByText(/Cash out locked/i);
        expect(message).toBeTruthy();
    });
});
