export interface LanguageStore {
    getTranslation: (key: string, defaultText: string, params?: Record<string, string | number>) => string;
}
