import { Map as ImmutableMap, OrderedMap } from 'immutable';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { selector, selectorFamily } from 'recoil';

import { AMERICAN_SPORTS } from 'src/config/config';
import { MAX_VISIBLE_COLUMNS } from 'src/ui/events/EventsList/config';
import type { DropdownItem } from 'src/ui/events/EventsList/types';

import { eventsAtom } from '../atoms';

export const marketTemplatesSelector = selector({
    key: 'marketTemplatesSelector',
    get: ({ get: getRecoilValue }) => {
        const events = getRecoilValue(eventsAtom);

        return events?.get('marketTemplates', ImmutableMap());
    },
});

export const sportTemplatesSelectorFamily = selectorFamily({
    key: 'sportTemplatesSelectorFamily',
    get:
        (sportId: string) =>
        ({ get: getRecoilValue }) => {
            const marketTemplates = getRecoilValue(marketTemplatesSelector);

            if (!marketTemplates.has(sportId)) {
                return null;
            }

            const sportTemplates = marketTemplates.get(sportId, ImmutableMap());

            return sportTemplates.get('items', OrderedMap());
        },
});

export const sportTemplateIdsSelectorFamily = selectorFamily<
    string[][] | string[] | null,
    { sportId: string; templatesGroupIds: string[] }
>({
    key: 'sportTemplateIdsSelectorFamily',
    get:
        ({ sportId, templatesGroupIds }) =>
        ({ get: getRecoilValue }) => {
            const sportTemplates = getRecoilValue(sportTemplatesSelectorFamily(sportId));

            if (sportTemplates === null) {
                return null;
            }

            const templatesJs = sportTemplates.toJS();

            return templatesGroupIds.map((groupId) => get(templatesJs, groupId, []));
        },
});

export const sportTemplateOptionsSelectorFamily = selectorFamily<DropdownItem[], string>({
    key: 'sportTemplateOptionsSelectorFamily',
    get:
        (sportId) =>
        ({ get: getRecoilValue }) => {
            const sportTemplates = getRecoilValue(sportTemplatesSelectorFamily(sportId));

            if (sportTemplates === null) {
                return null;
            }

            return sportTemplates
                .keySeq()
                .toArray()
                .reduce((acc: DropdownItem[], key: string) => {
                    return [...acc, ...[{ label: key, value: key }]];
                }, []);
        },
});

export const marketGroupIdsSelectorFamily = selectorFamily<string[] | null, string>({
    key: 'marketGroupIdsSelectorFamily',
    get:
        (sportId) =>
        ({ get: getRecoilValue }) => {
            const sportTemplates = getRecoilValue(sportTemplatesSelectorFamily(sportId));

            if (sportTemplates === null) {
                return null;
            }

            const templates = sportTemplates.keySeq().toArray();
            const isAmericanSports = includes(AMERICAN_SPORTS, sportId);

            return templates.slice(0, isAmericanSports ? 1 : MAX_VISIBLE_COLUMNS);
        },
});
