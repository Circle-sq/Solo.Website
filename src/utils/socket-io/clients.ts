import type { DisconnectDescription } from 'socket.io-client/build/esm/socket';
import type { CashOutBet } from 'src/common/types/myBet';
import buildStorageService, { storageIsAvailable } from 'src/utils/StorageService';

import { cashoutSocketOptions } from './configs';
import { EventName, SocketHostKey } from './enums';
import SocketIoClient from './SocketIoClient';
import type { SocketIoOptions, WsPayloadGeneral } from './types';
import { getSocketType, webSocketDebugLog } from './utils';

/** Connection / reconnection listeners */
const startListeners = <P>(client: SocketIoClient<P>) => {
    const wsHost = `${client.hostType} WS Host`;
    const show_socket_logs = buildStorageService<boolean>('devtools.show_socket_logs').getItem();

    client.socket.on(EventName.Connect, () => {
        if (show_socket_logs) {
            console.info(`${wsHost}: connected`);
        }

        client.authenticate({ force: true });
        client.resubscribe();
    });

    client.socket.on(EventName.Disconnect, (reason, disconnect?: DisconnectDescription) => {
        if (show_socket_logs) {
            let fullReason = reason;

            if (disconnect instanceof Error) {
                fullReason += disconnect?.message;
            } else {
                fullReason += disconnect?.description;
            }

            console.info(`${wsHost}: disconnected because : ${fullReason}`);
        }

        client.isAuthenticated = false;
    });

    client.socket.on(EventName.AuthError, () => {
        if (show_socket_logs) {
            console.info(`${wsHost}: Auth Error`);
        }

        client.isAuthenticated = false;
        client.authenticate({ force: false });
    });

    client.socket.io.on(EventName.Reconnect, (attempt) => {
        if (show_socket_logs) {
            console.info(`${wsHost} Reconnected on attempt: ${attempt}`);
        }
    });

    client.socket.io.on(EventName.ReconnectAttempt, (attempt) => {
        if (show_socket_logs) {
            console.info(`${wsHost} Reconnection Attempt: ${attempt}`);
        }

        client.authenticate({ force: true });
    });

    client.socket.io.on(EventName.ReconnectError, (error) => {
        if (show_socket_logs) {
            console.info(`${wsHost} Reconnection ${error}`);
        }
    });

    client.socket.io.on(EventName.ReconnectFailed, () => {
        if (show_socket_logs) {
            console.info(`${wsHost} Reconnection failure.`);
        }
    });
};

const getSocketIoClient = async <P>(socketHostKey: SocketHostKey, options: SocketIoOptions = {}) => {
    return new Promise<SocketIoClient<P> | null>((resolve) => {
        if (!storageIsAvailable(() => localStorage)) {
            console.warn('Storage is not available');

            return null;
        }

        const show_socket_logs = buildStorageService<boolean>('devtools.show_socket_logs').getItem();

        if (show_socket_logs) {
            webSocketDebugLog('WS client init start');
        }

        if (window.$appStateInit === undefined) {
            return null;
        }

        try {
            const socketHost = JSON.parse(window.$appStateInit)[socketHostKey] as SocketHostKey | null;

            if (socketHost === null) {
                if (show_socket_logs) {
                    console.warn('WS Host is not available');
                }

                return null;
            }

            if (show_socket_logs) {
                console.info(`${getSocketType(socketHostKey)} WS Host: ${socketHost}`);
            }
            const client = new SocketIoClient<P>(socketHost, options);

            startListeners<P>(client);

            if (options?.autoConnect === false) {
                resolve(client);
            } else {
                client.socket.on(EventName.Auth, () => resolve(client));
            }

            if (show_socket_logs) {
                webSocketDebugLog('WS client init finish');
            }
        } catch (error) {
            if (show_socket_logs) {
                webSocketDebugLog('WS client init error');
            }
            console.error(error);
        }
    });
};

export const socketIoClientGeneral = getSocketIoClient<WsPayloadGeneral>(SocketHostKey.General);

export const socketIoClientAsianViewGeneral = getSocketIoClient<WsPayloadGeneral>(SocketHostKey.General);

export const socketIoClientCashout = getSocketIoClient<CashOutBet>(SocketHostKey.Cashout, cashoutSocketOptions);
