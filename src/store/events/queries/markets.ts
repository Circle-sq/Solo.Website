import { atomWithMutation } from 'jotai-tanstack-query';

import { EventsService } from '@sc-api/events/services';
import { queryKeys } from '@sc-api/queryKeys';

export const marketsByIdsMutationAtom = atomWithMutation(() => ({
    mutationKey: queryKeys.events.getMarketsByIds.queryKey,
    mutationFn: EventsService.getMarketsByIds,
}));
