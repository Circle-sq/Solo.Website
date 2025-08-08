import type { PlatformIdTypes } from '@solo-webapi/enums';
import { HttpStatusCode } from '@solo-webapi/enums';
import { assignAppEndpoints } from '@solo-webapi/handlers/entryPointRouter';
import { ReplaceGtmPlaceholdersWithComment } from '@solo-webapi/metrics/gtm';
import type { PlatformApi } from '@solo-webapi/realtime-server/PlatformApi/PlatformApi';
import dotenv from 'dotenv';
import type { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';
import type { AppStateFromServerType } from 'src/appState/AppStateImportExport';
import type { ConfigServer } from '../../ConfigServer';
import { getMaintenance } from '../../maintenance';
import { StatisticWidgetScript } from '../indexScripts';
import type { RenderMainHtmlParamsType } from './RenderMainHtmlParamsType';
import { RenderMainHtml } from './mainHTML';
import { extractPayload } from './portal-body-parser';
import { initTranslationData, initUserLang } from '@solo-webapi/Api/multiLanguage';
import type { LangDetailsRecordType } from 'src/appState/LanguagesState';
import { exportLanguages, LanguagesState } from 'src/appState/LanguagesState';
import { getNoVpnConnectionMessage, isProduction } from '@solo-webapi/infra.server';
import { convertMapToRecordDefault } from 'src/appState/utils';
import { healthCheck } from '@solo-webapi/Api/healthCheck';

dotenv.config();

export const serveHtml = (res: Response, html: string) => {
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.write(`<!DOCTYPE html>`);
    res.end(html);
};

const pathForIndex = path.join(`${process.cwd()}/index.html`);

function changeIndexContent(htmlString: string) {
    if (!isProduction()) {
        const htmlStringToSave = `<!DOCTYPE html>${htmlString}`;

        try {
            fs.writeFileSync(pathForIndex, htmlStringToSave);
        } catch (error) {
            console.error("can't save index.html, error:", error);
        }
    }
}

export const handlerDynamicContent = async (config: ConfigServer, platformApi: PlatformApi, app: Express) => {
    const render = async (platformId: string | null, req: Request, res: Response): Promise<string> => {
        const {
            gameId,
            logintoken,
            loginjwt,
            language: portalLang,
            portalMessage,
            redirectURL,
            theme,
            guestCurrency,
        } = extractPayload(req);

        if (!(await healthCheck(config, platformApi))) {
            changeIndexContent(getNoVpnConnectionMessage());
        }

        const langDetailsMap = await initTranslationData(config, platformApi);
        const langDetailsRecord: Record<string, LangDetailsRecordType> = exportLanguages(langDetailsMap.data);
        const userLang = await initUserLang(config, platformApi, req);
        const language = new LanguagesState(langDetailsRecord, userLang);

        const initDataServer: AppStateFromServerType = {
            universe: config.universe,
            websocket_host: config.WEBSOCKET_HOST,
            cashout_websocket_host: config.CASHOUT_WEBSOCKET_HOST,
            userAgent: req?.headers['user-agent'] ?? '',
            allTranslations: language.allTranslationsExport(),
            userLang: portalLang ?? userLang,
            img_api_url: config.IMG_API_URL,
            refreshTimeout: config.REFRESH_TIMEOUT,
            fetchMarketsGroupSize: config.FETCH_MARKETS_GROUP_SIZE,
            accountUpdateDelayTimeout: config.ACCOUNT_UPDATE_DELAY_TIMEOUT,
            shouldRefreshEvent: config.SHOULD_REFRESH_EVENT,
            featureTogglingProxyUri: config.FEATURE_TOGGLING_PROXY_URI,
            featureTogglingProxyToken: config.FEATURE_TOGGLING_PROXY_TOKEN,
            sportRemapping: convertMapToRecordDefault(config.SPORT_REMAPPING),
            host: res?.locals?.host ?? '',
            theme: theme ?? 'blue',
            guestCurrency: guestCurrency ?? 'USD',
        };

        const renderMainParams: RenderMainHtmlParamsType = {
            universe: config.universe,
            portalPayload: {
                logintoken: logintoken as string,
                loginjwt: loginjwt,
                redirectURL,
                gameId,
                portalMessage,
                theme,
                guestCurrency,
            },
            userLang: portalLang ?? userLang,
            data: JSON.stringify({}),
            appStateInit: JSON.stringify(initDataServer),
            statisticWidgetScript: StatisticWidgetScript(),
            dataToHeader: null,
            platformId,
        };

        const htmlString = ReplaceGtmPlaceholdersWithComment(
            ReactDOMServer.renderToStaticMarkup(RenderMainHtml(renderMainParams)),
        );

        changeIndexContent(htmlString);

        return htmlString;
    };

    const buildLoginHandler =
        (platformId: PlatformIdTypes) =>
        async (req: Request, res: Response): Promise<void> => {
            try {
                serveHtml(res, await render(platformId, req, res));
            } catch (err) {
                console.error('SSR POST handlerDynamicContent:', err, '_CFG:FE_WEB_ handlerDynamicContent POST');
                res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(await getMaintenance());
            }
        };

    assignAppEndpoints(app, process.env, buildLoginHandler, platformApi, config);

    app.get('*', async (req, res) => {
        try {
            const indexHtmlLocal = await render(null, req, res);
            serveHtml(res, indexHtmlLocal);
        } catch (err) {
            console.error(err, '_CFG:FE_WEB_ handlerDynamicContent GET');

            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(await getMaintenance());
        }
    });

    if (!isProduction()) {
        await render(null, null as any, null as any);
    }
};
