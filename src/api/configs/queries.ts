import { useRecoilCallback } from 'recoil';

import { useQueryWithCbk } from '@solo-utils/tanstack';

import { bettingConfigsAtom } from 'src/store/configs/atoms';

import { queryKeys } from '../queryKeys';

import { ConfigsService } from './services';
import type { BettingConfigs } from './types';

export const useGetBettingConfigsApi = () => {
    const onSuccess = useRecoilCallback(
        ({ set }) =>
            (configs: BettingConfigs) => {
                set(bettingConfigsAtom, configs);
            },
        [],
    );

    return useQueryWithCbk({
        queryKey: queryKeys.configs.getBettingConfigs.queryKey,
        queryFn: ConfigsService.bettingConfigs,
        onSuccess,
        gcTime: 0,
    });
};
