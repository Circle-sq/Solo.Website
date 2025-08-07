import type { ReactNode } from 'react';

export const clearAllUnusedParams = (text: string): string => {
    const regExp = new RegExp(`{[^{}]*}`, 'g');

    return text.replace(regExp, '');
};

export const getTranslationsWithOneParam = (text: string, param: string, paramValue: string | number) => {
    const regExp = new RegExp(`{${param}}`, 'g');

    return text.replace(regExp, typeof paramValue === 'number' ? paramValue.toString() : paramValue);
};

export const getTranslationsWithParams = (
    translationValue: string,
    params: Record<string, string | number>,
): string => {
    let result = translationValue;

    for (const [param, paramValue] of Object.entries(params)) {
        result = getTranslationsWithOneParam(result, param, paramValue);
    }

    result = clearAllUnusedParams(result);

    return result;
};

export const convertStringToObject = (params: string[]): Record<string, string> => {
    const result = params.reduce((map: Record<string, string>, obj: string) => {
        const paramArray = obj.split('=');
        const fieldName = paramArray[0] && paramArray[0].trim();
        const fieldValue = paramArray[1] && paramArray[1].replace(/\"/g, '');

        map[fieldName] = fieldValue;

        return map;
    }, {});

    return result;
};

export const splitMultiDelimeters = (str: string, tokens: RegExpMatchArray): string[] => {
    let arr: string[] = [];
    let helperString;

    tokens.map((token: string, index: number) => {
        if (!index) {
            helperString = str.substring(0, str.indexOf(token));
        } else {
            helperString = str.substring(str.indexOf(tokens[index - 1]) + tokens[index - 1].length, str.indexOf(token));
        }

        arr.push(helperString, token);
    });
    const lastElement = tokens[tokens.length - 1];

    lastElement && arr.push(str.substring(str.indexOf(lastElement) + lastElement.length, str.length));

    arr = arr.filter((token: string) => token !== '');

    return arr;
};

export interface LanguageTokenType {
    tag: string;
    params: Record<string, string>;
}

export const splitTranslation = (text: string): (string | LanguageTokenType)[] => {
    const tags = text.match(/\[(.*?)\]/g);
    const splittedArray = tags ? splitMultiDelimeters(text, tags) : [text];

    const objectParamArray =
        splittedArray &&
        splittedArray.map((singleParam: string) => {
            if (tags && tags.includes(singleParam)) {
                const tagValue = singleParam
                    .replace(/\[/g, '')
                    .replace(/]/g, '')
                    .split(/{([^}]+)}/g)
                    .filter(function (str: string) {
                        return /\S/.test(str);
                    });

                return { tag: tagValue[0].trim(), params: convertStringToObject(tagValue.splice(1, tagValue.length)) };
            } else {
                return singleParam;
            }
        });

    return objectParamArray;
};

export function translateTokens(text: string, mapFunc: (token: LanguageTokenType) => ReactNode): ReactNode {
    return splitTranslation(text).map((item) => {
        if (typeof item === 'string') {
            return item;
        }

        return mapFunc(item);
    });
}
