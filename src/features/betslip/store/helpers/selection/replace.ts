import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';

import type { Leg, Legs } from '../../../api/types/leg';
import type { BetslipSelection, BetslipSelections } from '../../types';

import { getTimestamp } from './common';
import { isBuildABetPageRelated } from './relation';

export const replaceCrossPageSelection =
    (selection: BetslipSelection, selectionIdToSubstitute: string) =>
    (selections: BetslipSelections): BetslipSelections => {
        return {
            ...omit(selections, selectionIdToSubstitute),
            [selection.selectionId]: {
                ...selection,
                timestamp: getTimestamp(selections, selectionIdToSubstitute),
            },
        };
    };

export const replaceCrossPageLeg =
    (selection: BetslipSelection, selectionIdFromSameMarket: string) =>
    (bets: Legs): Legs => {
        return {
            ...omit(bets, selectionIdFromSameMarket),
            [selection.selectionId]: selection as unknown as Leg,
        };
    };

export const replaceOrphanSelections =
    (selection: BetslipSelection, lastSelection: BetslipSelection) =>
    (selections: BetslipSelections): BetslipSelections => ({
        ...omitBy(
            selections,
            (selection) =>
                !isBuildABetPageRelated(selection) &&
                selection.eventId === lastSelection.eventId &&
                selection.selectionId !== lastSelection.selectionId,
        ),
        [selection.selectionId]: selection,
    });
