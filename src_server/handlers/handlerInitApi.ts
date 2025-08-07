import * as fs from 'fs';

import frontendApi from '@gp-ninja/gpp-frontend-api';
import operatorMiddleware from '@gp-ninja/gpp-frontend-api/src/lib/middlewares/operator';
import type * as express from 'express';
import onFinished from 'on-finished';

import { getOperatorConfigs } from '@sc-webapi/utils';

import type { ConfigServer } from '../ConfigServer';
import { getMaintenance } from '../maintenance';

export const handlerInitApi = (
    config: ConfigServer,
    app: express.Express,
    PATH_META_BUILD: string,
    PATH_CONFIG: string,
) => {
    let buildInfo;

    // @FIXME: Including JSON with parsing read file, because of problems with Webpack

    try {
        buildInfo = JSON.parse(fs.readFileSync(PATH_META_BUILD, 'utf8'));
    } catch (_e) {
        // add implementation if important
    }

    const API_USERNAME = config.API_USERNAME;
    const API_PASSWORD = config.API_PASSWORD;

    if (API_USERNAME !== null && API_PASSWORD !== null) {
        console.info('Ignore the file config.json, env API_USERNAME and API_PASSWORD variables are used');

        app.operators = {
            [config.OPERATOR]: {
                domains: ['*'],
                api_username: API_USERNAME,
                api_password: API_PASSWORD,
            },
        };
    } else {
        console.info('config.json are used');

        app.operators = JSON.parse(fs.readFileSync(PATH_CONFIG, 'utf8'));
    }

    const api = frontendApi({
        mode: 'website',
        wrapResponse: false,
        operators: app.operators,
        buildInfo,
    });

    // Setup access logs

    app.use((req, res, next) => {
        if (!req.logger) {
            req.logger = console;
        }

        // Activate cache only if the request header
        // has Cache-control set
        const cacheHeader = req.get('Cache-Control');
        const vary = req.get('Vary');

        if (cacheHeader !== undefined) {
            res.set({
                'Cache-Control': cacheHeader,
                ...(vary !== undefined ? { Vary: vary } : {}),
            });
        }

        const referer = req.get('referer') || '*';

        if (referer !== undefined) {
            const operators = app.operators;

            const configs = getOperatorConfigs(operators, referer);

            // Add headers to allow other pages injecting in iframe the application
            if (configs !== undefined) {
                const [, host] = configs;

                res.locals.host = host;
            }
        }

        res.removeHeader('X-Frame-Options');

        onFinished(res, () => {
            (req.logger || console).info(req, res);
        });

        next();
    });

    // Forced operator names
    for (const operator of Object.keys(app.operators)) {
        app.use(`/${operator}`, (req, _res, next) => {
            req.operator = operator;

            next();
        });

        app.use(`/${operator}/api`, api);
    }

    // Get operator by domain

    app.session = {}; // @TODO: make it correctly

    // eslint-disable-next-line no-console
    console.set = (x: unknown) => x;

    app.use(operatorMiddleware);

    // Setup API
    app.use('/api', api);

    app.use(async (req, res, next) => {
        if (!req.operator) {
            return res.status(404).send('Not found');
        } else if (!api.session[req.operator].initialized) {
            return res.status(503).send(await getMaintenance());
        }

        next();
    });
};
