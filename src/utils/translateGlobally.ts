import type { AppState } from '../appState/AppState';

type GetTranslationType = (langKey: string, defaultText: string, params?: Record<string, string | number>) => string;

/**
 * Translate text using it's defaults and params.
 *
 * @param {string} langKey
 * @param {string} defaultText
 * @param {object} [params]
 * @returns {string}
 */
function defaultGetTranslation(
    _langKey: string,
    defaultText: string,
    params: Record<string, string | number> = {},
): string {
    return defaultText.replace(/{\s*([^}]+)\s*}/g, (_, name) => (params[name] === null ? '' : `${params[name]}`));
}

/**
 * Get available global getTranslation implementation.
 * It will either use global appState or dummy translation function.
 *
 * @returns {function(string, string[, object]): string}
 */
function getGetTranslationImplementation(): GetTranslationType {
    const appState: AppState | null = typeof window === 'undefined' ? null : window.$appState;

    return appState ? appState.language.getTranslation : defaultGetTranslation;
}

/**
 * Translate text globally, using best possible algorithm.
 *
 * @param {function(function: string): string}translate
 */
function translateGlobally(translate: (getTranslation: GetTranslationType) => string) {
    return translate(getGetTranslationImplementation());
}

export default translateGlobally;
