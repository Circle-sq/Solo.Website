import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import type { SportType } from 'src/common/enums';

import type { LHNTimeTab } from '../enums';

import type { SearchCompetitionsKeyParams } from './competitions/types';
import type { SearchEventsKeyParams } from './events/types';

export const queryKeys = createQueryKeyStore({
    cms: {
        getAsianViewSportConfig: (sport: SportType) => ({ queryKey: [sport] }),
    },
    competitions: {
        searchWithEvents: (keyParams: SearchCompetitionsKeyParams) => ({ queryKey: [keyParams] }),
    },
    events: {
        search: (keyParams: SearchEventsKeyParams) => ({ queryKey: [keyParams] }),
    },
    sports: {
        aggregate: (timeTab: LHNTimeTab, sport: SportType) => ({ queryKey: [timeTab, sport] }),
    },
});
