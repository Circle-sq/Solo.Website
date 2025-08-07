import type { SearchWarning } from './types';

export const searchWarnings: Record<string, SearchWarning> = {
    invalidCharacters: {
        langKey: 'search.error.invalidCharacters',
        defaultText:
            'Your search contains unsupported characters. Please use letters, numbers, spaces, or valid characters from supported languages',
    },
    maxLengthExceeded: {
        langKey: 'search.error.maxLengthExceeded',
        defaultText: 'Your search term exceeds the maximum allowed length of 30 characters.',
    },
};

export const MIN_SEARCH_LENGTH = 3;
