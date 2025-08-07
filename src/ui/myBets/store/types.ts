import type { MyBetsTab } from 'src/common/enums';

export interface MyBetsFilters {
    tab: MyBetsTab | undefined;
    status: TabStatus;
    range: DateRange;
    sort: SortFilter;
}

export enum SortFilter {
    DescPLacedAt = '-placedAt',
    DescSettledAt = '-settledAt',
    EventStartTime = 'eventStartTime',
}

export enum TabStatus {
    All = 'all',
    Lost = 'lost',
    Settled = 'settled',
    Cancelled = 'cancelled',
}

export interface DateRange {
    from?: Date | string;
    to?: Date | string;
    isValid?: boolean;
    isTouched?: boolean;
}

export type RangeType = 'from' | 'to';
