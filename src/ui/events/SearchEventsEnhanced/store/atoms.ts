import { atom } from 'jotai';

import { atomWithDebounce } from '@solo-utils/jotai';

import type { SportType } from 'src/common/enums';

import type { SearchWarning } from './types';

const DELAY = 400;

export const { currentValueAtom: searchCurrentValueAtom, debouncedValueAtom: searchDebouncedValueAtom } =
    atomWithDebounce('', DELAY);

export const searchWarningAtom = atom<SearchWarning | null>(null);

export const activeSportAtom = atom<SportType | null>(null);
