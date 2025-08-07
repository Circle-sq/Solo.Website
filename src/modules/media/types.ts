import type { RequestStatus } from 'src/common/enums';
import type { EventMediaType } from 'src/utils/types';

export interface MediaState {
    eventId: number;
    streams: Streams;
    stream_url: StreamUrl;
    activeTab?: EventMediaType;
    streamId?: string;
    provider: string;
    isMediaWidgetExpanded: boolean;
    isMediaDropdownListSelected: boolean;
    isPlayingVideo: boolean;
}

interface Stream {
    name: string;
    eventStartTime: string;
    competitionDisplayOrder: string;
    sportDisplayOrder: string;
    sportEventId: string;
    sportId: string;
    streamId: string;
    provider: string;
    value: string;
    label: string;
}

export interface Streams {
    items: Stream[];
    state: RequestStatus;
    error?: Record<string, string>;
}

export interface StreamUrl {
    state: RequestStatus;
    stream_url: string;
    error?: Record<string, string>;
}
