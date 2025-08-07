import { useQuery } from '@tanstack/react-query';
import isEmpty from 'lodash/isEmpty';

import { queryKeys } from '../queryKeys';

import { EventsService } from './services';
import type { SearchEventsByValueQueryParams } from './types';

export const useSearchEventsByValueApi = (params: SearchEventsByValueQueryParams) => {
    return useQuery({
        queryKey: queryKeys.events.searchByValue(params.q).queryKey,
        queryFn: async () => EventsService.searchByValue(params),
        enabled: !isEmpty(params.q),
        staleTime: 0,
    });
};
