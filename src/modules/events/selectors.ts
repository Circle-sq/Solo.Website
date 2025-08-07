import get from 'lodash/get';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import { createSelector } from 'reselect';

import type { ReduxState } from 'src/appState/redux/types';

export const eventsSelector = (state: ReduxState) => state.events.toJS();

export const eventsItemsSelector = createSelector(eventsSelector, (eventsState) => eventsState?.items);

export const eventSelector = (eventId: number) =>
    createSelector(eventsItemsSelector, (eventItems) => {
        if (!eventItems) {
            return undefined;
        }

        return eventItems[eventId];
    });

export const marketSelector = (eventId: number, marketId: number) =>
    createSelector(eventSelector(eventId), (event) => {
        if (!event || !event.markets) {
            return undefined;
        }

        return event.markets[marketId];
    });

export const eventMarketTemplateIdsSelector = (eventId: number) =>
    createSelector(eventSelector(eventId), (event) => {
        if (!event) {
            return [];
        }

        return uniq(map(event.markets, (market) => market?.template?.id));
    });

export const eventScoreSelector = (eventId: number) =>
    createSelector(eventSelector(eventId), (event) => {
        const score = get(event, ['score', 'value', 0], { home: null, away: null });

        return score;
    });
