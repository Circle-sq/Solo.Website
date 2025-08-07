import { LANGUAGES } from 'src/utils/constants';
import type { LineLimit } from './types';

export const LIMIT_FOR_FIRST_LATIN_KOREAN_WORDS = 8;

export const FIRST_LINE_LIMIT: LineLimit = {
    [LANGUAGES.english]: {
        default: {
            max: 14,
        },
        uniform: {
            max: 9,
        },
    },
    [LANGUAGES.korean]: {
        default: {
            max: 9,
        },
        uniform: {
            max: 6,
        },
    },
};
