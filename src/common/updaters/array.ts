import type { ArrayIterator } from 'src/common/types/main';

export const insert = <T>(array: T[], item: T, predicate: ArrayIterator<T>) => {
    const splitIndex = array.findIndex(predicate);

    if (splitIndex < 0) {
        return array;
    }

    return [...array.slice(0, splitIndex), item, ...array.slice(splitIndex, array.length)];
};

export const replace = <T>(array: T[], replacement: T, splitIndex: number) => {
    if (splitIndex < 0) {
        return array;
    }

    return [...array.slice(0, splitIndex), replacement, ...array.slice(splitIndex + 1, array.length)];
};

export const substitute = <T>(array: T[], replacement: T, predicate: ArrayIterator<T>) => {
    const splitIndex = array.findIndex(predicate);

    return replace(array, replacement, splitIndex);
};

export const moveIndex = (arr: number[] = [], from: number, to: number) => {
    const element = arr[from];
    const newArr = arr.toSpliced(from, 1);

    return newArr.toSpliced(to, 0, element);
};
