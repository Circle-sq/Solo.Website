import isEmpty from 'lodash/isEmpty';

export const isProduction = (): boolean => {
    return process.env.NODE_ENV === 'production';
};

const HTTP_PORT = Number(process.env.HTTP_PORT);
const PROXY_HTTP_PORT = HTTP_PORT + 1;

export const getMaintenanceWebSocketUrl = () => {
    const host = window.location.hostname;
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

    if (isProduction()) {
        const port = window.location.port;

        return `${wsProtocol}://${host}:${port}`;
    }

    return `${wsProtocol}://${host}:${PROXY_HTTP_PORT}`;
};

export const isStandalone = (): boolean => {
    return process.env.STANDALONE === 'true';
};

export const hideHeaderInStandalone = (): boolean => {
    if (!isStandalone()) {
        return true;
    }
    const showHeaderParam = localStorage.getItem('show_header');

    if (isEmpty(showHeaderParam)) {
        return false;
    }

    return showHeaderParam === 'true';
};
