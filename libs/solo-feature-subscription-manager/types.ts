import type { DebugColor } from './debug/configs';
import type { SubKey } from './subKeys';
export interface PubSubService {
    subscribeToEvent: (eventId: number, revision: number) => void;
    subscribeToMarket: (eventId: number, marketId: number, revision: number) => void;
    unsubscribeEvents: (eventIds: number[]) => void;
    unsubscribeMarkets: (marketIds: number[]) => void;
}

export interface PubSubState {
    [key: string]: Record<string, number>;
}

export interface SubscribeConfig {
    align?: DebugElementAlignment;
    color: DebugColor;
    entityType: EntityType;
}

export type DebugElementAlignment = 'left' | 'right' | 'inline-left';

export enum EntityType {
    Event = 'Event',
    Market = 'Market',
}

export interface PubSubContextType {
    subscribe: (entities: number[], subKey: SubKey, parentId?: number, revision?: number) => void;
    unsubscribe: (entities: number[], subKey: SubKey, revision?: number) => void;
}
