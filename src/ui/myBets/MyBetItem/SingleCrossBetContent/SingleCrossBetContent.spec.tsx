import MockComponent from '@solo-tests/unit/mocks/MockComponent';
import { buildSubUnsubWrapper, renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import type { LanguageStore } from 'src/appState/LanguageStore';
import { BetStatus } from 'src/common/enums';
import { formatStartTime } from 'src/common/helpers/event';
import type { MyBet, MyCrossBetLeg } from 'src/common/types/myBet';
import { getCrossbetMock } from 'src/ui/myBets/MyBetItem/SingleCrossBetContent/test/configMock';

import SingleCrossBetContent from './SingleCrossBetContent';

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));

const Event = {
    id: 98668,
    sport: 'football',
    media: {
        liveTrackers: [
            {
                id: 98668,
                provider: 'betradar',
            },
        ],
        streams: [
            {
                id: 98668,
            },
        ],
        statistics: [],
    },
};

vi.mock('src/appState/AppState', function AppState() {
    const language: LanguageStore = { getTranslation: (_key: string, defaultText: string) => defaultText };

    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                translationsStore: {
                    translateMarketTab: (tabName: string): string => {
                        return tabName;
                    },
                },
                language,
                models: {
                    hasEvent: vi.fn(() => true),
                    getEvent: vi.fn().mockReturnValue(Event),
                    getMarket: vi.fn(),
                    getSelection: vi.fn(),
                },
            };
        },
        default: vi.fn(),
    };
});

vi.mock('libs/ui-icons-svg/src/CrossBetIcon', () => ({ default: () => <>X&nbsp;</> }));

const mockInfographics = 'infoGraphics';

vi.mock('src/ui/myBets/MyBetEventInfographics/MyBetEventInfographics', () => ({
    default: () => {
        return <div data-testid='MyBetEventInfographics'>{mockInfographics}</div>;
    },
}));

const getProps = (bet: MyBet<MyCrossBetLeg>) => {
    return {
        bet: bet,
        betStatus: BetStatus.Open,
    };
};

describe('SingleCrossBetContent Card', () => {
    it('should include logo, sport and competition names in the header, selection in the body', () => {
        const mockBet = getCrossbetMock();
        const defaultProps = getProps(mockBet);
        const { sport, competition, event, marketsAndSelections } = mockBet.legs[0];
        const [top, bottom] = marketsAndSelections;
        const { getByTestId } = renderWithAppWrapper(
            <SingleCrossBetContent {...defaultProps} />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(getByTestId('betHeader')).toHaveTextContent(
            [`X Cross Bet`, `${sport.name}, ${competition.name}`].join(''),
        );

        expect(getByTestId(`myBets-eventId-${event.id}`)).toHaveTextContent(
            [
                `${top.selection.name}${top.market.name}`,
                `${bottom.selection.name}${bottom.market.name}`,
                `${event.name}`,
                `| ${formatStartTime(event.startTime)}`,
            ].join(''),
        );
    });

    it('should render selections in the body (Live)', () => {
        const mockBet = getCrossbetMock(true);
        const defaultProps = getProps(mockBet);
        const { event, marketsAndSelections } = mockBet.legs[0];
        const [top, bottom] = marketsAndSelections;
        const { getByTestId } = renderWithAppWrapper(
            <SingleCrossBetContent {...defaultProps} />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(getByTestId(`myBets-eventId-${event.id}`)).toHaveTextContent(
            [
                `${top.selection.name}${top.market.name}`,
                `${bottom.selection.name}${bottom.market.name}`,
                `${mockInfographics}`,
            ].join(''),
        );
    });
});
