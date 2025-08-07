import type { SportType } from 'src/common/enums';
import type { PlatformObject } from 'src/common/types/competition';
import type { Tags, TimeSettings, TranslationData } from 'src/common/types/event';
import type { MarketIndex } from 'src/common/types/market';
import type { Media } from 'src/common/types/media';
import type { SelectionTemplate } from 'src/common/types/selection';
import type { Price } from 'src/common/types/selectionPrice';
import type { Statistics } from 'src/common/types/statistics';

export interface EventItem<T = MarketItem> {
    active: boolean;
    cashoutAvailable: boolean;
    competition: Competition;
    display: boolean;
    displayOrder: number;
    id: number;
    markets: T[];
    marketIndex: MarketIndex[];
    media: Media;
    name: string;
    originalName: string;
    participants: ParticipantItem[];
    revision: number;
    sport: Sport;
    state: string;
    statistics: Statistics;
    tags: Tags;
    template: EventTemplate;
    timeSettings: TimeSettings;
    translationData: TranslationData;
    type: string;
}

export interface MarketItem<TSelection = SelectionItem> {
    active: boolean;
    cashoutAvailable: boolean;
    display: boolean;
    displayOrder: number;
    event: Parent;
    id: number;
    line?: number | string | null;
    name: string;
    outright: boolean;
    revision: number;
    selections: TSelection[];
    singlesOnly: boolean;
    sp: boolean;
    spOnly: boolean;
    state: string;
    tags: Tags;
    template: MarketTemplate;
    tradedInPlay: boolean;
    eachWay?: { offered?: boolean };
}

export interface SelectionItem {
    active: boolean;
    asianInPlayLine?: string;
    display: boolean;
    displayOrder: number;
    id: number;
    line?: string;
    name: string;
    nameWithoutLine?: string;
    price: Price | null;
    state: string;
    sp?: boolean;
    tags: Record<string, [string]>;
    template: SelectionTemplate;
    parents: {
        eventId: number;
        marketId: number;
    };
}

interface Parent {
    id: number;
    name: string;
}

export interface Competition {
    id: string;
    name: string;
    displayOrder: number;
    globalDisplayOrder: number;
    platformObject: PlatformObject;
}

export interface EventTemplate {
    id: string;
    sportId: string;
    name: string;
}

export interface MarketTemplate {
    eventTemplateId: string;
    id: string;
    marketTemplateType: string;
    marketTypeGeneric: string;
    name: string;
    period: string;
    sportId: string;
}

export interface ParticipantItem {
    role: string;
    metadata: Record<string, unknown>;
    participant: Participant;
}

export interface Participant {
    id: string;
    name: string;
    url: string;
    tags?: { uniformUrl: string[] };
}

export interface Sport {
    id: SportType;
    name: string;
    displayOrder: number;
}
