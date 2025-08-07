import type { AtomEffect } from 'recoil';

import type { FirstParameter } from 'src/common/types/main';

import { combinationsAtom } from '../atoms/combinations';
import { defineSystemBetType } from '../helpers/combinations';

export const syncSystemBetTypeEffect = ({
    trigger,
    setSelf,
    getLoadable,
}: FirstParameter<AtomEffect<string | undefined>>) => {
    if (trigger === 'get') {
        const combinations = getLoadable(combinationsAtom).getValue();

        setSelf(defineSystemBetType(combinations));
    }
};
