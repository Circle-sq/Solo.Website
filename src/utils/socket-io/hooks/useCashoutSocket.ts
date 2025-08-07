import { useEffect, useRef } from 'react';

import type { CashOutBet } from 'src/common/types/myBet';
import type { SocketIo } from 'src/utils/socket-io/types';
import { socketIoClientCashout } from 'src/utils/socket-io/clients';

const useCashoutSocket = () => {
    const socket = useRef<SocketIo<CashOutBet> | null>(null);

    useEffect(() => {
        void socketIoClientCashout.then((clientIo) => {
            const { socket: socketIo = null } = clientIo ?? {};

            socketIo?.connect();
            socket.current = socketIo;
        });

        return () => {
            socket.current?.disconnect();
        };
    }, []);

    return socket.current;
};

export default useCashoutSocket;
