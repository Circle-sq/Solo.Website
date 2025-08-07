import { useMemo } from 'react';

import { escapeRegExp } from 'src/utils/text';

import { areEqual, getCorrectQuery, getParts } from './helpers';
import { S_HighlightStrong } from './styled';

interface Props {
    name: string;
    query: string;
}

const HighlightedText = ({ name, query }: Props) => {
    const parts = useMemo(() => {
        const correctQuery = getCorrectQuery(name, query);
        const splitName = name.split(new RegExp(escapeRegExp(query), 'i'));

        return getParts(correctQuery, splitName);
    }, [name, query]);

    return (
        <span>
            {parts.map((part, idx) => {
                const key = `${part}${idx}`;

                return areEqual(query, part) ? (
                    <S_HighlightStrong key={key}>{part}</S_HighlightStrong>
                ) : (
                    <span key={key}>{part}</span>
                );
            })}
        </span>
    );
};

export default HighlightedText;
