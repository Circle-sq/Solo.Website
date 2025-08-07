import { api } from '@sc-api/api';

import { buildCacheUrl } from 'src/appState/utils';

export function* getContentIcons(category) {
    return yield api.get(buildCacheUrl(`/content/icons/${category}`));
}
