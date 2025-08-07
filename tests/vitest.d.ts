import type { EmotionMatchers } from '@emotion/jest';

interface CustomMatchers<T = unknown> {
    toHaveStyleRule: EmotionMatchers['toHaveStyleRule'];
}

declare module 'vitest' {
    interface Assertion<T = unknown> extends CustomMatchers<T> {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
}
