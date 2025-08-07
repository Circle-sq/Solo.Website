import { useWindowWidth } from '@sc-hooks';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { eventMediaAtom } from '@sc-media/store/atoms';

import { useAppStateContext } from 'src/appState/AppState';
import { LiveTrackerProviders, SportType } from 'src/common/enums';
import { getShortLocale } from 'src/utils/common';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';

import type { SIRParams } from './types';

const getSIRParams = (
    requestId: string | null | undefined,
    sport: string | undefined,
    mediaName: string,
    isDesktop: boolean,
): SIRParams => {
    if (sport === undefined) {
        return {} as SIRParams;
    }

    if (mediaName === EVENT_MEDIA_TYPE.liveMatchTracker) {
        const sportsWithScoreDetails = [
            SportType.Basketball,
            SportType.IceHockey,
            SportType.Tennis,
            SportType.Volleyball,
            SportType.Badminton,
            SportType.TableTennis,
        ];
        const activeSwitcherValue = includes(sportsWithScoreDetails, sport) ? 'scoreDetails' : 'momentum';

        const configData = {
            scoreboard: 'extended',
            tabsPosition: 'top',
            matchId: requestId,
            activeSwitcher: activeSwitcherValue,
            forceTeamInvert: false,
        };

        const config = isDesktop ? { ...configData, layout: 'topdown' } : configData;

        const noPitchNoiseSports = [
            SportType.Football,
            SportType.Handball,
            SportType.Tennis,
            SportType.TableTennis,
            SportType.Volleyball,
            SportType.Darts,
        ];

        if (includes(noPitchNoiseSports, sport)) {
            return { disablePitchNoise: true, ...config };
        }

        if (sport === SportType.Basketball) {
            return { customBrandColor: '#555555', ...config };
        }

        if (sport === SportType.IceHockey) {
            return { pitchCustomBgColor: '#555555', ...config };
        }

        return { ...config, scoreboard: undefined };
    } else {
        return {
            disableWidgetHeader: true,
            disablePeriods: true,
            layout: 'compact',
            tabsPosition: 'disable',
            matchId: requestId,
        };
    }
};

const MediaWidget = ({ mediaName }: { mediaName: string }) => {
    const {
        language: { userLang },
    } = useAppStateContext();
    const { isDesktop } = useWindowWidth();

    const eventMedia = useRecoilValue(eventMediaAtom);

    let requestId = null;
    let sirParams: SIRParams | null = null;

    if (!isEmpty(eventMedia)) {
        const betRadarStatistics = eventMedia?.media?.statistics.find(
            (it) => it.provider === LiveTrackerProviders.BetRadar,
        );
        const betRadarLiveTracker = eventMedia?.media?.liveTrackers.find(
            (it) => it.provider === LiveTrackerProviders.BetRadar,
        );

        const statistics = mediaName === EVENT_MEDIA_TYPE.statistics ? betRadarStatistics : betRadarLiveTracker;

        if (statistics !== undefined) {
            requestId = statistics.id?.toString();
        }

        sirParams = getSIRParams(requestId, eventMedia?.sport, mediaName, isDesktop);
    }

    useEffect(() => {
        const hasConfigs = sirParams !== null && sirParams.matchId !== null && window.SIR !== undefined;

        if (hasConfigs) {
            window.SIR('addWidget', '.sr-widget-1', 'match.lmtPlus', sirParams);
            window.SIR('changeLanguage', getShortLocale(userLang));
        }

        return () => {
            if (hasConfigs) {
                window.SIR('removeWidget', document.querySelector('.sr-widget-1'));
            }
        };
    }, [JSON.stringify(sirParams)]);

    return <div className='sr-widget sr-widget-1' id='sr-widget' data-sr-match-id={requestId} />;
};

export default observer(MediaWidget);
