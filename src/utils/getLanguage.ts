import isEmpty from 'lodash/isEmpty';

import { PortalLanguageShortcuts } from '@solo-webapi/handlers/handlerDynamicContent/types';

const isLanguageDefined = (lang: string | undefined): lang is string => {
    return !isEmpty(lang);
};

export function getLanguage(language: string | undefined): string {
    if (!isLanguageDefined(language)) {
        return PortalLanguageShortcuts.ko;
    }

    if (PortalLanguageShortcuts[language]) {
        return PortalLanguageShortcuts[language];
    }

    return language;
}
