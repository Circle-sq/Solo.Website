import { atom } from 'recoil';

export const currentMarketAtom = atom<number>({
    key: 'currentMarketAtom',
    default: 0,
});
