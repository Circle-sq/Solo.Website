import { atom } from 'jotai';

import type { RouteName } from 'src/common/enums';

export const routeNameAtom = atom<RouteName>();

export const isSportModalOpenAtom = atom(false);

export const isLiveSportsModalOpenAtom = atom(false);

export const isSearchModalOpenAtom = atom(false);
