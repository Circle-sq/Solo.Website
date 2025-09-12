import type { LegType } from 'src/common/enums';

import type { BaseBet } from './bet';
import type { BaseLeg } from './leg';

export interface ReferredBet extends BaseReferredBet {
    correlationID: string;
    comment: null;
    freebet: boolean;
    legs?: ReferredLeg[]; // exist only when OfferStatus is Assigned or Accepted
}

export interface BaseReferredBet extends Omit<BaseBet, 'id'> {
    country: string;
    channel: string;
}

export type ReferredLeg = ReferredMultiBetLeg | ReferredStandardLeg;

export type ReferredMultiBetLeg = ReferredBuildABetLeg;

interface ReferredBuildABetLeg extends ReferredBaseLeg {
    type: LegType.BuildABet;
    marketsAndSelections: ReferredMarketAndSelection[];
    market: null;
    selection: null;
}

export interface ReferredStandardLeg extends ReferredBaseLeg {
    type: LegType.Standard;
    market: CommonItem;
    selection: CommonItem;
    marketsAndSelections: [];
}

export interface ReferredBaseLeg extends BaseLeg {
    appliedInPlayDelay: null;
    competition: CommonItem;
    eachWayTerms: null;
    eventCountry: [string];
    event: CommonItem;
    sport: CommonItem;
    stakeFactor: number;
    termsWithBet: null;
}

export interface ReferredMarketAndSelection {
    market: CommonItem;
    selection: CommonItem;
    spPrice: null;
    priceType: null;
    result: null;
    feedProperties: null;
}

export interface CommonItem {
    id: string;
    name: string;
    url: null;
}
