import type { LegType } from 'src/common/enums';

import type { BaseFreeBetCredit } from './freeBet';
import type { BaseLeg, DisableCombinationsIn, MarketAndSelection } from './leg';

export interface CastBet<T = CastBetLeg> {
    id?: string;
    type: string;
    eachWay: boolean;
    stakePerLine: number;
    country: { value: string };
    currency: { value: string };
    freebetCredits?: [BaseFreeBetCredit];
    legs: T[];
}

export type CastBetLeg = CastMultiBetLeg | CastStandardBetLeg;

export type CastMultiBetLeg = CastBuildABetLeg | CastCrossBetLeg;

export interface CastBuildABetLeg extends BaseLeg {
    event: { id: number };
    marketsAndSelections: MarketAndSelection[];
    type: LegType.BuildABet;
}

export interface CastCrossBetLeg extends BaseLeg {
    event: { id: number };
    marketsAndSelections: MarketAndSelection[];
    type: LegType.CrossBet;
}

export interface CastStandardBetLeg extends BaseLeg {
    disableCombinationsIn?: DisableCombinationsIn;
    event: { id: number };
    market: { id: number };
    selection: { id: number };
    type: LegType.Standard;
}
