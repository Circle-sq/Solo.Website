import type { MyBetsInfiniteData } from '@solo-api/bets/types';

import { BetStatus } from 'src/common/enums';

export const CASHOUT_STATUSES = [BetStatus.Open, BetStatus.Unsettled];

export const SETTLED_STATUSES = [BetStatus.Settled, BetStatus.Cancelled];

export const initialData: Readonly<MyBetsInfiniteData> = {
    pages: [{ bets: [], total: 0 }],
    pageParams: [],
};
