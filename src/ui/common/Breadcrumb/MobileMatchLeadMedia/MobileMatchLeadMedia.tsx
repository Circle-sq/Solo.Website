import { observer } from 'mobx-react-lite';
import { type MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FootballFieldIcon, PlayOutlineIcon } from '@sc-ui/icons/svg';
import { cssColor } from '@sc-ui/system';

import { useAppStateContext } from 'src/appState/AppState';
import type { EventModel } from 'src/appState/models/models/EventModel';
import { setMediaActiveTab } from 'src/modules/media/actions/media';
import { activeMediaTabSelector } from 'src/modules/media/selectors';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';
import type { EventMediaType } from 'src/utils/types';

import { S_MobileMatchLeadMedia, S_EventActionLink, S_EventActionIcon } from './styled';

const MobileMatchLeadMedia = () => {
    const dispatch = useDispatch();

    const activeMediaTab = useSelector(activeMediaTabSelector);

    const {
        router: {
            route: { params: routeParam },
        },
        models,
    } = useAppStateContext();
    const { stream, videoStream, liveMatchTracker } = EVENT_MEDIA_TYPE;

    const activeEvent = routeParam?.id ? (models.getEvent(+routeParam.id) as EventModel) : null;
    const liveVideoStream = activeEvent?.media?.streams[0]?.id;
    const liveTracker = activeEvent?.media?.liveTrackers[0]?.id;

    const playOutlineIconColor =
        activeMediaTab === videoStream ? cssColor('--icon-generic-color') : cssColor('--icon-disabled-color');
    const footballFieldIconColor =
        activeMediaTab === liveMatchTracker ? cssColor('--icon-generic-color') : cssColor('--icon-disabled-color');

    const handleWidgetActionChange = (e: MouseEvent, type: EventMediaType) => {
        e.preventDefault();

        dispatch(setMediaActiveTab(type));
    };

    useEffect(() => {
        dispatch(setMediaActiveTab(stream));
    }, [routeParam?.id]);

    return (
        <S_MobileMatchLeadMedia>
            <S_EventActionLink
                {...(liveVideoStream !== undefined && {
                    onClick: (e: MouseEvent) => handleWidgetActionChange(e, videoStream),
                })}
                disabled={liveVideoStream === undefined}
            >
                <PlayOutlineIcon fontSize='small' color={playOutlineIconColor} />
            </S_EventActionLink>

            <S_EventActionLink
                isActive={activeMediaTab === stream}
                onClick={(e: MouseEvent) => handleWidgetActionChange(e, stream)}
            >
                <S_EventActionIcon className='sports-score' />
            </S_EventActionLink>

            <S_EventActionLink
                {...(liveTracker !== undefined && {
                    onClick: (e: MouseEvent) => handleWidgetActionChange(e, liveMatchTracker),
                })}
                disabled={liveTracker === undefined}
            >
                <FootballFieldIcon fontSize='small' color={footballFieldIconColor} />
            </S_EventActionLink>
        </S_MobileMatchLeadMedia>
    );
};

export default observer(MobileMatchLeadMedia);
