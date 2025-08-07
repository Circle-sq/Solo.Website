import Box from '@mui/material/Box';
import isEmpty from 'lodash/isEmpty';

import { useAppStateContext } from 'src/appState/AppState';
import Pitcher from 'src/ui/common/Pitcher/Pitcher';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';
import { SPORT_TYPE } from 'src/utils/constants';

import useEventGeneralInfo from '../../../hooks/useEventGeneralInfo';
import useEventParticipants from '../../../hooks/useEventParticipants';
import useEventScore from '../../../hooks/useEventScore';
import { ParticipantType } from '../../../types';
import Participant from '../Common/Participant/Participant';
import ScoreCard from '../Common/ScoreCard/ScoreCard';

import ScoreboardDetails from './ScoreboardDetails/ScoreboardDetails';
import {
    S_MainScoreInfo,
    S_Participant,
    S_PitcherWrapper,
    S_ScoreAndTimeWrapper,
    S_ScoreboardWrapper,
    S_ScoreSeparator,
} from './styled';

const BaseballScoreboard = ({ eventId }: { eventId: number }) => {
    const {
        language: { getTranslation },
        models,
    } = useAppStateContext();

    const event = models.getEvent(eventId);

    const { isLive, sport, mappedPeriod } = useEventGeneralInfo(eventId);
    const { hasScore, homeScore, awayScore } = useEventScore(eventId);

    const { homeTeamName, awayTeamName, homeUniformUrl, awayUniformUrl, isWithUniform } = useEventParticipants(eventId);

    const showBaseballScoreboard = isLive && sport === SPORT_TYPE.baseball && !isEmpty(mappedPeriod);

    return (
        <S_ScoreboardWrapper shouldAlignCenter={!isWithUniform}>
            <S_Participant>
                <Participant
                    type={ParticipantType.Home}
                    name={homeTeamName}
                    uniformUrl={isWithUniform ? homeUniformUrl : undefined}
                />
                {event?.pitchers?.home !== undefined && (
                    <S_PitcherWrapper>
                        <Pitcher type={'home'} pitchers={event.pitchers} />
                    </S_PitcherWrapper>
                )}
            </S_Participant>
            <S_MainScoreInfo>
                <S_ScoreAndTimeWrapper>
                    {hasScore ? (
                        <ScoreCard homeScore={homeScore} awayScore={awayScore} />
                    ) : (
                        <S_ScoreSeparator>{getTranslation('event.header.versus', 'vs')}</S_ScoreSeparator>
                    )}
                    {event !== null && <EventPeriod event={event} isEventPage />}
                    {showBaseballScoreboard && (
                        <Box
                            sx={{
                                display: 'flex',
                                mt: '4px',
                            }}
                        >
                            <ScoreboardDetails eventId={eventId} />
                        </Box>
                    )}
                </S_ScoreAndTimeWrapper>
            </S_MainScoreInfo>
            <S_Participant>
                <Participant
                    type={ParticipantType.Away}
                    name={awayTeamName}
                    uniformUrl={isWithUniform ? awayUniformUrl : undefined}
                />
                {event?.pitchers?.away !== undefined && (
                    <S_PitcherWrapper>
                        <Pitcher type={'away'} pitchers={event.pitchers} />
                    </S_PitcherWrapper>
                )}
            </S_Participant>
        </S_ScoreboardWrapper>
    );
};

export default BaseballScoreboard;
