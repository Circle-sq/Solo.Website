import type { InfiniteData } from '@tanstack/query-core';

import type { BetStatus, MyBetsTab } from 'src/common/enums';
import type { MyBet } from 'src/common/types/myBet';
import type { DateRange, SortFilter, TabStatus } from 'src/ui/myBets/store/types';

import type { CurrencyType } from '../../config/types';
import type { InfiniteQueryParams } from '../types';

export interface SearchBetsQueryParams {
    cash_out?: boolean;
    sort?: string;
    aggregations?: {
        total: {
            type: string;
        };
    };
    placedAt?: {
        lte?: string | Date;
        gte?: string | Date;
    };
    status?: {
        eq?: string;
        in?: string[];
    };
    currency: CurrencyType;
}

export type SearchBetsParams = SearchBetsQueryParams & InfiniteQueryParams;

export interface SearchBetsResponse {
    results: MyBet[];
    aggregations: { total: number };
}

export interface MyBetsPageData {
    bets: MyBet[];
    total: number;
    pageParam?: number;
}

export type MyBetsInfiniteData = InfiniteData<MyBetsPageData, number>;

export interface MyBetsQueryKeyParams {
    sort: SortFilter;
    range?: DateRange;
    queryStatus?: BetStatus | BetStatus[];
    statusFilter?: TabStatus;
    cash_out?: true;
    tab?: MyBetsTab;
}
