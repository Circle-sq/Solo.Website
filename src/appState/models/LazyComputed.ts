import type * as t from 'io-ts';
import type { IComputedValue } from 'mobx';
import { computed } from 'mobx';

import { buildValidator } from '@sc-webapi/mobx-utils/buildValidator';

type GetterFnType<A> = (data: unknown) => A;

const buildGetter = <A>(label: string, IO: t.Type<A, A>, defaultValue: A): GetterFnType<A> => {
    const decode = buildValidator(label, IO, true);

    return (data: unknown): A => {
        const decodedData = decode(data);

        if (decodedData instanceof Error) {
            console.error(decodedData);

            return defaultValue;
        }

        return decodedData;
    };
};

export class LazyComputed<T> {
    private innerComputed: null | IComputedValue<T>;

    constructor(
        private readonly fn: () => T,
        private readonly equals?: (a: T, b: T) => boolean,
    ) {
        this.innerComputed = null;
    }

    get(): T {
        if (this.innerComputed === null) {
            if (this.equals === undefined) {
                this.innerComputed = computed(this.fn);
            } else {
                this.innerComputed = computed(this.fn, { equals: this.equals });
            }
        }

        return this.innerComputed.get();
    }

    static create<T>(fn: () => T, equals?: (a: T, b: T) => boolean): LazyComputed<T> {
        return new LazyComputed(fn, equals);
    }
}

export const lazyComputedField = <T>(
    label: string,
    IO: t.Type<T, T>,
    defaultValue: T,
    fn: () => unknown,
    equals?: (a: T, b: T) => boolean,
): LazyComputed<T> => {
    const getT = buildGetter(label, IO, defaultValue);

    return new LazyComputed((): T => {
        const result = getT(fn());

        return result;
    }, equals);
};

export const compareArrays = <T>(a: T[], b: T[]): boolean => {
    if (a.length !== b.length) {
        return false;
    }

    const max = a.length;

    for (let i = 0; i < max; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
};
