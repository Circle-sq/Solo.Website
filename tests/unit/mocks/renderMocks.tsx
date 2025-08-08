import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import set from 'lodash/set';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import type { MutableSnapshot } from 'recoil';

import { SubscriptionsStorageProvider } from '@solo-data/subscriptions-storage';
import { DevToolsProvider } from '@solo-devtools/DevTools';
import {
    type ModelService,
    ModelSubscribeBridgeService,
    type RevisionModel,
} from '@solo-features/subscription-manager/ModelSubscribeBridgeService';
import type { PubSubService } from '@solo-features/subscription-manager/types';
import { WebsocketSubscriptionProvider } from '@solo-features/subscription-manager/WebsocketSubscriptionProvider';

import type { ReduxState } from 'src/appState/redux/types';
import { WebsocketNamespace } from 'src/utils/socket-io/types';

import MockAppWrapper from './MockAppWrapper';

export { renderWithTheme } from '@solo-ui/system';

export const renderWithAppWrapper = (
    ui: ReactNode,
    store?: ReduxState | Record<string, unknown>,
    options: RenderOptions = {},
    recoilState?: (mutableSnapshot: MutableSnapshot) => void,
): RenderResult => {
    const rendered = render(
        <MockAppWrapper store={store} recoilState={recoilState}>
            {ui}
        </MockAppWrapper>,
        options,
    );

    return {
        ...rendered,
        rerender: (ui) => renderWithAppWrapper(ui, store, { container: rendered.container, ...options }),
    };
};

interface WrapperProps {
    debug?: boolean;
}

export const buildSubUnsubWrapper = (wrapperOptions: WrapperProps = { debug: false }) => {
    const { debug } = wrapperOptions;
    const mockPubSubService = {
        subscribeToEvent: vi.fn(),
        unsubscribeEvents: vi.fn(),
        subscribeToMarket: vi.fn(),
    };

    const mockModelService: ModelService = {
        getEvent(id: unknown): RevisionModel | null {
            const e = { id };

            return set(e, 'data.value.revision', 42) as unknown as RevisionModel;
        },
        getMarket(id: unknown): RevisionModel | null {
            const e = { id };

            return set(e, 'data.value.revision', 42) as unknown as RevisionModel;
        },
    };
    const { subscribeTo, unsubscribeFrom } = ModelSubscribeBridgeService(
        mockPubSubService as unknown as PubSubService,
        mockModelService,
    );

    return ({ children }: PropsWithChildren): ReactElement => (
        <DevToolsProvider initState={{ show_socket_subscriptions: debug }}>
            <SubscriptionsStorageProvider>
                <WebsocketSubscriptionProvider
                    subscribeTo={subscribeTo}
                    unsubscribeFrom={unsubscribeFrom}
                    namespace={WebsocketNamespace.SB}
                >
                    {children}
                </WebsocketSubscriptionProvider>
            </SubscriptionsStorageProvider>
        </DevToolsProvider>
    );
};
