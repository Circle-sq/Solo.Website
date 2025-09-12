import get from 'lodash/get';
import has from 'lodash/has';
import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';

import type { Selections } from 'src/common/types/selection';

import type { Legs } from '../../../api/types/leg';
import type { BetslipSelection, BetslipSelections } from '../../types';

export const syncBetslipSelectionPrice =
    (selections: Selections) =>
    (selection: BetslipSelection): BetslipSelection => {
        if (has(selections, selection.selectionId)) {
            const price = get(selections, [selection.selectionId, 'price']);

            return { ...selection, price };
        }

        return selection;
    };

export const syncBetslipSelectionsPrice =
    (selections: Selections) =>
    (betslipSelections: BetslipSelections): BetslipSelections =>
        mapValues(betslipSelections, syncBetslipSelectionPrice(selections));

export const syncBetslipSelectionsOnPossibleBetsError =
    (bets: Legs) =>
    (selections: BetslipSelections): BetslipSelections =>
        omitBy(selections, ({ selectionId }) => !has(bets, selectionId));
