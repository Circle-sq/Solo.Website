import { selector } from 'recoil';

import type { MyBetsQueryKeyParams } from '@solo-api/bets/types';

import { BetStatus, MyBetsTab } from 'src/common/enums';

import { myBetsFiltersAtom } from './atoms';
import { CASHOUT_STATUSES, SETTLED_STATUSES } from './configs';
import { getDateRange } from './helpers';
import { SortFilter, TabStatus } from './types';

export const myBetsTabSelector = selector<MyBetsTab | undefined>({
    key: 'myBetsTabSelector',
    get: ({ get }) => {
        const { tab } = get(myBetsFiltersAtom);

        return tab;
    },
});

export const isSettledTabSelector = selector<boolean>({
    key: 'isSettledTabSelector',
    get: ({ get }) => {
        const myBetsTab = get(myBetsTabSelector);

        return myBetsTab === MyBetsTab.Settled;
    },
});

export const isTabFiltersTouchedSelector = selector<boolean>({
    key: 'isTabFiltersTouchedSelector',
    get: ({ get }) => {
        const { status, range } = get(myBetsFiltersAtom);

        return status !== TabStatus.All && range.isTouched === true;
    },
});

export const myBetsQueryStatusSelector = selector<BetStatus | BetStatus[]>({
    key: 'myBetsQueryStatusSelector',
    get: ({ get }) => {
        const { tab, status } = get(myBetsFiltersAtom);

        if (tab !== MyBetsTab.Settled) {
            return CASHOUT_STATUSES;
        }

        if (status === TabStatus.All || status === TabStatus.Lost) {
            return SETTLED_STATUSES;
        }

        if (status === TabStatus.Cancelled) {
            return BetStatus.Cancelled;
        }

        return BetStatus.Settled;
    },
});

export const myBetsSortStatusSelector = selector<SortFilter>({
    key: 'myBetsSortStatusSelector',
    get: ({ get }) => {
        const { tab, sort } = get(myBetsFiltersAtom);

        if (tab === MyBetsTab.Live) {
            return SortFilter.DescPLacedAt;
        }

        if (tab === MyBetsTab.Settled) {
            return SortFilter.DescSettledAt;
        }

        return sort;
    },
});

export const queryKeyParamsSelector = selector<MyBetsQueryKeyParams>({
    key: 'queryKeyParamsSelector',
    get: ({ get }) => {
        const { tab = MyBetsTab.CashOut, range, status: statusFilter } = get(myBetsFiltersAtom);
        const queryStatus = get(myBetsQueryStatusSelector);
        const sort = get(myBetsSortStatusSelector);

        if (tab === MyBetsTab.Settled) {
            const dateRange = getDateRange(range);

            return { tab, queryStatus, statusFilter, ...dateRange, sort };
        }

        return { tab, queryStatus, cash_out: true, sort };
    },
});
