import { useAtomValue } from 'jotai';
import { useDispatch } from 'react-redux';
import { setRecoil } from 'recoil-nexus';

import { eventMarketsCountAtomFamily } from '@solo-asianView/store/marketsCount';
import { eventMediaAtom } from '@solo-media/store/atoms';
import { RightArrowIcon } from '@solo-ui/icons/svg';
import { cssColor } from '@solo-ui/system';
import { useJotaiCallback } from '@solo-utils/jotai';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import {
    setMediaActiveTab,
    setMediaEventId,
    setMediaIsPlayingVideo,
    setMediaWidgetState,
} from 'src/modules/media/actions/media';
import { setStream } from 'src/modules/media/actions/stream';
import { eventItemAtomFamily } from 'src/store/events/entities';
import { eventActiveSelectorFamily, eventMediaStreamSelectorFamily } from 'src/store/events/selectors/event';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';
import { slug } from 'src/utils/deburr';

import { S_EventMoreCell, S_MoreMarketsButton } from './styled';

const EventMoreCell = ({ eventId }: { eventId: number }) => {
    const dispatch = useDispatch();

    const eventActive = useAtomValue(eventActiveSelectorFamily(eventId));
    const marketsCount = useAtomValue(eventMarketsCountAtomFamily(eventId));

    const { router } = useAppStateContext();

    const handleRedirect = useJotaiCallback(
        ({ get }) =>
            () => {
                const event = get(eventItemAtomFamily(eventId));
                const stream = get(eventMediaStreamSelectorFamily(eventId));

                router.redirect(RouteName.Event, { id: eventId, slug: slug(event?.originalName ?? '') });

                if (event === null) {
                    return;
                }

                dispatch(setMediaActiveTab(EVENT_MEDIA_TYPE.videoStream));
                dispatch(setMediaEventId(event.id));
                dispatch(setMediaWidgetState(true));
                dispatch(setMediaIsPlayingVideo(true));
                dispatch(setStream({ streamId: stream?.id, provider: stream?.provider }));
                setRecoil(eventMediaAtom, { media: event.media, sport: event.sport.id, id: event.id });
            },
        [dispatch, eventId, router],
    );

    return (
        <S_EventMoreCell onClick={handleRedirect} data-testid='eventMoreCell'>
            {!eventActive || marketsCount === 0 ? (
                <S_MoreMarketsButton>
                    <RightArrowIcon color={cssColor('--icon-default-color')} fontSize='xsmall' />
                </S_MoreMarketsButton>
            ) : (
                <S_MoreMarketsButton>+ {marketsCount}</S_MoreMarketsButton>
            )}
        </S_EventMoreCell>
    );
};

export default EventMoreCell;
