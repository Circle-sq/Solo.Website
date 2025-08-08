import { useSpeedBetFlag } from '@solo-feature-flags';
import { useWindowWidth } from '@solo-hooks';
import get from 'lodash/get';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSetRecoilState, useRecoilState } from 'recoil';

import { useThemeSwitchContext, ThemeNames } from '@solo-ui/system';

import { SportType } from 'src/common/enums';
import useSpeedBetMarkets from 'src/features/scoreboardWidget/hooks/useSpeedBetMarkets';
import {
    speedBetSportAtom,
    speedBetMarketsAtom,
    speedBetMarketsDefaultValue,
    speedBetEventAtom,
} from 'src/features/scoreboardWidget/store/atoms';
import { activeMediaTabSelector } from 'src/modules/media/selectors';
import { EVENT_MEDIA_TYPE } from 'src/utils/constants';

import {
    basicScoreSports,
    multiParticipantSports,
    pointsScoreSports,
    individualSports,
    BLUE_SPORTS_BG,
    NEON_SPORTS_BG,
} from '../constants';
import { getSportBG } from '../helpers';
import useEventGeneralInfo from '../hooks/useEventGeneralInfo';
import useMediaStatisticsInfo from '../hooks/useMediaStatisticsInfo';

import BetRadarWindowStatistics from './BetRadarWindowStatistics/BetRadarWindowStatistics';
import BaseballScoreboard from './Scoreboard/BaseballScoreboard/BaseballScoreboard';
import BasicScoreboard from './Scoreboard/BasicScoreboard/BasicScoreboard';
import IndividualScoreboard from './Scoreboard/IndividualScoreboard/IndividualScoreboard';
import MultiParticipantScoreboard from './Scoreboard/MultiParticipantScoreboard/MultiParticipantScoreboard';
import PointsScoreboard from './Scoreboard/PointsScoreboard/PointsScoreboard';
import ScoreboardMini from './Scoreboard/ScoreboardMini/ScoreboardMini';
import SpeedBet from './SpeedBet/SpeedBet';
import { S_BackgroundWrapper, S_MainScoreboardInfo, S_ScoreboardContainer, S_TopScoreboardInfo } from './styled';

interface Props {
    sport: SportType;
    eventId: number;
}

const ScoreboardWidget = ({ sport, eventId }: Props) => {
    const { isMobile } = useWindowWidth();
    const { isOutright } = useEventGeneralInfo(eventId);
    const { themeName } = useThemeSwitchContext();

    const [event, setEvent] = useRecoilState(speedBetEventAtom);
    const setSpeedBetSport = useSetRecoilState(speedBetSportAtom);
    const setSpeedBetMarkets = useSetRecoilState(speedBetMarketsAtom);

    const sportsBgMap = themeName === ThemeNames.Blue ? BLUE_SPORTS_BG : NEON_SPORTS_BG;

    const backgroundImage = getSportBG(sport, sportsBgMap);

    const { betradarStatisticsUrl } = useMediaStatisticsInfo(eventId);

    const activeMediaTab = useSelector(activeMediaTabSelector);
    const isMiniVersion = isMobile && activeMediaTab === EVENT_MEDIA_TYPE.videoStream;

    const isSpeedBetEnabled = useSpeedBetFlag();

    useSpeedBetMarkets(eventId);

    const isSpeedBetEvent = get(event, 'tags.speed-bet[0]', 'no') === 'yes';

    const displaySpeedBet = isSpeedBetEnabled && isSpeedBetEvent && event?.display;

    useEffect(() => {
        if (isSpeedBetEnabled) {
            setSpeedBetSport(sport);
        }
    }, [isSpeedBetEnabled, sport]);

    useEffect(
        () => () => {
            setEvent(undefined);
            setSpeedBetMarkets(speedBetMarketsDefaultValue);
        },
        [],
    );

    const renderScoreboard = (sport: SportType) => {
        if (isMiniVersion) {
            return <ScoreboardMini eventId={eventId} />;
        }

        if (isOutright || multiParticipantSports.includes(sport)) {
            return <MultiParticipantScoreboard eventId={eventId} />;
        }

        if (sport === SportType.Baseball) {
            return <BaseballScoreboard eventId={eventId} />;
        }

        if (individualSports.includes(sport)) {
            return <IndividualScoreboard eventId={eventId} />;
        }

        if (basicScoreSports.includes(sport)) {
            return <BasicScoreboard eventId={eventId} />;
        }

        if (pointsScoreSports.includes(sport)) {
            return <PointsScoreboard eventId={eventId} />;
        }

        return null;
    };

    return (
        <S_ScoreboardContainer data-testid='scoreboard'>
            <S_BackgroundWrapper backgroundImage={backgroundImage}>
                <S_TopScoreboardInfo isMiniVersion={isMiniVersion}>
                    {betradarStatisticsUrl !== null && (
                        <BetRadarWindowStatistics pageUrl={betradarStatisticsUrl} eventId={eventId} fontSize='xsmall' />
                    )}
                </S_TopScoreboardInfo>
                {sport !== undefined && (
                    <S_MainScoreboardInfo isMiniVersion={isMiniVersion}>{renderScoreboard(sport)}</S_MainScoreboardInfo>
                )}
                {displaySpeedBet && <SpeedBet eventId={eventId} />}
            </S_BackgroundWrapper>
        </S_ScoreboardContainer>
    );
};

export default observer(ScoreboardWidget);
