import { useCallback } from 'react';
import { useRecoilCallback } from 'recoil';

import { useMyBetsQueryCache } from '@solo-api/bets/queryCache';
import { useRetrieveCashOutApi } from '@solo-api/cashout/queries';

import { BetStatus } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';
import type { MyBet } from 'src/common/types/myBet';

import { myBetsFiltersAtom, recentlySettledBetIdAtom } from '../store/atoms';
import { myBetsQueryStatusSelector } from '../store/selectors';
import { updateBetCashOut, updateBetStatus, updateCashOutPages } from '../utils/cashOut';

const useCashOut = (): { handleIncomingBet: (bet: MyBet) => void } => {
    const { setQueryCache, invalidateQueryCache } = useMyBetsQueryCache();

    const successCashOut = useRecoilCallback(
        ({ snapshot }) =>
            (cashOutBet: MyBet | null) => {
                const settledBetId = getValue(snapshot, recentlySettledBetIdAtom);
                const { tab } = getValue(snapshot, myBetsFiltersAtom);
                const queryStatus = getValue(snapshot, myBetsQueryStatusSelector);

                if (cashOutBet !== null) {
                    setQueryCache(({ pages, pageParams }) => {
                        return {
                            pages: updateCashOutPages(pages, cashOutBet, settledBetId, tab, queryStatus),
                            pageParams,
                        };
                    });
                }
            },
        [setQueryCache],
    );

    const { mutate: retrieveCashOut } = useRetrieveCashOutApi();

    const handleIncomingBet = useCallback(
        (wsBet: MyBet) => {
            if (wsBet == null) {
                return;
            }

            if (wsBet.id && !wsBet.cashOut && wsBet.status !== BetStatus.Settled) {
                retrieveCashOut(wsBet.id, {
                    onSuccess: (cashout) => {
                        const cashOutBet = updateBetCashOut(cashout, updateBetStatus(wsBet));

                        successCashOut(cashOutBet);
                    },
                    onError: invalidateQueryCache,
                });
            } else {
                successCashOut(wsBet);
            }
        },
        [retrieveCashOut, successCashOut, invalidateQueryCache],
    );

    return { handleIncomingBet };
};

export default useCashOut;
