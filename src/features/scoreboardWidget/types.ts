import type { SportType } from 'src/common/enums';
import type { MarketItem } from 'src/common/types/market';
import type { SelectionItem } from 'src/common/types/selection';
import type { Statistics } from 'src/common/types/statistics';

import type { AlertType } from './enums';

export interface SpeedBetMarkets {
    ids: Set<number>;
    markets: MarketItem[];
}

export interface SpeedBetMarketSelection {
    market: MarketItem;
    selection: SelectionItem;
}

interface TimeSettings {
    startTime: string;
    started: boolean;
    timeZone: string;
    tradedInPlay: boolean;
    offAtStartTime?: boolean;
    timeline?: string;
}

interface Stream {
    count: number;
    displayOrder: number;
    id: string;
    name: string;
}

interface MediaProvider {
    id: string | null;
    provider: string;
    externalId: null | string;
}

interface Metadata {
    drawn: null;
    jockey: null;
    number: null;
    place: null;
    status: null;
    silk: null;
    silkUrl: null;
    trainer: null;
    weight: null;
}

export interface Event {
    id: number;
    name: string;
    type: string;
    originalName: string;
    state: string;
    template: {
        id: string;
        sportId: string;
        name: string;
    };
    sport: SportType;
    tags: {
        [key: string]: string[];
    };
    timeSettings: TimeSettings;
    competition: string;
    participants: {
        id: string;
        role: string;
    }[];
    active: boolean;
    display: boolean;
    displayOrder: number;
    cashoutAvailable: boolean;
    marketIds: number[];
    statistics: Statistics;
    translationData: {
        event: string;
        competition: string;
        participants: string[];
    };
    media: {
        statistics: MediaProvider[];
        liveTrackers: MediaProvider[];
        streams: Stream[];
    };
    revision: number;
    markets: number[];
}

export interface Participant {
    id: number;
    name: string | undefined;
    role?: string | undefined | null;
    tags: { uniformUrl: string[] } | undefined;
    metadata?: Metadata;
}

export const enum ParticipantType {
    Home = 'home',
    Away = 'away',
}

export interface StatsItem {
    id: number;
    type: string;
    icon: string;
    count: number;
}

export interface SpeedBetAlertType {
    open: boolean;
    type: AlertType;
}

export interface Price {
    d: number;
    f: string;
}

export interface SelectedLeg {
    marketType: string;
    priceType: string;
    price: Price;
    eventId: number;
    marketId: number;
    selectionId: number;
    timestamp?: number;
    eachWay: boolean;
}

export interface PossibleBetPayload {
    betslipSelections: {
        [selectionId: number]: SelectedLeg;
    };
    legs: Array<SelectedLeg & { stakePerLine: number }>;
    channel: string;
    combinations: object;
    currency: {
        value: string;
    };
}

interface EventId {
    id: number;
}

interface Market {
    id: number;
}

interface Selection {
    id: number;
}

interface Leg {
    type: string;
    priceType: string;
    price: Price;
    event: EventId;
    market: Market;
    selection: Selection;
}

interface CastBet {
    id: string;
    country: {
        value: string;
    };
    currency: {
        value: string;
    };
    eachWay: boolean;
    legs: Leg[];
    stakePerLine: number;
    type: string;
}

export interface PlaceBetPayload {
    castBets: CastBet[];
    channel: string;
    gameId: number | null;
}
