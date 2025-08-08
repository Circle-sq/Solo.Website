import type { PropsWithChildren } from 'react';

import { appStateContextMock } from '@solo-tests/unit/mocks/contexts/appStateContextMock';
import { eventsSortContextMock } from '@solo-tests/unit/mocks/contexts/eventsSortContextMock';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import type { AppState } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { RecursivePartial } from 'src/common/types/main';
import CompetitionItem from 'src/ui/crossbetting/Competitions/CompetitionItem';

vi.mock('src/utils/Router/Link', () => ({
    default: ({ children }: PropsWithChildren<never>) => (
        <a href='#' data-testid='breadcrumb'>
            {children}
        </a>
    ),
}));

vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: () => <span data-testid='dropdown-select'>dropdown</span>,
}));

vi.mock('src/ui/crossbetting/FilterDropdown/FilterDropdown', () => ({
    default: () => <span data-testid='filter-dropdown'>dropdown</span>,
}));

vi.mock('src/ui/events/containers/CrossBettingEvents/CrossBettingEvents', () => ({
    default: () => <div data-testid={'crossBettingEvents'}></div>,
}));

vi.mock('src/ui/crossbetting/EventCardMobile/EventCardMobile', () => ({
    default: () => <span data-testid='mobile-event-card'>event card</span>,
}));

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useEventsSort: () => eventsSortContextMock,
        useAppStateContext: (): RecursivePartial<AppState> => appStateContextMock,
        default: vi.fn(),
    };
});

describe('CompetitionItem', () => {
    const defaultProps = {
        competitionId: 2,
        eventsList: [{ id: 226, markets: [], sport: 'baseball', getRawData: vi.fn() } as unknown as EventModel],
    };

    it('should render the mobile card event component for desktop', () => {
        const { getByTestId } = renderWithAppWrapper(<CompetitionItem {...defaultProps} />);

        expect(getByTestId('mobile-event-card')).toBeInTheDocument();
    });

    it('should render the mobile event card component', () => {
        const { getByTestId } = renderWithAppWrapper(<CompetitionItem {...defaultProps} />);

        expect(getByTestId('mobile-event-card')).toBeInTheDocument();
    });
});
