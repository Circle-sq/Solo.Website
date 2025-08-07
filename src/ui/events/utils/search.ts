import groupBy from 'lodash/groupBy';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import startsWith from 'lodash/startsWith';
import toLower from 'lodash/toLower';

import type { EventItem } from 'src/common/types/event';

const putFirstWithSearchValue = (events: EventItem[], searchValue: string): EventItem[] => {
    const { containsQuery = [], doesNotContainQuery = [] } = groupBy(events, (event) =>
        includes(event.name, searchValue) ? 'containsQuery' : 'doesNotContainQuery',
    );

    return [...containsQuery, ...doesNotContainQuery];
};

export const groupEventBy =
    (searchValue: string) =>
    ({ name }: EventItem) =>
        startsWith(toLower(name), searchValue) ? 'exact' : 'notExact';

export const groupEvents = (
    events: EventItem[] = [],
    searchValue: string,
): { exactMatchEvents: EventItem[]; notExactMatchEvents: EventItem[] } => {
    if (isEmpty(events)) {
        return { exactMatchEvents: [], notExactMatchEvents: [] };
    }

    const { exact = [], notExact = [] } = groupBy(events, groupEventBy(searchValue.toLowerCase()));

    return {
        exactMatchEvents: putFirstWithSearchValue(exact, searchValue),
        notExactMatchEvents: putFirstWithSearchValue(notExact, searchValue),
    };
};
