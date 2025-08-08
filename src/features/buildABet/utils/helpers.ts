import filter from 'lodash/filter';
import get from 'lodash/get';
import includes from 'lodash/includes';
import size from 'lodash/size';

import type { BuildABetLeg, Leg } from '@solo-betslip/api/types/leg';
import { splitIds } from '@solo-betslip/helpers/multiBet';
import type { BetslipSelections } from '@solo-betslip/store/types';
import { isBuildABetType } from '@solo-buildABet/utils/typeGuards';

import { MAX_BUILD_A_BET_SELECTIONS_COUNT } from '../configs';

export const isBuildABetMarket = <T>(market: T) => get(market, 'marketData.tags.build-a-bet[0]') === 'yes';

export const isBuildABetReachedMaxLegsCount = (buildABetId?: string) =>
    size(splitIds(buildABetId)) >= MAX_BUILD_A_BET_SELECTIONS_COUNT;

export const hasBuildABetReachedMaxSelections = (selections: BetslipSelections) =>
    size(selections) >= MAX_BUILD_A_BET_SELECTIONS_COUNT;

export const filterBuildABetMarkets = <T>(markets: T[]) => {
    return filter(markets, isBuildABetMarket);
};

export const findBuildABetBySelectionId =
    (selectionId: number) =>
    (bet?: Leg): bet is Leg<BuildABetLeg> =>
        isBuildABetType(bet) && includes(bet.id, String(selectionId));

export const findBuildABetByEventId =
    (eventId: number) =>
    (bet?: Leg): bet is Leg<BuildABetLeg> =>
        isBuildABetType(bet) && bet.eventId === eventId;
