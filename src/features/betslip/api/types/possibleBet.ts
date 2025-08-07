import type { LegType } from 'src/common/enums';
import type { Competition } from 'src/common/types/competition';
import type { Price } from 'src/common/types/selectionPrice';

import type { BaseBet, Sport } from './bet';
import type { BaseFreeBetCredit, FreeBetRemark } from './freeBet';
import type { BaseLeg, BetLeg, DisableCombinationsIn, MarketAndSelection } from './leg';

export interface SelectedBet<T = BetLeg> extends BaseBet {
    betReferralEnabled: boolean;
    legs: T[];
    maxStake: number;
    price: Price;
}

export interface PossibleBet<T = PossibleBetLeg> extends SelectedBet<T> {
    ip: string;
    channel: string;
    competition: Competition;
    currency: Currency;
    country: Country;
    freebetCredits?: BaseFreeBetCredit[];
    freebetRemarks?: FreeBetRemark[];
    sport: Sport;
}

export type PossibleBetLeg = PossibleMultiBetLeg | PossibleStandardBetLeg;

export type PossibleMultiBetLeg = PossibleBuildABetLeg | PossibleCrossBetLeg;

export interface PossibleBuildABetLeg extends BasePossibleBetLeg {
    marketsAndSelections: MarketAndSelection[];
    type: LegType.BuildABet;
}

export interface PossibleCrossBetLeg extends BasePossibleBetLeg {
    marketsAndSelections: MarketAndSelection[];
    type: LegType.CrossBet;
}

export interface PossibleStandardBetLeg extends BasePossibleBetLeg {
    disableCombinationsIn?: DisableCombinationsIn;
    market: { id: number };
    selection: { id: number };
    type: LegType.Standard;
}

export interface BasePossibleBetLeg extends BaseLeg {
    inPlay: boolean;
    competition: { id: string };
    event: { id: number };
    sport: { id: string };
    marketTemplateId: string[];
}

interface Country {
    hidden: boolean;
    readOnly: boolean;
    value: string;
}

interface Currency {
    hidden: boolean;
    readOnly: boolean;
    value: string;
}
