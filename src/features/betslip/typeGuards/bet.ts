import get from 'lodash/get';
import includes from 'lodash/includes';
import some from 'lodash/some';

import { isBuildABetLegType } from '@sc-buildABet/utils/typeGuards';

import { CastBetType } from 'src/common/enums';

import type { Combination, CombinationStandardLeg } from '../api/types/combination';
import type { BaseLeg, CrossBetLeg, Leg } from '../api/types/leg';
import type {
    PossibleBet,
    PossibleBuildABetLeg,
    PossibleCrossBetLeg,
    PossibleMultiBetLeg,
    PossibleStandardBetLeg,
} from '../api/types/possibleBet';

import { isCrossBetLegType, isMultiBetLegType, isStandardBetLegType } from './leg';

export const isPossibleBetBuildABetType = (bet: PossibleBet): bet is PossibleBet<PossibleBuildABetLeg> =>
    isBuildABetLegType<PossibleBuildABetLeg>(get(bet, 'legs.0'));

export const isPossibleBetCrossBetType = (bet: PossibleBet): bet is PossibleBet<PossibleCrossBetLeg> =>
    isCrossBetLegType<PossibleCrossBetLeg>(get(bet, 'legs.0'));

export const isPossibleBetMultiBetType = (bet: PossibleBet): bet is PossibleBet<PossibleMultiBetLeg> =>
    isPossibleBetBuildABetType(bet) || isPossibleBetCrossBetType(bet);

export const isPossibleBetStandardBetType = (bet: PossibleBet): bet is PossibleBet<PossibleStandardBetLeg> =>
    isStandardBetLegType<PossibleStandardBetLeg>(get(bet, 'legs.0'));

export const isCastBetType = (betType: string): betType is CastBetType => includes(CastBetType, betType);

export const isCrossBetType = (bet?: Leg): bet is Leg<CrossBetLeg> => {
    return isCrossBetLegType<CrossBetLeg>(get(bet, 'legs.0'));
};

export const isMultiBetType = <T1 extends T2, T2 extends BaseLeg = BaseLeg>(bet: {
    legs?: T2[];
}): bet is { legs: T1[] } => {
    return isMultiBetLegType<T1>(get(bet, 'legs.0'));
};

export const isStandardBetType = <T1 extends T2, T2 extends BaseLeg = BaseLeg>(bet: {
    legs?: T2[];
}): bet is { legs: T1[] } => {
    return isStandardBetLegType<T1>(get(bet, 'legs.0'));
};

export const isSystemCombination = (combination?: Combination): combination is Combination<CombinationStandardLeg> =>
    combination !== undefined && !some(combination.legs, isMultiBetLegType);
