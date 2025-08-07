import { useSelector } from 'react-redux';

import { eventScoreSelector } from 'src/modules/events/selectors';

interface ScoreState {
    hasScore: boolean;
    homeScore: string | null;
    awayScore: string | null;
}

const useEventScore = (eventId: number): ScoreState => {
    const eventScore = useSelector(eventScoreSelector(eventId));

    return {
        hasScore: eventScore.away !== null && eventScore.home !== null,
        awayScore: eventScore.away,
        homeScore: eventScore.home,
    };
};

export default useEventScore;
