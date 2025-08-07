import type { SocketIoOptions } from './types';

export const defaultSocketOptions: SocketIoOptions = {
    transports: ['websocket', 'polling'],
};

export const cashoutSocketOptions: SocketIoOptions = {
    autoConnect: false,
    reconnectionAttempts: 5,
};
