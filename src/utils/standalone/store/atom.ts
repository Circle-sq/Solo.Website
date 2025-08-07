import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const reInitTrackRenderDoneAtom = atom(false);

export const isBackFromEventPageAtom = atom(false);

export const guestCurrencyAtom = atomWithStorage<'KRW' | 'USD'>('guestCurrencyAtom', 'KRW', undefined, {
    getOnInit: true,
});
