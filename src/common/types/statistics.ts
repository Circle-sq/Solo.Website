import type { TurnValue } from 'src/common/enums';

import type { Pitchers } from './event';

export enum StatisticType {
    CornerKicks = 'corner-kicks',
    RedCards = 'red-cards',
    YellowCards = 'yellow-cards',
    YellowRedCards = 'yellow-red-cards',
}

export interface Statistics {
    'base-one'?: StatisticValue;
    'base-three'?: StatisticValue;
    'base-two'?: StatisticValue;
    'corner-kicks'?: Score;
    'current-game-state'?: StatisticValue;
    'current-period-score'?: Score;
    'final-game-state'?: StatisticValue;
    'frames-score'?: Score;
    'full-game-score'?: Score[];
    'full-point-score'?: Score[];
    'period-score'?: Score[];
    'game-score'?: Score;
    'game-state-type'?: StatisticValue;
    'leg-score'?: Score;
    'match-status'?: StatisticValue;
    'overall-laps'?: StatisticValue;
    'period-scores'?: PeriodScore[];
    'point-score'?: Score;
    'points-score'?: Score;
    'red-cards'?: Score;
    'red-flag'?: StatisticValue;
    'safety-car'?: StatisticValue;
    'set-score'?: Score;
    'yellow-cards'?: Score;
    'yellow-flag'?: StatisticValue;
    'yellow-red-cards'?: Score;
    balls?: StatisticValue;
    frame?: StatisticValue;
    homeruns?: Score;
    inninghalf?: StatisticValue;
    inningshalf?: StatisticValue;
    lap?: StatisticValue;
    outs?: StatisticValue;
    period?: StatisticValue;
    score?: Score;
    set?: StatisticValue;
    strikes?: StatisticValue;
    substitution?: Score;
    time?: StatisticValue;
    timer?: StatisticTimer;
    turn?: StatisticValue<TurnValue>;
    woodworks?: Score;
    pitchers?: Pitchers[];
}

export interface PeriodScore extends Score {
    period?: number | string;
}

export interface Score {
    home: string | number;
    away: string | number;
}

export interface StatisticTimer {
    value: string;
    timer?: string;
    timerBase?: string;
}

export interface StatisticValue<T = string> {
    value: T;
}
