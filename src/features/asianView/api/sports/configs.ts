import { BetStatus } from 'src/common/enums';

export const defaultTerms = {
    state: {
        type: 'match',
        value: BetStatus.Open,
    },
    'market.asian-view': {
        type: 'shouldMatch',
        values: ['yes'],
    },
    display: {
        type: 'match',
        value: 'true',
    },
    'tags.outright': {
        type: 'match',
        value: 'no',
    },
} as const;

export const liveSportTerms = {
    'market.tradedInPlay': {
        type: 'match',
        value: 'true',
    },
    'timeSettings.tradedInPlay': {
        type: 'match',
        value: 'true',
    },
    'timeSettings.started': {
        type: 'match',
        value: 'true',
    },
} as const;
