global.window = {} as Window & typeof globalThis;

import 'mock-local-storage';

Object.defineProperty(window, 'localStorage', {
    value: global.localStorage,
});
