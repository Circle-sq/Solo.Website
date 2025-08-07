import type { Testable } from 'src/utils/Testable/types';
export interface Props extends Testable {
    lineHeight?: number;
    maxLines?: number;
    text?: string;
    title?: string;
    typeLine?: string;
}

export interface LineLimit {
    [key: string]: Record<string, Record<string, number>>;
}

export type EllipsisContainer = Partial<Props>;
export type Lang = 'ko-KR' | 'en-US';
