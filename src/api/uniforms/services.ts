import { api } from '@solo-api/api';

import type { Uniform, UniformParams } from './types';

export const UniformsService = {
    retrieve: async ({ sport, uniformType }: UniformParams): Promise<Uniform[]> => {
        return api.get(`/uniforms/${sport}/player/${uniformType}`);
    },
};
