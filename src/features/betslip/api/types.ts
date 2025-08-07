import type { Snapshot } from 'recoil';

import type { BetslipTab } from 'src/common/enums';
import type { Competition } from 'src/common/types/competition';
import type { Participant } from 'src/common/types/event';
import type { SelectionItem } from 'src/common/types/selection';
import type { CurrencyType } from 'src/config/types';
import type { EventItem, MarketItem } from 'src/store/events/types';

import type { Channel, PossibleBetsTriggeredBy } from '../enums';
import type { BetslipSelections } from '../store/types';

import type { CastBet } from './types/castBet';
import type { Combination, Combinations } from './types/combination';
import type { BetError } from './types/error';
import type { Leg } from './types/leg';
import type { PossibleBet, SelectedBet } from './types/possibleBet';
import type { Problem } from './types/problem';

export interface MutationError {
    body?: ErrorBody;
    message: ErrorMessage;
}

export interface ErrorMessage {
    errors: BetError[];
}

interface ErrorBody {
    data?: ErrorBodyData;
    debug: ErrorBodyDebug;
    errors: BetError[];
    problems: Problem[];
}

interface ErrorBodyData {
    bets: CastBet[];
    combinations: Combinations;
    possibilityError: unknown;
}

interface ErrorBodyDebug {
    code: string;
    message: string;
    debugDetails: null;
    details: null;
    errors: DebugError[];
}

interface DebugError {
    code: string;
    resource: string;
    field: null;
    debugDetails: null;
    details: null;
    pointer: null;
}

export interface PossibleBetsApiParams {
    id: string;
    combinations: Combinations;
    legs: Leg[];
    isFreeBetTax: boolean;
    signal?: AbortSignal;
    snapshot: Snapshot;
    triggeredBy: PossibleBetsTriggeredBy;
    animationKey?: string;
    prevBuildABetId?: string;
}

export interface PossibleBetApiData {
    betslipSelections: BetslipSelections;
    betslipState: { activeBetslipTab: BetslipTab; stakePerLine: number };
    channel: Channel;
    combinations: Combinations;
    legs: Leg[];
    uncheckedLegs: Leg[];
    isFreeBet: boolean;
    isFreeBetTax: boolean;
    triggeredBy: PossibleBetsTriggeredBy;
    currency: CurrencyType;
}

export interface PossibleBetApiReturn {
    bets: PossibleBet[];
    combinations: Combinations;
    competitions: Competition[];
    events: PossibleBetEvent[];
    sports: unknown[];
    selectedBets: SelectedBet[];
    selectedBetsProblems: Problem[];
}

export interface PossibleBetApiResponse {
    bets: PossibleBet[];
    combinations: Combinations;
    competitions: Competition[];
    events: (Omit<EventItem, 'markets' | 'participants'> & { markets: string[]; participants: Participant[] })[];
    markets: (Omit<MarketItem, 'selections'> & { selections: string[] })[];
    selections: SelectionItem[];
    participants: Participant[];
    sports: unknown[];
    originalResponse: OriginalPossibleBetResponse;
}

export interface OriginalPossibleBetResponse {
    combinations: Combination[];
    selectedBets: SelectedBet[];
    selectedBetsProblems: Problem[];
}

export type PossibleBetEvent = Omit<EventItem, 'markets' | 'participants'> & {
    markets: PossibleBetMarket[];
    participants: Participant[];
};

export interface PossibleBetMarkets {
    [marketId: string]: PossibleBetMarket;
}

export type PossibleBetMarket = Omit<MarketItem, 'selections'> & { selections: SelectionItem[] };
