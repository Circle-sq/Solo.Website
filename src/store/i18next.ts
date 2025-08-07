import { atom } from 'jotai';

interface I18next {
    t: (key: string, defaultText: string, params?: Record<string, string | number>) => string;
}

// TODO Remove it after migrating to i18next
export const i18nextAtom = atom<I18next>({ t: () => '' });
