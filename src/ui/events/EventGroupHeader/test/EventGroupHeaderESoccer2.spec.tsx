import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { RouteName } from 'src/common/enums';
import { SPORT_TYPE } from 'src/utils/constants';

import EventGroupHeaderESoccer from '../EventGroupHeaderESoccer';
import type { EventGroupHeaderProps } from '../types';

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return {
                router: { route: { name: RouteName.Competition } },
                language: {
                    getTranslation: (str: string) => str,
                },
            };
        },
        default: vi.fn(),
    };
});

const defaultProps: EventGroupHeaderProps = {
    sportId: SPORT_TYPE.football,
    showSelections: false,
    columnLabelsGroups: [
        ['H', 'D', 'A'],
        ['', 'H', 'A'],
        ['G', 'O', 'U'],
    ],
    label: ['GT Sports League', 'GT Nations League'],
    selectionsSizes: [3, 3, 3],
};

const renderComponent = (props = defaultProps) => renderWithAppWrapper(<EventGroupHeaderESoccer {...props} />);

describe('EventGroupHeaderESoccer - competition route', () => {
    it('should render header with gt sports league as country when route is competition', () => {
        const { getByText, queryByTestId } = renderComponent();
        expect(getByText(/gt sports league/i)).toBeInTheDocument();
        expect(getByText(/gt nations league/i)).toBeInTheDocument();
        expect(queryByTestId('eSoccerIcon')).not.toBeInTheDocument();
    });
});
