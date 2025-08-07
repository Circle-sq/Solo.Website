type ResolveFn<T> = (data: T) => void;
type RejectFn = (err: unknown) => void;

export interface PromiseBox<T> {
    promise: Promise<T>;
    resolve: ResolveFn<T>;
    reject: RejectFn;
    isFulfilled: () => boolean;
}

export const createPromiseBox = <T>(): PromiseBox<T> => {
    let resolve: null | ResolveFn<T> = null;
    let reject: RejectFn | null = null;
    let isFulfilled = false;

    const promise: Promise<T> = new Promise((localResolve: ResolveFn<T>, localReject: RejectFn) => {
        resolve = (data: T) => {
            isFulfilled = true;
            localResolve(data);
        };

        reject = (err: unknown) => {
            isFulfilled = true;
            localReject(err);
        };
    });

    if (resolve === null) {
        throw Error('createPromise - resolve is null');
    }

    if (reject === null) {
        throw Error('createPromise - reject is null');
    }

    return {
        promise,
        resolve,
        reject,
        isFulfilled: () => isFulfilled,
    };
};
