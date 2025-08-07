import { screen, fireEvent } from '@testing-library/react';
import type { RecoilState, MutableSnapshot } from 'recoil';
import { useRecoilValue } from 'recoil';

import { renderWithAppWrapper } from '@sc-tests/unit/mocks/renderMocks';

import { MyBetsTab } from 'src/common/enums';

import { myBetsFiltersAtom } from '../store/atoms';
import { defaultDateRange } from '../store/helpers';
import { type MyBetsFilters, SortFilter, TabStatus } from '../store/types';

import BetSorting from './BetSorting';

vi.mock('src/appState/AppState', () => ({
    useAppStateContext: () => ({
        language: {
            getTranslation: vi.fn().mockImplementation((_key: string, label: string) => label),
        },
    }),
}));

const ReadSortType = ({ atom }: { atom: RecoilState<MyBetsFilters> }) => {
    const { sort } = useRecoilValue(atom);

    return <div data-testid='sortType'>{sort}</div>;
};

describe('BetSorting', () => {
    const renderComponent = (initializeState?: (snapshot: MutableSnapshot) => void) => {
        renderWithAppWrapper(
            <>
                <BetSorting />
                <ReadSortType atom={myBetsFiltersAtom} />
            </>,
            {},
            {},
            initializeState,
        );
    };

    it('renders the sorting options', () => {
        renderComponent();

        expect(screen.getByText('Most recent')).toBeInTheDocument();
        expect(screen.getByText('Event time')).toBeInTheDocument();
    });

    it('changes sort type on click', () => {
        renderComponent(({ set }) => {
            set(myBetsFiltersAtom, {
                tab: MyBetsTab.CashOut,
                status: TabStatus.All,
                range: defaultDateRange(),
                sort: SortFilter.DescPLacedAt,
            });
        });

        const mostRecentButton = screen.getByText('Most recent');
        const eventTimeButton = screen.getByText('Event time');

        expect(screen.getByTestId('sortType').textContent).toBe(SortFilter.DescPLacedAt);

        fireEvent.click(mostRecentButton);
        expect(screen.getByTestId('sortType').textContent).toBe(SortFilter.DescPLacedAt);

        fireEvent.click(eventTimeButton);
        expect(screen.getByTestId('sortType').textContent).toBe(SortFilter.EventStartTime);
    });
});
