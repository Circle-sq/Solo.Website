import map from 'lodash/map';
import minBy from 'lodash/minBy';
import sortBy from 'lodash/sortBy';
import values from 'lodash/values';

import type { Leg, Legs, MultiBetLeg } from '../../../api/types/leg';
import { splitIds } from '../../../helpers/multiBet';
import { isMultiBetType } from '../../../typeGuards/bet';
import type { BetslipSelections } from '../../types';
import { getTimestamp } from '../selection/common';

export const sortMarketsAndSelectionsByTimestamp =
    (selections: BetslipSelections) =>
    <T extends { marketsAndSelections: { selection: { id: number } }[] }>(leg: T): T => {
        return {
            ...leg,
            marketsAndSelections: sortBy(leg.marketsAndSelections, ({ selection }) =>
                getTimestamp(selections, selection.id),
            ),
        };
    };

export const sortMultiBetSelections =
    (selections: BetslipSelections) =>
    (leg: Leg): Leg => {
        if (isMultiBetType<MultiBetLeg>(leg)) {
            const legs = map(leg.legs, sortMarketsAndSelectionsByTimestamp(selections));
            const firstSelection = values(selections)[0];

            return { ...leg, legs, eventRevision: firstSelection.eventRevision };
        }

        return leg;
    };

export const sortByTimestamp =
    (selections: BetslipSelections) =>
    (leg: Leg): number => {
        if (isMultiBetType(leg)) {
            const firstSelectionId = minBy(splitIds(leg.id), (selectionId) => getTimestamp(selections, selectionId));

            return getTimestamp(selections, firstSelectionId);
        }

        return getTimestamp(selections, leg.selectionId);
    };

export const sortBetsByTimestamp = (legs: Legs, selections: BetslipSelections): Leg[] => {
    const sortedMultiBetsSelections = map(legs, sortMultiBetSelections(selections));

    return sortBy(sortedMultiBetsSelections, sortByTimestamp(selections));
};
