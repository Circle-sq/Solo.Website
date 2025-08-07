import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import { useAppStateContext } from 'src/appState/AppState';
import { TurnValue } from 'src/common/enums';
import EventPeriod from 'src/ui/events/EventPeriod/EventPeriod';

import useEventGeneralInfo from '../../../hooks/useEventGeneralInfo';
import useEventParticipants from '../../../hooks/useEventParticipants';
import { ParticipantType } from '../../../types';
import Participant from '../Common/Participant/Participant';

import {
    S_Board,
    S_History,
    S_HistoryParticipantActiveIndicator,
    S_HistoryParticipantSetScore,
    S_HistorySetSeparator,
    S_Participant,
    S_Phase,
    S_Versus,
    S_VersusLabel,
} from './styled';
import { BoardStatus } from './types';
import { generateMatchHistory } from './utils';

interface Props {
    eventId: number;
}

const PointsScoreboard = ({ eventId }: Props) => {
    const {
        models,
        language: { getTranslation },
    } = useAppStateContext();

    const { isLive, stats } = useEventGeneralInfo(eventId);
    const { homeTeamName, awayTeamName, homeUniformUrl, awayUniformUrl, isWithUniform } = useEventParticipants(eventId);

    const event = models.getEvent(eventId);
    const competition = event !== null ? models.getCompetitionModel(event.competitionId) : null;

    const boardStatus: BoardStatus = isLive ? BoardStatus.Active : BoardStatus.Inactive;
    const participantLayout = boardStatus === BoardStatus.Active ? 'horizontal' : 'vertical';
    const currentParticipantTurn = stats?.turn?.value;
    const matchHistory = generateMatchHistory(event?.sport, stats, competition?.name);

    return (
        <S_Board status={boardStatus}>
            <S_Participant type={ParticipantType.Home}>
                <Participant
                    type={ParticipantType.Home}
                    layout={participantLayout}
                    name={homeTeamName}
                    uniformUrl={isWithUniform ? homeUniformUrl : undefined}
                />
            </S_Participant>

            {boardStatus === BoardStatus.Inactive && (
                <S_Versus>
                    <S_VersusLabel>{getTranslation('event.header.versus', 'vs')}</S_VersusLabel>
                    {event !== null && <EventPeriod isEventPage event={event} />}
                </S_Versus>
            )}

            <S_Participant type={ParticipantType.Away}>
                <Participant
                    type={ParticipantType.Away}
                    layout={participantLayout}
                    name={awayTeamName}
                    uniformUrl={isWithUniform ? awayUniformUrl : undefined}
                />
            </S_Participant>

            {boardStatus === BoardStatus.Active && (
                <>
                    <S_Phase>{event !== null && <EventPeriod isEventPage event={event} />}</S_Phase>

                    <S_History>
                        <S_HistoryParticipantActiveIndicator
                            type={ParticipantType.Home}
                            visible={currentParticipantTurn === TurnValue.Team01}
                        />
                        <S_HistoryParticipantActiveIndicator
                            type={ParticipantType.Away}
                            visible={currentParticipantTurn === TurnValue.Team02}
                        />

                        {matchHistory.map((entry) => {
                            if (entry.type === 'separator') {
                                return <S_HistorySetSeparator key={entry.id} />;
                            }

                            return (
                                <Fragment key={entry.id}>
                                    <S_HistoryParticipantSetScore type={ParticipantType.Home} color={entry.home.color}>
                                        {entry.home.value}
                                    </S_HistoryParticipantSetScore>
                                    <S_HistoryParticipantSetScore type={ParticipantType.Away} color={entry.away.color}>
                                        {entry.away.value}
                                    </S_HistoryParticipantSetScore>
                                </Fragment>
                            );
                        })}
                    </S_History>
                </>
            )}
        </S_Board>
    );
};

export default observer(PointsScoreboard);
