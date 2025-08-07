import get from 'lodash/get';

import { SportType } from 'src/common/enums';
import { tableTennisPointScore, tennisPointScore } from 'src/common/helpers/score';
import type { Statistics } from 'src/common/types/statistics';

import { ActiveSportIconRow } from '../EventInfographicsTemplates';
import InfoScore from '../InfoScore/InfoScore';
import { EventRowSeparator } from '../styled';

interface Props {
    sport: SportType;
    statistics: Statistics;
    timeMatchInPlay: boolean;
}

const ComplexScoreboard = ({ sport, statistics, timeMatchInPlay }: Props) => {
    const turnValue = get(statistics, 'turn.value');

    if (sport === SportType.Tennis) {
        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turnValue} />
                {timeMatchInPlay && (
                    <InfoScore
                        className='info-score-col'
                        label='P'
                        score={tennisPointScore(statistics['point-score'])}
                    />
                )}
                <InfoScore
                    className='info-score-col'
                    score={statistics['game-score']}
                    label={timeMatchInPlay ? 'G' : undefined}
                />
                <EventRowSeparator />
                <InfoScore className='sets-info-score' label='S' score={statistics['set-score']} />
            </>
        );
    }

    if (sport === SportType.TableTennis) {
        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turnValue} />
                {timeMatchInPlay && (
                    <InfoScore
                        className='info-score-col'
                        label='P'
                        score={tableTennisPointScore(statistics['point-score'])}
                    />
                )}
                <EventRowSeparator />
                <InfoScore label={timeMatchInPlay ? 'G' : undefined} score={statistics['set-score']} />
            </>
        );
    }

    if (sport === SportType.Badminton || sport === SportType.BeachVolleyball || sport === SportType.Volleyball) {
        const pointScore = get(statistics, 'point-score', { home: '0', away: '0' });

        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turnValue} />
                <InfoScore className='info-score-col' label='P' score={pointScore} />
                <EventRowSeparator />
                <InfoScore className='sets-info-score' label='S' score={statistics['set-score']} />
            </>
        );
    }

    if (sport === SportType.Snooker) {
        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turnValue} />
                <InfoScore className='info-score-col' label='P' score={statistics['points-score']} />
                <EventRowSeparator />
                <InfoScore score={statistics['frames-score']} label='F' />
            </>
        );
    }

    if (sport === SportType.CsGo) {
        return (
            <>
                <ActiveSportIconRow sport={sport} turnValue={turnValue} />
                <InfoScore className='info-score-col' label='R' score={statistics['current-period-score']} />
                <EventRowSeparator />
                <InfoScore score={statistics.score} label='G' />
            </>
        );
    }

    return null;
};

export default ComplexScoreboard;
