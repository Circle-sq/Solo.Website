import type { UniformParams } from '@solo-api/uniforms/types';

import { queryKeys } from './queryKeys';

describe('Uniforms QueryKeys', () => {
    test('should create the correct query key for retrieve', () => {
        const mockParams: UniformParams = {
            sport: 'basketball',
            uniformType: 'home',
        };

        const result = queryKeys.uniforms.retrieve(mockParams);

        expect(result.queryKey).toEqual(['uniforms', 'retrieve', mockParams]);
    });
});
