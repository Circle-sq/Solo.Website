import omit from 'lodash/omit';
import type { CallbackInterface } from 'recoil';

import type { Leg } from '../../../api/types/leg';
import { isMultiBetWithTwoSelections, omitSelectionIdFromMultiBetId } from '../../../helpers/multiBet';
import { animationRecordsAtom } from '../../atoms/animation';
import { betsAtom, changedPriceBetIdsAtom, uncheckedBetIdsAtom } from '../../atoms/betslipBets';
import { betslipSelectionsAtom } from '../../atoms/selections';
import { singleBetStakesAtom } from '../../atoms/stake';
import { addAnimationRecord } from '../../helpers/betslipBet/animation';
import { removeBetBySelectionId, removeBuildABetLeg, removeUncheckedBetId } from '../../helpers/betslipBet/remove';
import { syncUncheckedBetId } from '../../helpers/betslipBet/sync';
import { removeSelection } from '../../helpers/selection/toggle';
import { removeSingleBetStake } from '../../helpers/stake/remove';
import { syncBuildABetStake } from '../../helpers/stake/sync';

export const removeBuildABetSelectionTask =
    ({ reset, set }: CallbackInterface) =>
    (buildABet: Leg, selectionId: string) => {
        const buildABetId = buildABet.id as string;
        set(betslipSelectionsAtom, removeSelection(selectionId));

        if (isMultiBetWithTwoSelections(buildABetId)) {
            set(animationRecordsAtom, addAnimationRecord(buildABetId));

            set(singleBetStakesAtom, removeSingleBetStake(buildABetId));
            set(betsAtom, (bets) => omit(bets, [buildABetId, selectionId]));
            set(uncheckedBetIdsAtom, removeUncheckedBetId(buildABetId));

            return;
        }

        const newBuildABetId = omitSelectionIdFromMultiBetId(buildABetId, selectionId);

        set(singleBetStakesAtom, syncBuildABetStake(buildABetId, newBuildABetId));
        set(betsAtom, removeBuildABetLeg(buildABet, newBuildABetId, selectionId));
        set(uncheckedBetIdsAtom, syncUncheckedBetId(buildABetId, newBuildABetId));

        reset(changedPriceBetIdsAtom);
    };

export const removeStandardSelectionTask =
    ({ reset, set }: CallbackInterface) =>
    (selectionId: string) => {
        set(betslipSelectionsAtom, removeSelection(selectionId));
        set(singleBetStakesAtom, removeSingleBetStake(selectionId));
        set(betsAtom, removeBetBySelectionId(selectionId));
        set(uncheckedBetIdsAtom, removeUncheckedBetId(selectionId));

        reset(changedPriceBetIdsAtom);
    };
