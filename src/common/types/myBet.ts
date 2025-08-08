import type { BaseBet, Market, Selection } from '@solo-betslip/api/types/bet';
import type { BaseLeg, LegFeedProperties } from '@solo-betslip/api/types/leg';

import type { BetStatus, LegType, RequestStatus } from 'src/common/enums';
import type { CurrencyType } from 'src/config/types';

import type { TimeSettings } from './event';
import type { Price } from './selectionPrice';
import type { Statistics } from './statistics';

export interface MyBets {
    [betId: string]: MyBet;
}

export interface MyBet<T = MyBetLeg> extends BaseBet {
    betId: string;
    status: BetStatus;
    legs: T[];
    settleType: null;
    payout: number | null;
    tax: number | null;
    settledAt: string;
    affiliate: null;
    placedAt: string;
    currency: CurrencyType;
    numLines: number;
    cashOut: boolean;
    cashout: CashOutBet;
    balanceDelta: number | null;
    transaction?: Transaction;
    comment: null;
    displayDate?: boolean;
    errors?: CashOutError | string;
    active?: boolean;
    _state?: RequestStatus;
}

export interface CashOutBet {
    id: string;
    value: number;
    enabled: boolean;
}

export interface CashOutError extends Record<string, unknown> {
    cashoutPanicMode?: string;
}

export type MyBetLeg = MyMultiBetLeg | MyStandardBetLeg;

export type MyMultiBetLeg = MyBuildABetLeg | MyCrossBetLeg;

export interface MyBuildABetLeg extends BaseMyBetLeg {
    marketsAndSelections: MarketAndSelection[];
    type: LegType.BuildABet;
}

export interface MyCrossBetLeg extends BaseMyBetLeg {
    marketsAndSelections: MarketAndSelection[];
    type: LegType.CrossBet;
}

export interface MyStandardBetLeg extends BaseMyBetLeg {
    market: Market;
    selection: Selection;
    type: LegType.Standard;
}

interface BaseMyBetLeg extends BaseLeg {
    id: string;
    placeReduction: null;
    competition: Competition;
    event: CashOutLegEvent;
    sport: Sport;
    spPrice: Price | null;
    appliedInPlayDelay: number;
    winReduction: null;
    eachWayTerms: EachWayTerms | null;
    inPlay: boolean;
    result?: Result | null;
    eventCountry?: string[];
}

export interface MarketAndSelection {
    selection: Selection;
    market: Market;
    price: Price;
    result?: Result | null;
    legFeedProperties: LegFeedProperties | null;
    winningSelection?: null;
}

export interface Competition {
    id: number;
    name: string;
}

export interface CashOutLegEvent {
    id: number;
    name: string;
    startTime: string;
    statistics: Statistics | null;
    timeSettings: TimeSettings;
    tags: EventTags | null;
}

export interface EventTags {
    outright?: string[];
}

export interface EachWayTerms {
    places: number;
    reduction: Reduction;
}

export interface Reduction {
    num: number;
    den: number;
}

export interface Result {
    type: BetStatus;
}

export interface Transaction {
    id: null;
    type: null;
    status: null;
    currency: null;
    amount: null;
    totalAmount: null;
    assetFlows: AssetFlow[];
    tags: Tags;
}

export interface AssetFlow {
    id: string;
    date: string;
    type: string;
    balanceDelta: number;
    balanceAfter: number | null;
    currency: string;
}

export interface Tags {
    bonuses?: number[];
    selections?: number[];
    adjustmentType?: string[];
    accountAdjustment?: boolean;
    tradingAdjustment?: boolean;
    freebetCredits?: CashOutFreeBetCredit[];
}

export interface CashOutFreeBetCredit {
    id: number;
    amount: number;
    promotionId: string;
}

export interface Sport {
    id: string;
    name: string;
}
