import get from 'lodash/get';

import { SportType } from 'src/common/enums';
import { tableTennisPointScore, tennisPointScore } from 'src/common/helpers/score';
import type { Statistics } from 'src/common/types/statistics';

import { S_EventRowSeparator } from '../styled';

import ActiveSportIconRow from './ActiveSportIconRow';
import InfoScore from './InfoScore';

interface Props {
    sport?: SportType;
    statistics: Statistics;
}

const ComplexScoreboard = ({ sport, statistics }: Props) => {
    const { turn } = statistics;

    if (sport === SportType.Tennis) {
        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turn?.value} />
                <InfoScore className='info-score-col' label='P' score={tennisPointScore(statistics['point-score'])} />
                <InfoScore className='info-score-col' label='G' score={statistics['game-score']} />
                <S_EventRowSeparator />
                <InfoScore className='sets-info-score' label='S' score={statistics['set-score']} />
            </>
        );
    }

    if (sport === SportType.TableTennis) {
        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turn?.value} />
                <InfoScore
                    className='info-score-col'
                    label='P'
                    score={tableTennisPointScore(statistics['point-score'])}
                />
                <S_EventRowSeparator />
                <InfoScore label='G' score={statistics['set-score']} />
            </>
        );
    }

    if (sport === SportType.Badminton || sport === SportType.BeachVolleyball || sport === SportType.Volleyball) {
        const pointScore = get(statistics, 'point-score', { home: '0', away: '0' });

        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turn?.value} />
                <InfoScore className='info-score-col' label='P' score={pointScore} />
                <S_EventRowSeparator />
                <InfoScore label='S' score={statistics['set-score']} />
            </>
        );
    }

    if (sport === SportType.Snooker) {
        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turn?.value} />
                <InfoScore className='info-score-col' label='P' score={statistics['points-score']} />
                <S_EventRowSeparator />
                <InfoScore label='F' score={statistics['frames-score']} />
            </>
        );
    }

    if (sport === SportType.CsGo) {
        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turn?.value} />
                <InfoScore className='info-score-col' label='R' score={statistics['current-period-score']} />
                <S_EventRowSeparator />
                <InfoScore label='G' score={statistics.score} />
            </>
        );
    }

    return null;
};

export default ComplexScoreboard;
