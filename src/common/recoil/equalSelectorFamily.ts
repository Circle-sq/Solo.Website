import type { ReadOnlySelectorFamilyOptions, RecoilValueReadOnly, SerializableParam } from 'recoil';
import { selectorFamily } from 'recoil';

interface EqualSelectorFamilyOptions<T, P extends SerializableParam> extends ReadOnlySelectorFamilyOptions<T, P> {
    propsAreEqual: (a: T, b: T) => boolean;
}

/**
 * Use a wrapper selectorFamily to prevent excess renders.
 * If the latest selection is value-equal to prior ref, return the prior ref.
 */
export function equalSelectorFamily<T, P extends SerializableParam>({
    key,
    get,
    propsAreEqual,
    ...options
}: EqualSelectorFamilyOptions<T, P>): (param: P) => RecoilValueReadOnly<T> {
    const inner = selectorFamily({
        key: `${key}_inner`,
        get,
    });

    const priors = new Map<string, T>();

    return selectorFamily<T, P>({
        key,
        cachePolicy_UNSTABLE: { eviction: 'most-recent' },
        get:
            (param) =>
            ({ get }) => {
                const innerValue = inner(param);
                const latest = get(innerValue);
                const priorKey = innerValue.key;

                if (priors.has(priorKey)) {
                    const prior = priors.get(priorKey) as T;

                    if (propsAreEqual(latest, prior)) {
                        return prior;
                    }
                }

                priors.set(priorKey, latest);

                return latest;
            },
        ...options,
    });
}
