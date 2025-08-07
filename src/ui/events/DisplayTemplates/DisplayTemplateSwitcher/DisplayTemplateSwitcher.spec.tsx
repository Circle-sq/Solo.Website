import map from 'lodash/map';

import MockComponent from '@sc-tests/unit/mocks/MockComponent';
import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { SportType } from 'src/common/enums';
import { MARKET_TEMPLATE, MARKET_TEMPLATE_GROUP } from 'src/utils/constants';

import DisplayTemplateSwitcher from './DisplayTemplateSwitcher';

const eventId = 7729;
const markets = require('../CorrectScoreDisplayTemplate/test/markets.json');

vi.mock('react-slick', () => ({ default: MockComponent }));
vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));
vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: ({ options }: { options: Record<string, string>[] }) => {
        return (
            <div>
                <ul>
                    {map(options, ({ label }) => (
                        <li data-testid={label} key={label}>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        );
    },
}));

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                translationsStore: {
                    translateMarketTab: (tabName: string): string => {
                        return tabName;
                    },
                },
                language: {
                    getTranslation: (str: string) => str,
                },
            };
        },
        default: vi.fn(),
    };
});
vi.mock('src/ui/common/Carousel/Carousel', () => ({ default: MockComponent }));
vi.mock('src/ui/events/Selection/Selection', () => ({ default: MockComponent }));
vi.mock('src/ui/events/DisplayTemplates/SimpleDisplayTemplate/SimpleDisplayTemplate', () => ({
    default: () => {
        return <span data-testid='simple-display-template'>simple</span>;
    },
}));
vi.mock('src/ui/events/DisplayTemplates/GameLinesDisplayTemplate/GameLinesDisplayTemplate', () => ({
    default: () => {
        return <span data-testid='game-lines-display-template'>game lines</span>;
    },
}));
vi.mock('src/ui/events/DisplayTemplates/SpreadDisplayTemplate/SpreadDisplayTemplate', () => ({
    default: () => {
        return <span data-testid='spread-display-template'>spread</span>;
    },
}));
vi.mock('src/ui/events/DisplayTemplates/OverUnderDisplayTemplate/OverUnderDisplayTemplate', () => ({
    default: () => {
        return <span data-testid='over-under-display-template'>over under</span>;
    },
}));
vi.mock('src/ui/events/DisplayTemplates/CorrectScoreDisplayTemplate/CorrectScoreDisplayTemplate', () => ({
    default: () => {
        return <span data-testid='correct-score-display-template'>correct score</span>;
    },
}));

const defaultProps = {
    eventId,
    markets: [markets],
    isOutrightEvent: false,
};

describe('DisplayTemplateSwitcher', () => {
    it('should render SimpleDisplayTemplate if event is outright', () => {
        const { getByText } = renderWithAppWrapper(<DisplayTemplateSwitcher {...defaultProps} isOutrightEvent />);

        expect(getByText(/simple/i)).toBeTruthy();
    });

    it('should render GameLinesDisplayTemplate if group name is game lines and the sport is compatible', () => {
        const { getByText } = renderWithAppWrapper(
            <DisplayTemplateSwitcher
                {...defaultProps}
                sportId={SportType.Baseball}
                groupName={MARKET_TEMPLATE_GROUP.gameLines}
            />,
        );

        expect(getByText(/game lines/i)).toBeTruthy();
    });

    it('should render SpreadDisplayTemplate if marketTypeGeneric is spread and every market selection has a line', () => {
        const marketsProp = [
            {
                ...markets,
                template: { ...markets.template, marketTypeGeneric: MARKET_TEMPLATE_GROUP.spread },
                selections: [{ ...markets.selections[0], line: true }],
            },
        ];
        const { getByText } = renderWithAppWrapper(<DisplayTemplateSwitcher {...defaultProps} markets={marketsProp} />);

        expect(getByText(/spread/i)).toBeTruthy();
    });

    it('should render OverUnderDisplayTemplate if marketTypeGeneric is over under', () => {
        const marketsProp = [
            {
                ...markets,
                template: { ...markets.template, marketTypeGeneric: MARKET_TEMPLATE.overunder },
            },
        ];
        const { getByText } = renderWithAppWrapper(<DisplayTemplateSwitcher {...defaultProps} markets={marketsProp} />);

        expect(getByText(/over under/i)).toBeTruthy();
    });

    it('should render CorrectScoreDisplayTemplate if marketTypeGeneric is correct score and the sport is compatible', () => {
        const marketsProp = [
            {
                ...markets,
                template: { ...markets.template, marketTypeGeneric: MARKET_TEMPLATE.correctscore },
            },
        ];
        const { getByText } = renderWithAppWrapper(
            <DisplayTemplateSwitcher {...defaultProps} sportId={SportType.IceHockey} markets={marketsProp} />,
        );

        expect(getByText(/correct score/i)).toBeTruthy();
    });

    it('should render SimpleDisplayTemplate if event is not outright and matches none of the other display templates', () => {
        const { getByText } = renderWithAppWrapper(<DisplayTemplateSwitcher {...defaultProps} />);

        expect(getByText(/simple/i)).toBeTruthy();
    });
});
