import get from 'lodash/get';
import isNil from 'lodash/isNil';

type ValueIfDefined<T, K> = K extends keyof T ? T[K] : never;

const nonNullableGenericType = <T>(stats?: T | null | NonNullable<unknown>): stats is T => !isNil(stats);

export const safeGet = <T, K extends keyof T, D = ValueIfDefined<T, K>>(
    obj: T | undefined | null | NonNullable<unknown>,
    key: K,
    defaultValue?: D,
): D => {
    const value = get(obj, key);

    return nonNullableGenericType(value) ? value : (defaultValue as D);
};
