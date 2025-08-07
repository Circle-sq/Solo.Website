import dotenv from 'dotenv';

dotenv.config();

const HTTP_PORT = Number(process.env.HTTP_PORT);
const NODE_HOST = process.env.HTTP_INTERFACE;

export const isDevelopment = (): boolean => {
    return process.env.NODE_ENV === 'development';
};

export const isProduction = (): boolean => {
    return process.env.NODE_ENV === 'production';
};

export function getProxyHTTPPort(): number {
    return HTTP_PORT + 1;
}

export function getViteServerPort(): number | undefined {
    if (isDevelopment()) {
        return HTTP_PORT;
    }

    return undefined;
}

export function getServerHTTPPort(): number {
    if (isDevelopment()) {
        return HTTP_PORT + 1;
    }

    return HTTP_PORT;
}

export function getNodeJsServerAddress(): string {
    if (isDevelopment()) {
        return `http://${NODE_HOST}:${getProxyHTTPPort()}`;
    }

    return `http://${NODE_HOST}:${HTTP_PORT}`;
}

export function getNoVpnConnectionMessage(): string {
    return '<html><b>Check your VPN connection</b></html>';
}
