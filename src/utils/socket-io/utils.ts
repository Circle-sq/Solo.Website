import { SocketHostKey, SocketHostType } from './enums';

export const getSocketType = (socketHost: SocketHostKey) =>
    socketHost === SocketHostKey.Cashout ? SocketHostType.Cashout : SocketHostType.General;

export const webSocketDebugLog = (message: string, arg?: unknown) => {
    console.info(`%c           SocketIoClient DEBUG >>> ${message}`, 'background: #222; color: #bada55', arg ?? '-');
};

// if revision > 0 - we have "valid" market - without, invalid data which
// will trigger BE to send ALL messages
export function validRevision(revision?: number) {
    return Number(revision) >= 0;
}
