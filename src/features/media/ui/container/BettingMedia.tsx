import Box from '@mui/material/Box';
import { useWindowWidth } from '@solo-hooks';
import { useAtomValue } from 'jotai';
import find from 'lodash/find';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import some from 'lodash/some';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';

import { isAuthenticatedAtom } from '@solo-account/store/atoms';
import { eventMediaAtom } from '@solo-media/store/atoms';
import {
    DownArrowIcon,
    FootballFieldActiveIcon,
    FootballFieldIcon,
    PlayActiveIcon,
    PlayOutlineIcon,
    UpArrowIcon,
} from '@solo-ui/icons/svg';
import { cssColor, DarkBluePalette } from '@solo-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import { RouteName } from 'src/common/enums';
import { setDropdownListState, setMediaActiveTab, setMediaWidgetState } from 'src/modules/media/actions/media';
import { setStream as setSelectedStreamsIds } from 'src/modules/media/actions/stream';
import type { MediaActionTypes, VideoStream as VideoStreamType } from 'src/modules/media/actions/types';
import { activeMediaTabSelector, mediaSelector, mediaStreamsItemsSelector } from 'src/modules/media/selectors';
import { I18n } from 'src/ui/common/Language/I18n';
import { exitPictureInPicture } from 'src/utils/common';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';

import LiveMatchTracker from '../liveMatchTracker/LiveMatchTracker';
import type { MediaOption } from '../videoStream/dropdown/types';
import VideoStream from '../videoStream/VideoStream';

import { S_Header, S_HeaderControls, S_MediaWrapper, S_TabButton, S_ToggleButton } from './styled';
import type { Tab } from './types';

const BettingMedia = () => {
    const {
        router: {
            route: { name: routeName, params: routeParams },
        },
    } = useAppStateContext();
    const dispatch = useDispatch();
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

    const media = useSelector(mediaSelector);
    const activeMediaTab = useSelector(activeMediaTabSelector);
    const eventId = get(media, 'eventId');
    const isEventPage = routeName === RouteName.Event;
    const activeEventId = isEventPage ? routeParams.id : eventId;

    const { isDesktop } = useWindowWidth();
    const [eventMedia, setEventMedia] = useRecoilState(eventMediaAtom);

    const isMediaWidgetExpanded = get(media, 'isMediaWidgetExpanded', false);
    const { videoStream, liveMatchTracker } = EVENT_MEDIA_TYPE;

    const showContent = isMediaWidgetExpanded && isDesktop;

    const liveTracker = eventMedia?.media?.liveTrackers[0]?.id;
    const isLiveTracker = liveTracker !== undefined;

    const [autoPlayStarted, setAutoPlayStarted] = useState(false);
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    const switchToStreamTab = (stream: VideoStreamType) => {
        dispatch(setMediaActiveTab(videoStream));
        dispatch(setMediaWidgetState(true));
        dispatch(setSelectedStreamsIds(stream));
        setAutoPlayStarted(true);
    };

    const switchToLiveStatisticsTab = async () => {
        dispatch(setMediaWidgetState(true));
        dispatch(setDropdownListState(false));
        setEventMedia((prevState) => ({ ...prevState, statisticsTab: true }));
        isLiveTracker && dispatch(setMediaActiveTab(liveMatchTracker));
        setAutoPlayStarted(true);
        await exitPictureInPicture();
    };

    const streams: MediaOption[] = useSelector(mediaStreamsItemsSelector);

    useEffect(() => {
        if (autoPlayStarted) {
            return;
        }

        if (eventMedia?.statisticsTab) {
            switchToLiveStatisticsTab();

            return;
        }

        if (!isAuthenticated) {
            return;
        }

        if (
            eventMedia &&
            some(
                streams,
                (stream) =>
                    !isUndefined(stream.id) &&
                    !isUndefined(eventMedia?.media?.streams[0]?.id) &&
                    stream.id === eventMedia?.media?.streams[0]?.id,
            )
        ) {
            switchToStreamTab({
                streamId: eventMedia?.media?.streams[0]?.id,
                provider: eventMedia?.media?.streams[0]?.provider,
            });

            return;
        }

        const streamToAutoPlay = find(streams, { autoPlay: true });

        if (streamToAutoPlay && !isEventPage) {
            switchToStreamTab({
                streamId: streamToAutoPlay.id,
                provider: streamToAutoPlay.provider,
            });
        }
    }, [streams, autoPlayStarted, eventMedia?.id, eventMedia?.statisticsTab]);

    const TABS: Tab[] = [
        {
            name: videoStream,
            icon: <PlayOutlineIcon fontSize='small' color={DarkBluePalette.darkBlue5} />,
            iconActive: <PlayActiveIcon fontSize='small' color={DarkBluePalette.darkBlue5} />,
            component: <VideoStream />,
            onClickHandler: () => {
                switchToStreamTab({
                    streamId: eventMedia?.media?.streams[0]?.id,
                    provider: eventMedia?.media?.streams[0]?.provider,
                });
            },
            isActiveTab: (tabName) => {
                return activeMediaTab === tabName;
            },
        },
        {
            name: liveMatchTracker,
            icon: <FootballFieldIcon fontSize='small' color={DarkBluePalette.darkBlue5} />,
            iconActive: <FootballFieldActiveIcon fontSize='small' color={DarkBluePalette.darkBlue5} />,
            component: <LiveMatchTracker activeEventId={activeEventId} />,
            onClickHandler: switchToLiveStatisticsTab,
            isActiveTab: (tabName) => {
                return activeMediaTab === tabName && liveTracker !== undefined;
            },
        },
    ];

    const renderMediaContent = (tab: string): Tab | undefined => TABS.find((tabItem: Tab) => tabItem.name === tab);

    return (
        <S_MediaWrapper>
            <S_Header>
                <I18n langKey='betslip.widget.media.title' defaultText='Media' />
                <S_HeaderControls>
                    {TABS.map(({ name, onClickHandler, icon, iconActive, isActiveTab }) => (
                        <S_TabButton
                            data-testid={`mediaButton-${name}`}
                            key={name}
                            onClick={onClickHandler}
                            onMouseEnter={() => setHoveredTab(name)}
                            onMouseLeave={() => setHoveredTab(null)}
                            active={isActiveTab(name)}
                            disabled={name === liveMatchTracker && liveTracker === undefined}
                        >
                            {isActiveTab(name) || hoveredTab === name ? iconActive : icon}
                        </S_TabButton>
                    ))}
                    <S_ToggleButton
                        data-testid='media-toggle'
                        onClick={(): MediaActionTypes => dispatch(setMediaWidgetState(!isMediaWidgetExpanded))}
                    >
                        {isMediaWidgetExpanded ? (
                            <UpArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                        ) : (
                            <DownArrowIcon fontSize='xsmall' color={cssColor('--icon-light-color')} />
                        )}
                    </S_ToggleButton>
                </S_HeaderControls>
            </S_Header>
            {showContent && (
                <Box sx={{ mt: '1px' }} data-testid='media-content'>
                    {renderMediaContent(activeMediaTab)?.component}
                </Box>
            )}
        </S_MediaWrapper>
    );
};

export default observer(BettingMedia);
