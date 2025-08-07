import { atom } from 'jotai';
import type { Atom, Getter } from 'jotai';
import { atomFamily } from 'jotai/utils';

import type { Primitive } from './types';

type SelectorFamily<TValue, TParam> = ReturnType<typeof atomFamily<TParam, Atom<TValue>>>;

interface SelectorFamilyParams<TValue, TParam extends Primitive> {
    key: string;
    get: (param: TParam) => ({ get }: { get: Getter }) => TValue;
}

export function selectorFamily<TValue, TParam extends Primitive>(
    params: SelectorFamilyParams<TValue, TParam>,
): SelectorFamily<TValue, TParam> {
    return atomFamily<TParam, Atom<TValue>>((param: TParam) => {
        const anAtom = atom<TValue>((get) => params.get(param)({ get }));

        if (process.env.NODE_ENV !== 'production') {
            anAtom.debugPrivate = true;
        }

        return anAtom;
    });
}
