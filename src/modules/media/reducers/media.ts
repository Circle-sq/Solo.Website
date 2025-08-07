import type {
    MediaSetActiveTabActionType,
    MediaSetEventActionType,
    MediaWidgetState,
    MediaPlayingVideoPayload,
    MediaSetDropdownListStateType,
} from '../actions/types';
import type { MediaStreamState } from './types';

export function SET_MEDIA_EVENT(state: MediaStreamState, payload: MediaSetEventActionType): MediaStreamState {
    return state.set('eventId', payload.eventId);
}

export function SET_MEDIA_ACTIVE_TAB(state: MediaStreamState, payload: MediaSetActiveTabActionType): MediaStreamState {
    return state.set('activeTab', payload.tab);
}

export function SET_MEDIA_IS_PLAYING_VIDEO(
    state: MediaStreamState,
    payload: MediaPlayingVideoPayload,
): MediaStreamState {
    return state.set('isPlayingVideo', payload.isPlaying);
}

export function SET_MEDIA_WIDGET_STATE(state: MediaStreamState, payload: MediaWidgetState): MediaStreamState {
    return state.set('isMediaWidgetExpanded', payload.isExpanded);
}

export function SET_MEDIA_DROPDOWN_LIST_STATE(
    state: MediaStreamState,
    payload: MediaSetDropdownListStateType,
): MediaStreamState {
    return state.set('isMediaDropdownListSelected', payload.isSelected);
}

export function RESET_MEDIA_STATE(state: MediaStreamState): MediaStreamState {
    return state
        .set('activeTab', '')
        .delete('isMediaDropdownListSelected')
        .delete('stream_url')
        .delete('provider')
        .delete('eventId')
        .delete('isMediaWidgetExpanded')
        .delete('isPlayingVideo')
        .delete('streamId');
}
