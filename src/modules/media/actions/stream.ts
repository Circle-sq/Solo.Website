import { REQUEST_ASYNC_STATUS } from 'src/utils/constants';
import type { VideoStream, StreamActionTypes } from './types';

export const STREAM_GET_REQUEST = 'STREAM_GET_REQUEST';
export const STREAM_GET_FINISH = 'STREAM_GET_FINISH';
export const STREAM_GET_ERROR = 'STREAM_GET_ERROR';
export const STREAM_PUSH_UPDATE = 'STREAM_PUSH_UPDATE';
export const GET_STREAM_URL_REQUEST = 'GET_STREAM_URL_REQUEST';
export const GET_STREAM_URL_FINISH = 'GET_STREAM_URL_FINISH';
export const GET_STREAM_URL_ERROR = 'GET_STREAM_URL_ERROR';
export const SET_STREAM_ID_AND_PROVIDER = 'SET_STREAM_ID_AND_PROVIDER';

export function getStreams(): StreamActionTypes {
    return {
        type: STREAM_GET_REQUEST,
        async: REQUEST_ASYNC_STATUS.start,
    };
}

export function setStream(videoStream: VideoStream): StreamActionTypes {
    return {
        type: SET_STREAM_ID_AND_PROVIDER,
        videoStream,
    };
}

export function streamPushUpdate(eventId: number, streams: Record<string, string>[]): StreamActionTypes {
    return {
        type: STREAM_PUSH_UPDATE,
        streams,
        eventId,
    };
}

export function getStreamsFinish(streams: Record<string, string>[]): StreamActionTypes {
    return {
        type: STREAM_GET_FINISH,
        async: REQUEST_ASYNC_STATUS.end,
        streams,
    };
}

export function getStreamsError(error: Record<string, string>): StreamActionTypes {
    return {
        type: STREAM_GET_ERROR,
        error,
    };
}

export function getStreamUrl(videoStream: VideoStream): StreamActionTypes {
    return {
        type: GET_STREAM_URL_REQUEST,
        async: REQUEST_ASYNC_STATUS.start,
        videoStream,
    };
}

export function getStreamUrlFinish(url: string): StreamActionTypes {
    return {
        type: GET_STREAM_URL_FINISH,
        async: REQUEST_ASYNC_STATUS.end,
        url,
    };
}

export function getStreamUrlError(error: Record<string, string>): StreamActionTypes {
    return {
        type: GET_STREAM_URL_ERROR,
        error,
    };
}
