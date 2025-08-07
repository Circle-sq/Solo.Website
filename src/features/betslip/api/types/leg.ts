import type { BetStatus, LegType } from 'src/common/enums';
import type { Price, PriceType } from 'src/common/types/selectionPrice';

import type { BaseFreeBetCredit, FreeBetRemark } from './freeBet';

export interface Leg<T = MultiBetLeg> {
    id?: string;
    selectionId: string;
    marketId?: number;
    marketRevision: number;
    eventId?: number;
    eventRevision: number;
    eachWay: boolean;
    priceType: PriceType;
    price: Price | null;
    maxStake?: number | null;
    totalStake?: number;
    potentialReturnsAt?: number;
    event?: { id: number };
    selection?: Record<string, unknown>;
    competition: { id: string };
    sport: Sport;
    result?: Record<string, unknown>;
    stakePerLine?: number;
    type?: string;
    legs?: T[];
    freebet?: boolean;
    numLines?: number;
    betReferralEnabled?: boolean;
    // Temporary
    potentialReturns: number;
    freebetCredits?: BaseFreeBetCredit[];
    freebetRemarks?: FreeBetRemark[];
    state?: unknown;
    // Not sure if this should be here
    market?: {
        id?: string;
    };
    isRelated?: boolean;
    isFreeBet?: boolean;
    uuid?: string;
    disableCombinationsIn?: DisableCombinationsIn;
}

export type BetLeg = MultiBetLeg | StandardBetLeg;

export type MultiBetLeg = BuildABetLeg | CrossBetLeg;

export interface BuildABetLeg extends BaseLeg {
    event: { id: number };
    marketsAndSelections: MarketAndSelection[];
    type: LegType.BuildABet;
}

export interface CrossBetLeg extends BaseLeg {
    event: { id: number };
    marketsAndSelections: MarketAndSelection[];
    type: LegType.CrossBet;
}

export interface StandardBetLeg extends BaseLeg {
    disableCombinationsIn?: DisableCombinationsIn;
    event: { id: number };
    market: { id: number };
    selection: { id: number };
    type: LegType.Standard;
}

export interface BaseLeg {
    type: LegType;
    price: Price;
    priceType: PriceType;
}

export interface MarketAndSelection {
    selection: { id: number; name?: string };
    market: { id: number; name?: string };
    price: Price;
    result?: Result | null;
    legFeedProperties: LegFeedProperties | null;
    winningSelection?: null;
}

export interface LegFeedProperties {
    eventFeedId: string;
    marketFeedId: string;
    selectionFeedId: string;
    producerFeedId: string;
    sportFeedId: string;
    provider: string;
}

export interface Legs {
    [id: string]: Leg;
}

export type DisableCombinationsIn = Array<LegType.BuildABet | LegType.CrossBet>;

export interface Result {
    type: BetStatus;
}

export interface Sport {
    id: string;
    name: string;
}
