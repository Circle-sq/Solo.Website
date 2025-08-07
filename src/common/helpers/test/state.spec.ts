import { toggleState } from 'src/common/helpers/state';

describe('toggleState', () => {
    it('should toggle the input state', () => {
        expect(toggleState(true)).toBe(false);
        expect(toggleState(false)).toBe(true);
    });
});
