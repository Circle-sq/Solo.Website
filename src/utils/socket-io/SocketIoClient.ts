import forEach from 'lodash/forEach';
import get from 'lodash/get';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import set from 'lodash/set';
import split from 'lodash/split';
import unset from 'lodash/unset';
import ms from 'ms';
import { io } from 'socket.io-client';

import buildStorageService, { type ValueStorage, getStorageBuilder } from 'src/utils/StorageService';

import { STORAGE_KEYS } from '../constants';

import { defaultSocketOptions } from './configs';
import type { SocketHostKey, SocketHostType } from './enums';
import { AuthStatus, EventName } from './enums';
import type { AuthResponse, Callback, SocketIo, SocketIoClientClass, SocketIoOptions, Subscriptions } from './types';
import { getSocketType, webSocketDebugLog } from './utils';

const VALID_TOKEN_PARTS_COUNT = 3;

type ChannelName = string;
type Revision = number;
type Revisions = Record<string, Revision>;

class SocketIoClient<P> implements SocketIoClientClass<P> {
    hostType: SocketHostType;
    isAuthenticated = false;

    readonly socket: SocketIo<P>;
    readonly show_debug_logs: boolean | null = null;
    private tokenStorage: ValueStorage<string> | null = null;
    private currentToken: string | null = null;
    private subscriptions: Subscriptions<P> = {};

    // unsubscriptions holds callbacks
    // {
    //   "SB" : {
    //      "*:Event:666666": cb1,
    //      ...,
    //      "*:Market:88888888": cb2
    //   }
    // }
    private unsubscriptions: Subscriptions<P> = {};

    // Listeners holds info about channel revision;
    // store here records of subscription by namespace (SB - sportsbook)
    // {     revision -----------.
    //                           v
    //   "*:Event:666666": { SB: 10 },
    //   ...,
    // }
    private listeners: Record<ChannelName, Revisions> = {};
    private retryCount = 0;

    constructor(socketHost: SocketHostKey, options: SocketIoOptions = {}) {
        this.show_debug_logs = buildStorageService<boolean>('devtools.show_socket_logs').getItem();
        this.socket = io(socketHost, { ...defaultSocketOptions, ...options }) as SocketIo<P>;

        this.socket.subscribe = this.subscribe;
        this.socket.nsSubscribe = this.nsSubscribe;
        this.socket.nsUnsubscribe = this.nsUnsubscribe;
        this.socket.subscribeAll = this.subscribeAll;
        this.socket.unsubscribe = this.unsubscribe;
        this.socket.unsubscribeAll = this.unsubscribeAll;

        this.hostType = getSocketType(socketHost);
    }

    resubscribe() {
        this.nsResubscribeAll();
    }

    /**
     * Namespaced resubscribe (existing are SB (sportsbook, we had AV - asian view)
     */
    nsResubscribeAll = () => {
        if (this.show_debug_logs) {
            webSocketDebugLog('Resubscribing to all namespace channels...');
        }

        forEach(this.unsubscriptions, (channels, namespace) => {
            forEach(channels, (callback, channel) => {
                const version = get(this.listeners[channel], namespace);
                this.reSubscribeChannel(channel, callback, version);
            });
        });
    };

    reSubscribeChannel = (channel: string, callback: Callback<string>, version: Revision) => {
        const eventChannel = `${channel}|${version}`;
        this.socket.emit(EventName.Subscribe, eventChannel);
        this.socket.on(channel, callback);
    };

    nsSubscribe = (callback: Callback<P>, options: { channel: string; version: Revision; namespace: string }) => {
        const { channel, version, namespace } = options;
        const absPath = `${namespace}.${channel}`;
        const listener = `${channel}.${namespace}`;

        if (this.show_debug_logs) {
            webSocketDebugLog(`subscribing to ${absPath}`);
        }

        if (has(this.unsubscriptions, absPath)) {
            if (this.show_debug_logs) {
                webSocketDebugLog(`%cWSA: Already subscribed to ${absPath}`);
            }

            return;
        }

        const unsubscribeCallback = this.subscribeChannel(channel, callback, version);
        set(this.unsubscriptions, absPath, unsubscribeCallback);
        set(this.listeners, listener, version);

        if (this.show_debug_logs) {
            webSocketDebugLog(`listeners:`, this.listeners);
        }
    };

