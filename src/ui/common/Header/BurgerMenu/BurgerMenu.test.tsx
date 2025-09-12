import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import { fromJS } from 'immutable';
import { http, HttpResponse } from 'msw';
import type { ComponentProps } from 'react';

import { isAuthenticatedAtom, userDataAtom } from '@solo-account/store/atoms';
import type { UserData } from '@solo-account/types';
import { MockStoreProvider } from '@solo-tests/unit/mocks/jotai/store';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import type { SportCount } from 'src/appState/sportsList/types';
import { RouteName, SportTab, SportType } from 'src/common/enums';
import { mockUseAppStateContext } from 'src/ui/common/SubNavigation/tests/test-helper';
import { DATE_FORMAT } from 'src/utils/constants';

import { eventCountersMock } from './__mocks__/eventCountersMock';
import { sportsMock } from './__mocks__/sportsMock';
import BurgerMenu from './BurgerMenu';

const eventCounters: Record<string, SportCount[]> = {
    'all-count': eventCountersMock,
    'live-grouped-sports': [{ id: SportType.Football, count: 2 }],
};

const redirect = vi.fn();

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useAppStateContext: function useAppStateContext(): Record<string, unknown> {
            return mockUseAppStateContext({
                router: { redirect },
                eventsCounter: {
                    getEventsCounterList: (key: string, _queryParams: Record<string, string>) => ({
                        counters: eventCounters[key] || [],
                    }),
                },
            });
        },
        default: vi.fn(),
    };
});

const handlers = [
    http.get('/api/user/freebet/1/credits', async () => {
        return HttpResponse.json({
            totalAmount: 0,
            bonusCredits: [],
        });
    }),
    http.get('/api/user/freebet/2/credits', async () => {
        return HttpResponse.json({
            totalAmount: 10000,
            bonusCredits: [
                {
                    enabled: true,
                    expiryDate: '2024-11-22T11:30:31Z',
                    campaignId: '7a0101c6-2d4a-11ee-a40e-5057d25f6206',
                    walletId: 1,
                    languageDescription: 'My free bet description',
                    amount: 10000,
                    id: 1,
                    createdAt: '2024-10-18T10:30:42Z',
                    description: null,
                    promotionId: '06de4a27-8d3c-11ef-bcbf-5057d25f6206',
                },
            ],
        });
    }),
    http.post('/api/competitions/search/event', async () => {
        return HttpResponse.json({
            results: [],
            totalHints: 0,
            aggregations: {},
        });
    }),
];

server.use(...handlers);

const initState = {
    sports: fromJS({ sports: { items: sportsMock } }),
};

const defaultProps: ComponentProps<typeof BurgerMenu> = {
    toggleBurgerMenu: vi.fn(),
    showBurgerMenu: true,
};

const userDataState = { id: 1 } as UserData;

const render = (userData = userDataState) => {
    return renderWithAppWrapper(
        <MockStoreProvider
            values={[
                [isAuthenticatedAtom, true],
                [userDataAtom, userData],
            ]}
        >
            <BurgerMenu {...defaultProps} />
        </MockStoreProvider>,
        initState,
    );
};

