import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

import { cashoutEnabledSelector, currencySelector } from '@sc-account/store/selectors';
import { getMyBetsParams } from '@sc-api/bets/helpers';
import { useMyBetsQueryCache } from '@sc-api/bets/queryCache';
import { BetsService } from '@sc-api/bets/services';
import { queryKeys } from '@sc-api/queryKeys';
import { store } from '@sc-utils/jotai';

import { useAppStateContext } from 'src/appState/AppState';
import { MyBetsTab } from 'src/common/enums';
import { getValue } from 'src/common/recoil/snapshot';

import { myBetsFiltersAtom, recentlySettledBetIdAtom } from '../store/atoms';
import { initialData } from '../store/configs';
import { queryKeyParamsSelector } from '../store/selectors';
import { defineMyBetsTabTask } from '../store/tasks';
import { TabStatus } from '../store/types';
import { prepareMyBetsPageData, syncQueryCache } from '../utils/queryCache';

const DEFAULT_PER_PAGE = 100;
const FIRST_PAGE = 1;

const useMyBetsQuery = (perPage = DEFAULT_PER_PAGE) => {
    const settledBetId = useRecoilValue(recentlySettledBetIdAtom);
    const { range, status: statusFilter, tab: myBetsTab } = useRecoilValue(myBetsFiltersAtom);
    const queryKeyParams = useRecoilValue(queryKeyParamsSelector);

    const isCashOutEnabled = useAtomValue(cashoutEnabledSelector);

    const { setQueryCache } = useMyBetsQueryCache();
    const { models } = useAppStateContext();

    const defineMyBetsTab = useRecoilCallback(defineMyBetsTabTask, []);

    const queryFn = useRecoilCallback(
        ({ snapshot }) =>
            async ({ pageParam }: { pageParam: number }) => {
                const { cash_out, sort, ...params } = getValue(snapshot, queryKeyParamsSelector);
                const settledBetId = getValue(snapshot, recentlySettledBetIdAtom);
                const currency = store.get(currencySelector);

                const { status: statusFilter, tab: myBetsTab } = getValue(snapshot, myBetsFiltersAtom);

                const pageData = await BetsService.searchMyBets({
                    ...getMyBetsParams(params),
                    sort,
                    cash_out: isCashOutEnabled ? cash_out : false,
                    page: pageParam,
                    perPage,
                    currency,
                });

                if (myBetsTab === undefined) {
                    if (pageParam === FIRST_PAGE) {
                        defineMyBetsTab(pageData.bets);
                    }

                    return pageData;
                }

                return prepareMyBetsPageData(pageData, models, settledBetId, statusFilter, myBetsTab);
            },
        [isCashOutEnabled, perPage, defineMyBetsTab],
    );

    const {
        data,
        fetchNextPage,
        hasNextPage = false,
        isFetchingNextPage,
        isFetching,
        isSuccess,
        isError,
    } = useInfiniteQuery({
        queryKey: queryKeys.bets.searchMyBets(queryKeyParams).queryKey,
        queryFn,
        initialPageParam: FIRST_PAGE,
        getNextPageParam: (lastPage, pages) => {
            return isEmpty(lastPage.bets) || lastPage.total / perPage <= size(pages) ? null : size(pages) + 1;
        },
        initialData,
    });

    const { pages = [] } = data ?? {};

    useEffect(() => {
        setQueryCache(syncQueryCache(models, settledBetId, statusFilter, myBetsTab));
    }, [models, myBetsTab, statusFilter]);

    const hasBets = useMemo(() => !isEmpty(flatMap(pages, 'bets')), [pages]);

    const isSettledTab = myBetsTab === MyBetsTab.Settled;

    const showEmptyFilters =
        !hasBets && isSettledTab && !isFetching && (statusFilter !== TabStatus.All || range.isTouched);
    const showLoader = (isFetching && !isFetchingNextPage) || (isSuccess && myBetsTab === undefined);
    const showLoadMore = hasNextPage && isSettledTab && !isError && hasBets;

    const loadMoreBets = useCallback(() => {
        if (!isFetchingNextPage) {
            void fetchNextPage();
        }
    }, [isFetchingNextPage, fetchNextPage]);

    return {
        pages,
        hasBets,
        loadMoreBets,
        showEmptyFilters,
        showLoader,
        showLoadMore,
        isFetchingNextPage,
        isFetching,
        isSuccess,
        isError,
    };
};

export default useMyBetsQuery;
