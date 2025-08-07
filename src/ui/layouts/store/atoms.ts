import { atom } from 'recoil';

export const selectedCountryAtom = atom<string | null>({
    key: 'selectedCountryAtom',
    default: null,
});

export const reloadCountersAtom = atom({
    key: 'reloadCountersAtom',
    default: false,
});
