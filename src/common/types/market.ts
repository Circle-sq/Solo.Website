import type { Tags } from './event';
import type { Selections } from './selection';

export interface Markets {
    [marketId: string]: MarketItem;
}

export interface MarketIndex {
    active: boolean;
    display: boolean;
    id: number;
    marketState: string;
    marketType: string;
    name: string;
    outright: boolean;
    templateId: string;
}

export interface SpeedBetTranslation {
    title: string;
    contextNote: string;
    constraint: string;
    Y: string;
    N: string;
}

interface SpeedBetContext {
    constraint?: string;
    contextNote: string;
    isCore: boolean;
    timestamp: number;
    translations?: Record<string, SpeedBetTranslation>;
}

export interface MarketItem {
    id: number;
    name: string;
    displayOrder: number;
    active: boolean;
    activated: boolean;
    display: boolean;
    displayed: boolean;
    autoTakeDown: boolean;
    bpApplicable: boolean;
    cashoutAvailable: boolean;
    forecastsOffered: boolean;
    selections: Selections;
    eachWay: MarketEachWay;
    eachWayStakeReduction: null;
    suspendTime: null;
    spOnly: boolean;
    inPlayDelay: number;
    bp: boolean;
    tricastsOffered?: boolean;
    betReferralEnabled: boolean;
    line: number | null;
    tags: Tags;
    tradedInPlay: boolean;
    market?: {
        id: number;
        name: string;
    };
    template: MarketTemplate;
    speedBetContext?: SpeedBetContext;
    event: {
        id: number;
        name: string;
    };
    spApplicable: boolean;
    sp: boolean;
    revision: number;
}

export interface MarketTemplate {
    id: string;
    name: string;
    eventTemplateId: string;
    marketTypeGeneric: string;
    marketTemplateType?: string;
    sportId: string;
    customName: string;
}

export interface MarketEachWay {
    offered: true;
    termsWithBet: false;
    terms: [MarketEachWayTerms];
}

export interface MarketEachWayTerms {
    places: number;
    reduction: string;
}
