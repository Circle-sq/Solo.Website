import type { Map as ImmutableMap } from 'immutable';
import { createSelector } from 'reselect';

import type { ReduxState } from 'src/appState/redux/types';
import type { SportType } from 'src/common/enums';
import type { SportsState } from 'src/modules/sports/types';

const sportsSelector = (state: ReduxState): ImmutableMap<string, unknown> => state.sports;

export const sportsStateJsSelector = createSelector(sportsSelector, (sports) => sports.toJS() as SportsState);

export const sportsAllItemsSelector = createSelector(sportsStateJsSelector, (sports) => sports.all.items ?? null);

export const sportsSportsItemsSelector = createSelector(sportsStateJsSelector, (sports) => sports.sports.items ?? null);

export const competitionLocationItemsSelector = createSelector(
    sportsStateJsSelector,
    (sports) => sports.competitionLocations?.items ?? [],
);

export const competitionLocationSportsSelector = createSelector(
    sportsStateJsSelector,
    (sports) => sports.competitionLocations?.sports ?? {},
);

export const competitionLocationItemsBySportSelector = (sport: SportType | undefined) =>
    createSelector(competitionLocationSportsSelector, (sports) => {
        if (sport === undefined) {
            return [];
        }

        return sports[sport] ?? [];
    });

export const competitionLocationItemsStateSelector = createSelector(
    sportsStateJsSelector,
    (sports) => sports.competitionLocations?.state,
);
