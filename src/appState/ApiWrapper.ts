import { api } from '@solo-api/api';

import type { EventsResponse } from 'src/appState/EventsCollection/utils';
import { buildCacheUrl } from 'src/appState/utils';
import { remapEventsSport, remapSportCounters, transformQuery } from 'src/utils/sportRemapping';

import type { EventQueryRequest } from './EventsCollection/types';
import type { Notification } from './redux/types';

export class ApiWrapper {
    static createFromContext(): ApiWrapper {
        return new ApiWrapper();
    }

    async getSportsCached(query: EventQueryRequest, id: string) {
        return api
            .get(buildCacheUrl('/events/search'), transformQuery({ ...query }, id), {
                id,
            })
            .then((it) => remapEventsSport(it));
    }

    async getEventsCounterCached(query: EventQueryRequest, id: string) {
        return api
            .get<EventsResponse, EventQueryRequest>(
                buildCacheUrl('/events/counter/search'),
                transformQuery({ ...query }, id),
                {
                    id,
                },
            )
            .then((it) => {
                return { ...it, sports: remapSportCounters([...it.sports]) };
            });
    }

    getNotifications = async <T extends Notification[]>(query: Record<string, unknown>): Promise<T> => {
        return api.post<T>(`/content/notifications/search`, query, {
            headers: {
                cache: api.CACHE_CONTROL,
                Vary: 'Accept-Language',
            },
        });
    };

    getSportTemplates = async (sportId: string) => {
        return api.post(
            buildCacheUrl(`/market-templates/${sportId}`),
            {
                'website-main': ['yes'],
                outright: ['no'],
            },
            {
                headers: {
                    'Cache-Control': api.CACHE_CONTROL,
                },
            },
        );
    };
}
