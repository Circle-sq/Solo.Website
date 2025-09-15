export const getLines = (str: string, limit: number): string[] => {
    const words: string[] = str.split(' ');

    let firstLine = '';
    let secondLine = '';

    if (words.length === 1) {
        return [str, ''];
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
