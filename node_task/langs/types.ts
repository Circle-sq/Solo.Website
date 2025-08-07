export interface TranslationItem {
    langKey: string;
    defaultText: string;
    file: string;
}

export interface MatchWordResult {
    word: string;
    rest: string;
}

export interface FindTextResultType {
    beginText: string;
    pos: number;
    endText: string;
}

export type TokenizeInnerTextResult = [string[], string] | null;

export type MatchWordType = (text: string) => MatchWordResult | null;
