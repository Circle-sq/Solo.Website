import { cssColor, opacityToHex, toColor } from './utilities';

test('should return var with color', () => {
    expect(cssColor('--body-bg')).toBe('var(--body-bg, #00FF30)');
    expect(toColor('grey.600:50%')).toBe('#3b3b3b80');
    expect(opacityToHex('50%')).toBe('80');
    expect(opacityToHex('100%')).toBe('FF');
    expect(opacityToHex('5%')).toBe('0D');
    expect(toColor('grey.600:34%')).toBe('#3b3b3b57');
    expect(opacityToHex('34%')).toBe('57');
});
