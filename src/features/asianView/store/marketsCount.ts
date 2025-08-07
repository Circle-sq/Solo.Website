import { atom } from 'jotai';
import { atomFamily, atomWithReset } from 'jotai/utils';
import { atomWithMutation } from 'jotai-tanstack-query';

import { EventsService } from '@sc-api/events/services';
import { queryKeys } from '@sc-api/queryKeys';
import { jotaiCallback } from '@sc-utils/jotai';

export const eventsMarketsCountAtom = atomWithReset<Record<number, number>>({});

export const eventMarketsCountAtomFamily = atomFamily((eventId: number) =>
    atom((get) => get(eventsMarketsCountAtom)[eventId] ?? 0),
);

const onMarketsCountMutationSuccess = jotaiCallback(({ set }) => (data: Record<string, number>) => {
    set(eventsMarketsCountAtom, (state) => ({ ...state, ...data }));
});

export const marketsCountAtomWithMutation = atomWithMutation(() => {
    return {
        mutationKey: queryKeys.events.getActiveMarketsCounter.queryKey,
        mutationFn: EventsService.getActiveMarketsCounter,
        onSuccess: onMarketsCountMutationSuccess,
    };
});
