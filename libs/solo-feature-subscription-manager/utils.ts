import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import reduce from 'lodash/reduce';

import type { SubKey } from './subKeys';
import type { EntityType, PubSubState } from './types';

export function filterObsoleteChannels(state: PubSubState, channels: string[]): string[] {
    return filter(channels, (channel: string) => isEmpty(state[channel]));
}

export function omitChannels(state: PubSubState, channels: string[], subKey: SubKey, timestamp: number): PubSubState {
    return reduce(
        channels,
        (acc: PubSubState, channel: string) => {
            if (isEmpty(acc[channel])) {
                return acc;
            }

            const reducedListOfSubscribers = omitBy(
                acc[channel],
                (aTimestamp: number, aChannel: string) => subKey === aChannel && aTimestamp < timestamp,
            );

            if (isEmpty(reducedListOfSubscribers)) {
                return omit(acc, channel);
            }

            acc[channel] = reducedListOfSubscribers;

            return acc;
        },
        { ...state },
    );
}

export function omitEvents(state: PubSubState, channels: string[], subKey: SubKey, timestamp: number): PubSubState {
    return omitChannels(state, channels, subKey, timestamp);
}

export function filterNewChannels(state: PubSubState, channels: string[]): string[] {
    return filter(channels, (channel: string) => isEmpty(state[channel]));
}

interface SubscriptionOperationResult {
    nextState: PubSubState;
    diff: string[];
}

export function mergeSubscriptions(
    state: PubSubState,
    channels: string[],
    subKey: SubKey,
    timestamp = Date.now(),
): SubscriptionOperationResult {
    const diff = filterNewChannels(state, channels);
    const newStateAddon = reduce(
        channels,
        (acc: PubSubState, channel) => {
            acc[channel] = { [subKey]: timestamp };

            return acc;
        },
        {},
    );

    return { nextState: merge({}, state, newStateAddon), diff };
}

export function reduceSubscriptions(
    state: PubSubState,
    channels: string[],
    subKey: SubKey,
    timestamp = Date.now(),
): SubscriptionOperationResult {
    const nextState = omitEvents(state, channels, subKey, timestamp);
    const diff = filterObsoleteChannels(nextState, channels);

    return { nextState, diff };
}

export const buildKey = (items: number[], subKey: SubKey): string => `${subKey}:${items.join(',')}`;

export const buildChannel = (entityId: number, entityType: EntityType) => `*:${entityType}:${entityId}`;

export const buildChannels = (entities: number[], entityType: EntityType): string[] =>
    map(entities, (entityId) => buildChannel(entityId, entityType));
