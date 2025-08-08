import map from 'lodash/map';

import MockComponent from '@solo-tests/unit/mocks/MockComponent';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import GoalscorerDisplayTemplate from './GoalscorerDisplayTemplate';

const event = require('../GameLinesDisplayTemplate/test/event.json');

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
vi.mock('react-slick', () => ({ default: () => <div></div> }));

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

vi.mock('src/ui/common/Carousel/Carousel', () => ({ default: () => MockComponent }));
vi.mock('src/ui/events/Selection/PureSelection', () => ({
    default: (props: { selectionId?: number }) => {
        return <span data-testid='selection'>{props.selectionId}</span>;
    },
}));

const nameAway = 'Name Away';
const nameHome = 'Name Home';

describe('GoalscorerDisplayTemplate', () => {
    it('should render Name Away and Name Home', () => {
        const markets = event.markets;
        const { container } = renderWithAppWrapper(
            <GoalscorerDisplayTemplate groupName={'Goalscorer'} markets={markets} />,
        );

        expect(container).toHaveTextContent(nameAway);
        expect(container).toHaveTextContent(nameHome);
    });
});
