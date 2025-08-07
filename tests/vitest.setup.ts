import '@testing-library/jest-dom/vitest';
import { matchers as emotionMatchers } from '@emotion/jest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect, vi } from 'vitest';
import 'cross-fetch/polyfill';

import { server } from './unit/mocks/server.setup';

vi.mock('src/appState/AppState');
vi.mock('src/ui/common/Language/I18n');

expect.extend(matchers);
expect.extend({
    toHaveStyleRule: emotionMatchers.toHaveStyleRule,
});

beforeAll(() => server.listen());
