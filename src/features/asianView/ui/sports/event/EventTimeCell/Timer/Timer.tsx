import FrameTimer from 'src/ui/events/EventPeriod/Timer/FrameTimer';

import { S_Timer, S_PeriodTitle, S_EventTime } from '../styled';

interface Props {
    eventId: number;
    periodTitle: string;
    initialTime: string;
}

const Timer = ({ eventId, periodTitle, initialTime }: Props) => {
    return (
        <S_Timer>
            <S_EventTime>
                <FrameTimer eventId={eventId} initialTime={initialTime} />
            </S_EventTime>
            <S_PeriodTitle>{periodTitle}</S_PeriodTitle>
        </S_Timer>
    );
};

export default Timer;
