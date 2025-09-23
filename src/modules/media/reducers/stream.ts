import { fromJS } from 'immutable';

import { RequestStatus } from 'src/common/enums';

import type {
    StreamUrlRequestFinishAction,
    StreamsRequestFinishAction,
    StreamsRequestError,
    StreamUrlRequestError,
    StreamsUpdate,
    StreamSetAction,
} from '../actions/types';

import type { MediaStreamState, UpdateStreams } from './types';

export function SET_STREAM_ID_AND_PROVIDER(state: MediaStreamState, payload: StreamSetAction): MediaStreamState {
    const videoStream = payload.videoStream;

    return state.set('streamId', videoStream?.streamId?.toString()).set('provider', videoStream.provider);
}

export function STREAM_GET_REQUEST(state: MediaStreamState): MediaStreamState {
    return state.set('streams', fromJS({ state: RequestStatus.Progress }));
}

export function STREAM_GET_FINISH(state: MediaStreamState, payload: StreamsRequestFinishAction): MediaStreamState {
    return state.mergeIn(['streams'], fromJS({ ...state, state: RequestStatus.Ready, items: payload.streams }));
}

export function STREAM_GET_ERROR(state: MediaStreamState, payload: StreamsRequestError): MediaStreamState {
    return state.set('streams', fromJS({ state: RequestStatus.Error, error: payload.error }));
}

export function STREAM_PUSH_UPDATE(state: MediaStreamState, payload: StreamsUpdate): MediaStreamState {
    const updateStreams: UpdateStreams = (events, streams, eventId) =>
        events.filter((stream) => stream.get('sportEventId') !== `${eventId}`).concat(streams);

    return state.mergeIn(
        ['streams'],
        fromJS({
            items: updateStreams(state.getIn(['streams', 'items'], []), fromJS(payload.streams), payload.eventId),
        }),
    );
}

export function GET_STREAM_URL_REQUEST(state: MediaStreamState): MediaStreamState {
    return state.set('stream_url', fromJS({ state: RequestStatus.Progress }));
}

export function GET_STREAM_URL_FINISH(
    state: MediaStreamState,
    payload: StreamUrlRequestFinishAction,
): MediaStreamState {
    return state.set('stream_url', fromJS({ state: RequestStatus.Ready, url: payload.url }));
}

export function GET_STREAM_URL_ERROR(state: MediaStreamState, payload: StreamUrlRequestError): MediaStreamState {
    return state.set('stream_url', fromJS({ state: RequestStatus.Error, error: payload.error }));
}
