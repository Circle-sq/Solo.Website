import type { TimeSettings } from 'src/common/types/event';
import type { Media } from 'src/common/types/media';
import type { SelectionItem } from 'src/common/types/selection';
import type { Statistics } from 'src/common/types/statistics';
import type { MarketTemplate } from 'src/store/events/types';

export interface SelectionPriceChangeBody extends BaseUpdateBody {
    line: number;
    selections: Record<number, SelectionItem>;
}

export interface SelectionStatusUpdateBody extends BaseUpdateBody {
    line: number;
    selections: Record<number, SelectionItem>;
}

export interface MarketStatusUpdateBody extends BaseUpdateBody {
    line: number;
    state: string;
    template: MarketTemplate;
}

export interface MarketMainLine {
    marketId: number;
    marketTemplateId: string;
}

export interface MarketMainLineUpdateBody {
    event: WsEvent;
    marketMainLine: MarketMainLine;
}

export interface EventMarketCreatedBody {
    active: boolean;
    asianInPlayLine: null;
    autoTakeDown: boolean;
    betReferralEnabled: boolean;
    bp: boolean;
    bpApplicable: boolean;
    cashoutAvailable: boolean;
    crossbetAllowed: boolean;
    display: boolean;
    displayOrder: number;
    eachWayStakeReduction: number;
    event: WsEvent;
    forecastsOffered: boolean;
    line: number;
    market: WsMarket;
    name: string;
    outright: boolean;
    selections: { [key: string]: Selection };
    sp: boolean;
    spApplicable: boolean;
    spOnly: boolean;
    speedBetContext: null;
    state: string;
    suspendTime: null;
    tags: { [key: string]: string[] };
    team: null;
    template: MarketTemplate;
    time: null;
    tradedInPlay: boolean;
    tricastsOffered: boolean;
}

export interface EventMediaUpdateBody {
    event: WsEvent;
    media: Media;
}

export interface EventFeedStatisticsUpdateBody {
    event: WsEvent;
    statistics: Statistics;
}

type TimeLineState = 'PREMATCH' | 'STARTED' | 'FINISHED';

export interface EventTimeSettingsUpdateBody {
    event: WsEvent;
    timeSettings: Omit<TimeSettings, 'timeline'> & { timeLineState: TimeLineState };
}

export interface EventStatusUpdateBody extends Statuses {
    event: WsEvent;
    state: string;
}

interface BaseUpdateBody extends Statuses {
    event: WsEvent;
    market: WsMarket;
}

interface Statuses {
    active: boolean;
    display: boolean;
}

interface WsEvent {
    id: number;
    name: string;
    platformId: string;
}

interface WsMarket {
    id: number;
    name: string;
}
