import find from 'lodash/find';
import includes from 'lodash/includes';
import size from 'lodash/size';
import type { CallbackInterface } from 'recoil';

import { findBuildABetByEventId } from '@solo-buildABet/utils/helpers';

import { getValue } from 'src/common/recoil/snapshot';

import { splitIds } from '../../../helpers/multiBet';
import { animationRecordsAtom, animationSubstitutionTagAtom } from '../../atoms/animation';
import { betsAtom, changedPriceBetIdsAtom } from '../../atoms/betslipBets';
import { betslipSelectionsAtom } from '../../atoms/selections';
import { addAnimationRecord } from '../../helpers/betslipBet/animation';
import { getSelectionsFromEvent } from '../../helpers/selection/common';
import { addSelection } from '../../helpers/selection/toggle';
import type { BetslipSelection } from '../../types';

export const addStandardSelectionTask =
    ({ reset, set }: CallbackInterface) =>
    (selection: BetslipSelection) => {
        set(betslipSelectionsAtom, addSelection(selection));
        reset(changedPriceBetIdsAtom);
    };

export const addBuildABetSelectionTask =
    ({ reset, set, snapshot }: CallbackInterface) =>
    (selection: BetslipSelection, animationKey?: string) => {
        const { selectionId, eventId } = selection;

        const selections = getValue(snapshot, betslipSelectionsAtom);
        const buildABet = find(getValue(snapshot, betsAtom), findBuildABetByEventId(eventId));
        const selectionsFromEvent = getSelectionsFromEvent(selections, eventId);

        const legsToPreventAnimation = 2;
        const preventAnimation =
            (size(splitIds(buildABet?.id)) <= legsToPreventAnimation || !includes(buildABet?.id, selectionId)) &&
            size(selectionsFromEvent) !== 1;

        if (!preventAnimation && animationKey !== undefined) {
            set(animationRecordsAtom, addAnimationRecord(animationKey));
        }

        set(betslipSelectionsAtom, addSelection(selection));

        if (!preventAnimation) {
            set(animationSubstitutionTagAtom, eventId);
        }

        reset(changedPriceBetIdsAtom);
    };
