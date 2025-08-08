/*eslint-disable import/first */
import dotenv from 'dotenv';
dotenv.config();
import type { Express } from 'express';

import { createResultReady } from '@solo-webapi/mobx-utils/Result';
import { createServerApp } from '@solo-webapi/realtime-server/realtime/createServerApp/createServerApp';

import { getServerHTTPPort } from './infra.server';
import { serverInit } from './server_init';
import { initExpress } from './server_prev';
import { unleashInit } from './unleash-client';

serverInit();

interface Request {
    timedout: boolean;
}

function haltOnTimedout(req: Request, _res: Response, next: () => void) {
    if (!req.timedout) {
        next();
    }
}

const runMain = async (): Promise<void> => {
    await unleashInit();
    void createServerApp({
        port: getServerHTTPPort(),
        onStartServer: async (app: Express) => {
            await initExpress(app);
            app.use(haltOnTimedout as never);
        },
        onStarted: () => {
            console.info(`Server start on port ${getServerHTTPPort()}`);
        },
        onSocketSubscribe: (path: string) => {
            return createResultReady(`Not implement ${path}`);
        },
    });
};

runMain()
    .then(() => {
        console.info('Server init');
    })
    .catch((error: unknown) => {
        console.error(error, '_CFG:FE_WEB_server');
    });
