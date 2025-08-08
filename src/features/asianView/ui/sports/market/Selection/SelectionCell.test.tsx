import { waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isUndefined from 'lodash/isUndefined';
import { act, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { vi } from 'vitest';

import { SubscriptionsStorageProvider } from '@solo-data/subscriptions-storage';
import { DevToolsProvider } from '@solo-devtools/DevTools';
import MockReactQueryProvider from '@solo-tests/unit/mocks/MockReactQueryProvider';
import { renderWithTheme } from '@solo-tests/unit/mocks/renderMocks';
import { useJotaiCallback } from '@solo-utils/jotai';

import { ApiWrapper } from 'src/appState/ApiWrapper';
import type { SelectionItem } from 'src/common/types/selection';
import { selectionItemAtomFamily } from 'src/store/events/entities';
import { setEventTask } from 'src/store/events/tasks/entities';
import type { EventItem, MarketItem } from 'src/store/events/types';
import { PRICE_REFRESH_TIMEOUT } from 'src/utils/hooks/usePriceChange';
import { WsMessageType } from 'src/utils/socket-io/enums';

import { mockMarket, mockSelection } from '../__fixtures__/mockData';
import { buildPrice } from '../__tests__/helper';
import Market from '../Market';
import OddsArrow from '../Selection/SelectionOdds/OddsArrow';
import { S_OddsValue, S_ValueWithRangeCell } from '../Selection/styled';
import { formatDecimals } from '../utils';

vi.mock('@solo-asianView/icons/RedArrowUpIcon', () => ({ default: () => ' ↑' }));
vi.mock('@solo-asianView/icons/BlueArrowDownIcon', () => ({ default: () => ' ↓' }));
vi.mock('@solo-asianView/icons/LockIcon', () => ({ default: () => '🔒' }));

const MOCK_EVENT_ID = 42;

vi.mock('src/features/asianView/ui/sports/market/styled', async () => {
    const originalModule: Record<string, string> = await vi.importActual(
        'src/features/asianView/ui/sports/market/styled',
    );

    return {
        ...originalModule,
        S_NoMarketPlaceholder: () => (
            <span role='img' aria-label='hidden-market'>
                🙈
            </span>
        ),
    };
});
vi.mock('src/features/asianView/ui/sports/market/MarketSelections', () => {
    return {
        default: (_props: { marketId: number; eventId: number }) => {
            return <MockSelectionCell selectionId={mockSelection.id} index={0} />;
        },
    };
});

vi.mock('src/appState/AppState', () => {
    return {
        __esModule: true,
        useAppStateContext: () => ({
            apiWrapper: new ApiWrapper(),
        }),
        default: vi.fn(),
    };
});

type Listeners = unknown[];
const auditory: Record<string, Listeners> = {};

vi.mock('src/utils/socket-io/clients', () => {
    return {
        socketIoClientGeneral: Promise.resolve({
            socket: {
                nsSubscribe: vi.fn().mockImplementation((cb, { channel }) => {
                    const parts = channel.split(':');
                    const channelType = parts.slice(0, -1).join(':');

                    if (isEmpty(auditory[channelType])) {
                        auditory[channelType] = [];
                    }

                    return auditory[channelType].push(cb);
                }),
            },
            // TODO add unsubscribe?
        }),
    };
});

interface RecoilDataProps {
    event: EventItem;
    // selections: SelectionItem[];
}

const AddToRecoilState = ({ event }: RecoilDataProps) => {
    const onSuccess = useJotaiCallback(
        (i) => (e: EventItem) => {
            setEventTask(i)(e);
        },
        [],
    );

    useEffect(() => {
        onSuccess(event);
    }, [event, onSuccess]);

    return null;
};

// very simplified actual GetSelection
const MockSelectionCell = ({ selectionId }: { selectionId: number; index: number }) => {
    const selection = useAtomValue(selectionItemAtomFamily(selectionId));
    const price = selection?.price;
    const onClick = () => console.info(price);
    const displayPrice = !isUndefined(price?.d) ? formatDecimals(price?.d) : ''; // dealing with possible null recoil value

    return (
        <S_ValueWithRangeCell>
            <S_OddsValue onClick={onClick}>{displayPrice}</S_OddsValue>
            <OddsArrow decimalPrice={price?.d} />
        </S_ValueWithRangeCell>
    );
};

const MockApp = ({ event }: RecoilDataProps) => {
    return (
        <RecoilRoot>
            <AddToRecoilState event={event} />
            <MockReactQueryProvider>
                <DevToolsProvider>
                    <SubscriptionsStorageProvider>
                        <Market marketId={40611} eventId={MOCK_EVENT_ID} />
                    </SubscriptionsStorageProvider>
                </DevToolsProvider>
            </MockReactQueryProvider>
        </RecoilRoot>
    );
};

describe('AsianView > build price test helper ', () => {
    it('should return correct (mimic) for selection Price object', () => {
        expect(buildPrice(1.09)).toEqual({ d: 1.09, f: '9/100' });
        expect(buildPrice(6)).toEqual({ d: 6.0, f: '5/1' });
        expect(buildPrice(1.71)).toEqual({ d: 1.71, f: '71/100' });
    });
});

const sendMessage = (message: unknown, channel: string) => {
    act(() => {
        const listeners = auditory[channel];
        const callbacks = filter(listeners, isFunction);

        forEach(callbacks, (cb) => {
            cb(message);
        });
    });
};

const sendMarketMessage = (message: unknown) => {
    sendMessage(message, '*:Market');
};

const sendEventMessage = (message: unknown) => {
    sendMessage(message, '*:Event');
};

const buildMessage = (odd: number) => {
    const price = buildPrice(odd);

    return {
        body: {
            id: 40611,
            selections: [
                {
                    ...mockSelection,

                    oldPrice: mockSelection.price,
                    price: price,
                },
            ],
        },
        header: { type: WsMessageType.SelectionPriceChange },
    };
};

const buildMarketStatusUpdateMessage = (partialBody: { active: boolean; display: boolean }) => {
    const MOCK_TEMPLATE_ID = 123;

    return {
        body: { market: { id: 40611 }, template: { id: MOCK_TEMPLATE_ID }, ...partialBody },
        header: { type: WsMessageType.MarketStatusUpdate },
    };
};

const mockSelections = [{ ...mockSelection, price: buildPrice(2.0) }] as unknown as SelectionItem[];
const mockMarkets = [{ ...mockMarket, selections: mockSelections }] as unknown as MarketItem[];
const mockEvent = { markets: mockMarkets, active: true, display: true } as unknown as EventItem;

describe.skip('AsianView > Market/Selection', () => {
    afterEach(() => {
        vi.useRealTimers();
    });
    it('should show price change, market lock, hide', async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
        const { container: cell, getByRole } = renderWithTheme(<MockApp event={mockEvent} />);

        await waitFor(() => expect(cell).toHaveTextContent(/^2\.00$/));

        sendMarketMessage(buildMessage(4.0));

        await waitFor(() => expect(cell).toHaveTextContent('4.00 ↑'));

        await act(() => vi.advanceTimersByTime(PRICE_REFRESH_TIMEOUT));
        await waitFor(() => expect(cell).toHaveTextContent(/^4\.00$/));

        sendMarketMessage(buildMessage(3.0));

        await waitFor(() => expect(cell).toHaveTextContent('3.00 ↓'));

        await act(() => vi.advanceTimersByTime(PRICE_REFRESH_TIMEOUT));

        await waitFor(() => expect(cell).toHaveTextContent(/^3\.00$/));

        // UC#1 test active : false, display: true - should show lock
        // message sent via Market channel
        sendMarketMessage(buildMarketStatusUpdateMessage({ active: false, display: true }));
        await waitFor(() => expect(cell).toHaveTextContent('🔒'));

        // UC#2 test active : false, display: false - should hide
        // message sent via Market channel
        sendMarketMessage(buildMarketStatusUpdateMessage({ active: false, display: false }));
        await waitFor(() => expect(getByRole('img', { name: 'hidden-market' })).toHaveTextContent('🙈'));

        // UC#3 test active : true, display: false - should hide
        // message sent via Market channel
        sendMarketMessage(buildMarketStatusUpdateMessage({ active: true, display: false }));
        await waitFor(() => expect(getByRole('img', { name: 'hidden-market' })).toHaveTextContent('🙈'));

        // UC#4  test active : true, display: true - should show
        // message sent via Event channel
        sendEventMessage(buildMarketStatusUpdateMessage({ active: true, display: true }));
        await waitFor(() => expect(cell).toHaveTextContent(/^3\.00$/));
    });
});
