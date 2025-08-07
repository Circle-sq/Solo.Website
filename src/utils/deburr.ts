import deburr from 'lodash/deburr';
import split from 'lodash/split';
import toLower from 'lodash/toLower';
import replace from 'lodash/replace';

const CHANGE_CHARACTERS = {
    from: split('ęóąśłżźćńĘÓĄŚŁŻŹĆŃ', ''),
    to: split('eoaslzzcnEOASLZZCN', ''),
};

const NOT_STANDARD = /([^abcdefghijklmnopqrstuvwxyz0123456789]+)/g;

export default function lodashDeburr(rawStr: string): string {
    let str = rawStr;

    str = deburr(str);

    for (let i = CHANGE_CHARACTERS.from.length - 1; i >= 0; i--) {
        str = split(str, CHANGE_CHARACTERS.from[i]).join(CHANGE_CHARACTERS.to[i]);
    }

    return str;
}

export const slug = (rawStr: string): string => replace(toLower(rawStr), NOT_STANDARD, '-');
