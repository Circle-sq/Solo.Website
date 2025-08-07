import type { Atom, WritableAtom } from 'jotai';
import type { RESET } from 'jotai/utils';

export type Primitive = undefined | null | boolean | number | symbol | string;

export type DefaultValue<TValue, TParam extends Primitive> = TValue | ((param: TParam) => TValue);

export interface CallbackParams {
    get: <TValue>(anAtom: Atom<TValue>) => TValue;
    set: <TValue, Update extends unknown[]>(atom: WritableAtom<TValue, Update, void>, ...update: Update) => void;
}

export type AtomEffects<TValue, TParam extends Primitive> =
    | ReadonlyArray<EffectFn<TValue>>
    | ParameterizedEffectFn<TValue, TParam>;

export type ParameterizedEffectFn<TValue, TParam> = (param: TParam) => ReadonlyArray<EffectFn<TValue>>;

export type EffectFn<TValue> = (args: EffectArgs<TValue>) => void | Cleanup;

export interface EffectArgs<TValue> extends CallbackParams {
    node: WritableAtomWithReset<TValue>;
}

export type Cleanup = () => void;

export type WritableAtomWithReset<TValue> = WritableAtom<TValue, [SetStateActionWithReset<TValue>], void> &
    WithInitialValue<TValue>;

export type SetStateActionWithReset<TValue> = TValue | typeof RESET | UpdaterWithReset<TValue>;

export type UpdaterWithReset<TValue> = (prev: TValue) => TValue | typeof RESET;

interface WithInitialValue<TValue> {
    init: TValue;
}
