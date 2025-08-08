import { atomWithMutation } from 'jotai-tanstack-query';

import { EventsService } from '@solo-api/events/services';
import { queryKeys } from '@solo-api/queryKeys';

export const fetchEventWithoutMarketsAtomWithMutation = atomWithMutation(() => ({
    mutationKey: queryKeys.events.getEventWithoutMarkets.queryKey,
    mutationFn: EventsService.getEventWithoutMarkets,
}));
