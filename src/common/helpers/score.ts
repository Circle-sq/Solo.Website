import isEmpty from 'lodash/isEmpty';

import type { Score } from 'src/common/types/statistics';

const isScoreEmpty = (score: Score) => isEmpty(score) || (score.home === '' && score.away === '');

const replaceFiftyScore = (value: number | string): number | string => (String(value) === '50' ? 'A' : value);

export const tennisPointScore = (score?: Score): Score => {
    if (score === undefined || isScoreEmpty(score)) {
        return { home: '0', away: '0' };
    }

    return {
        away: replaceFiftyScore(score.away),
        home: replaceFiftyScore(score.home),
    };
};

export const tableTennisPointScore = (score?: Score): Score => {
    if (score === undefined || isScoreEmpty(score)) {
        return { home: '0', away: '0' };
    }

    return score;
};
