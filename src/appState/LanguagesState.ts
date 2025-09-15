import includes from 'lodash/includes';
import isUndefined from 'lodash/isUndefined';
import { action, makeObservable, observable } from 'mobx';
import type { ReactNode } from 'react';

import { getDocumentLang } from 'src/utils/common';
import { LANGUAGES, DASH } from 'src/utils/constants';

import isEmptyString from '../utils/isEmptyString';

import type { LanguageTokenType } from './LanguagesState/LanguagesUtils';
import { getTranslationsWithParams, translateTokens as translateTokensUtil } from './LanguagesState/LanguagesUtils';
import type { LanguageStore } from './LanguageStore';
import { convertMapToRecord, convertMapToRecordDefault, convertRecordToMap, convertRecordToMapDefault } from './utils';

export interface LangDetailsMapType {
    description: string;
    properties: Map<string, string>;
}

export interface LangDetailsRecordType {
    description: string;
    properties: Record<string, string>;
}

export interface LanguageItem {
    id: string;
    description: string;
}

const exportLanguagesItem = (langDetails: LangDetailsMapType): LangDetailsRecordType => ({
    description: langDetails.description,
    properties: convertMapToRecordDefault(langDetails.properties),
});

export const exportLanguages = (
    allTranslations: Map<string, LangDetailsMapType>,
): Record<string, LangDetailsRecordType> => convertMapToRecord(allTranslations, exportLanguagesItem);

const importLanguagesItem = (langDetails: LangDetailsRecordType): LangDetailsMapType => ({
    description: langDetails.description,
    properties: convertRecordToMapDefault(langDetails.properties),
});

export const importLanguages = (
    allTranslations: Record<string, LangDetailsRecordType>,
): Map<string, LangDetailsMapType> => convertRecordToMap(allTranslations, importLanguagesItem);

export class LanguagesState implements LanguageStore {
    readonly allTranslations: Map<string, LangDetailsMapType>;
    userLang: string | null;
    userLangShort: string;
    translationsDisplayDebug: boolean;

    constructor(allTranslations: Record<string, LangDetailsRecordType>, userLang: string | null) {
        makeObservable(this, {
            userLang: observable,
            translationsDisplayDebug: observable,
            translationsDisplayDebugShow: action,
            translationsDisplayDebugHide: action,
            setUserLang: action,
        });

        this.allTranslations = importLanguages(allTranslations);

        this.userLang = userLang ?? LANGUAGES.englishGB;

        this.userLangShort = userLang && includes(userLang, DASH) ? userLang.split(DASH)[0] : LANGUAGES.en;

        this.translationsDisplayDebug = true;
    }

    static createForContext(): LanguagesState {
        return new LanguagesState({}, null);
    }

    allTranslationsExport(): Record<string, LangDetailsRecordType> {
        return exportLanguages(this.allTranslations);
    }

    getTranslationsReverse = (keys: string[]): string[] => {
        const lang = this.userLang !== null ? this.userLang : getDocumentLang();

        return lang === LANGUAGES.korean ? keys.reverse() : keys;
    };

    getTranslation = (key: string, defaultText: string, params?: Record<string, string | number>): string => {
        if (this.translationsDisplayDebug === false) {
            return '.';
        }

        if (this.userLang) {
            const langTranslations = this.allTranslations.get(this.userLang);

            if (langTranslations) {
                const translationValue = langTranslations.properties.get(key);

                if (typeof translationValue === 'string' && !isEmptyString(translationValue)) {
                    return this.translate(translationValue, params);
                }
            }
        }

        return this.translate(defaultText, params);
    };

    private translate(translationValue: string, params: Record<string, string | number> | undefined) {
        if (params) {
            return getTranslationsWithParams(translationValue, params);
        }

        return translationValue;
    }

    getLanguages(): LanguageItem[] {
        const languages: LanguageItem[] = [];

        for (const [id, value] of this.allTranslations.entries()) {
            if (value.properties.size) {
                languages.push({
                    id,
                    description: value.description,
                });
            }
        }

        if (languages.length > 0) {
            return languages;
        }

        return [];
    }

    translateTokens(text: string, mapFunc: (token: LanguageTokenType) => ReactNode) {
        return translateTokensUtil(text, mapFunc);
    }

    translationsDisplayDebugShow() {
        this.translationsDisplayDebug = true;
    }

    translationsDisplayDebugHide() {
        this.translationsDisplayDebug = false;
    }

    setUserLang(lang: string) {
        localStorage.setItem('userLang', lang);

        if (!isUndefined(this)) {
            this.userLang = lang;
        }
    }
}
