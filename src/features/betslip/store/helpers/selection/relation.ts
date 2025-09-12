import includes from 'lodash/includes';
import mapValues from 'lodash/mapValues';

import { LegType } from 'src/common/enums';

import type { BetslipSelection, BetslipSelections } from '../../types';

import { disableCombinationsIn } from './disableCombinationsIn';

export const isBuildABetPageRelated = ({ disableCombinationsIn }: BetslipSelection): boolean =>
    !includes(disableCombinationsIn, LegType.BuildABet);

export const resetMultiBetSelectionsRelation = (selections: BetslipSelections): BetslipSelections =>
    mapValues(selections, (selection) => ({ ...selection, disableCombinationsIn: disableCombinationsIn() }));

export const enableBuildABetSelectionsRelation =
    (eventId: number) =>
    (selections: BetslipSelections): BetslipSelections =>
        mapValues(selections, (selection) => {
            if (selection.eventId !== eventId) {
                return { ...selection, disableCombinationsIn: disableCombinationsIn() };
            }

            return { ...selection, disableCombinationsIn: disableCombinationsIn(true) };
        });
