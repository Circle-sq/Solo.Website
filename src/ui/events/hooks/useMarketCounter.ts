import { useInfiniteQuery } from '@tanstack/react-query';
import difference from 'lodash/difference';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import map from 'lodash/map';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';
import toNumber from 'lodash/toNumber';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { useAppStateContext } from 'src/appState/AppState';
import { getValue } from 'src/common/recoil/snapshot';

import { retrieveMarketsActiveCounter } from '../services/api';
import { marketCounterByEventAtomFamily, visibleMarketsEventIdAtom } from '../store/atoms';
import { marketEventIdSelector } from '../store/selectors/event';

export const useMarketCounter = () => {
    const {
        router: { route },
    } = useAppStateContext();
    const { marketsEventId, pageSize } = useRecoilValue(marketEventIdSelector);

    const getNextPageParam = () => pageSize + 1;

    const addCounter = useRecoilCallback(
        ({ reset, set, snapshot }) =>
            (items: Record<string, number>) => {
                const visibleMarketsEvents = getValue(snapshot, visibleMarketsEventIdAtom);

                forEach(items, (marketCounter, marketEventId) => {
                    set(marketCounterByEventAtomFamily(Number(marketEventId)), marketCounter);
                });

                forEach(difference(visibleMarketsEvents, map(keys(items), toNumber)), (marketEventId) => {
                    set(marketCounterByEventAtomFamily(marketEventId), 0);
                });

                reset(visibleMarketsEventIdAtom);
            },
        [],
    );

    const { data, fetchNextPage, isSuccess } = useInfiniteQuery({
        queryKey: ['markets/active-counter', route.params],
        queryFn: async () => retrieveMarketsActiveCounter(marketsEventId),
        getNextPageParam,
        initialPageParam: 0,
        enabled: !isEmpty(marketsEventId),
    });

    useEffect(() => {
        if (isSuccess && data?.pages) {
            addCounter(reduce(data.pages, merge, {}));
        }
    }, [isSuccess, data?.pages]);

    useEffect(() => {
        if (pageSize === 0 || pageSize === 1) {
            return;
        }

        void fetchNextPage();
    }, [fetchNextPage, pageSize]);
};
