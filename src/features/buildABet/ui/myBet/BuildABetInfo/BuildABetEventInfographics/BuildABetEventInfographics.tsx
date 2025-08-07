import { isLiveEventPeriod } from 'src/common/helpers/event';
import {
    S_MyBetEventTime,
    S_MyBetEventWrapper,
    S_MyBetParticipants,
} from 'src/ui/myBets/MyBetEventInfographics/styled';
import Participants from 'src/ui/common/Participants/Participants';
import EventTime from 'src/ui/common/EventInfographics/EventTime';
import { S_EventScore } from 'src/ui/common/EventInfographics/styled';
import EventScore from 'src/ui/common/EventInfographics/EventScore';
import type { EventModel } from 'src/appState/models/models/EventModel';

import { S_BuildABetEventInfographics } from './styled';

const BuildABetEventInfographics = ({ event }: { event: EventModel }) => {
    const { sport, stats, score, timeMatchInPlay } = event;
    const isLivePeriod = isLiveEventPeriod(stats);

    return (
        <S_BuildABetEventInfographics>
            <S_MyBetParticipants>
                <Participants event={event} />
                <S_MyBetEventWrapper>
                    {isLivePeriod && (
                        <S_EventScore>
                            <EventScore sport={sport} score={score} stats={stats} timeMatchInPlay={timeMatchInPlay} />
                        </S_EventScore>
                    )}
                </S_MyBetEventWrapper>
                <S_MyBetEventTime data-testid='timemetaid'>
                    <EventTime event={event} isLivePeriod={isLivePeriod} />
                </S_MyBetEventTime>
            </S_MyBetParticipants>
        </S_BuildABetEventInfographics>
    );
};

export default BuildABetEventInfographics;
