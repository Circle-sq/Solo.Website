import type { RequestStatus, SportType } from 'src/common/enums';

import type { MarketIndex, Markets } from './market';
import type { Media } from './media';
import type { Score, Statistics } from './statistics';

export interface EventItem {
    active?: boolean;
    originalName: string;
    antePost?: boolean | null;
    autoTakeDown?: boolean;
    blockSettlement?: boolean | null;
    cashoutAvailable?: boolean;
    competition: number;
    display?: boolean;
    displayOrder?: number;
    eventType?: string | null;
    feedData?: unknown;
    feedId?: string | null;
    id: number;
    marketIndex?: MarketIndex[];
    markets?: Markets;
    media?: Media;
    name: string;
    participants: Participant[];
    _retrieved?: boolean;
    revision: number;
    score?: EventScore | null;
    sport: SportType;
    state?: string;
    _state?: RequestStatus;
    statistics: Statistics;
    tags?: Tags;
    template?: string;
    timeSettings?: TimeSettings;
    translationData?: TranslationData;
}

export interface TranslationData {
    event: string;
    competition: string;
    participants: string[];
}

export interface EventScore {
    formatted: string;
    value: Score[];
    set?: string;
}

export interface EventMediaItem {
    media: Media;
    sport: SportType;
    id: string | number;
}

export interface Participant {
    id: number;
    name: string | undefined;
    role: string | undefined | null;
    tags: { uniformUrl: string[] } | undefined;
    metadata?: Metadata;
}

export interface Pitchers {
    id: number;
    name: string;
    role: 'home' | 'away';
}

export interface Metadata {
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

export interface TimeSettings {
    startTime: string;
    started: boolean;
    timeZone: string;
    tradedInPlay: boolean;
    offAtStartTime?: boolean;
    timeline?: string;
}

export type Tags = Record<string, string[] | string>;
