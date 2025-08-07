import { useAtomValue } from 'jotai';

import { SportType } from 'src/common/enums';
import { eventStatisticsSelectorFamily } from 'src/store/events/selectors/event';

import BasicScoreboard from './BasicScoreboard/BasicScoreboard';
import ComplexScoreboard from './ComplexScoreboard/ComplexScoreboard';

interface Props {
    eventId: number;
    sport?: SportType;
}

const Scoreboard = ({ eventId, sport }: Props) => {
    const statistics = useAtomValue(eventStatisticsSelectorFamily(eventId));

    if (statistics === undefined) {
        return null;
    }

    if (statistics.score !== undefined && sport !== SportType.CsGo) {
        return <BasicScoreboard score={statistics.score} />;
    }

    return <ComplexScoreboard statistics={statistics} sport={sport} />;
};

export default Scoreboard;
