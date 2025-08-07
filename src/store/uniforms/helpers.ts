import type { UniformType } from '@sc-api/uniforms/types';

export const parseUniformUrlParams = (uniformUrl: string) => {
    const [sport, , playerId, uniformType] = uniformUrl.split('/').filter(Boolean);

    return { sport, playerId, uniformType: uniformType as UniformType };
};
