import type { MediaActionTypes } from './types';

export const SET_MEDIA_EVENT = 'SET_MEDIA_EVENT';
export const SET_MEDIA_ACTIVE_TAB = 'SET_MEDIA_ACTIVE_TAB';
export const SET_MEDIA_IS_PLAYING_VIDEO = 'SET_MEDIA_IS_PLAYING_VIDEO';
export const SET_MEDIA_WIDGET_STATE = 'SET_MEDIA_WIDGET_STATE';
export const SET_MEDIA_DROPDOWN_LIST_STATE = 'SET_MEDIA_DROPDOWN_LIST_STATE';
export const RESET_MEDIA_STATE = 'RESET_MEDIA_STATE';

export function setMediaEventId(eventId: number): MediaActionTypes {
    return {
        type: SET_MEDIA_EVENT,
        eventId,
    };
}

export function setMediaActiveTab(tab: string): MediaActionTypes {
    return {
        type: SET_MEDIA_ACTIVE_TAB,
        tab,
    };
}

export function setMediaIsPlayingVideo(isPlaying: boolean): MediaActionTypes {
    return {
        type: SET_MEDIA_IS_PLAYING_VIDEO,
        isPlaying,
    };
}

export function setMediaWidgetState(isExpanded: boolean): MediaActionTypes {
    return {
        type: SET_MEDIA_WIDGET_STATE,
        isExpanded,
    };
}

export function setDropdownListState(isSelected: boolean): MediaActionTypes {
    return {
        type: SET_MEDIA_DROPDOWN_LIST_STATE,
        isSelected,
    };
}

export function resetMediaState(): MediaActionTypes {
    return {
        type: RESET_MEDIA_STATE,
    };
}
