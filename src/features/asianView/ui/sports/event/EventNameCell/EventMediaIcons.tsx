import { useAtomValue } from 'jotai';
import { type MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSetRecoilState } from 'recoil';

import { useBlacklistQuery } from '@solo-api/streams/blacklist/queries';
import { eventMediaAtom } from '@solo-media/store/atoms';
import BetRadarStatisticsButton from '@solo-media/ui/actionButtons/BetRadarStatisticsButton';
import { S_AlignmentBox, S_IconsWrapper, S_StatisticsWrapper } from '@solo-media/ui/actionButtons/styled';
import { FootballFieldIcon, LiveStreamingIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';

import type { EventModel } from 'src/appState/models/models/EventModel';
import {
    setDropdownListState,
    setMediaActiveTab,
    setMediaEventId,
    setMediaIsPlayingVideo,
    setMediaWidgetState,
} from 'src/modules/media/actions/media';
import { setStream as setSelectedStreamsIds } from 'src/modules/media/actions/stream';
import { eventItemAtomFamily } from 'src/store/events/entities';
import {
    eventMediaLiveTrackerSelectorFamily,
    eventMediaStreamSelectorFamily,
    eventStartedSelectorFamily,
} from 'src/store/events/selectors/event';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';

const EventMediaIcons = ({ eventId }: { eventId: number }) => {
    const dispatch = useDispatch();
    const { blacklist } = useBlacklistQuery();

    const event = useAtomValue(eventItemAtomFamily(eventId));
    const liveTracker = useAtomValue(eventMediaLiveTrackerSelectorFamily(eventId));
    const stream = useAtomValue(eventMediaStreamSelectorFamily(eventId));
    const started = useAtomValue(eventStartedSelectorFamily(eventId));
    const isProviderBlacklisted = blacklist.some(
        (provider) => provider.providerName.toLowerCase() === stream?.provider,
    );
    const setEventMedia = useSetRecoilState(eventMediaAtom);

    const handleStreamChange = (e: MouseEvent<SVGSVGElement>) => {
        e.preventDefault();

        if (event == null || stream == null) {
            return;
        }

        dispatch(setMediaActiveTab(EVENT_MEDIA_TYPE.videoStream));
        dispatch(setMediaEventId(event.id));
        setEventMedia({ media: event.media, sport: event.sport.id, id: event.id });
        dispatch(setMediaWidgetState(true));
        dispatch(setMediaIsPlayingVideo(true));
        dispatch(setSelectedStreamsIds({ streamId: stream.id, provider: stream.provider }));
    };

    const handleLiveStats = (e: MouseEvent<SVGSVGElement>) => {
        e.preventDefault();

        if (event == null) {
            return;
        }

        dispatch(setMediaActiveTab(EVENT_MEDIA_TYPE.liveMatchTracker));
        dispatch(setMediaEventId(event.id));
        setEventMedia({ media: event.media, sport: event.sport.id, id: event.id, statisticsTab: true });
        dispatch(setMediaWidgetState(true));
        dispatch(setDropdownListState(false));
        dispatch(setSelectedStreamsIds({ streamId: undefined, provider: undefined }));
    };

    const isStreamAvailable = started && stream !== undefined && !isProviderBlacklisted;

    return (
        <S_IconsWrapper>
            <S_StatisticsWrapper>
                <BetRadarStatisticsButton event={event as unknown as EventModel} rowView />
            </S_StatisticsWrapper>

            {liveTracker !== undefined && liveTracker.id && (
                <S_AlignmentBox>
                    <FootballFieldIcon fontSize='small' onClick={handleLiveStats} />
                </S_AlignmentBox>
            )}

            {isStreamAvailable && (
                <S_AlignmentBox>
                    <LiveStreamingIcon
                        fontSize='small'
                        color={cssColor('--icon-default-color')}
                        onClick={handleStreamChange}
                    />
                </S_AlignmentBox>
            )}
        </S_IconsWrapper>
    );
};

export default EventMediaIcons;
