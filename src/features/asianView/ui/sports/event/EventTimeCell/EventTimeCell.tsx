import { useAtomValue } from 'jotai';

import { isTwoRowStyleSport } from '@sc-asianView/helpers';

import { eventInPlaySelectorFamily, eventSportSelectorFamily } from 'src/store/events/selectors/event';

import Period from './Period/Period';
import Scoreboard from './Scoreboard/Scoreboard';
import { S_EventTimeCell, S_Period, S_PeriodContainer, S_ScoreboardContainer } from './styled';

const EventTimeCell = ({ eventId }: { eventId: number }) => {
    const inPlay = useAtomValue(eventInPlaySelectorFamily(eventId));
    const sport = useAtomValue(eventSportSelectorFamily(eventId));

    const isTwoRowSport = isTwoRowStyleSport(sport);
    const showScoreboard = inPlay || !isTwoRowSport;
    const showPeriod = !inPlay || !isTwoRowSport;

    return (
        <S_EventTimeCell data-testid='eventTimeCell'>
            <S_ScoreboardContainer>
                {showScoreboard && <Scoreboard eventId={eventId} sport={sport} />}
            </S_ScoreboardContainer>

            <S_PeriodContainer>
                <S_Period>{showPeriod && <Period eventId={eventId} />}</S_Period>
            </S_PeriodContainer>
        </S_EventTimeCell>
    );
};

export default EventTimeCell;
