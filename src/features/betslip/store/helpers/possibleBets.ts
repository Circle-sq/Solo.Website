import includes from 'lodash/includes';
import mapValues from 'lodash/mapValues';
import reject from 'lodash/reject';
import some from 'lodash/some';

import { BetslipTab } from 'src/common/enums';

import type { FreeBetAssignments } from '../../api/types/freeBet';
import type { Leg, Legs } from '../../api/types/leg';
import type { PossibleBetsTriggeredBy } from '../../enums';
import { getMultiBetsSelectionIds, isMultiBetId, isSelectionIncludedInMultiBet } from '../../helpers/multiBet';
import { isMultiBetType } from '../../typeGuards/bet';
import { EMPTY_STAKE } from '../configs';
import type { PossibleBetsTrigger } from '../types';

import { isChecked } from './betslipBets';
import { hasAppliedFreeBet } from './freeBets';
import { getStakePerLine } from './stake/common';

export const addPossibleBetsTrigger =
    (trigger: PossibleBetsTrigger) =>
    (state: PossibleBetsTrigger[]): PossibleBetsTrigger[] => [...state, trigger];

export const removeAbortedPossibleBetsTriggers =
    (triggeredBy: PossibleBetsTriggeredBy) =>
    (state: PossibleBetsTrigger[]): PossibleBetsTrigger[] =>
        reject(state, (item) => item.triggeredBy === triggeredBy && item.controller.signal.aborted);

export const removeLastPossibleBetsTrigger =
    (triggeredBy: PossibleBetsTriggeredBy) =>
    (state: PossibleBetsTrigger[]): PossibleBetsTrigger[] =>
        reject(state, (item) => item.triggeredBy === triggeredBy && !item.controller.signal.aborted);

export const syncPossibleLegs = (
    legs: Legs,
    freeBets: FreeBetAssignments,
    stakes: Record<string, number>,
    betslipTab: BetslipTab,
): Legs => {
    const multiBetsSelectionIds = getMultiBetsSelectionIds(legs);

    return mapValues(legs, (leg, id) => {
        if (betslipTab !== BetslipTab.Single || isSelectionIncludedInMultiBet(multiBetsSelectionIds, id)) {
            return { ...leg, stakePerLine: EMPTY_STAKE };
        }

        return {
            ...leg,
            isFreeBet: hasAppliedFreeBet(freeBets, id),
            stakePerLine: getStakePerLine(stakes, id),
        };
    });
};

export const isPossibleLegChecked =
    (uncheckedBetIds: string[]) =>
    (leg: Leg): boolean => {
        if (isMultiBetType(leg)) {
            return isChecked(uncheckedBetIds, leg.id);
        }

        return (
            isChecked(uncheckedBetIds, leg.selectionId) &&
            !some(
                uncheckedBetIds,
                (uncheckedBetId) => isMultiBetId(uncheckedBetId) && includes(uncheckedBetId, leg.selectionId),
            )
        );
    };
