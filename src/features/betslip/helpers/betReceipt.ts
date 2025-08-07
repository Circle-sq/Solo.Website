import map from 'lodash/map';
import minBy from 'lodash/minBy';
import sortBy from 'lodash/sortBy';

import type { PlacedBetLeg, PlacedMultiBetLeg } from '../api/types/placedBet';
import { sortMarketsAndSelectionsByTimestamp } from '../store/helpers/betslipBet/sort';
import { getTimestamp } from '../store/helpers/selection/common';
import type { BetslipSelections } from '../store/types';
import { isMultiBetLegType } from '../typeGuards/leg';

export const sortMultiBetSelections =
    (selections: BetslipSelections) =>
    (leg: PlacedBetLeg): PlacedBetLeg => {
        if (isMultiBetLegType<PlacedMultiBetLeg>(leg)) {
            return sortMarketsAndSelectionsByTimestamp(selections)(leg);
        }

        return leg;
    };

export const sortPlacedBetByTimestamp =
    (selections: BetslipSelections) =>
    (leg: PlacedBetLeg): number => {
        if (isMultiBetLegType<PlacedMultiBetLeg>(leg)) {
            const firstSelectionId = minBy(map(leg.marketsAndSelections, 'selection.id'), (selectionId) =>
                getTimestamp(selections, selectionId),
            );

            return getTimestamp(selections, firstSelectionId);
        }

        return getTimestamp(selections, leg.selection.id);
    };

export const sortBetReceiptLegs = (legs: PlacedBetLeg[], selections: BetslipSelections): PlacedBetLeg[] => {
    const sortedMultiBetsSelections = map(legs, sortMultiBetSelections(selections));

    return sortBy(sortedMultiBetsSelections, sortPlacedBetByTimestamp(selections));
};
