import find from 'lodash/find';
import has from 'lodash/has';
import omit from 'lodash/omit';
import reject from 'lodash/reject';

import type { ArrayIterator } from 'src/common/types/main';
import { substitute } from 'src/common/updaters/array';

import type { CrossBetLeg, Leg, Legs, MarketAndSelection } from '../../../api/types/leg';
import { splitIds } from '../../../helpers/multiBet';
import type { BetslipSelection, BetslipSelections } from '../../types';

import { enableCrossBetSelectionRelation } from './relation';
import { replaceCrossPageSelection } from './replace';

export const substituteSelectionFromSameMarketType =
    (selection: BetslipSelection, selectionIdFromSameMarket: string, crossBetId?: string) =>
    (selections: BetslipSelections): BetslipSelections => {
        const updatedSelections = replaceCrossPageSelection(selection, selectionIdFromSameMarket)(selections);
        const [secondId] = reject(splitIds(crossBetId), (id) => id === selectionIdFromSameMarket);

        if (has(updatedSelections, secondId)) {
            updatedSelections[secondId] = enableCrossBetSelectionRelation(updatedSelections[secondId]);
        }

        return updatedSelections;
    };

export const substituteMarketAndSelection = (
    { marketsAndSelections }: CrossBetLeg,
    { marketId, selectionId }: BetslipSelection,
    findItemToSubstitute: ArrayIterator<MarketAndSelection>,
): MarketAndSelection[] => {
    const item = find(marketsAndSelections, findItemToSubstitute) as MarketAndSelection;

    const substitutedItem = {
        ...item,
        selection: { id: Number(selectionId) },
        market: { id: marketId },
    };

    return substitute(marketsAndSelections, substitutedItem, findItemToSubstitute);
};

const substituteCrossBetLeg = (
    bets: Legs,
    crossBet: Leg<CrossBetLeg>,
    selection: BetslipSelection,
    selectionIdToSubstitute: string,
    findItemToSubstitute: ArrayIterator<MarketAndSelection>,
) => {
    const [leg] = crossBet.legs ?? [];
    const marketsAndSelections = substituteMarketAndSelection(leg, selection, findItemToSubstitute);
    const newCrossBetId = crossBet.id?.replace(selectionIdToSubstitute, selection.selectionId) as string;

    return {
        ...omit(bets, [selectionIdToSubstitute, crossBet.id as string]),
        [selection.selectionId]: selection,
        [newCrossBetId]: {
            ...crossBet,
            id: newCrossBetId,
            legs: [{ ...leg, marketsAndSelections }],
        },
    };
};

export const substituteCrossBetLegFromSameMarketType =
    (crossBet: Leg<CrossBetLeg>, selection: BetslipSelection, selectionIdFromSameMarket: string) =>
    (bets: Legs): Legs => {
        const findItemToSubstitute = <T extends { market: { id: number } }>({ market }: T) =>
            market.id === selection.marketId;

        return substituteCrossBetLeg(bets, crossBet, selection, selectionIdFromSameMarket, findItemToSubstitute);
    };

export const substituteCrossBetLegFromDifferentMarketType =
    (crossBet: Leg<CrossBetLeg>, selection: BetslipSelection, selectionIdToSubstitute: string) =>
    (bets: Legs): Legs => {
        const findItemToSubstitute = <T extends { selection: { id: number } }>({ selection }: T) =>
            selection.id === Number(selectionIdToSubstitute);

        return substituteCrossBetLeg(bets, crossBet, selection, selectionIdToSubstitute, findItemToSubstitute);
    };
