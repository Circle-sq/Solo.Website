import type { IncomingMessage } from 'http';

export const getIpAddress = (request: IncomingMessage): string => {
    const ip = request.socket.remoteAddress;

    if (ip === undefined) {
        return 'undefined';
    }

    return ip;
};
