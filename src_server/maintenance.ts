import fs from 'fs';
import path from 'path';

import { getProxyHTTPPort, isProduction } from './infra.server';

export const getMaintenance = async (): Promise<string> => {
    const maintenanceHtmlPath = path.resolve(
        isProduction()
            ? './build/server/assets/maintenance-skycity-kr.html'
            : './src_server/template/maintenance-skycity-kr.html',
    );
    const maintenanceHtml = fs.readFileSync(maintenanceHtmlPath);

    const script = `
        <script>
            const connectWebSocket = () => {
                const isProduction = ${isProduction()};
                const host = window.location.hostname;
                const port = isProduction ? window.location.port : ${getProxyHTTPPort()};
                const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
                const wsUrl = wsProtocol + '://' + host + ':' + port;
                const socket = new WebSocket(wsUrl);

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    const { maintenance } = data;

                    if (maintenance !== undefined && !Boolean(maintenance)) {
                        window.location.reload();
                    }
                };

                socket.onclose = () => {
                    // Reconnect after a short delay
                    setTimeout(connectWebSocket, 2000); // 2 seconds
                };
            };

            connectWebSocket();
        </script>
    `;

    return maintenanceHtml.toString().replace('</body>', `${script}</body>`);
};
