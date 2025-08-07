import { useWindowWidth } from '@sc-hooks';
import { observer } from 'mobx-react-lite';

import type { EventModel } from 'src/appState/models/models/EventModel';
import { isLiveEventPeriod } from 'src/common/helpers/event';
import EventScore from 'src/ui/common/EventInfographics/EventScore';
import EventTime from 'src/ui/common/EventInfographics/EventTime';
import { S_EventScore } from 'src/ui/common/EventInfographics/styled';
import Participants from 'src/ui/common/Participants/Participants';

import { S_MyBetEventInfo, S_MyBetEventTime, S_MyBetParticipants } from './styled';

const MyBetEventInfographics = ({ event, indented }: { event: EventModel; indented?: boolean }) => {
    const { sport, stats, score, timeMatchInPlay } = event;

    const { isMobile } = useWindowWidth();

    const isLivePeriod = isLiveEventPeriod(stats);

    return (
        <>
            <S_MyBetEventInfo indented={indented}>
                <S_MyBetParticipants>
                    <div>
                        <Participants event={event} />

                        {!isMobile && (
                            <S_MyBetEventTime data-testid='timemetaid'>
                                <EventTime event={event} isLivePeriod={isLivePeriod} />
                            </S_MyBetEventTime>
                        )}
                    </div>
                </S_MyBetParticipants>

                {isLivePeriod && (
                    <S_EventScore>
                        <EventScore sport={sport} score={score} stats={stats} timeMatchInPlay={timeMatchInPlay} />
                    </S_EventScore>
                )}
            </S_MyBetEventInfo>

            {isMobile && (
                <S_MyBetEventTime data-testid='timemetaid'>
                    <EventTime event={event} isLivePeriod={isLivePeriod} />
                </S_MyBetEventTime>
            )}
        </>
    );
};

export default observer(MyBetEventInfographics);
