import { useWindowWidth } from '@solo-hooks';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import some from 'lodash/some';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SubKey } from '@solo-features/subscription-manager/subKeys';
import { SubscribeElement } from '@solo-features/subscription-manager/SubscribeElement';
import type { MediaOption } from '@solo-media/ui/videoStream/dropdown/types';

import { useAppStateContext } from 'src/appState/AppState';
import { RequestStatus } from 'src/common/enums';
import type { EventItem } from 'src/common/types/event';
import {
    setMediaActiveTab,
    setMediaEventId,
    setMediaIsPlayingVideo,
    setMediaWidgetState,
} from 'src/modules/media/actions/media';
import { setStream as setSelectedStreamsIds } from 'src/modules/media/actions/stream';
import { mediaSelector, mediaStreamsItemsSelector } from 'src/modules/media/selectors';
import { I18n } from 'src/ui/common/Language/I18n';
import Loader from 'src/ui/common/Loader/Loader';
import MatchCard from 'src/ui/events/MatchCard/MatchCard';
import { isSportWithScoreboard } from 'src/ui/events/utils/helpers';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';

import MessageWrapper from './MessageWrapper';

interface Props {
    eventId: number;
    status: string;
    event: EventItem | undefined;
    reload?: boolean;
    retrieved: boolean;
    onLoadRequest: () => void;
}

const MISSING_REVISION = -11;

const EventCard = (props: Props) => {
    const { eventId, status, event, retrieved, reload, onLoadRequest } = props;
    const { models } = useAppStateContext();

    const dispatch = useDispatch();
    const { isDesktop } = useWindowWidth();
    const media = useSelector(mediaSelector);

    const [isPrimaryLoad, setIsPrimaryLoad] = useState(true);
    const [shouldDisplay, setShouldDisplay] = useState(false);

    const eventIdMedia = media.eventId;
    const isMediaDropdownListSelected = media.isMediaDropdownListSelected;
    const streamsList: MediaOption[] = useSelector(mediaStreamsItemsSelector);

    const eventNew = models.getEvent(eventId);
    const revision = eventNew?.revision ?? MISSING_REVISION;

    const isLoadError = status === RequestStatus.Error;
    const isLoadProgress = status === RequestStatus.Progress || !retrieved;
    const isLoadComplete = !isLoadError && !isLoadProgress && retrieved && event && eventNew;
    const isReadyToDisplay = isLoadComplete && eventNew?.display;

    const { videoStream, liveMatchTracker } = EVENT_MEDIA_TYPE;

    const isSameId = eventIdMedia === eventId;

    useEffect(() => {
        if (reload || !event) {
            onLoadRequest();
        }
    }, [reload, event]);

    useEffect(() => {
        if (isLoadComplete) {
            setIsPrimaryLoad(false);
        }
    }, [isLoadComplete]);

    useEffect(() => {
        if (isReadyToDisplay) {
            setShouldDisplay(true);
        }
    }, [isReadyToDisplay]);

    useEffect(() => {
        if (!eventIdMedia || !isSameId) {
            dispatch(setMediaEventId(eventId));
        }
    }, [eventId]);

    useEffect(() => {
        const isStreamAvailable =
            !isEmpty(streamsList) && some(streamsList, (stream) => Number(stream.sportEventId) === eventId);
        const isLiveEvent = get(eventNew, 'timeSettingsStarted');

        if (isDesktop && !isMediaDropdownListSelected) {
            if (isSameId && isLiveEvent) {
                if (isStreamAvailable) {
                    dispatch(setMediaActiveTab(videoStream));
                    dispatch(setMediaWidgetState(true));
                    dispatch(setMediaIsPlayingVideo(true));
                } else {
                    dispatch(setMediaActiveTab(liveMatchTracker));
                    dispatch(setMediaWidgetState(true));
                    dispatch(setSelectedStreamsIds({ streamId: undefined, provider: undefined }));
                }
            } else if (isSameId && !isLiveEvent) {
                dispatch(setMediaActiveTab(liveMatchTracker));
                dispatch(setMediaWidgetState(true));

                dispatch(setSelectedStreamsIds({ streamId: undefined, provider: undefined }));
            }
        }
    }, [eventIdMedia, eventId, isSameId, eventNew, isDesktop]);

    if (isLoadError) {
        return (
            <MessageWrapper>
                <I18n
                    langKey='events.card.error'
                    defaultText="Sorry, because of temporary issues we can't load event. Try again."
                />
            </MessageWrapper>
        );
    }

    if (isPrimaryLoad || (isLoadProgress && isSportWithScoreboard(String(eventNew?.sport)))) {
        return (
            <MessageWrapper loading>
                <Loader loading />
            </MessageWrapper>
        );
    }

    if (shouldDisplay) {
        return (
            <SubscribeElement id={eventId} subKey={SubKey.event_card} revision={revision}>
                <section className='event-card' data-testid='eventPage'>
                    <MatchCard eventId={eventId} />
                </section>
            </SubscribeElement>
        );
    }

    return (
        <MessageWrapper>
            <I18n langKey='events.card.hidden' defaultText='This event is not available.' />
        </MessageWrapper>
    );
};

export default observer(EventCard);
