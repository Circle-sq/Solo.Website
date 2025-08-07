import { createStore } from 'jotai';

type Store = ReturnType<typeof createStore>;

export const store: Store = createStore();
