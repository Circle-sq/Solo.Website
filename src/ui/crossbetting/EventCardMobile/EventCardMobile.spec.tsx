import type { RenderResult } from '@testing-library/react';
import { addDays, addHours, startOfDay } from 'date-fns';
import { http, HttpResponse } from 'msw';
import type { ComponentProps, PropsWithChildren, ReactElement } from 'react';

import { appStateContextMock } from '@solo-tests/unit/mocks/contexts/appStateContextMock';
import { eventsSortContextMock } from '@solo-tests/unit/mocks/contexts/eventsSortContextMock';
import RecoilObserver from '@solo-tests/unit/mocks/recoil/RecoilObserver';
import { buildSubUnsubWrapper, renderWithAppWrapper } from '@solo-tests/unit/mocks/renderMocks';
import { server } from '@solo-tests/unit/mocks/server.setup';

import type { AppState } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import type { MarketModel } from 'src/appState/models/models/MarketModel';
import type { SportType } from 'src/common/enums';
import type { RecursivePartial } from 'src/common/types/main';
import EventCardMobile, { sportMarketLabels } from 'src/ui/crossbetting/EventCardMobile/EventCardMobile';
import { hasMarketDisplayCrossBet } from 'src/ui/crossbetting/EventCardMobile/helpers';
import { marketCounterByEventAtomFamily } from 'src/ui/events/store/atoms';

import { footballEvent } from './__test__/mockData';

const rawData = footballEvent as unknown as EventModel;

const startTime = addDays(addHours(startOfDay(new Date()), 12), 1);

vi.mock('src/utils/Router/Link', () => ({
    default: ({ children }: PropsWithChildren<never>) => (
        <a href='ParticipantMobile#' data-testid='breadcrumb'>
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

vi.mock('src/appState/AppState', function AppState() {
    return {
        __esModule: true,
        useEventsSort: () => eventsSortContextMock,
        useAppStateContext: (): RecursivePartial<AppState> => ({
            ...appStateContextMock,
            models: {
                ...appStateContextMock.models,
                getMarket(id: number): MarketModel {
                    return rawData.markets.find((market: MarketModel) => {
                        return market.id === id;
                    }) as MarketModel;
                },
            },
        }),
        default: vi.fn(),
    };
});

type Props = ComponentProps<typeof EventCardMobile>;

const mockRevision = 46;

const defaultProps = {
    event: {
        id: 226,
        markets: [],
        sport: 'baseball',
        revision: mockRevision,
        timeSettingsStartTime: startTime.toISOString(),
        media: {
            liveTrackers: [],
        },
    } as unknown as EventModel,
};

const renderComponent = (props: Props, observer?: ReactElement): RenderResult => {
    return renderWithAppWrapper(
        <>
            {observer}
            <EventCardMobile {...props} />
        </>,
        {},
        { wrapper: buildSubUnsubWrapper() },
    );
};

const handlers = [
    http.get('/api/uniforms/americanfootball/player/home', () => {
        return HttpResponse.json([]);
    }),
];

server.use(...handlers);

describe('EventCardMobile', () => {
    it('should render with default props', () => {
        const { getByTestId } = renderComponent(defaultProps);
        const time = getByTestId('mobile-event-card-time');

        expect(time).toBeInTheDocument();
        expect(time.nextSibling?.firstChild).toBeInstanceOf(SVGSVGElement);
        expect(time).toHaveTextContent('Tomorrow 12:00');
    });

    it(
        'should render time, stats on the same row when markets count bigger than 3. Clicking on ' +
            'expander shows more markets',
        () => {
            const { getByTestId } = renderComponent({ event: rawData });
            const time = getByTestId('mobile-event-card-time');

            expect(time).toBeInTheDocument();
            expect(time.nextSibling?.firstChild).toBeInstanceOf(SVGSVGElement);
        },
    );

    it('should render without handicap markets', () => {
        const { getByTestId, queryByTestId } = renderComponent({ event: rawData });

        const marketToDisplayInCrossBet = rawData.markets.find((market: MarketModel) =>
            hasMarketDisplayCrossBet(market.tags['market-display']),
        );
        const marketToHideInCrossBet = rawData.markets.find(
            (market: MarketModel) => !hasMarketDisplayCrossBet(market.tags['market-display']),
        );
        expect(marketToDisplayInCrossBet).toBeDefined();
        expect(marketToHideInCrossBet).toBeDefined();
        expect(getByTestId(`crossbetMarketId-${marketToDisplayInCrossBet?.id}`)).toBeInTheDocument();
        expect(queryByTestId(`crossbetMarketId-${marketToHideInCrossBet?.id}`)).not.toBeInTheDocument();
    });

    it('should update more button counter', async () => {
        const { getByTestId, rerender } = renderComponent(
            { event: rawData },
            <RecoilObserver
                node={marketCounterByEventAtomFamily(rawData.id)}
                onChange={(_, setValue) => setValue(0)}
            />,
        );

        const buttonMore = getByTestId(`event-${rawData.id}`);

        expect(buttonMore).toHaveTextContent('All Bets');

        rerender(
            <>
                <RecoilObserver
                    node={marketCounterByEventAtomFamily(rawData.id)}
                    onChange={(_, setValue) => setValue(10)}
                />
                <EventCardMobile {...{ event: rawData }} />
            </>,
        );

        expect(buttonMore).toHaveTextContent('All Bets(+10)');
    });

    it('should display the correct special market label for football', () => {
        const { getByText } = renderComponent({ event: rawData });

        const expectedLabel = sportMarketLabels[footballEvent.sport as SportType];
        expect(getByText(`Specials | ${expectedLabel}`)).toBeInTheDocument();
    });
});
