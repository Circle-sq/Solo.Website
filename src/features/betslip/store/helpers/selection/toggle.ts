import omit from 'lodash/omit';

import type { BetslipSelection, BetslipSelections } from '../../types';

export const addSelection =
    (selection: BetslipSelection) =>
    (state: BetslipSelections): BetslipSelections => ({
        ...state,
        [selection.selectionId]: selection,
    });

export const removeSelection =
    (selectionId: string) =>
    (selections: BetslipSelections): BetslipSelections =>
        omit(selections, selectionId);
