import isUndefined from 'lodash/isUndefined';

export interface ValueStorage<T> {
    setItem(value: T): void;
    getItem(notSetValue?: T): null | T;
    removeItem(): void;
}

export type PartialStorage = Pick<Storage, 'setItem' | 'getItem' | 'removeItem'>;

const StubStorage: PartialStorage = {
    setItem(key: string, value: string) {
        console.info('no storage to set', key, value);
    },

    getItem(key: string) {
        console.info('no storage to get', key);

        return null;
    },

    removeItem(key: string) {
        console.info('no storage to remove', key);
    },
};

type StorageService = <T>(key: string) => ValueStorage<T>;
type StorageServiceBuilder = (localStorage?: PartialStorage) => StorageService;

type SimpleStorageService = (key: string) => ValueStorage<string>;
type SimpleStorageServiceBuilder = (localStorage?: PartialStorage) => SimpleStorageService;

type StorageProvider = () => PartialStorage;

let tryCount = 0;
let localStorageIsAvailable = false;

export const storageIsAvailable = (getStorage: StorageProvider): boolean => {
    if (localStorageIsAvailable) {
        return true;
    }

    tryCount += 1;

    try {
        const key = '__TEST__LOCAL_STORAGE_IS_ACCESSIBLE__';

        getStorage().setItem(key, key);
        getStorage().removeItem(key);
        localStorageIsAvailable = true;
        process.env.NODE_ENV !== 'test' && console.info(` done checking localStorage presence #${tryCount}`);

        return true;
    } catch (_e) {
        return false;
    }
};

export const testUtilReset = () => {
    localStorageIsAvailable = false;
};

export const storageServiceBuilder: StorageServiceBuilder = (localStorage = StubStorage) => {
    return <T>(key: string): ValueStorage<T> => {
        return {
            setItem(value: T) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error('Storage:', error.message);
                    }
                }
            },

            getItem(notSetValue?: T): T | null {
                const val = localStorage.getItem(key);

                if (val !== null) {
                    return JSON.parse(val) as T;
                }

                if (!isUndefined(notSetValue)) {
                    return notSetValue;
                }

                return null;
            },

            removeItem() {
                localStorage.removeItem(key);
            },
        };
    };
};

export const simpleStorageServiceBuilder: SimpleStorageServiceBuilder = (localStorage = StubStorage) => {
    return (key: string): ValueStorage<string> => {
        return {
            setItem(value: string) {
                localStorage.setItem(key, value);
            },

            getItem(defaultValue?: string): string | null {
                const val = localStorage.getItem(key);

                if (val !== null) {
                    return val;
                }

                if (!isUndefined(defaultValue)) {
                    return defaultValue;
                }

                return null;
            },

            removeItem() {
                localStorage.removeItem(key);
            },
        };
    };
};

let buildStorageService = storageServiceBuilder();

if (storageIsAvailable(() => window.localStorage)) {
    buildStorageService = storageServiceBuilder(window.localStorage);
}

export default buildStorageService;

export const getStorageBuilder = (
    storageProvider = (): PartialStorage => window.localStorage,
): SimpleStorageService => {
    if (storageIsAvailable(storageProvider)) {
        return simpleStorageServiceBuilder(storageProvider());
    }

    return simpleStorageServiceBuilder();
};
