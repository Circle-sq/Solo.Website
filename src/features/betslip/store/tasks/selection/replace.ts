import type { CallbackInterface } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { betsAtom, changedPriceBetIdsAtom, uncheckedBetIdsAtom } from '../../atoms/betslipBets';
import { betslipSelectionsAtom } from '../../atoms/selections';
import { singleBetStakesAtom } from '../../atoms/stake';
import { removeBetBySelectionId, removeOrphanBets, removeUncheckedBetId } from '../../helpers/betslipBet/remove';
import { syncUncheckedBetId } from '../../helpers/betslipBet/sync';
import {
    replaceCrossPageLeg,
    replaceCrossPageSelection,
    replaceOrphanSelections,
} from '../../helpers/selection/replace';
import { removeOrphanStakes, removeSingleBetStake } from '../../helpers/stake/remove';
import { syncCrossBetStakeFromSameMarket } from '../../helpers/stake/sync';
import type { BetslipSelection } from '../../types';

export const replaceSelectionFromSameMarketTask =
    ({ reset, set }: CallbackInterface) =>
    (selection: BetslipSelection, selectionIdFromSameMarket: string) => {
        set(singleBetStakesAtom, syncCrossBetStakeFromSameMarket(selection.selectionId, selectionIdFromSameMarket));
        set(betslipSelectionsAtom, replaceCrossPageSelection(selection, selectionIdFromSameMarket));
        set(betsAtom, replaceCrossPageLeg(selection, selectionIdFromSameMarket));
        set(uncheckedBetIdsAtom, syncUncheckedBetId(selection.selectionId, selectionIdFromSameMarket));

        reset(changedPriceBetIdsAtom);
    };

export const replaceSelectionByMarketTypeTask =
    ({ reset, set }: CallbackInterface) =>
    (selection: BetslipSelection, selectionIdToReplace: string) => {
        set(singleBetStakesAtom, removeSingleBetStake(selectionIdToReplace));
        set(betslipSelectionsAtom, replaceCrossPageSelection(selection, selectionIdToReplace));
        set(betsAtom, removeBetBySelectionId(selectionIdToReplace));
        set(uncheckedBetIdsAtom, removeUncheckedBetId(selectionIdToReplace));

        reset(changedPriceBetIdsAtom);
    };

export const replaceOrphanSelectionsTask =
    ({ reset, set, snapshot }: CallbackInterface) =>
    (selection: BetslipSelection, lastSelection: BetslipSelection) => {
        const bets = getValue(snapshot, betsAtom);
        const updatedBets = removeOrphanBets(bets, lastSelection);

        set(singleBetStakesAtom, removeOrphanStakes(updatedBets, lastSelection.selectionId));
        set(betslipSelectionsAtom, replaceOrphanSelections(selection, lastSelection));
        set(betsAtom, updatedBets);

        reset(changedPriceBetIdsAtom);
    };
