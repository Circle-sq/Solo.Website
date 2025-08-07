import { useAtomValue } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import uniqBy from 'lodash/uniqBy';
import { useEffect } from 'react';

import { queryKeys } from '@sc-account/api/queryKeys';
import { usePossibleBets } from '@sc-betslip/api/possibleBets/queries';
import { PossibleBetsTriggeredBy } from '@sc-betslip/enums';
import { store, useJotaiCallback } from '@sc-utils/jotai';

import { isStandalone } from 'src/infra.client';
import isLocal from 'src/utils/isLocal';
import { buildWalletChannel } from 'src/utils/socket-io/buildChannel';
import { WsMessageType } from 'src/utils/socket-io/enums';
import useGeneralSocket from 'src/utils/socket-io/hooks/useGeneralSocket';
import type { WsPayloadGeneral } from 'src/utils/socket-io/types';

import { userIdSelector } from '../store/selectors';
import { updateAccountUserTask } from '../store/tasks';
import type { UserCurrenciesData, Wallet } from '../types';

export const useWalletSubscribe = () => {
    const socket = useGeneralSocket<WsPayloadGeneral<Wallet>>();
    const userId = useAtomValue(userIdSelector);
    const updateAccountUser = useJotaiCallback(updateAccountUserTask);
    const isLocalEnv = isLocal();
    const { getPossibleBets } = usePossibleBets();

    useEffect(() => {
        if (socket !== null && userId !== null) {
            socket.subscribe(buildWalletChannel(userId), ({ body: wallet, header }) => {
                const queryClient = store.get(queryClientAtom);
                updateAccountUser({ wallet });

                if (header.type === WsMessageType.Update) {
                    if (isLocalEnv && !isStandalone()) {
                        queryClient.setQueryData(
                            queryKeys.user.userCurrencies(String(userId)).queryKey,
                            (prevData: UserCurrenciesData) => {
                                if (prevData && prevData.balances) {
                                    const updatedBalances = uniqBy([...prevData.balances, wallet], 'currency');

                                    return { ...prevData, balances: updatedBalances };
                                }

                                return prevData;
                            },
                        );
                    }
                    getPossibleBets({ triggeredBy: PossibleBetsTriggeredBy.WalletUpdate });
                }
            });
        }

        return () => {
            if (socket !== null && userId !== null) {
                socket.unsubscribe(buildWalletChannel(userId));
            }
        };
    }, [socket, userId]);
};
