import { getListFromDir, lstat, readFile } from '@solo-webapi/mobx-utils/stdfs';

import type {
    TranslationItem,
    MatchWordResult,
    MatchWordType,
    TokenizeInnerTextResult,
    FindTextResultType,
} from './types';

const trimStartEndQuotesSpaces = (input: string): string => {
    let trimmed = input.trim();

    const offset = 1;
    const startPosition = 0;
    const endPosition = trimmed.length - offset;

    const quotes = ['"', '`', "'"];

    if (!quotes.includes(trimmed.charAt(startPosition)) && !quotes.includes(trimmed.charAt(endPosition))) {
        return trimmed;
    }

    if (quotes.includes(trimmed.charAt(startPosition))) {
        trimmed = trimmed.substr(offset);
    }

    if (quotes.includes(trimmed.charAt(endPosition))) {
        trimmed = trimmed.substr(startPosition, trimmed.length - offset);
    }

    return trimStartEndQuotesSpaces(trimmed);
};

export const isJSFile = (path: string): boolean => {
    const chunks = path.split('.');
    const offset = 1;
    const totalValues = 0;

    if (chunks.length > totalValues) {
        const extension = chunks[chunks.length - offset];

        return ['ts', 'tsx', 'js', 'jsx'].includes(extension);
    }

    return false;
};

export const findText = (text: string, phrase: string, omitSlashes = false): FindTextResultType | null => {
    let posStart = text.indexOf(phrase);

    if (omitSlashes) {
        while (text.charAt(posStart - 1) === '\\') {
            posStart = text.indexOf(phrase, posStart + 1);
        }
    }

    if (posStart >= 0) {
        return {
            beginText: text.substr(0, posStart),
            pos: posStart,
            endText: text.substr(posStart + phrase.length),
        };
    }

    return null;
};

export const textMatchBegin = (text: string, phrase: string): string | null => {
    const findResult = findText(text, phrase);

    if (findResult !== null) {
        if (findResult.pos === 0) {
            return findResult.endText;
        }
    }

    return null;
};

export const countPhrase = (text: string, phrase: string): number => {
    let counter = 0;

    for (let i = 0; i < text.length; i++) {
        const fragmet = text.substr(i, phrase.length);

        if (fragmet === phrase) {
            counter++;
        }
    }

    return counter;
};

const splitHead = (text: string): [string, string] | null => {
    if (text.length > 0) {
        const firstChar = text[0];
        const rest = text.substr(1);

        return [firstChar, rest];
    }

    return null;
};

/*
    finding {..{}..{..{...}}...}
*/
export const matchJSONObject = (text: string): MatchWordResult | null | never => {
    const textHead = splitHead(text);

    if (textHead === null) {
        return null;
    }

    const [firstChar, rest] = textHead;

    const result: string[] = [firstChar];
    let textToParse = rest;

    if (firstChar === '{') {
        while (true) {
            const chunks = splitHead(textToParse);

            if (chunks === null) {
                throw Error('Parse error');
            }

            const [nextChar, nextToParse] = chunks;

            if (nextChar === '}') {
                result.push('}');

                return {
                    word: result.join(''),
                    rest: nextToParse,
                };
            }

            if (nextChar === '{') {
                const match = matchJSONObject(textToParse);

                if (match === null) {
                    throw Error('Error parse in matchJSONObject');
                }

                textToParse = match.rest;

                result.push(match.word);

                continue;
            }

            result.push(nextChar);

            textToParse = nextToParse;
        }
    }

    return null;
};

const matchOtherFn = (text: string): MatchWordResult | null => {
    for (const char of [',', ' ']) {
        const restResult = textMatchBegin(text, char);

        if (restResult !== null) {
            return {
                word: char,
                rest: restResult,
            };
        }
    }

    return null;
};

export const tokenizeInnerText = (row: string, endText: string, matchWord: MatchWordType): TokenizeInnerTextResult => {
    const tokens: string[] = [];
    let textParsed = row;

    const hasValue = true;

    while (hasValue) {
        const resultMatchEndText = textMatchBegin(textParsed, endText);

        if (resultMatchEndText !== null) {
            return [tokens, resultMatchEndText];
        }

        const resultMatchOtherChars = matchOtherFn(textParsed);

        if (resultMatchOtherChars !== null) {
            textParsed = resultMatchOtherChars.rest;

            continue;
        }

        const resultMatchWord = matchWord(textParsed);

        if (resultMatchWord !== null) {
            const { word, rest } = resultMatchWord;

            tokens.push(word);

            textParsed = rest;

            continue;
        }

        return null;
    }

    return null;
};

