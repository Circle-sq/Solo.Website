import type { REQUEST_ASYNC_STATUS } from 'src/utils/constants';

import type {
    STREAM_GET_REQUEST,
    STREAM_GET_ERROR,
    STREAM_GET_FINISH,
    STREAM_PUSH_UPDATE,
    GET_STREAM_URL_REQUEST,
    GET_STREAM_URL_FINISH,
    GET_STREAM_URL_ERROR,
    SET_STREAM_ID_AND_PROVIDER,
} from './stream';

interface StreamRequestStartAction {
    type: typeof STREAM_GET_REQUEST;
    async: typeof REQUEST_ASYNC_STATUS.start;
}

export interface StreamsRequestFinishAction {
    type: typeof STREAM_GET_FINISH;
    streams: Record<string, string>[];
    async: typeof REQUEST_ASYNC_STATUS.end;
}

export interface StreamSetAction {
    type: typeof SET_STREAM_ID_AND_PROVIDER;
    videoStream: VideoStream;
}

export interface StreamsRequestError {
    type: typeof STREAM_GET_ERROR;
    error: Record<string, string>;
}

export interface StreamsUpdate {
    type: typeof STREAM_PUSH_UPDATE;
    streams: Record<string, string>[];
    eventId: number;
}

interface StreamUrlRequestStartAction {
    type: typeof GET_STREAM_URL_REQUEST;
    videoStream: VideoStream;
    async: typeof REQUEST_ASYNC_STATUS.start;
}

export interface StreamUrlRequestFinishAction {
    type: typeof GET_STREAM_URL_FINISH;
    url: string;
    async: typeof REQUEST_ASYNC_STATUS.end;
}

export interface StreamUrlRequestError {
    type: typeof GET_STREAM_URL_ERROR;
    error: Record<string, string>;
}

export interface MediaSetEventActionType {
    type: string;
    eventId: number;
}

export interface MediaSetActiveTabActionType {
    type: string;
    tab: string;
}

export interface MediaPlayingVideoPayload {
    type: string;
    isPlaying: boolean;
}

export interface VideoStream {
    streamId: string | number | undefined | null;
    provider: string | undefined;
    img_api_url?: string;
    deviceType?: string;
}

export interface MediaWidgetState {
    type: string;
    isExpanded: boolean;
}

export interface MediaSetDropdownListStateType {
    type: string;
    isSelected: boolean;
}

export interface MediaWidgetDefaultState {
    type: string;
}

export type StreamActionTypes =
    | StreamRequestStartAction
    | StreamsRequestFinishAction
    | StreamSetAction
    | StreamsRequestError
    | StreamUrlRequestStartAction
    | StreamUrlRequestFinishAction
    | StreamUrlRequestError
    | StreamsUpdate;

export type MediaActionTypes =
    | MediaSetEventActionType
    | MediaSetActiveTabActionType
    | MediaWidgetState
    | MediaPlayingVideoPayload
    | MediaSetDropdownListStateType
    | MediaWidgetDefaultState;
