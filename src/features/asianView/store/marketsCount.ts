import { atom } from 'jotai';
import { atomFamily, atomWithReset } from 'jotai/utils';
import { atomWithMutation } from 'jotai-tanstack-query';

import { EventsService } from '@solo-api/events/services';
import { queryKeys } from '@solo-api/queryKeys';
import { jotaiCallback } from '@solo-utils/jotai';

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
