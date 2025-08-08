import type { Application, Request, Response } from 'express';
import { Router } from 'express';

import type { ConfigServer } from '@solo-webapi/ConfigServer';
import { PlatformIdTypes, Endpoints } from '@solo-webapi/enums';
import {
    portalBodyParser,
    setContentSecurityPolicy,
} from '@solo-webapi/handlers/handlerDynamicContent/portal-body-parser';
import type { PlatformApi } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';

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

    endpointsRouter.use(Endpoints.SportsbookLogin, loginMiddlewares, endpointRenderBuilder(PlatformIdTypes.Sportsbook));
    endpointsRouter.use(Endpoints.root, loginMiddlewares, endpointRenderBuilder(PlatformIdTypes.Sportsbook));

    app.use(endpointsRouter);
};
