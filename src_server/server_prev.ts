import fs from 'fs';
import * as path from 'path';

import * as apiConsole from '@solo/solo-frontend-api/src/lib/console';
import compression from 'compression';
import dotenv from 'dotenv';
import * as express from 'express';
import helmet from 'helmet';
import ms from 'ms';

import { PlatformApi } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';
import type { ConfigJsonAccess } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';
import { PlatformApiTokenManager } from '@solo-webapi/realtime-server/PlatformApi/PlatformApiTokenManager';
import { TokenManager } from '@solo-webapi/realtime-server/PlatformApi/TokenManager/TokenManager';

import { ConfigServer } from './ConfigServer';
import { handlerDynamicContent } from './handlers/handlerDynamicContent/handlerDynamicContent';
import { handlerInitApi } from './handlers/handlerInitApi';
import { handlerRobotsSiteMap } from './handlers/handlerRobotsSiteMap/handlerRobotsSiteMap';
import './handlers/memory-leak-investigation-tool';
import { isProduction } from './infra.server';
import { getMaintenance } from './maintenance';
dotenv.config();

apiConsole.hook('solo-website');

interface InitConfigType {
    configJsonAccess: ConfigJsonAccess;
    configServer: ConfigServer;
}

const SERVICE_UNAVAILABLE = 503;
const OK = 200;

process.on('unhandledRejection', (error) => {
    console.error('unhandledRejection', error, '_CFG:FE_WEB_server_prev');
});

const getPathConfig = (): string => {
    const PATH_SERVER = path.dirname(process.argv[1]);

    return path.join(PATH_SERVER, '../../config.json');
};

const getPlatformApi = async (API_URL: string, PATH_CONFIG: string): Promise<ConfigJsonAccess> => {
    const platformApiMap = await PlatformApi.fromConfigJson(API_URL, PATH_CONFIG);

    const apiValues = Array.from(platformApiMap.values());

    const firstApi = apiValues[0];

    if (firstApi && apiValues.length === 1) {
        return firstApi;
    }

    throw Error(
        `Incorrect configuration (config.json), one key expected with configuration (received ${apiValues.length})`,
    );
};

const initConfigObject = async (): Promise<InitConfigType> => {
    const PATH_CONFIG = getPathConfig();
    const API_USERNAME = ConfigServer.API_USERNAME;
    const API_PASSWORD = ConfigServer.API_PASSWORD;

    if (API_USERNAME !== null && API_PASSWORD !== null) {
        const tokenManager = new TokenManager({
            host: ConfigServer.API_URL(),
            user: API_USERNAME,
            pass: API_PASSWORD,
            universe: ConfigServer.universe,
        });

        const platformApiTokenManager = new PlatformApiTokenManager(tokenManager);
        const platformApi = new PlatformApi(platformApiTokenManager);
        const config = ConfigServer.getConfig(platformApi, API_USERNAME, API_PASSWORD);

        const configJsonAccess = {
            username: API_USERNAME,
            password: API_PASSWORD,
            api: platformApi,
        };

        return {
            configJsonAccess: configJsonAccess,
            configServer: config,
        };
    }

    const configJsonAccess = await getPlatformApi(ConfigServer.API_URL(), PATH_CONFIG);
    const config = ConfigServer.getConfig(configJsonAccess.api, configJsonAccess.username, configJsonAccess.password);

    return {
        configJsonAccess: configJsonAccess,
        configServer: config,
    };
};

const configureInNormalMode = async (
    PATH_SERVER: string,
    PATH_CONFIG: string,
    initConfigType: InitConfigType,
    app: express.Express,
) => {
    app.use(compression());
    const PATH_STATIC = path.join(PATH_SERVER, '../client/static');
    const PATH_META_BUILD = path.join(PATH_SERVER, '../meta-build.json');

    const { configJsonAccess, configServer: config } = initConfigType;

    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginOpenerPolicy: false,
        }),
    );

    handlerInitApi(config, app, PATH_META_BUILD, PATH_CONFIG);

    handlerRobotsSiteMap(app);

    app.use(
        '/static',
        express.static(PATH_STATIC, {
            maxAge: ms('1y'),
        }),
    );

    // TODO: Verify if the apis are needed, if so please move them in front-end-api and not call directly BE
    // initApiWebMain(config, app);

    await handlerDynamicContent(config, configJsonAccess.api, app);
};

const configureMaintanancePage = async (app: express.Express) => {
    if (!isProduction()) {
        const htmlString = await getMaintenance();
        const pathForIndex = path.join(`${process.cwd()}/index.html`);

        try {
            fs.writeFileSync(pathForIndex, htmlString);
        } catch (error) {
            console.error("can't save index.html with maintenance, error:", error);
        }
    } else {
        app.use((req, res) => {
            void (async () => {
                if (['GET', 'POST', 'HEAD'].indexOf(req.method) !== -1) {
                    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                    res.setHeader('Pragma', 'no-cache');
                    res.setHeader('Expires', '0');

                    if (
                        !req.path.includes('/api/meta/build') &&
                        (req.path.includes('/api') || req.path.includes('/static'))
                    ) {
                        return res.status(SERVICE_UNAVAILABLE).end();
                    }

                    res.status(OK).send(await getMaintenance());
                }
            })();
        });
    }
};

// const configureHeadersNoIndex = (app: express.Express) => {
//     app.use((_req: express.Request, res: express.Response, next: () => void) => {
//         res.setHeader('X-Robots-Tag', ['noindex', 'nofollow']);
//         next();
//     });
// }

export const initExpress = async (app: express.Express) => {
    const PATH_SERVER = path.dirname(process.argv[1]);
    const PATH_CONFIG = getPathConfig();
    const initConfig = await initConfigObject();

    if (ConfigServer.MAINTENANCE_PAGE) {
        await configureMaintanancePage(app);
    } else {
        await configureInNormalMode(PATH_SERVER, PATH_CONFIG, initConfig, app);
    }
};
