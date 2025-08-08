import { queryClientAtom } from 'jotai-tanstack-query';
import delay from 'lodash/delay';
import map from 'lodash/map';
import ms from 'ms';

import { EventsService } from '@solo-api/events/services';
import { getCompetitionTerm, getSportTerm } from '@solo-api/helpers/params';
import { defaultTerms, EVENTS_PER_PAGE, sortParams } from '@solo-asianView/api/events/configs';
import type { SearchEventsPageData, SearchEventsResponse } from '@solo-asianView/api/events/types';
import { atomWithInfiniteQueryCbk, jotaiCallback, store } from '@solo-utils/jotai';

import { resetEventItemWithDescendantsTask, setEntitiesTask } from 'src/store/events/tasks/entities';

import { queryKeys } from '../api/queryKeys';

import { competitionLocationsAtomWithQuery } from './competitionLocations';
import { competitionIdsFilterAtom, sortByFilterAtom, timePeriodFilterAtom } from './filters';
import { countCompetitionEvents } from './helpers/count';
import { groupCompetitionEvents } from './helpers/group';
import { prepareEvents } from './helpers/prepare';
import { getEventListTermsByTab } from './helpers/terms';
import { eventsQueryKeyParamsAtom } from './keyParams';
import { lhnSportAtom, lhnTimeTabAtom } from './lhn';
import { marketsCountAtomWithMutation } from './marketsCount';
import { sportConfigAtom, sportConfigAtomWithQuery } from './sportConfig';

const getNextPageParam = ({ total }: SearchEventsPageData, pages: SearchEventsPageData[]) => {
    return total / EVENTS_PER_PAGE <= pages.length ? null : pages.length + 1;
};

export const infiniteEventsAtomWithInfiniteQuery = atomWithInfiniteQueryCbk((get) => {
    const sportConfig = get(sportConfigAtom);

    const { data: competitionLocations, isFetching: isFetchingCompetitionLocations } = get(
        competitionLocationsAtomWithQuery,
    );
    const { isFetching: isFetchingSportConfig } = get(sportConfigAtomWithQuery);

    return {
        queryKey: queryKeys.events.search(get(eventsQueryKeyParamsAtom)).queryKey,
        queryFn: async ({ pageParam }: { pageParam: number }): Promise<SearchEventsPageData> => {
            const competitionIdsFilter = get(competitionIdsFilterAtom);
            const sortBy = get(sortByFilterAtom);
            const sport = get(lhnSportAtom);
            const timeTab = get(lhnTimeTabAtom);
            const timePeriod = get(timePeriodFilterAtom);

            const isAllSelected = competitionIdsFilter.length === competitionLocations?.totalHints;
            const competitionIds = isAllSelected ? undefined : competitionIdsFilter;

            const { results: events, totalHints: total } = await EventsService.search<SearchEventsResponse>({
                page: pageParam,
                perPage: EVENTS_PER_PAGE,
                terms: {
                    ...defaultTerms,
                    ...getCompetitionTerm(competitionIds),
                    ...getEventListTermsByTab(timeTab, timePeriod),
                    ...getSportTerm(sport),
                },
                sort: sortParams[sortBy],
                marketTags: {
                    'asian-view': ['yes'],
                },
            });

            const { liveGroups, upcomingGroups } = groupCompetitionEvents(
                events,
                competitionLocations?.results.elements ?? [],
                sortBy,
            );

            return {
                events: prepareEvents(events, sportConfig),
                pageParam,
                total,
                live: {
                    groups: liveGroups,
                    total: countCompetitionEvents(liveGroups),
                },
                upcoming: {
                    groups: upcomingGroups,
                    total: countCompetitionEvents(upcomingGroups),
                },
            };
        },
        onSuccess: (data: SearchEventsPageData) => {
            const { mutate: fetchActiveMarketsCounter } = get(marketsCountAtomWithMutation);
            const setEntities = jotaiCallback(setEntitiesTask);

            setEntities(data.events);
            fetchActiveMarketsCounter(map(data.events, 'id'));
        },
        initialPageParam: 1,
        getNextPageParam,
        gcTime: 0,
        staleTime: 0,
        refetchOnMount: false,
        enabled: !isFetchingCompetitionLocations && !isFetchingSportConfig && sportConfig != null,
    };
});

infiniteEventsAtomWithInfiniteQuery.onMount = () => {
    const queryClient = store.get(queryClientAtom);

    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
        switch (event.type) {
            case 'removed': {
                if (event.query.queryKey[0] === 'events' && event.query.queryKey[1] === 'search') {
                    const { data } = event.query.state;
                    const resetEventItemWithDescendants = jotaiCallback(resetEventItemWithDescendantsTask);

                    data?.pages.forEach((page: SearchEventsPageData) => {
                        page.events.forEach((event) => {
                            resetEventItemWithDescendants(event.id);
                        });
                    });
                }

                break;
            }

            default:
                break;
        }
    });

    return () => {
        const { queryKey } = queryKeys.events.search(store.get(eventsQueryKeyParamsAtom));

        void queryClient.invalidateQueries({ queryKey });
        delay(unsubscribe, ms('3s'));
    };
};
