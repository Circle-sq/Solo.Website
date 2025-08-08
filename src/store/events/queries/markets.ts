import { atomWithMutation } from 'jotai-tanstack-query';

import { EventsService } from '@solo-api/events/services';
import { queryKeys } from '@solo-api/queryKeys';

export const marketsByIdsMutationAtom = atomWithMutation(() => ({
    mutationKey: queryKeys.events.getMarketsByIds.queryKey,
    mutationFn: EventsService.getMarketsByIds,
}));
