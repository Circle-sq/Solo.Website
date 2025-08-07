import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { brandNameSelector } from '@sc-account/store/selectors';

import { queryKeys } from '../../queryKeys';

import { StreamsBlacklistService } from './services';

export const useBlacklistQuery = () => {
    const brandName = useAtomValue(brandNameSelector) ?? window.location.hostname;

    const { data } = useQuery({
        queryKey: queryKeys.streams.blacklist.queryKey,
        queryFn: async () => {
            try {
                const response = await StreamsBlacklistService.getBlacklistedProviders(brandName);

                if ('status' in response && response.status === 'NOT_FOUND' && response.code === 404) {
                    console.warn(response.message);

                    return [];
                }

                return response;
            } catch (error) {
                console.error('Error fetching blacklist data:', error);

                return [];
            }
        },
    });

    const blacklist = Array.isArray(data) ? data : [];

    return { blacklist };
};
