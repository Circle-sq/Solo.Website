import { atom } from 'recoil';

export const scrollBarAtom = atom<number | null>({
    key: 'scrollBarAtom',
    default: null,
});

export const scrollBarTopPositionAtom = atom<number>({
    key: 'scrollBarTopPositionAtom',
    default: 0,
});
