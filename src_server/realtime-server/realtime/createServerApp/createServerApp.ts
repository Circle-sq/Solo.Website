import { createServer } from 'http';

import type { Express } from 'express';
import express from 'express';
import ms from 'ms';
import { createServer as createViteServer } from 'vite';
import { WebSocketServer } from 'ws';

import { isDevelopment } from '@solo-webapi/infra.server';
import { getTimeout } from '@solo-webapi/websocket/config';

import { createMessageHeartbeat } from '../decode';

import type { Result } from './../../../mobx-utils/Result';
import { getIpAddress } from './getIpAddress';
import { MobxSocketStore } from './MobxSocketStore';
import { PingPongManager } from './PingPongManager';

const HEARTBEAT_DEFAULT = 30000;

interface CreateParams {
    port: number;
    onStartServer: (params: Express) => void;
    onSocketSubscribe: (payload: string) => Result<unknown>;
    onStarted?: () => void;
    heartbeat?: number;
}

export const createServerApp = async (params: CreateParams) => {
    const app = express();
    params.onStartServer(app);
    const httpServer = createServer(app);

    console.warn(`CONNECTION_TIMEOUT SET TO: ${getTimeout()}`);
    httpServer.timeout = ms(getTimeout());

    if (isDevelopment()) {
        const vite = await createViteServer({
            server: {
                middlewareMode: true,
            },
        });
        app.use(vite.middlewares);
    }

    const wss = new WebSocketServer({ server: httpServer });
    const { heartbeat = HEARTBEAT_DEFAULT } = params;
    const pingPong = new PingPongManager(wss, heartbeat);
    const isInMaintenance = process.env.MAINTENANCE_PAGE?.toLowerCase?.() === 'true';

    wss.on('connection', (connection, request) => {
        const ip = getIpAddress(request);
        console.info(`Connection new(${ip})`);
        pingPong.receivedPong(connection);
        connection.send(JSON.stringify(createMessageHeartbeat(heartbeat * 2)), (err) => {
            if (err) {
                console.error(err);
            }
        });

        connection.send(JSON.stringify({ maintenance: isInMaintenance }));
        MobxSocketStore.handleConnection(params.onSocketSubscribe, connection, request, pingPong);
    });

    httpServer.listen(params.port, () => {
        if (params.onStarted) {
            params.onStarted();
        }
    });
};