    nsUnsubscribe = (options: { channel: string; namespace: string }) => {
        const { channel, namespace } = options;
        const absPath = `${namespace}.${channel}`;
        const listener = `${channel}.${namespace}`;

        if (!has(this.unsubscriptions, absPath)) {
            if (this.show_debug_logs) {
                webSocketDebugLog(`Not subscribed to ${absPath}`);
            }

            return;
        }

        if (this.show_debug_logs) {
            webSocketDebugLog(`removing listener  ${absPath}`);
        }

        const unsubscribeCallback = get(this.unsubscriptions, absPath);
        this.socket.removeListener(channel, unsubscribeCallback);

        unset(this.unsubscriptions, absPath);
        unset(this.listeners, listener);

        if (this.show_debug_logs) {
            webSocketDebugLog(`has listeners for ${channel} ?`, this.has(channel));
        }

        if (isEmpty(this.listeners[channel])) {
            if (this.show_debug_logs) {
                webSocketDebugLog(`unsubscribing? yes please, from ${absPath}`);
            }
            this.socket.removeAllListeners(channel);
            this.socket.emit(EventName.Unsubscribe, channel);

            return;
        }

        if (this.show_debug_logs) {
            webSocketDebugLog(`unsubscribing? NOT YET, ${absPath}`, this.listeners[channel]);
        }
    };

    subscribeChannel = (channel: string, callback: Callback<P>, version?: number) => {
        const eventChannel = version !== undefined ? `${channel}|${version}` : channel;
        this.socket.emit(EventName.Subscribe, eventChannel);

        const callBack = (payload: string) => {
            callback(JSON.parse(payload));
        };

        this.socket.on(channel, callBack);

        return callBack;
    };

    subscribe = (channel: string, callback: Callback<P>, version?: number) => {
        if (!this.has(channel)) {
            set(this.subscriptions, channel, callback);

            this.subscribeChannel(channel, callback, version);
        }
    };

    subscribeAll = () => {
        for (const channel of Object.keys(this.subscriptions)) {
            this.socket.removeAllListeners(channel);
            this.subscribeChannel(channel, this.subscriptions[channel]);
        }
    };

    unsubscribe = (channel: string) => {
        if (this.has(channel)) {
            unset(this.subscriptions, channel);

            this.socket.removeAllListeners(channel);
            this.socket.emit(EventName.Unsubscribe, channel);
        }
    };

    unsubscribeAll = () => {
        for (const channel of Object.keys(this.subscriptions)) {
            this.unsubscribe(channel);
        }
    };

    retryAuthenticate = (props: { force?: boolean }) => {
        this.retryCount += 1;

        if (this.show_debug_logs) {
            webSocketDebugLog(`auth retry #${this.retryCount}`);
        }

        setTimeout(() => this.authenticate(props), ms('1s'));
    };

    authenticate = (args: { force?: boolean } = {}) => {
        const { force } = args;

        if (this.show_debug_logs) {
            webSocketDebugLog('authenticating');
        }

        const token = this.getToken();

        if (isNull(token) || isEmpty(token)) {
            if (this.show_debug_logs) {
                webSocketDebugLog('no token found, retrying in 1s');
            }

            this.retryAuthenticate(args);

            return;
        }

        const wellFormatted = split(token, '.').length === VALID_TOKEN_PARTS_COUNT;

        if (!wellFormatted) {
            console.info('%cWSA: Invalid token format, removed', 'color:orange', token);
            this.tokenStorage?.removeItem();

            return;
        }

        const emitAuth = force || !this.isAuthenticated || (this.isAuthenticated && token !== this.currentToken);

        if (emitAuth) {
            this.socket.emit(EventName.Auth, token, (resp: AuthResponse) => {
                if (this.show_debug_logs) {
                    webSocketDebugLog('auth success, token set, proceeding to auth');
                }

                this.authHandler(token, resp);
            });
        }
    };

    getToken = (): string | null => {
        if (this.tokenStorage === null) {
            this.tokenStorage = getStorageBuilder()(STORAGE_KEYS.token);
        }

        return this.tokenStorage.getItem();
    };

    authHandler = (token: string, response: AuthResponse) => {
        const { status, error } = response;

        console.info('%cWSA:', 'color: pink', response);

        // fallback for malformed token
        if (error === 'jwt malformed') {
            this.tokenStorage?.removeItem();

            return;
        }

        if (status === AuthStatus.Ok) {
            this.isAuthenticated = true;
            this.currentToken = token;

            this.subscribeAll();

            return;
        }

        if (status === AuthStatus.Error) {
            this.authenticate({ force: false });
        }
    };

    has = (channel: string): boolean => {
        return this.socket.hasListeners(channel);
    };
}

export default SocketIoClient;
