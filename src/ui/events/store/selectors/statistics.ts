import find from 'lodash/find';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { selectorFamily } from 'recoil';

import type { TurnValue } from 'src/common/enums';
import type { PeriodScore } from 'src/common/types/statistics';

import { defaultPeriodScores, emptyScore, PENALTY_PERIOD } from '../configs';

import { eventSelectorFamily } from './event';

export const eventTurnValueSelector = selectorFamily<TurnValue | undefined, number>({
    key: 'eventTurnValueSelector',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const event = getRecoilValue(eventSelectorFamily(eventId))?.toJS();

            return get(event, 'statistics.turn.value');
        },
});

export const currentPeriodScoresSelector = selectorFamily<PeriodScore[], number>({
    key: 'currentPeriodScoresSelector',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const event = getRecoilValue(eventSelectorFamily(eventId))?.toJS();

            return get(event, 'statistics.period-scores', []);
        },
});

export const currentPeriodCountSelector = selectorFamily<number, number>({
    key: 'currentPeriodSelector',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const currentPeriodScores = getRecoilValue(currentPeriodScoresSelector(eventId));

            return currentPeriodScores.length;
        },
});

export const periodScoresSelector = selectorFamily<PeriodScore[], number>({
    key: 'periodScoresSelector',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const currentPeriodScores = getRecoilValue(currentPeriodScoresSelector(eventId));

            return defaultPeriodScores.map((defaultPeriodScore) => ({
                ...defaultPeriodScore,
                ...find(currentPeriodScores, ({ period }) => String(period) === defaultPeriodScore.period),
            }));
        },
});

export const penaltyScoreSelector = selectorFamily<PeriodScore, number>({
    key: 'penaltyScoreSelector',
    get:
        (eventId) =>
        ({ get: getRecoilValue }) => {
            const periodScores = getRecoilValue(currentPeriodScoresSelector(eventId));

            if (isEmpty(periodScores)) {
                return emptyScore;
            }

            return find(periodScores, { period: PENALTY_PERIOD }) ?? emptyScore;
        },
});
