import { getPath, getViewBoxSize } from 'src/ui/common/LoaderSpinner/utils';

describe('utils.ts', () => {
    const radius = 20;

    it('should compute path depending on circle radius', () => {
        expect(getPath(radius)).toBe('M20 0c0-9.94-8.06-20-20-20');
    });

    it('should compute the size of the view box depending on the radius and strokeWidth', () => {
        expect(getViewBoxSize(2, 1, radius)).toBe('-20 -20 42 42');
    });
});
