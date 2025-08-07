import get from 'lodash/get';
import { createSelector } from 'reselect';

import type { ReduxState } from 'src/appState/redux/types';
import { remapESoccerStreams } from 'src/modules/media/effects/stream';

import type { MediaState } from './types';

export const mediaStreamSelector = (state: ReduxState) => state.media;

export const mediaSelector = createSelector(mediaStreamSelector, (mediaState) => mediaState?.toJS() as MediaState);

export const activeMediaTabSelector = createSelector(mediaSelector, (mediaState) => get(mediaState, 'activeTab', ''));

export const mediaStreamsItemsSelector = createSelector(mediaSelector, (mediaState) => {
    const streamItems = mediaState?.streams?.items || [];

    if (streamItems.length > 0) {
        return remapESoccerStreams(streamItems);
    }

    return streamItems;
});
