import type { BetslipTab, OfferStatus, OfferUser } from 'src/common/enums';
import type { MarketType } from 'src/common/enums/market';
import type { Price, PriceType } from 'src/common/types/selectionPrice';

import type { BetError, MessageParams } from '../api/types/error';
import type { FreeBetCredit } from '../api/types/freeBet';
import type { DisableCombinationsIn, Legs } from '../api/types/leg';
import type { GtmSelection, PlacedBetLeg } from '../api/types/placedBet';
import type { PossibleBetsTriggeredBy } from '../enums';

export interface Betslip {
    showBettingSettings: boolean;
}

export interface BetReceipt {
    legs: PlacedBetLeg[];
    totalStake: number;
    totalPotentialReturns: number;
    betsCount: number;
    betName?: string;
    betType?: string;
    isFreeBet?: boolean;
}

export interface BalancedStakes {
    [selectionId: string]: number;
}

export interface FreeBetsUpdateItem {
    betId: string;
    credits: FreeBetCredit[];
}

export interface BetslipWarning extends MessageParams {
    error?: BetError;
}

export interface Offer {
    legs: Legs;
    expiresAt: string | null;
    offeredAt: string | null;
    status: OfferStatus | undefined;
    user: OfferUser | null;
}

export interface BetslipSelections {
    [selectionId: string]: BetslipSelection;
}

export interface BetslipSelection {
    disableCombinationsIn: DisableCombinationsIn;
    eventId: number;
    marketId: number;
    marketRevision: number;
    eventRevision: number;
    selectionId: string;
    price: Price | null;
    priceType: PriceType;
    marketType: MarketType | null;
    timestamp: number;
    eachWay: boolean;
    gtmSelection?: GtmSelection;
}

export interface SelectionPayload {
    eventId: number;
    marketId: number;
    eventRevision: number;
    marketRevision: number;
    selectionId: number;
    price: Price | null;
    priceType: PriceType;
    marketType: MarketType | null;
    isBuildABetRelated?: boolean;
    isCrossPageRelated?: boolean;
    gtmSelection?: GtmSelection;
}

export interface PossibleBetsTrigger {
    triggeredBy: PossibleBetsTriggeredBy;
    controller: AbortController;
}

export type MultipleBetStakes = Record<BetslipTab.Multi | BetslipTab.System, number>;
