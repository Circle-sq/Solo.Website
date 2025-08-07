import type { SearchEventsQueryParams } from '@sc-api/events/types';
import type { SortParam } from '@sc-api/types';

import { BetStatus } from 'src/common/enums';

export const getDefaultTerms = (search: string): SearchEventsQueryParams['terms'] => ({
    'name.ngram': {
        type: 'shouldMatch',
        values: [search],
    },
    display: {
        type: 'match',
        value: 'true',
    },
    state: {
        type: 'match',
        value: BetStatus.Open,
    },
    'market.display': {
        type: 'match',
        value: 'true',
    },
});

export const extraTerms: SearchEventsQueryParams['extraTerms'] = {
    'timeSettings.startTime': {
        type: 'range',
        from: new Date().toISOString(),
        to: '9999-12-30T23:00:00.000Z',
    },
};

export const query = {
    withMarkets: true,
    reduceMarkets: true,
};

export const sortParams: SortParam[] = [
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
];
