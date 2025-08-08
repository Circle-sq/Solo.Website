import { observer } from 'mobx-react-lite';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSetRecoilState } from 'recoil';

import { useBlacklistQuery } from '@solo-api/streams/blacklist/queries';
import { eventMediaAtom } from '@solo-media/store/atoms';
import { FootballFieldIcon, LiveStreamingIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import type { EventModel } from 'src/appState/models/models/EventModel';
import type { MediaItem } from 'src/common/types/media';
import {
    resetMediaState,
    setDropdownListState,
    setMediaActiveTab,
    setMediaEventId,
    setMediaIsPlayingVideo,
    setMediaWidgetState,
} from 'src/modules/media/actions/media';
import { setStream as setSelectedStreamsIds } from 'src/modules/media/actions/stream';
import { exitPictureInPicture } from 'src/utils/common';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';

import BetRadarStatisticsButton from './BetRadarStatisticsButton';
import { S_AlignmentBox, S_IconsWrapper, S_StatisticsWrapper } from './styled';
import { getLiveTracker, getStream } from './utils';

const EventMediaButtons = ({ event }: { event: EventModel }) => {
    const dispatch = useDispatch();
    const { blacklist } = useBlacklistQuery();

    const stream = getStream(event);
    const liveTracker = getLiveTracker(event);
    const isProviderBlacklisted = blacklist.some(
        (provider) => provider.providerName.toLowerCase() === stream?.provider,
    );

    const setEventMedia = useSetRecoilState(eventMediaAtom);

    const eventMedia = { media: event.media, sport: event.sport, id: event.id };

    const handleStreamChange = useCallback(async (e: MouseEvent<SVGSVGElement>, selectedStream: MediaItem) => {
        e.preventDefault();
        e.stopPropagation();

        await exitPictureInPicture();

        if (selectedStream.id !== stream?.id) {
            dispatch(resetMediaState());
        }
        dispatch(setMediaActiveTab(EVENT_MEDIA_TYPE.videoStream));
        dispatch(setMediaEventId(event.id));
        setEventMedia(eventMedia);
        dispatch(setMediaWidgetState(true));
        dispatch(setMediaIsPlayingVideo(true));

        dispatch(setSelectedStreamsIds({ streamId: selectedStream.id, provider: selectedStream.provider }));
    }, []);

    const handleLiveStats = useCallback((e: MouseEvent<SVGSVGElement>) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(setMediaActiveTab(EVENT_MEDIA_TYPE.liveMatchTracker));
        dispatch(setMediaEventId(event.id));
        setEventMedia({ ...eventMedia, statisticsTab: true });
        dispatch(setMediaWidgetState(true));
        dispatch(setDropdownListState(false));

        dispatch(setSelectedStreamsIds({ streamId: undefined, provider: undefined }));
    }, []);

    const isStreamAvailable = event?.timeSettings?.started && stream !== undefined && !isProviderBlacklisted;

    return (
        <S_IconsWrapper>
            <S_StatisticsWrapper>
                <BetRadarStatisticsButton event={event} rowView />
            </S_StatisticsWrapper>

            {liveTracker !== undefined && liveTracker.id && (
                <S_AlignmentBox>
                    <FootballFieldIcon fontSize='small' onClick={(e) => handleLiveStats(e)} />
                </S_AlignmentBox>
            )}

            {isStreamAvailable ? (
                <S_AlignmentBox>
                    <LiveStreamingIcon
                        fontSize='small'
                        color={cssColor('--icon-default-color')}
                        onClick={(e) => void handleStreamChange(e, stream)}
                    />
                </S_AlignmentBox>
            ) : null}
        </S_IconsWrapper>
    );
};

export default observer(EventMediaButtons);
