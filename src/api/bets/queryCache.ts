import { useRecoilCallback } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';
import { queryKeyParamsSelector } from 'src/ui/myBets/store/selectors';

import { useQueryCache } from '../queryCache';
import { queryKeys } from '../queryKeys';
import type { QueryCacheUpdater } from '../types';

import type { MyBetsInfiniteData } from './types';

export const useMyBetsQueryCache = () => {
    const { setQueryCache, invalidateQueries } = useQueryCache();

    return {
        setQueryCache: useRecoilCallback(
            ({ snapshot }) =>
                (updater: QueryCacheUpdater<MyBetsInfiniteData>) => {
                    const queryKeyParams = getValue(snapshot, queryKeyParamsSelector);

                    setQueryCache<MyBetsInfiniteData>(queryKeys.bets.searchMyBets(queryKeyParams).queryKey, updater);
                },
            [setQueryCache],
        ),
        invalidateQueryCache: useRecoilCallback(
            ({ snapshot }) =>
                () => {
                    const queryKeyParams = getValue(snapshot, queryKeyParamsSelector);

                    void invalidateQueries(queryKeys.bets.searchMyBets(queryKeyParams).queryKey);
                },
            [invalidateQueries],
        ),
    };
};
