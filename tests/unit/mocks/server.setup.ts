import { setupServer } from 'msw/node';

import { createAnonymousSessionHandler, iconsHandlers } from './handlers';

const handlers = [createAnonymousSessionHandler, ...iconsHandlers];

export const server = setupServer(...handlers);
