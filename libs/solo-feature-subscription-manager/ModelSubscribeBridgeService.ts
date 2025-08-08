import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';

import { EntityType, type PubSubService } from './types';

export interface RevisionModel {
    data: {
        value: {
            revision?: number;
        };
    };
    revision?: number;
    eventId: number;
}

/**
 * @description Model Storage
 */
export interface ModelService<M = RevisionModel, E = RevisionModel> {
    getEvent: (id: number) => E | null;
    getMarket: (id: number) => M | null;
}

export type ModelSubscribe = (
    id: number,
    entityType: EntityType,
    parentId?: number,
    revision?: number,
) => void | string;

export interface SubscribeBridgeService {
    subscribeTo: ModelSubscribe;
    unsubscribeFrom: ModelSubscribe;
}

const NON_EXISTING_REVISION = -999; // <- easier to be identified when debugging ws messages

// TODO - rename to ModelSubscribeServiceFactory
// const ModelSubscribeServiceFactory = <T>(websocket: PubSubService<T>, models: ModelService<T>): SubscribeBridgeService => {
/**
 * Factory function to create a bridge between/connect the model storage and the sub/unsub service
 * @param websocket - websocket service
 * @param models - model storage
 * @constructor
 * @returns {SubscribeBridgeService}
 */
export const ModelSubscribeBridgeService = (websocket: PubSubService, models: ModelService): SubscribeBridgeService => {
    const subscribeTo = (
        id: number,
        entityType: EntityType,
        parentId?: number,
        origRevision = NON_EXISTING_REVISION,
    ) => {
        if (entityType === EntityType.Event) {
            const event = models.getEvent(id);
            const revision = event?.revision ?? get(event, 'data.value.revision', origRevision);

            if (revision < 0) {
                console.error(`Event ${id} has no version ${revision}`);
            }

            websocket.subscribeToEvent(id, revision);

            return;
        }

        if (entityType === EntityType.Market) {
            const market = models.getMarket(id);

            const eventId = parentId ?? market?.eventId;

            if (isUndefined(eventId)) {
                return `Market ${id} has no eventId`;
            }

            const revision = market?.revision ?? get(market, 'data.value.revision', origRevision);

            if (revision < 0) {
                console.error(`Market ${id} has no version ${revision}`);
            }

            websocket.subscribeToMarket(eventId, id, revision);
        }
    };

    const unsubscribeFrom = (id: number, entityType: EntityType) => {
        if (entityType === EntityType.Event) {
            websocket.unsubscribeEvents([id]);
        }

        if (entityType === EntityType.Market) {
            websocket.unsubscribeMarkets([id]);
        }
    };

    return { subscribeTo, unsubscribeFrom };
};
