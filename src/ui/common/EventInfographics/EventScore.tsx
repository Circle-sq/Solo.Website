import get from 'lodash/get';
import { memo } from 'react';

import { SportType } from 'src/common/enums';
import type { Score, Statistics } from 'src/common/types/statistics';

import BasicScoreboard from './BasicScoreboard/BasicScoreboard';
import ComplexScoreboard from './ComplexScoreboard/ComplexScoreboard';
import { FootballCardsScore } from './EventInfographicsTemplates';

interface Props {
    sport: SportType;
    score?: Score;
    stats: Statistics;
    timeMatchInPlay: boolean;
}

const EventScore = ({ sport, score, stats, timeMatchInPlay }: Props) => {
    if (score !== undefined && sport !== SportType.CsGo) {
        if (sport === SportType.Football) {
            return <FootballCardsScore score={score} stats={stats} />;
        }

        const turnValue = get(stats, 'turn.value');

        return <BasicScoreboard score={score} turnValue={turnValue} />;
    }

    return <ComplexScoreboard sport={sport} statistics={stats} timeMatchInPlay={timeMatchInPlay} />;
};

export default memo(EventScore);
