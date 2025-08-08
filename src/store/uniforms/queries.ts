import { atomFamily } from 'jotai/utils';
import { atomWithQuery } from 'jotai-tanstack-query';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';

import { queryKeys } from '@solo-api/queryKeys';
import { UniformsService } from '@solo-api/uniforms/services';
import type { Uniform, UniformParams } from '@solo-api/uniforms/types';

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
