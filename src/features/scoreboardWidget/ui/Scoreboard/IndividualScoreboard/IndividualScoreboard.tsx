import { useAppStateContext } from 'src/appState/AppState';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';

import useEventParticipants from '../../../hooks/useEventParticipants';
import { ParticipantType } from '../../../types';
import Participant from '../Common/Participant/Participant';

import { S_ScoreboardWrapper, S_Participant, S_MainScoreInfo, S_ScoreAndTimeWrapper, S_ScoreSeparator } from './styled';

const IndividualScoreboard = ({ eventId }: { eventId: number }) => {
    const {
        models,
        language: { getTranslation },
    } = useAppStateContext();

    const { homeTeamName, awayTeamName, homeUniformUrl, awayUniformUrl, isWithUniform } = useEventParticipants(eventId);

    const event = models.getEvent(eventId);

    return (
        <S_ScoreboardWrapper shouldAlignCenter={!isWithUniform}>
            <S_Participant>
                <Participant
                    type={ParticipantType.Home}
                    name={homeTeamName}
                    uniformUrl={isWithUniform ? homeUniformUrl : undefined}
                />
            </S_Participant>
            <S_MainScoreInfo>
                <S_ScoreAndTimeWrapper data-testid='scoreAndTime'>
                    <S_ScoreSeparator>{getTranslation('event.header.versus', 'vs')}</S_ScoreSeparator>
                    {event !== null && <EventPeriod isEventPage event={event} />}
                </S_ScoreAndTimeWrapper>
            </S_MainScoreInfo>

            <S_Participant>
                <Participant
                    type={ParticipantType.Away}
                    name={awayTeamName}
                    uniformUrl={isWithUniform ? awayUniformUrl : undefined}
                />
            </S_Participant>
        </S_ScoreboardWrapper>
    );
};

export default IndividualScoreboard;
