import { useEffect } from 'react';
import { useAtomValue } from 'jotai';

import { userIdSelector } from '@solo-account/store/selectors';

import type { MyBet } from 'src/common/types/myBet';
import { buildBetsChannel } from 'src/utils/socket-io/buildChannel';
import useGeneralSocket from 'src/utils/socket-io/hooks/useGeneralSocket';
import type { WsAccountBetPayload } from 'src/utils/socket-io/types';

import useCashOut from './useCashOut';

const useAccountBetsSubscribe = () => {
    const socket = useGeneralSocket<WsAccountBetPayload<MyBet>>();

    const userId = useAtomValue(userIdSelector);

    const { handleIncomingBet } = useCashOut();

    useEffect(() => {
        if (socket !== null && userId !== null) {
            socket.subscribe(buildBetsChannel(userId), ({ body: { bet } }) => {
                handleIncomingBet(bet);
            });
        }

        return () => {
            if (socket !== null && userId !== null) {
                socket.unsubscribe(buildBetsChannel(userId));
            }
        };
    }, [socket]);
};

export default useAccountBetsSubscribe;
