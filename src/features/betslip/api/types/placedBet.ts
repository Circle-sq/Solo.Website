import type { Currency, LegType } from 'src/common/enums';
import type { AssetFlow, Result } from 'src/common/types/myBet';
import type { Price } from 'src/common/types/selectionPrice';

import type { BaseBet, Metadata } from './bet';
import type { FreeBetCredit } from './freeBet';
import type { BaseLeg, LegFeedProperties } from './leg';

export interface PlacedBet<T = PlacedBetLeg> extends BaseBet {
    betId: string;
    gameId: GameId;
    legs: T[];
    account: Account;
    currency: Currency;
    numLines: number;
    operatorStakePerLine: number;
    operatorTotalStake: number;
    status: string;
    settleType: null;
    settledAt: string | null;
    settledBy: null;
    placedAt: string;
    placedBy: null;
    comment: null;
    country: string;
    channel: string;
    affiliate: null;
    stakeFactor: number;
    maxBet: number;
    cashOut: boolean;
    payout: null;
    operatorPayout: null;
    profit: null;
    operatorProfit: null;
    remarks: unknown[];
    transaction?: Transaction;
    firstBet: boolean;
    freebet?: boolean;
    ip: string;
    gtmSelection: GtmSelection;
}

export type GameId = string | number | null;

export type PlacedBetLeg = PlacedMultiBetLeg | PlacedStandardBetLeg;

export type PlacedMultiBetLeg = PlacedBuildABetLeg | PlacedCrossBetLeg;

export interface PlacedBuildABetLeg extends PlacedBetLegBase {
    marketsAndSelections: MarketAndSelection[];
    type: LegType.BuildABet;
}

export interface PlacedCrossBetLeg extends PlacedBetLegBase {
    marketsAndSelections: MarketAndSelection[];
    type: LegType.CrossBet;
}

export interface PlacedStandardBetLeg extends PlacedBetLegBase {
    legFeedProperties: LegFeedProperties;
    market: Market;
    selection: Selection;
    type: LegType.Standard;
}

export interface PlacedBetLegBase extends BaseLeg {
    id: string;
    sport: LegCompetition;
    competition: LegCompetition;
    event: LegEvent;
    stakeFactor: number;
    eachWayTerms: null;
    termsWithBet: boolean | null;
    eventCountry: string[];
    spPrice: null;
    result: null;
    appliedInPlayDelay: number;
    inPlay: boolean;
    winningSelection: null;
    uuid?: string;
    // Temporary
    isFreeBet?: boolean;
    potentialReturns: number;
    stakePerLine?: number | null;
}

export interface GtmSelection {
    pageType: string;
    urlPath: string;
    isLive: boolean;
    isHighlight?: boolean;
}

export interface MarketAndSelection {
    market: Market;
    selection: Selection;
    price: Price;
    result: Result | null;
    legFeedProperties: LegFeedProperties;
    winningSelection: null;
}

export interface Market {
    id: number;
    name: string;
    url: string;
    provider: string;
    templateId: string;
    templateMarketTypeGeneric: string;
    templateName: string;
    metadata: Metadata;
}

export interface Selection {
    id: number;
    name: string;
    metadata: Metadata;
    line: null;
}

export interface LegCompetition {
    id: string;
    name: string;
    url: string;
    metadata: Metadata;
    translations: null;
}

export interface LegEvent {
    id: string;
    name: string;
    url: string;
    metadata: Metadata;
    startTime: string;
}

export interface Account {
    id: number;
    platformId: string;
    type: string;
    name: string;
    externalId: string;
    brandId: string | null;
}

export interface Transaction {
    updatedAt: string;
    preconditions: unknown[];
    assetFlows: AssetFlow[];
    wallet: Wallet;
    tags: Tags;
}

export interface Tags {
    markets: number[];
    selections: number[];
    sports: string[];
    competitions: string[];
    events: string[];
    bonuses: null;
    freebetCredits: FreeBetCredit[];
    providers: string[];
}

export interface Wallet {
    id: string;
    account: Account;
}
