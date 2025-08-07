import { isTotalLikeGroup } from 'src/ui/events/DisplayTemplates/OverUnderDisplayTemplate/isGroupTotalLike';

describe('isTotalLikeGroup', () => {
    test('should return true if label is part of the array', () => {
        const label = 'apple';
        const array = ['orange', 'apple', 'banana'];
        const result = isTotalLikeGroup(label, array);
        expect(result).toBe(true);
    });

    test('should return true if label contains any item from the array', () => {
        const label = 'apple pie';
        const array = ['orange', 'apple', 'banana'];
        const result = isTotalLikeGroup(label, array);
        expect(result).toBe(true);
    });

    test('should return false if label is not part of the array and does not contain any item from the array', () => {
        const label = 'grape';
        const array = ['orange', 'apple', 'banana'];
        const result = isTotalLikeGroup(label, array);
        expect(result).toBe(false);
    });

    test('should return false for an empty array', () => {
        const label = 'apple';
        const array: string[] = [];
        const result = isTotalLikeGroup(label, array);
        expect(result).toBe(false);
    });

    test('should return false for an empty label', () => {
        const label = '';
        const array = ['orange', 'apple', 'banana'];
        const result = isTotalLikeGroup(label, array);
        expect(result).toBe(false);
    });

    test('should return false for an empty label and empty array', () => {
        const label = '';
        const array: string[] = [];
        const result = isTotalLikeGroup(label, array);
        expect(result).toBe(false);
    });
});
