import forEach from 'lodash/forEach';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import map from 'lodash/map';
import type { PropsWithChildren } from 'react';
import { useCallback, useMemo } from 'react';

import { useSubscriptions } from '@sc-data/subscriptions-storage';
import { useSubscriptionDevTool } from '@sc-devtools/hooks';

import { WebsocketNamespace } from 'src/utils/socket-io/types';
import { validRevision } from 'src/utils/socket-io/utils';

import { debugConfigs } from './debug/configs';
import { useLogger } from './debug/useLogger';
import { PubSubContext } from './hooks';
import type { ModelSubscribe } from './ModelSubscribeBridgeService';
import type { SubKey } from './subKeys';
import type { Queue } from './SubscriptionQueueService';
import { getBookkeeperInstance } from './SubscriptionQueueService';
import { buildChannels, buildKey, mergeSubscriptions, reduceSubscriptions } from './utils';

// making timestamp more readable
const TIMESTAMP_START_POINT = Date.now();

const CHANNEL_ID_INDEX = 2;
const extractIdFormChannel = (channel: string) => +channel.split(':')[CHANNEL_ID_INDEX];

export interface Props {
    cachedPubSubService?: Queue;
    subscribeTo: ModelSubscribe;
    unsubscribeFrom: ModelSubscribe;
    namespace: WebsocketNamespace;
}

export function WebsocketSubscriptionProvider({
    cachedPubSubService,
    subscribeTo,
    unsubscribeFrom,
    children,
    namespace,
}: PropsWithChildren<Props>) {
    const logger = useLogger(namespace);
    const { show_logs } = useSubscriptionDevTool();

    const pubSubService = cachedPubSubService ?? getBookkeeperInstance({ debug: show_logs });

    const { setSubscriptions } = useSubscriptions();

    const subscribe = useCallback(
        (entities: number[], subKey: SubKey, parentId?: number, revision?: number) => {
            if (isEmpty(entities)) {
                return;
            }

            logger?.receivedSubRequest(subKey, entities);

            const key = buildKey(entities, subKey);

            if (pubSubService.inQueue(key)) {
                logger?.cancelSub(key);
                pubSubService.cancel(key);

                return;
            }

            const { entityType } = debugConfigs[subKey];

            setSubscriptions((globalState) => {
                logger?.receivedSubRequest(subKey, entities);
                const state = globalState[namespace];
                const timestamp = Date.now() - TIMESTAMP_START_POINT;
                const channels = buildChannels(entities, entityType);
                const deadState = globalState[WebsocketNamespace.DEAD];
                const [id] = entities;
                const [channel] = channels;
                let nextDeadState = deadState;

                if (!validRevision(revision)) {
                    const { nextState: nextDeadState } = mergeSubscriptions(deadState, channels, subKey, timestamp);
                    logger?.info({ id, revision, subKey, message: 'missing revision while subscribing' });

                    return {
                        ...globalState,
                        [WebsocketNamespace.DEAD]: nextDeadState,
                    };
                    // revision is valid - and it's mentioned in the "dead" state - let's remove it from there
                } else if (has(deadState, channel)) {
                    logger?.info({
                        id,
                        subKey,
                        revision,
                        message: 'missed one has now proper revision',
                    });
                    const { nextState: cleanedNextDeadState } = reduceSubscriptions(
                        deadState,
                        channels,
                        subKey,
                        timestamp,
                    );
                    nextDeadState = cleanedNextDeadState;
                }

                const { diff: newEntitiesToSubscribeTo, nextState } = mergeSubscriptions(
                    state,
                    channels,
                    subKey,
                    timestamp,
                );

                const entityIds = map(newEntitiesToSubscribeTo, extractIdFormChannel);

                if (!isEmpty(entityIds)) {
                    forEach(entityIds, (id) => {
                        const msg = subscribeTo(id, entityType, parentId, revision);

                        if (!isString(msg)) {
                            return;
                        }

                        logger?.subResponse(subKey, id, msg);
                    });
                }

                return { ...globalState, [namespace]: nextState, [WebsocketNamespace.DEAD]: nextDeadState };
            });
        },
        [pubSubService, subscribeTo],
    );

    const unsubscribe = useCallback(
        (entities: number[], subKey: SubKey, revision?: number) => {
            if (isEmpty(entities)) {
                return;
            }

            if (!validRevision(revision)) {
                logger?.info({
                    id: entities[0],
                    subKey,
                    revision,
                    message: 'we did not subscribed entity with no revision',
                });

                return;
            }

            const key = buildKey(entities, subKey);
            const timestamp = Date.now() - TIMESTAMP_START_POINT;

            const queuedUnsubscribe = () => {
                const { entityType } = debugConfigs[subKey];

                setSubscriptions((globalState) => {
                    const state = globalState[namespace];
                    logger?.receivedUnsubRequest(subKey, entities);

                    const { diff: obsoleteEntitiesToUnsubscribeFrom, nextState } = reduceSubscriptions(
                        state,
                        buildChannels(entities, entityType),
                        subKey,
                        timestamp,
                    );

                    const entityIds = map(obsoleteEntitiesToUnsubscribeFrom, extractIdFormChannel);

                    if (!isEmpty(entityIds)) {
                        logger?.unsub(subKey, entityIds);

                        forEach(entityIds, (id) => unsubscribeFrom(id, entityType));
                    }

                    return { ...globalState, [namespace]: nextState };
                });
            };
            pubSubService.addToQueue(key, queuedUnsubscribe);
        },
        [pubSubService, unsubscribeFrom],
    );

    const value = useMemo(() => ({ subscribe, unsubscribe }), [subscribe, unsubscribe]);

    return <PubSubContext.Provider value={value}>{children}</PubSubContext.Provider>;
}
