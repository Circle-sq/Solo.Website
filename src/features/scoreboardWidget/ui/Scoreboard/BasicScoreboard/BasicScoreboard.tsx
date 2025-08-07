import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';

import { useAppStateContext } from 'src/appState/AppState';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';
import { MATCH_PERIOD, SPORT_TYPE } from 'src/utils/constants';

import useEventGeneralInfo from '../../../hooks/useEventGeneralInfo';
import useEventParticipants from '../../../hooks/useEventParticipants';
import useEventScore from '../../../hooks/useEventScore';
import { ParticipantType } from '../../../types';
import Participant from '../Common/Participant/Participant';
import ScoreCard from '../Common/ScoreCard/ScoreCard';

import CardsAndCornersStats from './CardsAndCornersStats/CardsAndCornersStats';
import PenaltyShootout from './PenaltyShootout/PenaltyShootout';
import { S_MainScoreInfo, S_Participant, S_ScoreAndTimeWrapper, S_ScoreboardWrapper, S_ScoreSeparator } from './styled';
import useFootballStatistics from './useFootballStatistics';

const BasicScoreboard = ({ eventId }: { eventId: number }) => {
    const {
        language: { getTranslation },
        models,
    } = useAppStateContext();

    const { sport, isLive, mappedPeriod, stats } = useEventGeneralInfo(eventId);
    const { homeTeamName, awayTeamName, homeUniformUrl, awayUniformUrl, isWithUniform } = useEventParticipants(eventId);
    const { home, away } = useFootballStatistics(eventId);
    const { hasScore, homeScore, awayScore } = useEventScore(eventId);

    const event = models.getEvent(eventId)!;

    const { 'corner-kicks': cornerKicks, 'red-cards': redCards, 'yellow-cards': yellowCards } = stats;

    const showPenaltyShootoutScoreboard =
        isLive && sport === SPORT_TYPE.football && mappedPeriod === MATCH_PERIOD.penalties;

    const showFootballStatistics =
        isLive &&
        sport === SPORT_TYPE.football &&
        !isEmpty(mappedPeriod) &&
        (!isEmpty(cornerKicks) || !isEmpty(redCards) || !isEmpty(yellowCards));

    return (
        <S_ScoreboardWrapper shouldAlignCenter={!isWithUniform}>
            <S_Participant>
                <Participant
                    type={ParticipantType.Home}
                    name={homeTeamName}
                    uniformUrl={isWithUniform ? homeUniformUrl : undefined}
                />
                {showFootballStatistics && <CardsAndCornersStats stats={home} />}
            </S_Participant>
            <S_MainScoreInfo>
                <S_ScoreAndTimeWrapper data-testid='scoreAndTime'>
                    {hasScore ? (
                        <ScoreCard homeScore={homeScore} awayScore={awayScore} />
                    ) : (
                        <S_ScoreSeparator>{getTranslation('event.header.versus', 'vs')}</S_ScoreSeparator>
                    )}
                    <EventPeriod event={event} isEventPage />
                    {showPenaltyShootoutScoreboard && <PenaltyShootout eventId={eventId} />}
                </S_ScoreAndTimeWrapper>
            </S_MainScoreInfo>
            <S_Participant>
                <Participant
                    type={ParticipantType.Away}
                    name={awayTeamName}
                    uniformUrl={isWithUniform ? awayUniformUrl : undefined}
                />
                {showFootballStatistics && <CardsAndCornersStats stats={away} />}
            </S_Participant>
        </S_ScoreboardWrapper>
    );
};

export default observer(BasicScoreboard);
