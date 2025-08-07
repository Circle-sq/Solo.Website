import type { Application, Request, Response } from 'express';
import { Router } from 'express';

import type { ConfigServer } from '@sc-webapi/ConfigServer';
import { PlatformIdTypes, Endpoints } from '@sc-webapi/enums';
import {
    portalBodyParser,
    setContentSecurityPolicy,
} from '@sc-webapi/handlers/handlerDynamicContent/portal-body-parser';
import type { PlatformApi } from '@sc-webapi/realtime-server/PlatformApi/PlatformApi';

type LoginEndpointBuilder = (platformId: PlatformIdTypes) => ExpressRenderHandler;
type ExpressRenderHandler = (req: Request, res: Response) => void;

export const assignAppEndpoints = (
    app: Application,
    env: NodeJS.ProcessEnv,
    endpointRenderBuilder: LoginEndpointBuilder,
    platformApi: PlatformApi,
    config: ConfigServer,
): void => {
    const endpointsRouter = Router();
    const loginMiddlewares = [portalBodyParser, setContentSecurityPolicy(platformApi, config, env.PORTAL_HOST)];

    endpointsRouter.use(Endpoints.xyzLogin, loginMiddlewares, endpointRenderBuilder(PlatformIdTypes.Xyz));
    endpointsRouter.use(Endpoints.comtradeLogin, loginMiddlewares, endpointRenderBuilder(PlatformIdTypes.Comtrade));
    endpointsRouter.use(Endpoints.skyHubLogin, loginMiddlewares, endpointRenderBuilder(PlatformIdTypes.SkyHub));
    // deprecated - to be removed on next release
    endpointsRouter.use(Endpoints.root, loginMiddlewares, endpointRenderBuilder(PlatformIdTypes.Xyz));

    app.use(endpointsRouter);
};
