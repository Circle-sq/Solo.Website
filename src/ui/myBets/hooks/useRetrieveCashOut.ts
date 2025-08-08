import { useCallback, useRef } from 'react';
import { useRecoilCallback } from 'recoil';

import { useMyBetsQueryCache } from '@solo-api/bets/queryCache';
import { useMakeCashOutApi } from '@solo-api/cashout/queries';
import { queryKeys } from '@solo-api/queryKeys';

import { useQueryCache } from 'src/api/queryCache';
import { getValue } from 'src/common/recoil/snapshot';
import type { TimeOut } from 'src/common/types/main';
import type { MyBet } from 'src/common/types/myBet';

import { recentlySettledBetIdAtom } from '../store/atoms';
import { queryKeyParamsSelector } from '../store/selectors';
import {
    clearRetrievedCashOut,
    retrieveCashOutError,
    retrieveCashOutRequest,
    retrieveCashOutSuccess,
} from '../utils/cashOut';

const REMOVE_TIMEOUT = 4000;

const useRetrieveCashOut = () => {
    const timeout = useRef<TimeOut | null>(null);

    const { setQueryCache: setMyBetsQueryCache } = useMyBetsQueryCache();
    const { setQueryCache } = useQueryCache();

    const { mutate: retrieveCashOut } = useMakeCashOutApi();

    const retrieveBetCashOut = useRecoilCallback(
        ({ reset, set, snapshot }) =>
            (bet: MyBet) => {
                const queryKeyParams = getValue(snapshot, queryKeyParamsSelector);
                set(recentlySettledBetIdAtom, bet.id);
                setMyBetsQueryCache(retrieveCashOutRequest(bet.id));

                retrieveCashOut(bet, {
                    onSuccess: (_, bet) => {
                        setMyBetsQueryCache(retrieveCashOutSuccess(bet));

                        timeout.current = setTimeout(() => {
                            setQueryCache(
                                queryKeys.bets.searchMyBets(queryKeyParams).queryKey,
                                clearRetrievedCashOut(bet.id),
                            );
                            reset(recentlySettledBetIdAtom);
                        }, REMOVE_TIMEOUT);
                    },
                    onError: (error, bet) => setMyBetsQueryCache(retrieveCashOutError(bet.id, error)),
                });
            },
        [retrieveCashOut, setQueryCache, setMyBetsQueryCache],
    );

    const clearCashOutedBet = useCallback(
        (betId: string, errorOnly?: boolean) => setMyBetsQueryCache(clearRetrievedCashOut(betId, errorOnly)),
        [setMyBetsQueryCache],
    );

    return { retrieveBetCashOut, clearCashOutedBet };
};

export default useRetrieveCashOut;
