const REGEXP_SPECIAL_CHAR = /[\!\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;

export const escapeRegExp = (text: string): string => {
    return text.replace(REGEXP_SPECIAL_CHAR, '\\$&');
};
