export type TimeOut = ReturnType<typeof setTimeout>;

export interface TimeRange<T = string> {
    from: T;
    to: T;
}

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

/**
 * Obtain the first parameter of a function type in a tuple
 */

export type FirstParameter<T> = T extends (...args: [infer FirstArg, ...infer Rest]) => unknown ? FirstArg : never;

/**
 * The callback invoked per iteration.
 */

export type ArrayIterator<T, TResult = unknown> = (value: T, index: number, collection: T[]) => TResult;
