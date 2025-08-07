import { atom } from 'recoil';

import { recoilPersist, PersistKey } from 'src/common/recoil/persist';

import type { EventMediaAtom } from './types';

const { persistAtom } = recoilPersist(PersistKey.AsianView);

export const eventMediaAtom = atom<EventMediaAtom>({
    key: 'eventMediaAtom',
    default: undefined,
    effects: [persistAtom],
});
