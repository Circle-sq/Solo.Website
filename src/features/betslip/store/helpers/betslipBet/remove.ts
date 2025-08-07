import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';
import reject from 'lodash/reject';
import some from 'lodash/some';

import type { BuildABetLeg, Leg, Legs } from '../../../api/types/leg';
import { isCrossBetType, isMultiBetType } from '../../../typeGuards/bet';
import type { BetslipSelection } from '../../types';

export const omitBetBySelectionId =
    (selectionId: string) =>
    (bet: Leg): boolean => {
        if (isCrossBetType(bet)) {
            const [{ marketsAndSelections }] = bet.legs ?? [];

            return some(marketsAndSelections, ({ selection }) => selection.id === Number(selectionId));
        }

        return bet.selectionId === selectionId;
    };

export const removeBetBySelectionId =
    (selectionId: string) =>
    (bets: Legs): Legs =>
        omitBy(bets, omitBetBySelectionId(selectionId));

export const removeBuildABetLeg =
    (buildABet: Leg<BuildABetLeg>, newBuildABetId: string, selectionId: string) =>
    (bets: Legs): Legs => {
        const [leg] = buildABet.legs ?? [];

        const marketsAndSelections = reject(
            leg.marketsAndSelections,
            ({ selection }) => selection.id === Number(selectionId),
        );

        return {
            ...omit(bets, [buildABet.id as string, selectionId]),
            [newBuildABetId]: {
                ...buildABet,
                id: newBuildABetId,
                legs: [{ ...leg, marketsAndSelections }],
            },
        };
    };

export const removeOrphanBets = (bets: Legs, lastSelection: BetslipSelection): Legs =>
    omitBy(
        bets,
        (bet, id) => !isMultiBetType(bet) && bet.eventId === lastSelection.eventId && id !== lastSelection.selectionId,
    );

export const removeUncheckedBetId =
    (betId: string) =>
    (state: string[]): string[] =>
        reject(state, (id) => id === betId);
