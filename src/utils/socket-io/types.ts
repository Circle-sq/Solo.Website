import type { EventsMap } from '@socket.io/component-emitter';
import type { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

import type { PlacedBet } from '@solo-betslip/api/types/placedBet';
import type { ReferredBet } from '@solo-betslip/api/types/referredBet';

import type { OfferStatus, OfferUser } from 'src/common/enums';

import type { AuthStatus, EventName, WsMessageType } from './enums';

export type SocketIo<P = Record<string, never>> = Socket<SocketEvents<P> & EventsMap> &
    SocketEvents<P> & {
        connected: boolean;
        on: (channel: string, callback: Callback<string>) => void;
        emit: Emit;
        removeAllListeners: (channel?: string) => void;
    };

export type SocketIoClientClass<P> = SocketEvents<P> & {
    socket: SocketIo<P>;
};

export const enum WebsocketNamespace {
    AV = 'AV',
    SB = 'SB',
    DEAD = 'DEAD',
}

export interface SocketEvents<P> {
    subscribe: (channel: string, callback: Callback<P>, version?: number) => void;
    subscribeAll: () => void;
    unsubscribe: (channel: string) => void;
    nsSubscribe: (
        callback: Callback<P>,
        options: { channel: string; namespace: WebsocketNamespace; version: number },
    ) => void;
    nsUnsubscribe: (options: { channel: string; namespace: WebsocketNamespace }) => void;
    unsubscribeAll: () => void;
}

export type SocketIoOptions = Partial<ManagerOptions & SocketOptions>;

export type Emit = (eventName: EventName, channel: string, response?: Callback<AuthResponse>) => void;

export interface AuthResponse {
    status: AuthStatus;
    error?: string;
}

export type Callback<P> = (payload: P) => void;

export interface Subscriptions<P> {
    [channel: string]: Callback<P>;
}

// TODO Add correct interface for body generic
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface WsPayloadGeneral<T = Record<string, any>> {
    header: WsHeader;
    body: T;
    updated?: WSUpdate;
}

export interface WsAccountBetPayload<T> {
    header: WsHeader<OfferStatus>;
    body: WsBody<T>;
}

export interface WsBody<T> {
    bet: T;
}

export interface WsReferredBetPayload {
    header: WsHeader<OfferStatus>;
    body: WsReferredBetBody;
}

export interface WsReferredBetBody {
    bets: PlacedBet[];
    referredBetslip: WsReferredBetslip;
}

export interface WsReferredBetslip {
    account: WsReferredAccount;
    assignee: WsReferredAccount | null;
    bets: ReferredBet[];
    createdAt: string;
    expiresAt: string | null;
}

export interface WsHeader<T = WsMessageType> {
    id: string;
    type: T;
    who: HeaderWho;
    when: string;
}

export interface WSUpdate {
    updatedAt: string;
    revision: number;
}

export interface HeaderWho {
    name: string;
    type: OfferUser;
}

export interface WsReferredAccount {
    id: number;
    platformId: string;
    type: string;
    name: string;
    brandId: null;
    externalId: null;
}
