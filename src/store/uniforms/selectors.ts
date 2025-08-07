import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { parseUniformUrlParams } from './helpers';
import { uniformsAtomFamilyWithQuery } from './queries';

export const uniformUrlSelectorFamily = atomFamily((uniformUrl: string) =>
    atom<string | undefined>((get) => {
        const { playerId, ...params } = parseUniformUrlParams(uniformUrl);
        const { data: uniforms } = get(uniformsAtomFamilyWithQuery(params));

        return uniforms?.[playerId]?.image.url;
    }),
);
