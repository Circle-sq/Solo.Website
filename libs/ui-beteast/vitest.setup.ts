import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { matchers as emotionMatchers } from '@emotion/jest';
import { expect } from 'vitest';

expect.extend(matchers);
expect.extend({
    toHaveStyleRule: emotionMatchers.toHaveStyleRule,
});
