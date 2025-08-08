import { queryClientAtom } from 'jotai-tanstack-query';

import type { CompetitionsWithEventsResponse } from '@solo-asianView/api/competitions/types';
import { queryKeys } from '@solo-asianView/api/queryKeys';
import { moveStartedEventToLiveGroup, removeFinishedEvent } from '@solo-asianView/store/helpers/updaters';
import { competitionsQueryKeyParamsAtom, eventsQueryKeyParamsAtom } from '@solo-asianView/store/keyParams';
import type { CallbackParams } from '@solo-utils/jotai';

import { eventItemAtomFamily } from '../entities';
import { updateInfiniteEventsQueryCache } from '../helpers/queryCache';

import { resetEventItemWithDescendantsTask } from './entities';
import type { EventTimeSettingsUpdateBody } from './types';

export const eventTimeSettingsUpdateTask =
    ({ get, set }: CallbackParams) =>
    ({ event, timeSettings: wsTimeSettings }: EventTimeSettingsUpdateBody) => {
        const eventItem = get(eventItemAtomFamily(event.id));

        if (eventItem === null) {
            return;
        }

        const queryClient = get(queryClientAtom);
        const competitionsQueryKeyParams = get(competitionsQueryKeyParamsAtom);
        const { queryKey } = queryKeys.competitions.searchWithEvents(competitionsQueryKeyParams);
        const competitionLocations = queryClient.getQueryData<CompetitionsWithEventsResponse>(queryKey);

        if (competitionLocations === undefined) {
            return;
        }

        const eventsQueryKeyParams = get(eventsQueryKeyParamsAtom);
        const { queryKey: eventsQueryKey } = queryKeys.events.search(eventsQueryKeyParams);
        const { sortBy } = eventsQueryKeyParams;

        const { timeLineState, ...timeSettings } = wsTimeSettings;
        const updateInfiniteEvents = updateInfiniteEventsQueryCache(queryClient);

        if (timeLineState === 'FINISHED') {
            const pageUpdater = removeFinishedEvent(event.id, sortBy, competitionLocations.results.elements);

            updateInfiniteEvents(eventsQueryKey, pageUpdater);
            resetEventItemWithDescendantsTask({ get, set })(event.id);
        } else if (timeLineState === 'STARTED') {
            const pageUpdater = moveStartedEventToLiveGroup(
                event.id,
                sortBy,
                competitionLocations.results.elements,
                timeSettings,
            );

            updateInfiniteEvents(eventsQueryKey, pageUpdater);
            set(eventItemAtomFamily(event.id), { ...eventItem, timeSettings });
        }
    };
