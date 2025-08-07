import type { Map as ImmutableMap } from 'immutable';
import { createSelector } from 'reselect';

import type { ReduxState } from 'src/appState/redux/types';

import type { Competitions } from './types';

export const competitionsStateSelector = (state: ReduxState): ImmutableMap<string, ImmutableMap<string, unknown>> =>
    state.competitions;

export const competitionsJsSelector = createSelector(
    competitionsStateSelector,
    (competitions) => competitions.toJS() as Competitions,
);

export const competitionsItemsSelector = createSelector(competitionsJsSelector, (competitions) => competitions.items);
