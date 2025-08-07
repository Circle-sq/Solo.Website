import difference from 'lodash/difference';
import flatMap from 'lodash/flatMap';
import { useCallback, useEffect, useRef } from 'react';
import { batch, useDispatch } from 'react-redux';
import { useRecoilValue } from 'recoil';

import { useMyBetsQueryCache } from '@sc-api/bets/queryCache';
import type { MyBetsPageData } from '@sc-api/bets/types';

import { useAppStateContext } from 'src/appState/AppState';
import { MyBetsTab } from 'src/common/enums';
import type { CashOutBet, MyBet } from 'src/common/types/myBet';
import { request as getEventById } from 'src/modules/events/actions/get';
import { buildCashoutChannel } from 'src/utils/socket-io/buildChannel';
import useCashoutSocket from 'src/utils/socket-io/hooks/useCashoutSocket';

import { myBetsTabSelector } from '../store/selectors';
import { getCashOutBetsToUpdate, updateBetCashOut, updateQueryDataByCashOuts } from '../utils/cashOut';
import { getEventIds } from '../utils/helpers';

const useCashoutSubscribe = (pages: MyBetsPageData[]) => {
    const dispatch = useDispatch();
    const betIds = useRef<string[]>([]);

    const socket = useCashoutSocket();

    const myBetsTab = useRecoilValue(myBetsTabSelector);

    const { setQueryCache } = useMyBetsQueryCache();

    const {
        reduxState: { eventsListIds },
    } = useAppStateContext();

    const handleIncomingCashoutBet = useCallback(
        (cashOutBet: CashOutBet, bet: MyBet) => {
            const betWithCashOut = updateBetCashOut(cashOutBet, bet);

            if (betWithCashOut !== null) {
                setQueryCache(updateQueryDataByCashOuts(betWithCashOut));
            }
        },
        [setQueryCache],
    );

    useEffect(() => {
        if (socket !== null && (myBetsTab === MyBetsTab.Live || myBetsTab === MyBetsTab.CashOut)) {
            const bets = flatMap(pages, 'bets');
            const newEventIds = getEventIds(bets);

            const uniqIds = difference(newEventIds, eventsListIds);

            batch(() => {
                uniqIds.forEach((id) => {
                    dispatch(getEventById(id));
                });
            });

            const cashOutBets = getCashOutBetsToUpdate(bets);
            const newBetIds = Object.keys(cashOutBets);
            const betIdsToSubscribe = difference(newBetIds, betIds.current);

            for (const betId of betIdsToSubscribe) {
                const bet = cashOutBets[betId];

                socket.subscribe(
                    buildCashoutChannel(bet),
                    (payload: CashOutBet) => handleIncomingCashoutBet(payload, bet),
                    undefined,
                );
            }

            betIds.current = newBetIds;
        }
    }, [pages, myBetsTab, socket]);

    useEffect(() => {
        return () => {
            if (socket !== null && (myBetsTab === MyBetsTab.Live || myBetsTab === MyBetsTab.CashOut)) {
                betIds.current = [];
                socket.unsubscribeAll();
            }
        };
    }, [socket, myBetsTab]);
};

export default useCashoutSubscribe;
