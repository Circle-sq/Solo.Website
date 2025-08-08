import { useAtomValue } from 'jotai';
import get from 'lodash/get';
import { useSelector } from 'react-redux';

import MediaWidget from '@solo-media/ui/widgets/MediaWidget';
import ShadowWidget from '@solo-media/ui/widgets/ShadowWidget/ShadowWidget';
import StatsCoreWidget from '@solo-media/ui/widgets/StatsCoreWidget/StatsCoreWidget';

import { useAppStateContext } from 'src/appState/AppState';
import { LiveTrackerProviders, SportType } from 'src/common/enums';
import { mediaSelector } from 'src/modules/media/selectors';
import { eventItemAtomFamily } from 'src/store/events/entities';
import type { EventItem } from 'src/store/events/types';
import { getShortLocale } from 'src/utils/common';
import { EVENT_MEDIA_TYPE, LANGUAGES } from 'src/utils/constants';

import { S_MediaMatchTracker } from './styled';

interface LiveMatchTrackerProps {
    activeEventId: string | number;
}

const LiveMatchTracker = ({ activeEventId }: LiveMatchTrackerProps) => {
    const {
        models,
        language: { userLang },
    } = useAppStateContext();

    const currentLanguage = getShortLocale(userLang);
    const statsCoreLanguage = currentLanguage === LANGUAGES.ja ? 'jp' : currentLanguage;

    const media = useSelector(mediaSelector);
    const eventId = get(media, 'eventId');

    const event = useAtomValue(eventItemAtomFamily(eventId));
    const activeEvent = models.getEvent(Number(activeEventId)) ?? event;
    const liveTrackerId = activeEvent?.media?.liveTrackers[0]?.id ?? '';
    const liveTrackerProvider = activeEvent?.media?.liveTrackers[0]?.provider ?? '';

    const eSports = [SportType.CsGo, SportType.LeagueOfLegends, SportType.Dota2];
    const sportId = ((activeEvent as EventItem<number> | null)?.sport.id ?? activeEvent?.sport) as SportType;
    const isESportEvent = eSports.includes(sportId);
    const isShadowWidget = isESportEvent && !!liveTrackerId && liveTrackerProvider === LiveTrackerProviders.Bayes;
    const isStatsCoreWidget = !!liveTrackerId && liveTrackerProvider === LiveTrackerProviders.LSports;

    const renderWidget = () => {
        if (isShadowWidget) {
            return <ShadowWidget matchId={liveTrackerId} language={currentLanguage} />;
        }

        if (isStatsCoreWidget) {
            return <StatsCoreWidget eventId={liveTrackerId} language={statsCoreLanguage} />;
        }

        return <MediaWidget mediaName={EVENT_MEDIA_TYPE.liveMatchTracker} />;
    };

    return <S_MediaMatchTracker data-testid='mediaMatchTracker'>{renderWidget()}</S_MediaMatchTracker>;
};

export default LiveMatchTracker;
