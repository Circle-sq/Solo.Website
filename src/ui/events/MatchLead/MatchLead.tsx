import { useWindowWidth } from '@sc-hooks';
import { setDefaultOptions } from 'date-fns';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import { observer } from 'mobx-react-lite';
import { useSelector } from 'react-redux';

import LiveMatchTracker from '@sc-media/ui/liveMatchTracker/LiveMatchTracker';
import VideoStream from '@sc-media/ui/videoStream/VideoStream';

import { useAppStateContext } from 'src/appState/AppState';
import ScoreboardWidget from 'src/features/scoreboardWidget/ui/ScoreboardWidget';
import { activeMediaTabSelector } from 'src/modules/media/selectors';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';

import { S_StatisticsContainer } from './styled';
import { langToLocale } from './utils';

const MatchLead = ({ eventId }: { eventId: number }) => {
    const {
        models,
        language: { userLang },
    } = useAppStateContext();

    const event = models.getEvent(eventId);
    const sport = event?.sport;

    const activeMediaTab = useSelector(activeMediaTabSelector);

    const { isDesktop } = useWindowWidth();

    if (!isNull(userLang)) {
        const locale = langToLocale(userLang);
        setDefaultOptions({ locale });
    }

    if (isNil(event) || isUndefined(sport)) {
        return null;
    }

    const showVideoStream = !isDesktop && activeMediaTab === EVENT_MEDIA_TYPE.videoStream;
    const showLiveMatchTracker = !isDesktop && activeMediaTab === EVENT_MEDIA_TYPE.liveMatchTracker;
    const showScoreboard = isDesktop || activeMediaTab === EVENT_MEDIA_TYPE.stream;

    return (
        <>
            {showVideoStream && (
                <>
                    <VideoStream />
                    <ScoreboardWidget sport={sport} eventId={eventId} />
                </>
            )}
            <div>
                {showLiveMatchTracker && (
                    <S_StatisticsContainer>
                        <LiveMatchTracker activeEventId={eventId} />
                    </S_StatisticsContainer>
                )}
                {showScoreboard && <ScoreboardWidget sport={sport} eventId={eventId} />}
            </div>
        </>
    );
};

export default observer(MatchLead);
