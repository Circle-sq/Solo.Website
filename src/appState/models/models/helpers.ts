import get from 'lodash/get';

import type { Participant } from 'src/common/types/event';

import type { EventModel } from './EventModel';

const areParticipantsEqual = (a: Participant, b?: Participant): boolean =>
    a.id === b?.id && a.name === b?.name && a.role === b?.role;

export const compareRecordParticipant = (a: Record<number, Participant>, b: Record<number, Participant>): boolean => {
    const length1 = Object.keys(a).length;
    const length2 = Object.keys(b).length;

    if (length1 !== length2) {
        return false;
    }

    for (const [name, item] of Object.entries(a)) {
        const item2 = get(b, name);

        if (item2 === undefined || !areParticipantsEqual(item, item2)) {
            return false;
        }
    }

    return true;
};

export const getLocationTags = (event: EventModel) => ({
    category: event.getTag('category'),
    'category-label': event.getTag('category-label'),
    country: event.getTag('country'),
    'country-label': event.getTag('country-label'),
    'tennis-tour': event.getTag('tennis-tour'),
    'tennis-tour-label': event.getTag('tennis-tour-label'),
});