describe('BurgerMenu', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should render BurgerMenu and all sports when user clicks Click to see full list', async () => {
        const height = 768;
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(height);
        expect(window.innerHeight).toBe(height);
        const { container, getByText } = render();
        //prettier-ignore
        expect(container).toHaveTextContent([
            'Sports', 'Live Sports',
            'Football', 'LIVE', '1227',
            'Basketball', '183',
            'Baseball', '10',
            'American Football', '94',
            'Tennis', '81',
            'Volleyball', '55',
            'Ice Hockey', '193',
            'Table Tennis', '110',
            'Snooker', '4',
            'Boxing/MMA', '53',
            'Darts', '27',
            'Golf Outrights', '13',
            'Formula One', '4',
            'Futsal', '6',
            'Motorbikes', '1',
            'Rugby League', '2',
            'Click to see the full list',
            'English',
        ].join(''));

        await userEvent.click(getByText(/click to see the full list/i));

        //prettier-ignore
        expect(container).toHaveTextContent([
            'Sports', 'Live Sports',
            'Football', 'LIVE', '1227',
            'Basketball', '183',
            'Baseball', '10',
            'American Football', '94',
            'Tennis', '81',
            'Volleyball', '55',
            'Ice Hockey', '193',
            'Table Tennis', '110',
            'Snooker', '4',
            'Boxing/MMA', '53',
            'Darts', '27',
            'Golf Outrights', '13',
            'Formula One', '4',
            'Futsal', '6',
            'Motorbikes', '1',
            'Rugby League', '2',
            'Rugby Union', '35',
            'Handball', '98',
            'CS:GO', '1',
            'League of Legends', '9',
            'Specials', '47',
            'English',
        ].join(''));
    });

    it('should render less sports when height is decreased to 600', async () => {
        const height = 600;
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(height);
        expect(window.innerHeight).toBe(height);
        const { container } = render();

        //prettier-ignore
        expect(container).toHaveTextContent([
            'Sports', 'Live Sports',
            'Football', 'LIVE', '1227',
            'Basketball', '183',
            'Baseball', '10',
            'American Football', '94',
            'Tennis', '81',
            'Volleyball', '55',
            'Ice Hockey', '193',
            'Table Tennis', '110',
            'Snooker', '4',
            'Boxing/MMA', '53',
            'Darts', '27',
            'Golf Outrights', '13',
            'Click to see the full list',
            'English',
        ].join(''));
    });

    it('should render more sports when height is increased to 900', async () => {
        const height = 900;
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(height);
        expect(window.innerHeight).toBe(height);
        const { container } = render();

        //prettier-ignore
        expect(container).toHaveTextContent([
            'Sports', 'Live Sports',
            'Football', 'LIVE', '1227',
            'Basketball', '183',
            'Baseball', '10',
            'American Football', '94',
            'Tennis', '81',
            'Volleyball', '55',
            'Ice Hockey', '193',
            'Table Tennis', '110',
            'Snooker', '4',
            'Boxing/MMA', '53',
            'Darts', '27',
            'Golf Outrights', '13',
            'Formula One', '4',
            'Futsal', '6',
            'Motorbikes', '1',
            'Rugby League', '2',
            'Rugby Union', '35',
            'Handball', '98',
            'CS:GO', '1',
            'Click to see the full list',
            'English',
        ].join(''));
    });

    it('should render all sports and hide Click to see full list when height is increased to 1200', async () => {
        const height = 1200;
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(height);
        expect(window.innerHeight).toBe(height);
        const { container } = render();

        //prettier-ignore
        expect(container).toHaveTextContent([
            'Sports', 'Live Sports',
            'Football', 'LIVE', '1227',
            'Basketball', '183',
            'Baseball', '10',
            'American Football', '94',
            'Tennis', '81',
            'Volleyball', '55',
            'Ice Hockey', '193',
            'Table Tennis', '110',
            'Snooker', '4',
            'Boxing/MMA', '53',
            'Darts', '27',
            'Golf Outrights', '13',
            'Formula One', '4',
            'Futsal', '6',
            'Motorbikes', '1',
            'Rugby League', '2',
            'Rugby Union', '35',
            'Handball', '98',
            'CS:GO', '1',
            'League of Legends', '9',
            'Specials', '47',
            'English',
        ].join(''));
    });

    it('should render less sports when a free bet is present. should render even less sports when free bet is expanded', async () => {
        const height = 768;
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(height);
        expect(window.innerHeight).toBe(height);
        const { container, getByTestId } = render({ id: 2 } as UserData);

        await waitFor(() => expect(container).toHaveTextContent('Freebet'));
        //prettier-ignore
        expect(container).toHaveTextContent([
            'Sports', 'Live Sports',
            'Football', 'LIVE', '1227',
            'Basketball', '183',
            'Baseball', '10',
            'American Football', '94',
            'Tennis', '81',
            'Volleyball', '55',
            'Ice Hockey', '193',
            'Table Tennis', '110',
            'Snooker', '4',
            'Boxing/MMA', '53',
            'Darts', '27',
            'Golf Outrights', '13',
            'Formula One', '4',
            'Futsal', '6',
            'Motorbikes', '1',
            'Click to see the full list',
            'English',
            'Freebet', '1', '₩ 10,000',
        ].join(''));

        await userEvent.click(getByTestId(/freeBetDropdownToggle/i));

        //prettier-ignore
        expect(container).toHaveTextContent([
            'Sports', 'Live Sports',
            'Football', 'LIVE', '1227',
            'Basketball', '183',
            'Baseball', '10',
            'American Football', '94',
            'Tennis', '81',
            'Volleyball', '55',
            'Ice Hockey', '193',
            'Table Tennis', '110',
            'Snooker', '4',
            'Boxing/MMA', '53',
            'Darts', '27',
            'Golf Outrights', '13',
            'Formula One', '4',
            'Click to see the full list',
            'English',
            'Freebet', '1', '₩ 10,000',
            'Free bet!', '₩ 10,000',
            '* My free bet description',
            `Validity: ${format(new Date('2024-11-22T11:30:31Z'), DATE_FORMAT.NUMERIC_FULL_DATE_TIME_W_SEPARATOR)}`
        ].join(''));
    });

    it('should redirect on sport click when on sports tab', async () => {
        const height = 768;
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(height);
        expect(window.innerHeight).toBe(height);
        const { getByText } = render();

        await userEvent.click(getByText(/^football$/i));

        expect(redirect).toHaveBeenCalledOnce();
        expect(redirect).toHaveBeenCalledWith(SportTab.Sports, { id: SportType.Football });
        expect(defaultProps.toggleBurgerMenu).toHaveBeenCalledOnce();
    });

    it('live sports tab should have an extra sport row - highlights', async () => {
        const height = 768;
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(height);
        expect(window.innerHeight).toBe(height);
        const { getByText, container } = render();

        await userEvent.click(getByText(/live sports/i));

        //prettier-ignore
        expect(container).toHaveTextContent([
            'Sports', 'Live Sports',
            'Highlights',
            'Football', '2'
        ].join(''));

        await userEvent.click(getByText(/highlights/i));

        expect(redirect).toHaveBeenCalledOnce();
        expect(redirect).toHaveBeenCalledWith(SportTab.Live, { id: RouteName.Betting });
        expect(defaultProps.toggleBurgerMenu).toHaveBeenCalledOnce();
    });
});
