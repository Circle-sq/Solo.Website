import type { TimeSettings } from 'src/common/types/event';
import type { PeriodScore } from 'src/common/types/statistics';
import { DASH } from 'src/utils/constants';

export const PENALTY_PERIOD = 4;

export const emptyScore = { home: 0, away: 0 };

export const defaultPeriodScores: PeriodScore[] = [
    {
        away: DASH,
        home: DASH,
        period: '1',
    },
    {
        away: DASH,
        home: DASH,
        period: '2',
    },
    {
        away: DASH,
        home: DASH,
        period: '3',
    },
    {
        away: DASH,
        home: DASH,
        period: '4',
    },
    {
        away: DASH,
        home: DASH,
        period: '5',
    },
    {
        away: DASH,
        home: DASH,
        period: '6',
    },
    {
        away: DASH,
        home: DASH,
        period: '7',
    },
    {
        away: DASH,
        home: DASH,
        period: '8',
    },
    {
        home: DASH,
        away: DASH,
        period: '9',
    },
];

export const defaultTimeSettings: TimeSettings = {
    startTime: '',
    started: false,
    tradedInPlay: false,
    timeZone: '',
};

const blinkNumber = 5;
const blinkDuration = 500;
const lastBlinkDuration = 3000;

export const PRICE_CHANGE_RESET_TIMEOUT = blinkNumber * blinkDuration + lastBlinkDuration;
