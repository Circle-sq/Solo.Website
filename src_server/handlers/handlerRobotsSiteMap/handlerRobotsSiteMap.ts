import { isProduction } from '@solo-webapi/infra.server';
import type * as express from 'express';
import fs from 'fs';
import path from 'path';

export const handlerRobotsSiteMap = (app: express.Express) => {
    app.get('/robots.txt', async (req, res) => {
        console.info(`Send file ${req.url}`);
        res.setHeader('Content-Type', 'text/plain');
        const robotsDataPath = path.resolve(
            isProduction()
                ? './build/server/assets/star_robots.data.txt'
                : './src_server/handlers/handlerRobotsSiteMap/star_robots.data.txt',
        );
        const robotsData = fs.readFileSync(robotsDataPath);

        res.send(robotsData.toString());
    });

    app.get('/sitemap.xml', async (req, res) => {
        console.info(`Send file ${req.url}`);
        res.setHeader('Content-Type', 'text/xml');
        const robotsDataPath = path.resolve(
            isProduction()
                ? './build/server/assets/star_sitemap.data.xml'
                : './src_server/handlers/handlerRobotsSiteMap/star_sitemap.data.xml',
        );
        const robotsData = fs.readFileSync(robotsDataPath);
        res.send(robotsData);
    });
};
