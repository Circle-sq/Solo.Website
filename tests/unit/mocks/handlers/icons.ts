import { http, HttpResponse } from 'msw';

import { buildCacheUrl } from 'src/appState/utils';

export const competitionIconsHandler = http.get(`/api${buildCacheUrl('/content/icons/competitions')}`, () => {
    return HttpResponse.json({});
});

export const competitionLocationIconsHandler = http.get(
    `/api${buildCacheUrl('/content/icons/competition-locations')}`,
    () => {
        return HttpResponse.json({});
    },
);

export const sportIconsHandler = http.get(`/api${buildCacheUrl('/content/icons/sports')}`, () => {
    return HttpResponse.json({});
});

export const iconsHandlers = [competitionIconsHandler, competitionLocationIconsHandler, sportIconsHandler];
