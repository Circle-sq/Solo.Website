import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

import type { Participant } from 'src/common/types/event';
import type { SelectionItem, Selections } from 'src/common/types/selection';
import type { EventItem, MarketItem } from 'src/store/events/types';

import type { PossibleBetEvent, PossibleBetMarkets } from './types';

interface ParseEventsParams {
    events: (Omit<EventItem, 'markets' | 'participants'> & { markets: string[]; participants: Participant[] })[];
    markets: (Omit<MarketItem, 'selections'> & { selections: string[] })[];
    selections: SelectionItem[];
    participants: Participant[];
}

export const parseEvents = ({ events, markets, selections, participants }: ParseEventsParams): PossibleBetEvent[] => {
    if (!events) {
        return [];
    }

    const selectionsById: Selections = keyBy(selections, 'id');

    const parsedMarkets = reduce(
        markets,
        (acc: PossibleBetMarkets, market) => {
            acc[market.id] = {
                ...market,
                selections: map(market.selections, (id) => selectionsById[id]),
            };

            return acc;
        },
        {},
    );

    const participantsById = keyBy(participants, 'id');

    return events.map((event) => {
        return {
            ...event,
            markets: map(event.markets, (id: string) => parsedMarkets[id]),
            participants: map(event.participants, ({ id, role }) => ({ ...participantsById[id], role })),
        };
    });
};
