import { atomWithMutation } from 'jotai-tanstack-query';

import { EventsService } from '@sc-api/events/services';
import { queryKeys } from '@sc-api/queryKeys';

export const fetchEventWithoutMarketsAtomWithMutation = atomWithMutation(() => ({
    mutationKey: queryKeys.events.getEventWithoutMarkets.queryKey,
    mutationFn: EventsService.getEventWithoutMarkets,
}));
