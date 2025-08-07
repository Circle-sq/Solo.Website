import { atom, atomFamily } from 'recoil';

import { PersistKey, recoilPersist } from 'src/common/recoil/persist';
import type { TimeOut } from 'src/common/types/main';

const { persistAtom } = recoilPersist(PersistKey.BuildABet);

export const enabledBuildABetIdsAtom = atom<number[]>({
    key: 'enabledBuildABetIdsAtom',
    default: [],
    effects: [persistAtom],
});

export const hasBuildABetMaximumSelectionsAtomFamily = atomFamily<boolean, number | undefined>({
    key: 'hasBuildABetMaximumSelectionsAtomFamily',
    default: false,
    effects: [
        ({ onSet, resetSelf }) => {
            let timeoutId: TimeOut | null = null;
            const timeoutNumber = 10000;

            onSet(() => {
                if (timeoutId !== null) {
                    clearTimeout(timeoutId);
                }

                timeoutId = setTimeout(resetSelf, timeoutNumber);
            });

            return () => {
                if (timeoutId !== null) {
                    clearTimeout(timeoutId);
                }
            };
        },
    ],
});
