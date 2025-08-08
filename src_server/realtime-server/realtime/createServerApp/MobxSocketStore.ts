import type { IncomingMessage } from 'http';

import { autorun } from 'mobx';
import { createPatch } from 'rfc6902';
import type ws from 'ws';

import type { Result } from '@solo-webapi/mobx-utils/Result';

import type { MessageSubscriptionsType } from '../decode';
import { createMessageUpdateFull, createMessageUpdateDiff, decodeMessageFromClient } from '../decode';

import { getIpAddress } from './getIpAddress';
import type { PingPongManager } from './PingPongManager';

const logMessage = (ip: string, _path: string, message: string) => {
    console.info(`Resource ${ip} -> ${message}`);
};

const sendToConnection = (ip: string, path: string, connection: ws, mode: 'full' | 'diff', messageToSend: string) => {
    logMessage(ip, path, `send message: ${mode} (${messageToSend.length})`);
    connection.send(messageToSend, (err) => {
        console.error(err);
    });
};

const sendValueToSocket = (ip: string, path: string, prevValue: unknown, value: unknown, connection: ws) => {
    if (prevValue === null) {
        sendToConnection(ip, path, connection, 'full', JSON.stringify(createMessageUpdateFull(path, value)));

        return;
    }

    const diff = createPatch(prevValue, value);

    if (diff.length === 0) {
        return;
    }

    const fullMessage = JSON.stringify(createMessageUpdateFull(path, value));
    const diffMessage = JSON.stringify(createMessageUpdateDiff(path, value));

    if (fullMessage.length > diffMessage.length) {
        sendToConnection(ip, path, connection, 'diff', diffMessage);
    } else {
        sendToConnection(ip, path, connection, 'full', fullMessage);
    }
};

export class MobxSocketStore {
    private readonly initPath: (path: string) => () => void;
    private readonly data: Map<string, () => void>;

    constructor(initPath: (path: string) => () => void) {
        this.initPath = initPath;
        this.data = new Map();
    }

    private updateSubscribtion(updateData: MessageSubscriptionsType) {
        for (const updateItem of updateData.data) {
            const { path, active } = updateItem;

            if (active === true) {
                const oldDispose = this.data.get(path);
                this.data.set(path, this.initPath(path));

                if (oldDispose) {
                    oldDispose();
                    console.error(`The resource is already initiated -> ${path}`);
                }
            } else {
                const dispose = this.data.get(path);

                if (dispose) {
                    this.data.delete(path);
                    dispose();
                } else {
                    console.error(`The resource is unmounted -> ${path}`);
                }
            }
        }
    }

    disconnect() {
        for (const dispose of this.data.values()) {
            dispose();
        }

        this.data.clear();
    }

    static handleConnection(
        onSocketSubscribe: (path: string) => Result<unknown>,
        connection: ws,
        request: IncomingMessage,
        pingPong: PingPongManager,
    ) {
        const ip = getIpAddress(request);

        const initPath = (path: string) => {
            logMessage(ip, path, 'subscribe');

            let prevValue: unknown = null;

            const unsubscribe = autorun(() => {
                const result = onSocketSubscribe(path);

                if (result.type === 'ready') {
                    const value = result.value;
                    sendValueToSocket(ip, path, prevValue, value, connection);
                    prevValue = value;
                }
            });

            return () => {
                logMessage(ip, path, 'unsubscribe');
                unsubscribe();
            };
        };

        const store = new MobxSocketStore(initPath);

        connection.on('message', (data) => {
            if (typeof data !== 'string') {
                console.error('onMessage - Ignore', data);

                return;
            }

            const jsonData = JSON.parse(data);
            const dataDecode = decodeMessageFromClient(jsonData);

            if (dataDecode instanceof Error) {
                console.error(dataDecode);

                return;
            }

            if (dataDecode.type === 'pong') {
                pingPong.receivedPong(connection);

                return;
            }

            if (dataDecode.type === 'subscriptions') {
                store.updateSubscribtion(dataDecode);

                return;
            }

            console.error('Message type not supported');
            console.error(dataDecode);
        });

        connection.on('close', function () {
            console.info(`Connection close (${ip})`);
            store.disconnect();
        });

        connection.on('error', (event) => {
            console.error(event);
            store.disconnect();
            connection.terminate();
        });
    }
}
