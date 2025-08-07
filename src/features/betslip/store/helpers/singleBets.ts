import get from 'lodash/get';
import has from 'lodash/has';
import map from 'lodash/map';

import type { Selections } from 'src/common/types/selection';

import type { BetLeg, MultiBetLeg } from '../../api/types/leg';
import type { SelectedBet } from '../../api/types/possibleBet';
import { isMultiBetLegType } from '../../typeGuards/leg';

const syncStandardLegPrice =
    (selections: Selections) =>
    <T extends { selection: { id: number } }>(leg: T): T => {
        if (!has(selections, leg.selection.id)) {
            return leg;
        }

        const price = get(selections, [leg.selection.id, 'price']);

        return { ...leg, price };
    };

const syncBetLegPrice =
    (selections: Selections) =>
    (leg: BetLeg): BetLeg => {
        if (isMultiBetLegType<MultiBetLeg>(leg)) {
            const marketsAndSelections = map(leg.marketsAndSelections, syncStandardLegPrice(selections));

            return { ...leg, marketsAndSelections };
        }

        return syncStandardLegPrice(selections)(leg);
    };

export const syncSingleBetPrice =
    (selections: Selections) =>
    (bet: SelectedBet): SelectedBet => {
        const legs = map(bet.legs, syncBetLegPrice(selections));

        if (has(selections, bet.id)) {
            const price = get(selections, [bet.id, 'price']);

            return { ...bet, legs, price };
        }

        return { ...bet, legs };
    };

export const syncSingleBetsPrice =
    (selections: Selections) =>
    (singleBets: SelectedBet[]): SelectedBet[] =>
        map(singleBets, syncSingleBetPrice(selections));
