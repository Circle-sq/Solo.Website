import type { FreeBetCredit } from './freeBet';

export interface Bet extends BaseBet {
    freebetCredits: FreeBetCredit[];
}
export interface BaseBet extends BetStake {
    id: string;
    type: string;
    eachWay: boolean;
}

export interface BetStake {
    stakePerLine: number;
    potentialReturns: number;
    totalStake: number;
}

export interface Market {
    id: number;
    name: string;
    type?: null;
    constraint?: string;
}

export interface Selection {
    id: number;
    name: string;
    metadata: Metadata;
}

export interface Metadata {
    nameTranslations: {
        'ko-KR': string;
    };
}

export interface Sport {
    id: string;
    name: string;
    displayOrder: number;
}
