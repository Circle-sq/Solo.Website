import type { SortParam } from '@sc-api/types';

import { BetStatus } from 'src/common/enums';

import { SortBy } from '../../enums';

export const EVENTS_PER_PAGE = 40;

export const defaultTerms = {
    display: {
        type: 'match',
        value: 'true',
    },
    state: {
        type: 'match',
        value: BetStatus.Open,
    },
    'tags.outright': {
        type: 'match',
        value: 'no',
    },
} as const;

export const sortParams: Record<SortBy, SortParam[]> = {
    [SortBy.Time]: [
        {
            field: 'timeSettings.started',
            order: 'desc',
        },
        {
            field: 'timeSettings.startTime',
            order: 'asc',
        },
        {
            field: 'id',
            order: 'asc',
        },
    ],
    [SortBy.Competitions]: [
        {
            field: 'timeSettings.started',
            order: 'desc',
        },
        {
            field: 'competition.displayOrder',
            order: 'desc',
        },
        {
            field: 'timeSettings.startTime',
            order: 'asc',
        },
        {
            field: 'id',
            order: 'asc',
        },
    ],
};
