import { escapeRegExp } from 'src/utils/text';

export const areEqual = (query: string, part: string) => query.toUpperCase() === part.toUpperCase();

export const getCorrectQuery = (name: string, query: string) => {
    const regex = new RegExp(escapeRegExp(query), 'i');
    const matchedQuery = name.match(regex);

    return matchedQuery ? matchedQuery[0] : query;
};

export const getParts = (query: string, orderedEvents: string[]) => {
    const parts: string[] = [];

    orderedEvents.forEach((part, i) => {
        if (i === orderedEvents.length - 1) {
            return parts.push(part);
        }

        return parts.push(part, query);
    });

    return parts;
};
