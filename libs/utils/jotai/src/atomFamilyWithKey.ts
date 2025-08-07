import { atomFamily, atomWithReset } from 'jotai/utils';

import { jotaiCallback } from './jotaiCallback';
import type { AtomEffects, Cleanup, DefaultValue, Primitive, WritableAtomWithReset } from './types';

interface AtomFamilyParams<TValue, TParam extends Primitive> {
    key: string;
    default: DefaultValue<TValue, TParam>;
    effects?: AtomEffects<TValue, TParam>;
}

export function atomFamilyWithKey<TValue, TParam extends Primitive>(params: AtomFamilyParams<TValue, TParam>) {
    const anAtomFamily = atomFamily((param: TParam): WritableAtomWithReset<TValue> => {
        const defaultValue =
            typeof params.default === 'function'
                ? (params.default as (param: TParam) => TValue)(param)
                : params.default;

        const anAtom = atomWithReset(defaultValue);

        anAtom.debugLabel = `${params.key}-${param as string}`;

        return anAtom;
    });

    const effectsToUnsubscribe = new Map<TParam, Array<void | Cleanup>>();

    anAtomFamily.unstable_listen((event) => {
        const effects = typeof params.effects === 'function' ? params.effects(event.param) : params.effects;

        if (!effects) {
            return;
        }

        if (event.type === 'CREATE') {
            const unsubscribeEffects = effects.map((effect) => {
                const transactEffect = jotaiCallback(({ get, set }) => (node: WritableAtomWithReset<TValue>) => {
                    return effect({ get, set, node });
                });

                return transactEffect(event.atom);
            });

            effectsToUnsubscribe.set(event.param, unsubscribeEffects);
        } else if (event.type === 'REMOVE') {
            const unsubscribeEffects = effectsToUnsubscribe.get(event.param);

            unsubscribeEffects?.forEach((unsubscribe) => {
                unsubscribe?.();
            });

            effectsToUnsubscribe.delete(event.param);
        }
    });

    return anAtomFamily;
}
