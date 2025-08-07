import { api } from '@sc-api/api';

import { buildCacheUrl } from 'src/appState/utils';
import type { IconCategory } from 'src/common/enums';

import type { CategoryIcons } from './types';

export const IconsService = {
    getByCategory: async (category: IconCategory): Promise<CategoryIcons> => {
        return api.get(buildCacheUrl(`/content/icons/${category}`));
    },
};
