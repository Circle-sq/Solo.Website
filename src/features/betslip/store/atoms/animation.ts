import { atom } from 'recoil';

export const animationSubstitutionTagAtom = atom<number | null>({
    key: 'animationSubstitutionTagAtom',
    default: null,
});

export const animationRecordsAtom = atom<Record<string, number>>({
    key: 'animationRecordsAtom',
    default: {},
});
