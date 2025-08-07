import type { CastBetType, LegType } from 'src/common/enums';
import type { Price } from 'src/common/types/selectionPrice';

import type { BaseLeg, DisableCombinationsIn, MarketAndSelection } from './leg';
import type { Problem } from './problem';

export interface Combinations {
    [betType: string]: Combination;
}

export interface Combination<T = CombinationLeg> {
    type: CastBetType | string;
    name: string;
    legs: T[];
    ewOffered?: boolean;
    eachWay?: boolean;
    freebetCredits?: unknown;
    freebetRemarks?: unknown;
    numLines?: number;
    potentialReturns: number | null;
    potentialReturnsAt?: number | null;
    potentialReturnsEw: number | null;
    price: Price | null;
    stakePerLine?: number;
    maxStake?: number | null;
    totalStake?: number;
    problems?: Problem[];
}

export type CombinationLeg = CombinationMultiBetLeg | CombinationStandardLeg;

export type CombinationMultiBetLeg = CombinationBuildABetLeg | CombinationCrossBetLeg;

export interface CombinationBuildABetLeg extends CombinationBaseLeg {
    marketsAndSelections: MarketAndSelection[];
    type: LegType.BuildABet;
}

export interface CombinationCrossBetLeg extends CombinationBaseLeg {
    marketsAndSelections: MarketAndSelection[];
    type: LegType.CrossBet;
}

export interface CombinationStandardLeg extends CombinationBaseLeg {
    disableCombinationsIn: DisableCombinationsIn;
    selection: { id: number };
    market: { id: number };
    type: LegType.Standard;
}

interface CombinationBaseLeg extends BaseLeg {
    competition: { id: string };
    event: { id: number };
    sport: { id: string };
    inPlay: boolean;
    marketTemplateId: string[];
}
