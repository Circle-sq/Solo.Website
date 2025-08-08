import * as t from 'io-ts';
import { buildValidator } from '@solo-webapi/mobx-utils/buildValidator';

const numberIO = t.union([t.number, t.string]);
const decodeNumber = buildValidator('decodeNumber', numberIO);

export const decodeNumberId = (id: number): number | null => {
    //TODO - to remove
    const idDecoded = decodeNumber(id);

    if (idDecoded instanceof Error) {
        console.error(id);

        console.error(idDecoded);

        return null;
    }

    if (typeof idDecoded === 'string') {
        return parseInt(idDecoded, 10);
    }

    return idDecoded;
};
