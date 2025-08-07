import find from 'lodash/find';

import { buildSubUnsubWrapper, renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import CrossBetLeg from './CrossBetLeg';

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                models: {
                    getMarket: vi.fn().mockImplementation((id: number) => {
                        const pare = find(marketsAndSelectionsMock, { market: { id } });

                        return pare?.market;
                    }),
                    getSelection: vi.fn(),
                },
            };
        },
        default: vi.fn(),
    };
});

const marketsAndSelectionsMock = [
    {
        market: {
            id: 10300,
            name: '1x2',
            url: null,
            provider: 'bet-radar',
            templateId: 'bet-radar-1',
            templateMarketTypeGeneric: 'threewaywinner',
            templateName: '1x2 (1)',
            revision: 1,
            metadata: {
                nameTranslations: {
                    'ko-KR': '승무패',
                },
            },
        },
        selection: {
            id: 31121,
            name: 'AC Milan',
            price: null,
            metadata: {
                nameTranslations: {
                    'ko-KR': 'AC 밀란',
                },
            },
            line: null,
        },
        price: { f: '23/20', d: 2.15 },
        result: null,
        winningSelection: null,
        legFeedProperties: null,
    },
    {
        market: {
            id: 10304,
            revision: 2,
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
            id: 31134,
            name: 'over 2.0',
            price: null,
            metadata: {
                nameTranslations: {
                    'ko-KR': '오버 2.0',
                },
            },
            line: null,
        },
        price: { f: '23/20', d: 2.15 },
        result: null,
        winningSelection: null,
        legFeedProperties: null,
    },
];

describe('CrossBetLeg', () => {
    it('renders the score', () => {
        const homeScore = '1';
        const awayScore = '0';
        const defaultProps = {
            eventScore: { home: '1', away: '0' },
            marketsAndSelections: marketsAndSelectionsMock,
            showScore: true,
            eventId: 123,
            revision: 47,
        };

        const { getByTestId } = renderWithAppWrapper(
            <CrossBetLeg {...defaultProps} />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        const home = getByTestId('scoreInfo-home');
        const away = getByTestId('scoreInfo-away');
        expect(home.textContent).toEqual(homeScore);
        expect(away.textContent).toEqual(awayScore);
    });
});
