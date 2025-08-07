import type { Map as ImmutableMap } from 'immutable';
import chunk from 'lodash/chunk';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import last from 'lodash/last';
import size from 'lodash/size';
import { selector, selectorFamily } from 'recoil';

import type { RequestStatus } from 'src/common/enums';
import type { TimeSettings } from 'src/common/types/event';
import type { TemplateMarketsIds } from 'src/ui/events/store/types';

import { eventsAtom, marketMainLinesAtom, visibleMarketsEventIdAtom } from '../atoms';
import { defaultTimeSettings } from '../configs';

export const eventsItemsSelector = selector({
    key: 'eventsItemsSelector',
    get: ({ get: getRecoilValue }) => {
        const events = getRecoilValue(eventsAtom);

        return events?.get('items');
    },
});

export const eventSelectorFamily = selectorFamily<ImmutableMap<string, any>, number | undefined>({
    key: 'eventSelectorFamily',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const eventsItems = getRecoilValue(eventsItemsSelector);

            if (isNil(eventId)) {
                return undefined;
            }

            return eventsItems?.get(Number(eventId));
        },
});

export const eventStatusSelectorFamily = selectorFamily<RequestStatus | undefined, number>({
    key: 'eventStatusSelectorFamily',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const event = getRecoilValue(eventSelectorFamily(eventId));

            if (isNil(event)) {
                return undefined;
            }

            return event.get('_state');
        },
});

export const eventTimeSettingsSelectorFamily = selectorFamily<TimeSettings, number | undefined>({
    key: 'eventTimeSettingsSelectorFamily',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const event = getRecoilValue(eventSelectorFamily(eventId));

            if (isNil(event)) {
                return defaultTimeSettings;
            }

            return event.get('timeSettings')?.toJS() ?? defaultTimeSettings;
        },
});

export const eventTimeSettingsStartedSelectorFamily = selectorFamily<boolean, number | undefined>({
    key: 'eventTimeSettingsStartedSelectorFamily',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const timeSettings = getRecoilValue(eventTimeSettingsSelectorFamily(eventId));

            return get(timeSettings, 'started', false);
        },
});

export const isActiveEventSelectorFamily = selectorFamily<boolean, number | undefined>({
    key: 'isActiveMarketSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventSelectorFamily(eventId));

            if (isNil(event)) {
                return false;
            }

            return event.get('active', false);
        },
});

export const isDisplayEventSelectorFamily = selectorFamily<boolean, number | undefined>({
    key: 'isDisplayEventSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const event = get(eventSelectorFamily(eventId));

            if (isNil(event)) {
                return false;
            }

            return event.get('display', false);
        },
});

export const eventsMarketMainLineSelectorFamily = selectorFamily<TemplateMarketsIds | undefined, number>({
    key: 'eventsMarketMainLineSelectorFamily',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const eventsItems = getRecoilValue(marketMainLinesAtom);

            return get(eventsItems, eventId);
        },
});

export const marketEventIdSelector = selector({
    key: 'marketEventIdSelector',
    get: ({ get: getRecoilValue }) => {
        const apiLimit = 20;
        const marketsEventId = getRecoilValue(visibleMarketsEventIdAtom);
        const eventsIdChunk = chunk(marketsEventId, apiLimit);

        return { marketsEventId: last(eventsIdChunk) ?? [], pageSize: size(eventsIdChunk) };
    },
});
