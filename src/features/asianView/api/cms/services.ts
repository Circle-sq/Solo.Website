import { api } from '@solo-api/api';

import type { SportType } from 'src/common/enums';

import type { AsianViewSportConfig } from './types';

export const CmsService = {
    getAsianViewSportConfig: async (sport: SportType): Promise<AsianViewSportConfig> => {
        return api.get(`/cms/asian-view-config/${sport}`);
    },
};
