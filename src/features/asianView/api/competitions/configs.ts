import { BetStatus } from 'src/common/enums';

export const defaultTerms = {
    display: {
        type: 'match',
        value: 'true',
    },
    state: {
        type: 'match',
        value: BetStatus.Open,
    },
    'competition.id': {
        type: 'aggregation',
        size: 1000,
        sort: 'term_asc',
        aggs: {
            'competition.displayOrder': {
                type: 'aggregation',
                size: 1,
            },
            'competition.globalDisplayOrder': {
                type: 'aggregation',
                size: 1,
            },
            'competition.name': {
                type: 'aggregation',
                size: 1,
                aggs: {
                    'tags.country': {
                        type: 'aggregation',
                        size: 1,
                    },
                    'sport.id': {
                        type: 'aggregation',
                        size: 1,
                    },
                },
            },
        },
    },
    'tags.country': {
        type: 'aggregation',
        size: 100,
        aggs: {
            'competition.name': {
                type: 'aggregation',
                size: 250,
                aggs: {
                    'sport.id': {
                        type: 'aggregation',
                        size: 100,
                    },
                },
            },
        },
    },
    'tags.outright': {
        type: 'match',
        value: 'no',
    },
} as const;
