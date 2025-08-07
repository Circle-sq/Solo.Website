import { atomFamily } from 'jotai/utils';
import { atomWithQuery } from 'jotai-tanstack-query';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';

import { queryKeys } from '@sc-api/queryKeys';
import { UniformsService } from '@sc-api/uniforms/services';
import type { Uniform, UniformParams } from '@sc-api/uniforms/types';

export const uniformsAtomFamilyWithQuery = atomFamily(
    (params: UniformParams) =>
        atomWithQuery<Record<string, Uniform>>(() => ({
            queryKey: queryKeys.uniforms.retrieve(params).queryKey,
            queryFn: async () => {
                const data = await UniformsService.retrieve(params);

                return keyBy(data, 'playerId');
            },
            enabled: params.sport !== undefined && params.uniformType !== undefined,
            staleTime: Infinity,
        })),
    isEqual,
);
