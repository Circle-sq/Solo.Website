import type { RenderResult } from '@testing-library/react';
import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/setup/setup';
import map from 'lodash/map';
import set from 'lodash/set';
import split from 'lodash/split';
import ms from 'ms';
import type { PropsWithChildren, ReactElement } from 'react';

import { SubscriptionsStorageProvider } from '@sc-data/subscriptions-storage';
import { DevToolsProvider } from '@sc-devtools/DevTools';
import { WebsocketSubscriptionsInspector } from '@sc-devtools/WebsocketSubscriptionsInspector';

import { WebsocketNamespace } from 'src/utils/socket-io/types';

import type { ModelService, RevisionModel } from '../ModelSubscribeBridgeService';
import { ModelSubscribeBridgeService } from '../ModelSubscribeBridgeService';
import { getBookkeeperInstance } from '../SubscriptionQueueService';
import { WebsocketSubscriptionProvider } from '../WebsocketSubscriptionProvider';

import { buildMockEvents } from './mock-event-utils';
import type { MockEvent } from './MockEvent';
import { MockContent } from './MockPubSubApp';

const TEST_UNSUBSCRIBE_TIMEOUT = ms('2s');

const mockPubSubService = {
    subscribeToEvent: vi.fn().mockImplementation((_eventId) => {
        // console.info('subscribeToEvent', _eventId);
    }),
    unsubscribeEvents: vi.fn().mockImplementation((_events) => {
        // console.info('unsubscribeEvents', _events);
    }),
    unsubscribeMarkets: vi.fn().mockImplementation((_markets) => {
        // console.info('unsubscribeMarkets', _markets);
    }),
    subscribeToMarket: vi.fn(),
};

const MOCK_REVISION = 42;

const mockModelService: ModelService = {
    getEvent(id: unknown): RevisionModel | null {
        const e = { id };

        return set(e, 'data.value.revision', MOCK_REVISION) as unknown as RevisionModel;
    },
    getMarket(id: unknown): RevisionModel | null {
        const e = { id };

        return set(e, 'data.value.revision', MOCK_REVISION) as unknown as RevisionModel;
    },
};
const GLOBAL_DEBUG = false;

const AllTheProviders = ({ children }: PropsWithChildren) => {
    const cachedPubSubService = getBookkeeperInstance({ timeout: TEST_UNSUBSCRIBE_TIMEOUT, debug: GLOBAL_DEBUG });

    cachedPubSubService.clear();

    const { subscribeTo, unsubscribeFrom } = ModelSubscribeBridgeService(mockPubSubService, mockModelService);

    return (
        <DevToolsProvider initState={{ show_socket_subscriptions: true }}>
            <SubscriptionsStorageProvider>
                <WebsocketSubscriptionProvider
                    subscribeTo={subscribeTo}
                    unsubscribeFrom={unsubscribeFrom}
                    cachedPubSubService={cachedPubSubService}
                    namespace={WebsocketNamespace.SB}
                >
                    {children}
                </WebsocketSubscriptionProvider>
            </SubscriptionsStorageProvider>
        </DevToolsProvider>
    );
};

const customRender = (ui: ReactElement, options?: Record<string, unknown>): RenderResult & { user: UserEvent } => {
    const results = rtlRender(ui, {
        wrapper: (props): ReactElement => <AllTheProviders {...props} />,
        ...options,
    });

    return {
        ...results,
        user: userEvent.setup(),
    };
};

function TestContent({ entities }: { entities: MockEvent[] }): ReactElement {
    return (
        <>
            <MockContent fooParam={entities} />
            <hr />
            <WebsocketSubscriptionsInspector inline={true} />
        </>
    );
}

const betPageRemove = (betId: number): string => `remove-bet-${betId}`;
const betOnEventListPage = (id: number): string => `list-event-${id}-bet`;
const eventOnListPage = (id: number): string => `list-event-${id}`;
const detailsPageBet = (id: number): string => `details-event-${id}-bet`;