export const tokenize = (
    file: string,
    row: string,
    startText: string,
    endText: string,
    matchWord: MatchWordType,
): string[] | null | never => {
    if (countPhrase(row, startText) > 1) {
        console.info(`In file ${file}`);

        throw Error(`Parse error in tokenize 1: ${row}`);
    }

    const posStart = findText(row, startText);

    if (posStart !== null) {
        const tokensResult = tokenizeInnerText(posStart.endText, endText, matchWord);

        if (tokensResult === null) {
            console.info({
                endText1: posStart.endText,
                endText2: endText,
            });

            throw Error(`Error with tokenize in file ${file}`);
        }

        const [tokens, rest] = tokensResult;

        if (countPhrase(rest, startText) > 0) {
            console.info(`In file ${file}`);

            throw Error(`Parse error in tokenize 2: ${rest}`);
        }

        return tokens;
    }

    return null;
};

const getTranslationsFromFile = async (path: string): Promise<TranslationItem[]> => {
    const content = await readFile(path);

    const out: TranslationItem[] = [];

    if (isJSFile(path)) {
        const getTranslationRegex = /(?<=getTranslation\s*?\()(.*?)(?=(,\s*\))|\),|\);|,\s*{|\)}|\)\s*?:)/gms;
        const I18nRegex = /<I18n[^>]*>/g;

        const translationResult = content.match(getTranslationRegex);
        const jxsTranslationResult = content.match(I18nRegex);

        if (translationResult !== null) {
            for (const translation of translationResult) {
                const trimmedTranslation = translation.substr(1, translation.length - 2);
                const splitter = /(('|"|`)*\s*),(\s*('|"|`))/gims;
                const [langKey, defaultText] = trimmedTranslation.replace(splitter, '@@@').split('@@@');

                out.push({
                    langKey: trimStartEndQuotesSpaces(langKey),
                    defaultText: trimStartEndQuotesSpaces(defaultText),
                    file: path,
                });
            }
        }

        if (jxsTranslationResult !== null) {
            const groupPosition = 0;

            for (const translation of jxsTranslationResult) {
                const langKeyValue = /(?<=langKey=['"`]).*?(?=['"`]\s)/gms;
                const defaultTextValue = /(?<=defaultText=['"`]).*?(?=((`|"|')(\s|\/>)))/gms;

                const langKey = translation.match(langKeyValue);
                const defaultText = translation.match(defaultTextValue);

                if (langKey !== null && defaultText !== null) {
                    out.push({
                        langKey: trimStartEndQuotesSpaces(langKey[groupPosition]),
                        defaultText: trimStartEndQuotesSpaces(defaultText[groupPosition]),
                        file: path,
                    });
                }
            }
        }
    }

    return out;
};

export async function getTranslationsFromDirOrFile(basePath: string, path: string): Promise<TranslationItem[]> {
    const itemStat = await lstat(path);

    if (`${basePath}/node_task` === path) {
        return [];
    }

    if (`${basePath}/appState/LanguagesState.ts` === path) {
        return [];
    }

    if (`${basePath}/server_src` === path) {
        return [];
    }

    if (`${basePath}/ui/common/Language/I18n.tsx` === path) {
        return [];
    }

    const getTranslationsFromDir = async (basePath: string, srcPath: string): Promise<TranslationItem[]> => {
        const list = await getListFromDir(srcPath);

        let out: TranslationItem[] = [];

        const translationPromises: Promise<any>[] = [];

        for (const listItem of list) {
            translationPromises.push(getTranslationsFromDirOrFile(basePath, listItem));
        }

        const result = await Promise.all(translationPromises);

        for (const promiseItem of result) {
            out = out.concat(promiseItem);
        }

        return out;
    };

    return itemStat === 'file' ? getTranslationsFromFile(path) : getTranslationsFromDir(basePath, path);
}
