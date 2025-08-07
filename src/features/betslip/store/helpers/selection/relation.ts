import includes from 'lodash/includes';
import mapValues from 'lodash/mapValues';

import { LegType } from 'src/common/enums';

import type { DisableCombinationsIn } from '../../../api/types/leg';
import type { BetslipSelection, BetslipSelections } from '../../types';

import { disableBetCombinationsIn, disableCombinationsInByLegType } from './disableCombinationsIn';

export const isBuildABetPageRelated = ({ disableCombinationsIn }: BetslipSelection): boolean =>
    !includes(disableCombinationsIn, LegType.BuildABet);

export const isCrossPageRelated = ({ disableCombinationsIn }: BetslipSelection): boolean =>
    !includes(disableCombinationsIn, LegType.CrossBet);

export const resetCrossPageOrphanSelectionsRelation =
    (orphanSelectionIds: string[]) =>
    (selections: BetslipSelections): BetslipSelections =>
        mapValues(selections, (selection, selectionId) => {
            if (!includes(orphanSelectionIds, selectionId)) {
                return selection;
            }

            const { disableCombinationsIn, ...restSelection } = selection;

            return {
                ...restSelection,
                disableCombinationsIn: disableCombinationsInByLegType(disableCombinationsIn, LegType.CrossBet),
            };
        });

export const resetMultiBetSelectionsRelation = (selections: BetslipSelections): BetslipSelections =>
    mapValues(selections, (selection) => ({ ...selection, disableCombinationsIn: disableBetCombinationsIn() }));

export const enableBuildABetSelectionsRelation =
    (eventId: number) =>
    (selections: BetslipSelections): BetslipSelections =>
        mapValues(selections, (selection) => {
            if (selection.eventId !== eventId) {
                return { ...selection, disableCombinationsIn: disableBetCombinationsIn() };
            }

            return { ...selection, disableCombinationsIn: disableBetCombinationsIn(LegType.CrossBet) };
        });

export const enableCrossBetSelectionRelation = <T>(item: T & { disableCombinationsIn?: DisableCombinationsIn }): T => {
    return { ...item, disableCombinationsIn: disableBetCombinationsIn(LegType.BuildABet) };
};

export const enableCrossBetSelectionsRelation = (selections: BetslipSelections): BetslipSelections =>
    mapValues(selections, enableCrossBetSelectionRelation);

export const syncCrossPageRelationForSelections =
    (buildABetSelectionIds: string[]) =>
    (selections: BetslipSelections): BetslipSelections => {
        return mapValues(selections, (selection, selectionId) => {
            if (includes(buildABetSelectionIds, selectionId)) {
                return selection;
            }

            return enableCrossBetSelectionRelation(selection);
        });
    };
