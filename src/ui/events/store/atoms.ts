import { atom, atomFamily } from 'recoil';
import { atomFromRedux } from 'redux-to-recoil';

import type { PriceChange } from 'src/common/enums';
import { PersistKey, recoilPersist } from 'src/common/recoil/persist';
import type {
    NormalizedMarketDescriptionGroups,
    NormalizedMarketTemplateDescription,
} from 'src/ui/events/EventMarkets/types';
import type { EventTemplateMarketsIds } from 'src/ui/events/store/types';

import { resetPriceChangeEffect } from './effects';
import { getSortCriteria } from './helpers';

const { persistAtom } = recoilPersist(PersistKey.Events);

export const eventsAtom = atomFromRedux('.events');

export const eventTimeInSecondsAtomFamily = atomFamily<number, number>({
    key: 'eventTimeInSecondsAtomFamily',
    default: 0,
});

export const liveEventTimerAtomFamily = atomFamily<number, number>({
    key: 'liveEventTimerAtomFamily',
    default: 0,
});

export const sortCriteriaAtomFamily = atomFamily<string, string>({
    key: 'sortCriteriaAtomFamily',
    default: (param) => getSortCriteria(param),
    effects: [persistAtom],
});

export const marketMainLinesAtom = atom<EventTemplateMarketsIds>({
    key: 'marketMainLinesAtom',
    default: {},
});

export const visibleMarketsEventIdAtom = atom<number[]>({
    key: 'visibleMarketsEventIdAtom',
    default: [],
});

export const marketCounterByEventAtomFamily = atomFamily<number, number>({
    key: 'marketCounterByEventAtomFamily',
    default: undefined,
});

export const marketDescriptionsAtom = atom<NormalizedMarketTemplateDescription>({
    key: 'marketDescriptionsAtom',
    default: {},
});

export const marketDescriptionsGroupsAtom = atom<NormalizedMarketDescriptionGroups>({
    key: 'marketDescriptionGroupsAtom',
    default: {},
});

export const priceDirectionAtomFamily = atomFamily<PriceChange | null, number>({
    key: 'priceDirectionAtomFamily',
    default: null,
    effects: [resetPriceChangeEffect],
});
