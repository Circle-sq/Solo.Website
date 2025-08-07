import stringify from 'csv-stringify';
import * as fs from 'fs';

import type { TranslationItem } from './types';

const getOrCreate = (mapOut: Map<string, Set<string>>, langKey: string): Set<string> => {
    const item = mapOut.get(langKey);

    if (item !== undefined) {
        return item;
    }

    const newValue: Set<string> = new Set();

    mapOut.set(langKey, newValue);

    return newValue;
};

const joinSet = (defaultText: Set<string>): string => {
    const out = [];

    for (const item of defaultText) {
        out.push(item);
    }

    if (out.length > 0) {
        return out.join(', ');
    }

    return '';
};

export class ReportSortedMap {
    private data: Map<string, string>;

    constructor(list: TranslationItem[], allowDuplicate: Set<string>) {
        const data: Map<string, Set<string>> = new Map();

        for (const item of list) {
            const { langKey, defaultText } = item;

            getOrCreate(data, langKey).add(defaultText);
        }

        const keysSorted: string[] = [];

        for (const keyItem of data.keys()) {
            keysSorted.push(keyItem);
        }

        keysSorted.sort();

        const outMap: Map<string, string> = new Map();

        for (const keysSortedItem of keysSorted) {
            const childItem = data.get(keysSortedItem);

            if (!childItem) {
                throw Error(`Lang ${keysSortedItem}, Incorrect branch`);
            }

            if (childItem.size !== 1 && allowDuplicate.has(keysSortedItem) === false) {
                throw Error(`Lang ${keysSortedItem}, Duplicated text`);
            }

            const joined = joinSet(childItem); //TODO - hack

            outMap.set(keysSortedItem, joined);
        }

        this.data = outMap;
    }

    show() {
        for (const [key, value] of this.data) {
            console.info(`${key} -> ${value}`);
        }
    }

    saveAsCsvToFile(filePath: string) {
        const records = [];
        const columns = {
            id: 'langKey',
            name: 'Default text',
        };

        for (const [key, value] of this.data) {
            records.push([key, value]);
        }

        stringify(records, { header: true, columns: columns }, (err, output) => {
            if (err) {
                throw err;
            }

            fs.writeFile(filePath, output, (err: unknown) => {
                if (err) {
                    throw err;
                }

                console.log(`${filePath} saved.`);
            });
        });
    }
}
