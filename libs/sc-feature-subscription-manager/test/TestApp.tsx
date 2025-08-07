import set from 'lodash/set';
import type { PropsWithChildren } from 'react';

import { SubscriptionsStorageProvider } from '@sc-data/subscriptions-storage';
import { DevToolsProvider } from '@sc-devtools/DevTools';
import { WebsocketSubscriptionsInspector } from '@sc-devtools/WebsocketSubscriptionsInspector';

import { WebsocketNamespace } from 'src/utils/socket-io/types';

import type { ModelService, RevisionModel } from '../ModelSubscribeBridgeService';
import { ModelSubscribeBridgeService } from '../ModelSubscribeBridgeService';
import { getBookkeeperInstance } from '../SubscriptionQueueService';
import type { PubSubService } from '../types';
import { WebsocketSubscriptionProvider } from '../WebsocketSubscriptionProvider';

const mockPubSubService: PubSubService = {
    subscribeToMarket: (eventId: number, marketId: number, revision?: number) => {
        console.info('subscribeToEvent', eventId, revision);
    },
    subscribeToEvent: (eventId: number, revision?: number) => {
        console.info('subscribeToEvent', eventId, revision);
    },
    unsubscribeEvents: (eventIds: number[]) => {
        console.info('unsubscribeToEvent', eventIds);
    },
    unsubscribeMarkets: (marketIds: number[]) => {
        console.info('unsubscribeMarkets', marketIds);
    },
};

const mockModelService: ModelService = {
    getEvent: (id: number) => {
        const mockEvent = { id };

        return set(mockEvent, 'data.value.revision', -1) as unknown as RevisionModel;
    },
    getMarket: (id: number) => {
        const mockEvent = { id };

        return set(mockEvent, 'data.value.revision', -1) as unknown as RevisionModel;
    },
};

const TestApp = ({ children, timeout }: PropsWithChildren<{ timeout: number }>) => {
    const cachedPubSubService = getBookkeeperInstance({ timeout });

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
                    <ol>
                        <li>UseCase #1 - navigate + bet</li>
                        <li>show list 1</li>
                        <li>list: bet on #22</li>
                        <li>open details on #33</li>
                        <li>details: bet #33</li>
                        <li>switch list</li>
                        <li>hide the list</li>
                        <li>remove bet (#22)</li>
                        <li>remove bet (#33)</li>
                    </ol>

                    <table width='100%'>
                        <tbody>
                            <tr>
                                <td>{children}</td>
                                <td></td>
                                <td>
                                    <WebsocketSubscriptionsInspector inline={true} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <hr />
                </WebsocketSubscriptionProvider>
            </SubscriptionsStorageProvider>
        </DevToolsProvider>
    );
};

export default TestApp;
