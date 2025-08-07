import { api } from '@sc-api/api';

import type { Uniform, UniformParams } from './types';

export const UniformsService = {
    retrieve: async ({ sport, uniformType }: UniformParams): Promise<Uniform[]> => {
        return api.get(`/uniforms/${sport}/player/${uniformType}`);
    },
};
