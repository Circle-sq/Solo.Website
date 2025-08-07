import map from 'lodash/map';

import MockComponent from '@sc-tests/unit/mocks/MockComponent';
import { buildSubUnsubWrapper, renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import GameLinesDisplayTemplate from './GameLinesDisplayTemplate';

const sportId = 'basketball';
const event = require('./test/event.json');

vi.mock('src/utils/Router/NewLink', () => ({ default: MockComponent }));
vi.mock(
    'src/ui/common/DropdownSelect/DropdownSelect',
    () =>
        function DropdownSelect({ options }: { options: Record<string, string>[] }) {
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
);
vi.mock('react-slick', () => ({ default: MockComponent }));

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

const includingOvertimeTab = 'Including overtime';
const regularPlayTab = 'Regular Play';

describe('GameLinesDisplayTemplate', () => {
    it('should render Including overtime tab', () => {
        const markets = event.markets;
        const { container } = renderWithAppWrapper(
            <GameLinesDisplayTemplate sportId={sportId} markets={markets} />,
            {},
            { wrapper: buildSubUnsubWrapper() },
        );

        expect(container).toHaveTextContent(includingOvertimeTab);
        expect(container).toHaveTextContent(regularPlayTab);
    });
});
