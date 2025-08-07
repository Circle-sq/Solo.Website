import includes from 'lodash/includes';
import uniq from 'lodash/uniq';

export const filter =
    <T>(predicate: (value: T, index: number, array: T[]) => boolean) =>
    (state: T[]) =>
        state.filter(predicate);

export const push =
    <T>(item: T) =>
    (state: T[]) => [...state, item];

export const removeId =
    <T extends string | number>(id: T) =>
    (state: T[]) =>
        filter<T>((familyId) => familyId !== id)(state);

export const toggleId =
    <T extends string | number>(id: T) =>
    (state: T[]) => {
        if (includes(state, id)) {
            return removeId<T>(id)(state);
        }

        return uniq(push<T>(id)(state));
    };
