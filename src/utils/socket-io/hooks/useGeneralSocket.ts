import { useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';

import { isAuthenticatedAtom } from '@solo-account/store/atoms';

import { socketIoClientGeneral } from 'src/utils/socket-io/clients';
import type SocketIoClient from 'src/utils/socket-io/SocketIoClient';

const useGeneralSocket = <T>() => {
    const socket = useRef<SocketIoClient<T> | null>(null);
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    useEffect(() => {
        if (socket.current) {
            socket.current.authenticate();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        void socketIoClientGeneral.then((clientIo) => {
            socket.current = clientIo as SocketIoClient<T> | null;
        });
    }, []);

    return socket?.current?.socket ?? null;
};

export default useGeneralSocket;
