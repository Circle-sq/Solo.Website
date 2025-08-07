import reject from 'lodash/reject';
import type { CallbackInterface } from 'recoil';

import type { CrossBetLeg, Leg } from '../../../api/types/leg';
import { splitIds } from '../../../helpers/multiBet';
import { betsAtom, changedPriceBetIdsAtom, uncheckedBetIdsAtom } from '../../atoms/betslipBets';
import { betslipSelectionsAtom } from '../../atoms/selections';
import { singleBetStakesAtom } from '../../atoms/stake';
import {
    syncCrossBetUncheckedIdFromDifferentMarketType,
    syncCrossBetUncheckedIdFromSameMarketType,
} from '../../helpers/betslipBet/sync';
import { replaceCrossPageSelection } from '../../helpers/selection/replace';
import {
    substituteCrossBetLegFromSameMarketType,
    substituteCrossBetLegFromDifferentMarketType,
    substituteSelectionFromSameMarketType,
} from '../../helpers/selection/substitute';
import {
    syncCrossBetStakeFromDifferentMarketType,
    syncCrossBetStakeFromSameMarketType,
} from '../../helpers/stake/sync';
import type { BetslipSelection } from '../../types';

export const substituteCrossBetLegFromSameMarketTypeTask =
    ({ reset, set }: CallbackInterface) =>
    (crossBet: Leg<CrossBetLeg>, selection: BetslipSelection, selectionIdFromSameMarket: string) => {
        const { selectionId } = selection;

        set(
            singleBetStakesAtom,
            syncCrossBetStakeFromSameMarketType(crossBet.id as string, selectionId, selectionIdFromSameMarket),
        );
        set(
            betslipSelectionsAtom,
            substituteSelectionFromSameMarketType(selection, selectionIdFromSameMarket, crossBet.id),
        );
        set(betsAtom, substituteCrossBetLegFromSameMarketType(crossBet, selection, selectionIdFromSameMarket));
        set(
            uncheckedBetIdsAtom,
            syncCrossBetUncheckedIdFromSameMarketType(crossBet.id as string, selectionId, selectionIdFromSameMarket),
        );

        reset(changedPriceBetIdsAtom);
    };

export const substituteCrossBetLegFromDifferentMarketTypeTask =
    ({ reset, set }: CallbackInterface) =>
    (crossBet: Leg<CrossBetLeg>, selection: BetslipSelection, totalSelectionId: string) => {
        const { selectionId } = selection;
        const [selectionIdToSubstitute] = reject(splitIds(crossBet.id), (id) => id === totalSelectionId);

        set(
            singleBetStakesAtom,
            syncCrossBetStakeFromDifferentMarketType(crossBet.id as string, selectionId, selectionIdToSubstitute),
        );
        set(betslipSelectionsAtom, replaceCrossPageSelection(selection, selectionIdToSubstitute));
        set(betsAtom, substituteCrossBetLegFromDifferentMarketType(crossBet, selection, selectionIdToSubstitute));
        set(
            uncheckedBetIdsAtom,
            syncCrossBetUncheckedIdFromDifferentMarketType(crossBet.id as string, selectionId, selectionIdToSubstitute),
        );

        reset(changedPriceBetIdsAtom);
    };
