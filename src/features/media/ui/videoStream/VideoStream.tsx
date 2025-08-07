import { useWindowWidth } from '@sc-hooks';
import { List } from 'immutable';
import { useAtomValue } from 'jotai';
import isEmpty from 'lodash/isEmpty';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isAuthenticatedAtom } from '@sc-account/store/atoms';
import { useBlacklistQuery } from '@sc-api/streams/blacklist/queries';

import { useAppStateContext } from 'src/appState/AppState';
import { RequestStatus, RouteName } from 'src/common/enums';
import type { TimeOut } from 'src/common/types/main';
import { setMediaIsPlayingVideo } from 'src/modules/media/actions/media';
import { getStreams, getStreamUrl } from 'src/modules/media/actions/stream';
import { activeMediaTabSelector, mediaStreamSelector } from 'src/modules/media/selectors';
import { getDeviceType } from 'src/utils/getDeviceType';

import MediaDropdown from './dropdown/MediaDropdown';
import MediaStreamPlayer from './MediaStreamPlayer';
import LoginMessage from './messages/LoginMessage';
import MediaStreamNotification from './messages/MediaStreamNotification';

const VideoStream = () => {
    const dispatch = useDispatch();

    const { isDesktop } = useWindowWidth();
    const { blacklist } = useBlacklistQuery();
    const deviceType = getDeviceType();

    const eventIDRef = useRef<string | undefined>('initial_value');
    let { current: currentEventId } = eventIDRef;

    const {
        language: { getTranslation },
        router,
        env: { img_api_url },
    } = useAppStateContext();

    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const media = useSelector(mediaStreamSelector);
    const activeMediaTab = useSelector(activeMediaTabSelector);

    const selectedStream = media.get('streamId', '');
    const streamProvider = media.get('provider', '');
    const mediaEvent = media.get('eventId', '');
    const streamsState = media.getIn(['streams', 'state'], '');
    const streamUrl = media.getIn(['stream_url', 'url'], '');
    const streamUrlState = media.getIn(['stream_url', 'state'], '');
    const streamsList = media.getIn(['streams', 'items'], List());
    const streamsListState = media.getIn(['streams', 'state']);
    const mediaIsPlayingVideo = media.get('isPlayingVideo', true);

    const streams = useMemo(
        () => (streamsListState === RequestStatus.Ready ? streamsList.toJS() : []),
        [streamsList, streamsListState],
    );

    const [streamId, setStreamId] = useState<string | null>('');
    const [isDropdownListEvent, setIsDropdownListEvent] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(false);
    const [hasLiveStream, setHasLiveStream] = useState(true);

    const routedEventId = router?.route?.params?.id;
    const mediaEventId = mediaEvent !== '' && mediaEvent.toString();
    const routeName = router.route.name;
    const isEventPage = routeName === RouteName.Event;
    const loginMessage = getTranslation('media.stream.video.label', 'To watch live videos, please [loginLink].');
    const isProviderBlacklisted = blacklist.some((provider) => provider.providerName.toLowerCase() === streamProvider);

    useEffect(() => {
        isEmpty(streamsList) && dispatch(getStreams());
    }, []);

    useEffect(() => {
        const timeDelay = 5000;
        let timeout: TimeOut;

        if (streamsState === 'ERROR') {
            timeout = setTimeout(() => dispatch(getStreams()), timeDelay);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [streamsState]);

    const hasEventStream = streams.some(({ sportEventId }: Record<string, string>): boolean =>
        isNaN(Number(routedEventId)) ? sportEventId === mediaEventId : sportEventId === routedEventId,
    );

    useEffect(() => {
        if (isDropdownListEvent) {
            setIsAutoPlay(true);
        }

        if (isEventPage && hasEventStream && !isProviderBlacklisted) {
            setHasLiveStream(true);
            setIsDropdownListEvent(false);
        } else {
            setHasLiveStream(false);
        }

        const isEventList = routedEventId !== mediaEventId;

        if (isProviderBlacklisted) {
            setStreamId(null);

            return;
        }

        if (!isEventList && !isDropdownListEvent) {
            currentEventId = hasEventStream ? routedEventId : '';
            setStreamId(hasEventStream ? selectedStream : '');
            setIsAutoPlay(hasEventStream);
        } else if (isEventList && isDropdownListEvent) {
            currentEventId = mediaEventId;
            setStreamId(selectedStream);
            setIsAutoPlay(true);
        } else if (!isEventList && isDropdownListEvent) {
            currentEventId = routedEventId;
            setStreamId(hasEventStream ? selectedStream : '');
            setIsAutoPlay(false);
        } else if (activeMediaTab) {
            currentEventId = 'is_event_from_event_list';
            setStreamId(selectedStream);
            setIsAutoPlay(true);
        }
    }, [
        mediaEventId,
        isEventPage,
        isAuthenticated,
        isDropdownListEvent,
        routeName,
        selectedStream,
        streamId,
        streamsListState,
        isProviderBlacklisted,
        hasEventStream,
    ]);

    useEffect(() => {
        if (currentEventId === 'initial_value') {
            return;
        } else if (currentEventId === '') {
            dispatch(getStreamUrl({ streamId: '', provider: '', deviceType, img_api_url }));
        } else {
            dispatch(getStreamUrl({ streamId: selectedStream, provider: streamProvider, deviceType, img_api_url }));
        }
    }, [mediaEventId, selectedStream, isAuthenticated, hasEventStream]);

    const setStoreMediaIsPlayingVideo = (value: boolean) => {
        dispatch(setMediaIsPlayingVideo(value));
    };

    const showPlayer =
        !isProviderBlacklisted &&
        isAuthenticated === true &&
        (streamUrlState === RequestStatus.Ready || streamUrlState === RequestStatus.Error) &&
        streamId !== '';
    const showMediaStreamPlayerLoginMessage = isAuthenticated === false && streamId !== '';

    return (
        <>
            {isDesktop && <MediaDropdown setIsDropdownListEvent={setIsDropdownListEvent} />}

            {showPlayer && (
                <MediaStreamPlayer
                    streamUrl={streamUrl}
                    isAuthenticated={isAuthenticated}
                    isAutoPlay={isAutoPlay}
                    setIsAutoPlay={setIsAutoPlay}
                    streamUrlState={streamUrlState}
                    mediaIsPlayingVideo={mediaIsPlayingVideo}
                    setMediaIsPlayingVideo={setStoreMediaIsPlayingVideo}
                    streamProvider={streamProvider}
                />
            )}

            {showMediaStreamPlayerLoginMessage && <LoginMessage message={loginMessage} />}

            {isDesktop && <MediaStreamNotification streamId={streamId} hasLiveStream={hasLiveStream} />}
        </>
    );
};

export default VideoStream;
