import find from 'lodash/find';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import type { CallbackInterface } from 'recoil';

import { findBuildABetByEventId } from '@solo-buildABet/utils/helpers';

import { getValue } from 'src/common/recoil/snapshot';

import { splitIds } from '../../../helpers/multiBet';
import { animationRecordsAtom, animationSubstitutionTagAtom } from '../../atoms/animation';
import { betsAtom, changedPriceBetIdsAtom } from '../../atoms/betslipBets';
import { betslipSelectionsAtom } from '../../atoms/selections';
import { addAnimationRecord } from '../../helpers/betslipBet/animation';
import {
    getSelectionsFromEventWithoutCrossBet,
    getCrossSelectionsFromEvent,
    isNonCrossBetCombinableMarketType,
    hasSelectionFromSameMarketType,
} from '../../helpers/selection/common';
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
        const selectionsFromEventWithoutCrossBet = getSelectionsFromEventWithoutCrossBet(selections, eventId);

        const legsToPreventAnimation = 2;
        const preventAnimation =
            (size(splitIds(buildABet?.id)) <= legsToPreventAnimation || !includes(buildABet?.id, selectionId)) &&
            size(selectionsFromEventWithoutCrossBet) !== 1;

        if (!preventAnimation && animationKey !== undefined) {
            set(animationRecordsAtom, addAnimationRecord(animationKey));
        }

        set(betslipSelectionsAtom, addSelection(selection));

        if (!preventAnimation) {
            set(animationSubstitutionTagAtom, eventId);
        }

        reset(changedPriceBetIdsAtom);
    };

export const addCrossSelectionTask =
    ({ reset, set, snapshot }: CallbackInterface) =>
    (selection: BetslipSelection, animationKey: string) => {
        const { eventId, marketType } = selection;

        const selections = getValue(snapshot, betslipSelectionsAtom);
        const crossSelections = getCrossSelectionsFromEvent(selections, eventId);

        if (
            !isEmpty(crossSelections) &&
            !isNonCrossBetCombinableMarketType(crossSelections, marketType) &&
            !hasSelectionFromSameMarketType(crossSelections, marketType)
        ) {
            set(animationRecordsAtom, addAnimationRecord(animationKey));
        }

        set(betslipSelectionsAtom, addSelection(selection));
        reset(changedPriceBetIdsAtom);
    };
