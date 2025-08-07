interface ResultReady<T> {
    readonly type: 'ready';
    readonly value: T;
}

interface ResultLoading {
    readonly type: 'loading';
}

export type Result<T> = ResultReady<T> | ResultLoading;

export const createResultReady = <T>(value: T): Result<T> => ({
    type: 'ready',
    value,
});
