import type { UseQueryOptions } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import type { SetterOrUpdater } from 'recoil';

import RecoilObserver from '@solo-tests/unit/mocks/recoil/RecoilObserver';
import { renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';

import { ApiWrapper } from 'src/appState/ApiWrapper';
import { MyBetsTab } from 'src/common/enums';
import { myBetsFiltersAtom } from 'src/ui/myBets/store/atoms';
import type { MyBetsFilters } from 'src/ui/myBets/store/types';

import MyBetsContainer from './MyBetsContainer';

const settledBets = [
    {
        betId: '100TLVABM6',
        cashOut: false,
        currency: 'KRW',
        eachWay: false,
        id: 'f2e76806-321e-4b01-8d87-e664679ef4a1',
        legs: [
            {
                competition: { id: 636, name: 'UEFA Nations League' },
                event: { id: 35810, name: 'Spain vs Italy', startTime: '2023-06-15T18:45:00Z' },
                eventCountry: ['WRL'],
                id: '11596989',
                inPlay: false,
                market: { id: 4369061, name: '1x2', type: null },
                price: { d: 2.35, f: '27/20', fractionalNumerator: null, fractionalDenominator: null },
                priceType: 'fp',
                result: { type: 'won', place: null, dividends: {}, winReduction: null, placeReduction: null },
                selection: { id: 11596989, name: 'Spain', metadata: {}, line: null },
                spPrice: null,
                sport: { id: 'football', name: 'Football' },
                type: 'crossBet',
            },
        ],
        numLines: 1,
        payout: 175249135,
        placedAt: '2023-06-15T12:32:41Z',
        potentialReturns: 175249135,
        settleType: 'selection',
        settledAt: '2023-06-15T20:42:16Z',
        stakePerLine: 74574100,
        status: 'settled',
        totalStake: 74574100,
        type: 'SGL',
    },
    {
        betId: '100TLVABM7',
        cashOut: false,
        currency: 'KRW',
        eachWay: false,
        id: 'f2e76806-321e-4b01-8d87-e664679ef4a2',
        legs: [
            {
                competition: { id: 637, name: 'UEFA' },
                event: { id: 35811, name: 'Calcio Foggia vs Calcio Lecco 1912', startTime: '2023-06-15T18:45:00Z' },
                eventCountry: ['WRL'],
                id: '11596989',
                inPlay: false,
                market: { id: 4369062, name: '1x2', type: null },
                price: { d: 2.35, f: '27/20', fractionalNumerator: null, fractionalDenominator: null },
                priceType: 'fp',
                result: { type: 'lost', place: null, dividends: {}, winReduction: null, placeReduction: null },
                selection: { id: 11596990, name: 'Calcio Foggia', metadata: {}, line: null },
                spPrice: null,
                sport: { id: 'football', name: 'Football' },
                type: 'standard',
            },
        ],
        numLines: 1,
        payout: 0,
        placedAt: '2023-06-15T12:32:41Z',
        potentialReturns: 175249135,
        settleType: 'selection',
        settledAt: '2023-06-15T20:42:16Z',
        stakePerLine: 74574100,
        status: 'settled',
        totalStake: 74574100,
        type: 'SGL',
    },
    {
        betId: '100TLVABM8',
        cashOut: false,
        currency: 'KRW',
        eachWay: false,
        id: 'f2e76806-321e-4b01-8d87-e664679ef4a3',
        legs: [
            {
                competition: { id: 636, name: 'DPC' },
                event: { id: 35810, name: 'Talon eSports vs Execration', startTime: '2023-06-15T18:45:00Z' },
                eventCountry: ['WRL'],
                id: '11596991',
                inPlay: false,
                market: { id: 4369063, name: '1x2', type: null },
                price: { d: 2.35, f: '27/20', fractionalNumerator: null, fractionalDenominator: null },
                priceType: 'fp',
                result: { type: 'won', place: null, dividends: {}, winReduction: null, placeReduction: null },
                selection: { id: 11596991, name: 'Talon eSports (-1.5)', metadata: {}, line: null },
                spPrice: null,
                sport: { id: 'dota2', name: 'Dota 2' },
                type: 'standard',
            },
        ],
        numLines: 1,
        payout: 190349135,
        placedAt: '2023-06-15T12:32:41Z',
        potentialReturns: 190349135,
        settleType: 'selection',
        settledAt: '2023-06-15T20:42:16Z',
        stakePerLine: 75074100,
        status: 'settled',
        totalStake: 75074100,
        type: 'SGL',
    },
    {
        betId: '100TLVABM9',
        cashOut: false,
        currency: 'KRW',
        eachWay: false,
        id: 'f2e76806-321e-4b01-8d87-e664679ef4a4',
        legs: [
            {
                competition: { id: 637, name: 'Premier League, Women' },
                event: { id: 35811, name: 'Zhfk Yenisey Krasnoyarsk vs Lokomotiv', startTime: '2023-06-15T18:45:00Z' },
                eventCountry: ['WRL'],
                id: '11596993',
                inPlay: false,
                market: { id: 4369066, name: '1x2', type: null },
                price: { d: 1.15, f: '22/20', fractionalNumerator: null, fractionalDenominator: null },
                priceType: 'fp',
                result: { type: 'lost', place: null, dividends: {}, winReduction: null, placeReduction: null },
                selection: { id: 11596993, name: 'Lokomotiv', metadata: {}, line: null },
                spPrice: null,
                sport: { id: 'football', name: 'Football' },
                type: 'crossBet',
            },
        ],
        numLines: 1,
        payout: 0,
        placedAt: '2023-06-15T12:32:41Z',
        potentialReturns: 123456700,
        settleType: 'selection',
        settledAt: '2023-06-15T20:42:16Z',
        stakePerLine: 57861700,
        status: 'settled',
        totalStake: 57861700,
        type: 'SGL',
    },
];

let perPage = 1;

const fetchMyBets = (selectedTab: MyBetsTab | undefined) => {
    if (selectedTab === MyBetsTab.Settled) {
        const slisedbets = settledBets.slice(0, perPage);
        const data = {
            bets: slisedbets,
            total: settledBets.length,
        };
        perPage++;

        return data;
    }

    return {
        bets: [],
        total: 0,
    };
};

vi.mock('@tanstack/react-query', async () => {
    const original: Record<string, unknown> = await vi.importActual('@tanstack/react-query');

    return {
        ...original,
        useInfiniteQuery: ({ queryKey, queryFn, initialData, refetchOnWindowFocus }: UseQueryOptions) => {
            const data = { pages: [fetchMyBets(MyBetsTab.Settled) ?? initialData] };

            return {
                data,
                isFetching: false,
                isSuccess: true,
                isError: false,
                queryKey,
                refetchOnWindowFocus,
                queryFn,
            };
        },
        useMutation: () => {
            return {
                mutate: vi.fn(),
            };
        },
        useQueryClient: () => {
            return {
                setQueryData: vi.fn(),
            };
        },
    };
});

vi.mock('src/ui/common/DropdownSelect/DropdownSelect', () => ({
    default: () => <span data-testid='dropdown-select'>dropdown</span>,
}));

vi.mock('src/common/queries/useUpdateQueryCache', () => ({
    updateQueryCache: vi.fn(),
    useUpdateQueryCache: vi.fn(),
}));

vi.mock('src/ui/myBets/hooks/useMyBetsQueryCache', () => ({
    __esModule: true,
    default: () => ({
        setQueryCache: vi.fn(),
    }),
}));

vi.mock('src/ui/myBets/hooks/useDefineTab', () => ({
    __esModule: true,
    default: () => ({
        selectedTab: MyBetsTab.Settled,
        isLoadingDefineTab: false,
        isErrorDefineTab: false,
    }),
}));

vi.mock('src/common/queries/useInvalidateQueries', () => ({
    useInvalidateQueries: vi.fn(),
}));

vi.mock('src/ui/myBets/MyBetItem/BottomDetails/BottomDetails', () => ({
    default: () => <span data-testid='bottom-details'>BottomDetails</span>,
}));

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => ({
            router: {
                redirect: () => {
                    // nothing
                },
                buildUrl: vi.fn(),
            },
            apiWrapper: new ApiWrapper(),
            models: {
                getEvent: (_id: number) => {
                    return {
                        stats: '',
                    };
                },
            },
            reduxState: {
                eventsListIds: [],
            },
            language: {
                userLang: 'en-US',
                getTranslation(_key: string, defaultValue: string) {
                    return defaultValue;
                },
            },
        }),

        default: vi.fn(),
    };
});

describe.skip('MyBetsContainer', () => {
    it('should render lost settled bets', async () => {
        const onChange = (_: MyBetsFilters, setValue: SetterOrUpdater<MyBetsFilters>) => {
            setValue((state) => ({ ...state, tab: MyBetsTab.Settled }));
        };

        const { getByTestId, getByText } = renderWithAppWrapper(
            <>
                <RecoilObserver node={myBetsFiltersAtom} onChange={onChange} />
                <MyBetsContainer />
            </>,
        );

        const openFilterButton = getByTestId('openFilter');
        await userEvent.click(openFilterButton);

        const filterItemLost = getByTestId('filterItem-lost');
        await userEvent.click(filterItemLost);

        const showResultButton = getByTestId('filterItem-showResults');
        await userEvent.click(showResultButton);

        const betslipIdText = 'Betslip ID: ';

        expect(getByText(betslipIdText + settledBets[1].betId)).toBeInTheDocument();
        expect(getByText(betslipIdText + settledBets[3].betId)).toBeInTheDocument();
    });
});
