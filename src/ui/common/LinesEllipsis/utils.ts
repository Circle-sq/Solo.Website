import { LIMIT_FOR_FIRST_LATIN_KOREAN_WORDS } from './configs';
import { NUMBERS } from 'src/utils/constants';

export const isKorean = (text: string): boolean => /[가-힣]/.test(text);

export const getLines = (str: string, limit: number, isKoreanParticipant?: boolean): string[] => {
    const words: string[] = str.split(' ');

    let firstLine = '';
    let secondLine = '';

    if (words.length === 1) {
        return [str, ''];
    }

    if (
        !isKorean(words[0]) &&
        !isKorean(words[1]) &&
        words[0].length + words[1].length <= LIMIT_FOR_FIRST_LATIN_KOREAN_WORDS &&
        Boolean(isKoreanParticipant)
    ) {
        return [`${words[0]} ${words[1]}`, words.slice(NUMBERS.two).join(' ')];
    }

    words.forEach((word, index) => {
        const currentWordLength = word.length;
        const nextWord = words[index + 1];

        if (
            (nextWord && index === 0 && currentWordLength + nextWord.length <= limit) ||
            (secondLine.length === 0 && firstLine.length + currentWordLength <= limit)
        ) {
            firstLine += `${word} `;
        } else {
            secondLine += `${word} `;
        }
    });

    return [firstLine.trim(), secondLine.trim()];
};