const checkMonitorRowForEvent = (row: string) => {
    const [id, tags] = split(row, ':');

    return expect(screen.getByTestId(`event-${id}-refs`).textContent).toBe(`${id}:${tags}`);
};

const checkMonitorHasNoRecords = () =>
    expect(screen.getByTestId(`${WebsocketNamespace.SB}-websocket-subscription`)).toHaveTextContent('no subscriptions');

const checkMonitorRows = ([total, ...rows]: string[]) => {
    const subscriptionCount = screen.getByTestId(`${WebsocketNamespace.SB}-events-count`);
    const [totalLabel, count] = split(total, ':');

    if (totalLabel === 'total') {
        return [expect(subscriptionCount).toHaveTextContent(count), ...map(rows, checkMonitorRowForEvent)];
    }

    return map(rows, checkMonitorRowForEvent);
};

const originalInfo = console.info;

beforeAll(() => {
    console.info = vi.fn();
});

afterAll(() => {
    console.info = originalInfo;
});

describe.sequential('WebSocketSubscriptionMonitor', () => {
    const FIRST_EVENT_ID = 11;
    const SECOND_EVENT_ID = 22;
    const THIRD_EVENT_ID = 33;
    const eventIds = [FIRST_EVENT_ID, SECOND_EVENT_ID, THIRD_EVENT_ID];
    let mockEvents: MockEvent[];
    let user: UserEvent;

    beforeEach(() => {
        mockEvents = buildMockEvents(eventIds);

        const result = customRender(<TestContent entities={mockEvents} />);
        user = result.user;
    });

    afterEach(() => {
        mockPubSubService.unsubscribeEvents.mockReset();
        mockPubSubService.subscribeToEvent.mockReset();
    });

    test('should not unsubscribe if same el try resubscribe (workaround for rerender issue)', async () => {
        // no subscriptions "visually"
        await waitFor(() => checkMonitorHasNoRecords());
        // prettier-ignore
        await waitFor(() => checkMonitorRows([
          'total:0'
        ]));

        // THE SCENARIO
        // 1. SHOW THE LIST                      -> (total:3 | [ #event_row, #event_row     , #event_row          ])
        // 2. HIDE THE LIST (for v.short time)   -> (total:0 | [                                                  ])
        // 3. SHOW THE LIST                      -> (total:3 | [ #event_row, #event_row     , #event_row          ])
        // 4. HIDE THE LIST (for good)           -> (total:0 | [                                                  ])
        expect(mockPubSubService.subscribeToEvent).not.toHaveBeenCalled();
        // 1. SHOW THE LIST (subscribe to all from #event_row)
        const toggleListEl = await screen.findByText(/show list/);
        // vi.runAllTimers()
        await user?.click(toggleListEl);
        // prettier-ignore
        await waitFor(() => checkMonitorRows([
            'total:3',
            `${FIRST_EVENT_ID}:#event_row`,
            `${SECOND_EVENT_ID}:#event_row`,
            `${THIRD_EVENT_ID}:#event_row`
        ]));

        expect(mockPubSubService.subscribeToEvent).toHaveBeenCalled();

        // 2. HIDE THE LIST (for v.short time)
        await user.click(await screen.findByText(/hide list/));

        // monitor still shows all subscriptions
        // prettier-ignore
        await waitFor(() => checkMonitorRows([
            'total:3',
            `${FIRST_EVENT_ID}:#event_row`,
            `${SECOND_EVENT_ID}:#event_row`,
            `${THIRD_EVENT_ID}:#event_row`
        ]));

        // 3. SHOW THE LIST (again, to cancel unsubscribe)
        await user.click(await screen.findByText(/show list/));
        // prettier-ignore
        await waitFor(() => checkMonitorRows([
            'total:3',
            `${FIRST_EVENT_ID}:#event_row`,
            `${SECOND_EVENT_ID}:#event_row`,
            `${THIRD_EVENT_ID}:#event_row`,
        ]));

        // AT THIS POINT unsubscribe should not be called
        expect(mockPubSubService.unsubscribeEvents).not.toHaveBeenCalled();

        // 4. hide for good
        await user.click(await screen.findByText(/hide list/));
        // prettier-ignore
        await waitFor(() => checkMonitorRows(
            ['total:0']
        ), { timeout: ms('5s') });
        expect(mockPubSubService.unsubscribeEvents).toHaveBeenCalledTimes(eventIds.length);
    });

    test(
        'the monitor should reflect all subscriptions (event, market)',
        async () => {
            // SCENARIO

            // 1. SHOW THE LIST            -> (total:3 | [ #event_row, #event_row     , #event_row          ])
            // 2. LIST: BET (#22)          -> (total:3 | [ #event_row, #event_row|#bet, #event_row          ])
            // 3. GOTO TO DETAILS#33       -> (total:2 | [             #bet           , #event_card         ])
            // 4. DETAILS#33: BET (#33)    -> (total:2 | [             #bet           , #event_card|#bet    ])
            // 5. GO TO LIST PAGE          -> (total:3 | [ #event_row, #bet|#event_row, #bet|#event_row     ])
            // 6. HIDE THE LIST            -> (total:2 | [             #bet           , #bet                ])
            // 7. BET: REMOVE #0(#22)      -> (total:1 | [                              #bet                ])
            // 8. BET: REMOVE #1(#33)      -> (total:0 | [                                                  ])

            // 1. SHOW THE LIST (subscribe to all from #event_row)
            await user.click(await screen.findByText(/show list/));

            // prettier-ignore
            await waitFor(() => checkMonitorRows([
                'total:3',
                `${FIRST_EVENT_ID}:#event_row`,
                `${SECOND_EVENT_ID}:#event_row`,
                `${THIRD_EVENT_ID}:#event_row`
            ]));

            expect(mockPubSubService.subscribeToEvent).toHaveBeenCalledWith(mockEvents[0].id, 42);
            expect(mockPubSubService.subscribeToEvent).toHaveBeenCalledWith(mockEvents[1].id, 42);
            expect(mockPubSubService.subscribeToEvent).toHaveBeenCalledWith(mockEvents[2].id, 42);
            expect(mockPubSubService.unsubscribeEvents).not.toHaveBeenCalled();

            // resetting spies
            mockPubSubService.unsubscribeEvents.mockReset();
            mockPubSubService.subscribeToEvent.mockReset();

            // 2. LIST: BET (#22)
            // bet from list page
            // (attempt to subscribe, already subscribed so only add new ref #bet => #event_row,#bet
            await user.click(screen.getByTestId(betOnEventListPage(SECOND_EVENT_ID)));

            // prettier-ignore
            await waitFor(() => checkMonitorRows([
                'total:3',
                `${FIRST_EVENT_ID}:#event_row`,
                `${SECOND_EVENT_ID}:#event_row,#bet`,
                `${THIRD_EVENT_ID}:#event_row`
            ]));

            // already subscribed
            expect(mockPubSubService.subscribeToEvent).not.toHaveBeenCalled();
            // checking the "state" monitor

            // resetting
            mockPubSubService.unsubscribeEvents.mockReset();
            mockPubSubService.subscribeToEvent.mockReset();

            // 3. GOTO TO DETAILS#33
            // visiting details page
            // (attempt to subscribe, already subscribed so only add new ref #event_card => #event_card
            const byTestId = screen.getByTestId(eventOnListPage(THIRD_EVENT_ID));
            await user.click(byTestId);

            // and NOT subscribing - we already subscribed for #33 (from list)
            expect(mockPubSubService.subscribeToEvent).not.toHaveBeenCalled();

            // we should have 2 events to be subscribed to (22 - from bet page, 33 - from details page )
            // prettier-ignore
            await waitFor(() => checkMonitorRows([
                'total:2',
                `${SECOND_EVENT_ID}:#bet`,
                `${THIRD_EVENT_ID}:#event_card`
            ]), { timeout: ms('5s') });
            expect(mockPubSubService.unsubscribeEvents).toHaveBeenCalledWith([FIRST_EVENT_ID]);

            // reset PUB_SUB
            mockPubSubService.unsubscribeEvents.mockReset();
            mockPubSubService.subscribeToEvent.mockReset();

            // 4. DETAILS#33 -> BET (#33)
            await user.click(await screen.findByTestId(detailsPageBet(THIRD_EVENT_ID)));

            // no new subscribes
            expect(mockPubSubService.unsubscribeEvents).not.toHaveBeenCalled();
            expect(mockPubSubService.subscribeToEvent).not.toHaveBeenCalled();

            // CHECKING STATE
            // prettier-ignore
            await waitFor(() => checkMonitorRows([
                `total:2`,
                `${SECOND_EVENT_ID}:#bet`,
                `${THIRD_EVENT_ID}:#event_card,#bet`
            ]));

            // now lets move to the list
            // resetting spies
            mockPubSubService.unsubscribeEvents.mockReset();
            mockPubSubService.subscribeToEvent.mockReset();

            // 5. DETAILS#33 => LIST
            await user.click(await screen.findByText(/backTo list/));

            expect(mockPubSubService.unsubscribeEvents).not.toHaveBeenCalled();

            //subscribe back 11,22,33 - but because we already listen to 22,33 from bet "page"
            // we subscribe only 11
            expect(mockPubSubService.subscribeToEvent).toHaveBeenCalledWith(FIRST_EVENT_ID, MOCK_REVISION);

            // prettier-ignore
            await waitFor(() => checkMonitorRows([
                `total:${mockEvents.length}`,
                `${FIRST_EVENT_ID}:#event_row`,
                `${SECOND_EVENT_ID}:#bet,#event_row`,
                `${THIRD_EVENT_ID}:#bet,#event_row`
            ]), {timeout: TEST_UNSUBSCRIBE_TIMEOUT});

            mockPubSubService.unsubscribeEvents.mockReset();
            mockPubSubService.subscribeToEvent.mockReset();

            // 6. HIDE THE LIST
            await user.click(await screen.findByText(/hide list/));

            // check no $list in the monitor
            // prettier-ignore
            await waitFor(() => checkMonitorRows([
                'total:2',
                `${SECOND_EVENT_ID}:#bet`,
                `${THIRD_EVENT_ID}:#bet`
            ]), {timeout: TEST_UNSUBSCRIBE_TIMEOUT});

            expect(mockPubSubService.unsubscribeEvents).toHaveBeenCalledWith([FIRST_EVENT_ID]);
            mockPubSubService.unsubscribeEvents.mockReset();

            // 7. BET -> REMOVE #0(EVENT#22)
            await user.click(await screen.findByTestId(betPageRemove(0)));

            // check no
            // prettier-ignore
            await waitFor(() => checkMonitorRows([
                'total:1',
                `${THIRD_EVENT_ID}:#bet`
            ]),{timeout: TEST_UNSUBSCRIBE_TIMEOUT});

            expect(mockPubSubService.unsubscribeEvents).toHaveBeenCalledWith([SECOND_EVENT_ID]);
            mockPubSubService.unsubscribeEvents.mockReset();

            // 8. BET -> REMOVE #1(EVENT#33)
            await user.click(await screen.findByTestId(betPageRemove(1)));

            // prettier-ignore
            await waitFor(() => checkMonitorRows([
                'total:0'
            ]),{timeout: TEST_UNSUBSCRIBE_TIMEOUT});
            await waitFor(() => checkMonitorHasNoRecords());

            expect(mockPubSubService.unsubscribeEvents).toHaveBeenCalledWith([THIRD_EVENT_ID]);
        },
        ms('20s'),
    );
});
