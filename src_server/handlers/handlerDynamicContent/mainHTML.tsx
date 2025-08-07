import fs from 'fs';

import { isProduction } from '@sc-webapi/infra.server';
import { GTMContainer, GtmNoJsSupportInBrowser } from '@sc-webapi/metrics/gtm';

import type { RenderMainHtmlParamsType } from './RenderMainHtmlParamsType';

export const RenderMainHtml = (params: RenderMainHtmlParamsType) => {
    const { dataToHeader, statisticWidgetScript, data, universe, appStateInit, userLang, portalPayload, platformId } =
        params;

    const assetCssTags = [];
    const assetJsTags = [];

    if (isProduction()) {
        const manifest = JSON.parse(fs.readFileSync('build/client/.vite/manifest.json', 'utf-8'));

        for (const key in manifest) {
            const asset = manifest[key];

            if (asset.file.endsWith('.css') as boolean) {
                assetCssTags.push(`/${asset.file}`);
            } else if (asset.file.endsWith('.js') as boolean) {
                assetJsTags.push(`/${asset.file}`);
            }
        }
    }

    return (
        <html lang={userLang ?? undefined}>
            <head>
                <link rel='preconnect' href='https://widgets.shadow.gg' crossOrigin='anonymous' />
                <link rel='preconnect' href='https://widgets.statscore.com' crossOrigin='anonymous' />
                <link rel='preconnect' href='https://fonts.googleapis.com' crossOrigin='anonymous' />

                <GTMContainer />
                <meta charSet='utf-8' />
                {!isProduction() && <meta name='referrer' content='no-referrer' />}
                <script
                    src='https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default%2Ces2017%2Ces2016%2Ces2015'
                    async
                />
                <script src='https://avplayer-cdn.sportradar.com/dist/latest/avvpl-player.js' async />
                <link
                    rel='stylesheet'
                    type='text/css'
                    href='https://avplayer-cdn.sportradar.com/dist/latest/styles.css'
                />
                <script
                    type='application/javascript'
                    dangerouslySetInnerHTML={decorateContentToInnerHTML(statisticWidgetScript)}
                ></script>
                {dataToHeader}
                {isProduction() &&
                    assetCssTags.map((element) => <link key={element} rel='stylesheet' href={element}></link>)}
            </head>
            <body>
                <GtmNoJsSupportInBrowser />
                <div id='root'></div>
                <script
                    dangerouslySetInnerHTML={decorateContentToInnerHTML(`
                window.$data = ${data};
                window.$timestamp = ${JSON.stringify(new Date().toISOString())}
                window.$gameId = ${JSON.stringify(portalPayload.gameId)};
                window.$token = ${JSON.stringify(portalPayload.logintoken)};
                window.$loginjwt = ${JSON.stringify(portalPayload.loginjwt)};
                window.$universe = ${JSON.stringify(universe)};
                window.$appStateInit = ${JSON.stringify(appStateInit)};
                window.$platformId = ${JSON.stringify(platformId)};
                window.$portalMessage = ${JSON.stringify(portalPayload.portalMessage)};
                window.$redirect_url = ${JSON.stringify(portalPayload.redirectURL)};
                window.$theme = ${JSON.stringify(portalPayload.theme)};
                window.$guestCurrency = ${JSON.stringify(portalPayload.guestCurrency)};
            `)}
                ></script>
                <script src='/api/config.js?url'></script>
                <script
                    dangerouslySetInnerHTML={decorateContentToInnerHTML(`
                   (function (w, d, s) {
                        if (w.SDW) console.error('SDW widget already included');
                        w.SDW = {}, w.SDW._r = s; methods = ['mount', 'unmount', 'addWidget', 'updateWidget', 'removeWidget'];
                        w.SDW._q = []; methods.forEach(method => w.SDW[method] = function () { w.SDW._q.push([method, arguments]) });
                        var script = d.createElement('script'); script.async = 1; script.src = s;
                        var before = d.getElementsByTagName('script')[0]; before.parentNode.insertBefore(script, before);
                    })(window, document, 'https://widgets.shadow.gg/realtime2/scriptLoader.js');
                `)}
                ></script>
                <script
                    dangerouslySetInnerHTML={decorateContentToInnerHTML(`
                    ! function() {
                        var d = "STATSCOREWidgetsEmbederScript";
                        if (!window.document.getElementById(d)) {
                            window.STATSCOREWidgets = {}, window.STATSCOREWidgets.onLoadCallbacks = [], window.STATSCOREWidgets.onLoad = function(d) {
                                window.STATSCOREWidgets.onLoadCallbacks.push(d)
                            };
                            var n = window.document.createElement("script");
                            n.src = "https://wgt-s3-cdn.statscore.com/bundle/Embeder.js", n.async = !0, n.id = d, n.addEventListener("error", function(d) {
                                for (var n = 0; n < window.STATSCOREWidgets.onLoadCallbacks.length; n++) window.STATSCOREWidgets.onLoadCallbacks[n](d)
                            }), window.document.body.appendChild(n)
                        }
                    }();
                `)}
                ></script>

                {!isProduction() && <script type='module' src='/src/index.tsx'></script>}
                {isProduction() &&
                    assetJsTags.map((element) => <script key={element} type='module' src={element}></script>)}
            </body>
        </html>
    );
};

const decorateContentToInnerHTML = (content: string) => ({
    __html: content,
});
