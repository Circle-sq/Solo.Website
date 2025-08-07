import { Provider, type WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { ReactNode } from 'react';

type AnyWritableAtom = WritableAtom<unknown, never[], unknown>;
type InferAtomTuples<T> = {
    [K in keyof T]: T[K] extends readonly [infer A, unknown]
        ? A extends WritableAtom<unknown, infer Args, infer _Result>
            ? readonly [A, Args[0]]
            : T[K]
        : never;
};

const HydrateAtoms = <T extends (readonly [AnyWritableAtom, unknown])[]>({
    values,
    children,
}: {
    values: InferAtomTuples<T>;
    children: ReactNode;
}) => {
    useHydrateAtoms(values);

    return children;
};

export const MockStoreProvider = <T extends (readonly [AnyWritableAtom, unknown])[]>({
    values,
    children,
}: {
    values: InferAtomTuples<T>;
    children: ReactNode;
}) => {
    return (
        <Provider>
            <HydrateAtoms values={values}>{children}</HydrateAtoms>
        </Provider>
    );
};
