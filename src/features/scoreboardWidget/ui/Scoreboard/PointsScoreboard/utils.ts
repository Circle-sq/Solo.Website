import isNil from 'lodash/isNil';

import { SportType } from 'src/common/enums';
import { tennisPointScore } from 'src/common/helpers/score';
import type { Score, Statistics } from 'src/common/types/statistics';

import { ScoreColor, type MatchHistory } from './types';

const THREE_SET_MATCH = 3;
const FIVE_SET_MATCH = 5;

function getMatchScores(sport: SportType, stats: Statistics) {
    const scores: { game: Score | null; sets: Score[] } = {
        game: null,
        sets: [],
    };

    if (sport === SportType.Tennis) {
        scores.game = tennisPointScore(stats['point-score']);
        scores.sets.push(...(stats['full-game-score'] ?? []));
    }

    if (
        sport === SportType.TableTennis ||
        sport === SportType.Volleyball ||
        sport === SportType.BeachVolleyball ||
        sport === SportType.Badminton
    ) {
        scores.sets.push(...(stats['full-point-score'] ?? []));
    }

    if (sport === SportType.Snooker) {
        scores.game = stats['points-score'] ?? { home: 0, away: 0 };
        scores.sets.push(stats['frames-score'] ?? { home: 0, away: 0 });
    }

    if (
        sport === SportType.CsGo ||
        sport === SportType.LeagueOfLegends ||
        sport === SportType.Dota2 ||
        sport === SportType.StarCraft
    ) {
        scores.game = stats['score'] ?? { home: 0, away: 0 };
        scores.sets.push(...(stats['period-score'] ?? []));
    }

    return scores;
}

function calculateUnplayedSets(sport: SportType, competition: string, playedSets: number) {
    let maxPlayableSets = playedSets;

    if (sport === SportType.Tennis) {
        maxPlayableSets = /\b(?=.*\bmen\b)(?=.*\bhard\b)/i.test(competition) ? FIVE_SET_MATCH : THREE_SET_MATCH;
    }

    if (sport === SportType.TableTennis || sport === SportType.Volleyball || sport === SportType.BeachVolleyball) {
        maxPlayableSets = FIVE_SET_MATCH;
    }

    if (sport === SportType.Badminton) {
        maxPlayableSets = THREE_SET_MATCH;
    }

    return maxPlayableSets - playedSets;
}

function calculateSetScoreColor(set: Score, setIndex: number, playedSets: number) {
    const isSetActive = setIndex === playedSets - 1;
    const homeScore = Number(set.home) || 0;
    const awayScore = Number(set.away) || 0;

    if (!isSetActive && homeScore !== awayScore) {
        if (homeScore > awayScore) {
            return { home: ScoreColor.Primary, away: ScoreColor.Secondary };
        }

        return { home: ScoreColor.Secondary, away: ScoreColor.Primary };
    }

    return { home: ScoreColor.Primary, away: ScoreColor.Primary };
}

export function generateMatchHistory(
    sport: SportType | null | undefined,
    stats: Statistics | null | undefined,
    competition: string | null | undefined,
): MatchHistory {
    if (isNil(sport) || isNil(stats) || isNil(competition)) {
        return [];
    }

    const history: MatchHistory = [];
    const scores = getMatchScores(sport, stats);
    const unplayedSets = calculateUnplayedSets(sport, competition, scores.sets.length);

    let id = 0;

    if (scores.game !== null) {
        history.push({
            id: ++id,
            type: 'score',
            home: { value: scores.game.home, color: ScoreColor.Primary },
            away: { value: scores.game.away, color: ScoreColor.Primary },
        });
        history.push({ id: ++id, type: 'separator' });
    }

    for (let i = 0; i < scores.sets.length; i++) {
        const set = scores.sets[i];
        const setColor = calculateSetScoreColor(set, i, scores.sets.length);

        history.push({
            id: ++id,
            type: 'score',
            home: { value: set.home, color: setColor.home },
            away: { value: set.away, color: setColor.away },
        });
    }

    for (let i = 0; i < unplayedSets; i++) {
        history.push({
            id: ++id,
            type: 'score',
            home: { value: '-', color: ScoreColor.Primary },
            away: { value: '-', color: ScoreColor.Primary },
        });
    }

    return history;
}
