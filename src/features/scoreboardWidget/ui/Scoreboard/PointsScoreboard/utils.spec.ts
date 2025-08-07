import { describe, expect, it } from 'vitest';

import { SportType } from 'src/common/enums';
import type { Statistics } from 'src/common/types/statistics';

import { ScoreColor, type MatchHistory } from './types';
import { generateMatchHistory } from './utils';

const tests: {
    data: {
        sport: SportType;
        stats: Statistics;
        competition: string;
    };
    result: MatchHistory;
}[] = [
    {
        data: {
            sport: SportType.Tennis,
            stats: {
                'point-score': { home: 0, away: 40 },
                'full-game-score': [
                    { home: 7, away: 2 },
                    { home: 2, away: 1 },
                ],
            },
            competition: "The Men's Easy Tournament",
        },
        result: [
            {
                id: 1,
                type: 'score',
                home: { value: 0, color: ScoreColor.Primary },
                away: { value: 40, color: ScoreColor.Primary },
            },
            { id: 2, type: 'separator' },
            {
                id: 3,
                type: 'score',
                home: { value: 7, color: ScoreColor.Primary },
                away: { value: 2, color: ScoreColor.Secondary },
            },
            {
                id: 4,
                type: 'score',
                home: { value: 2, color: ScoreColor.Primary },
                away: { value: 1, color: ScoreColor.Primary },
            },
            {
                id: 5,
                type: 'score',
                home: { value: '-', color: ScoreColor.Primary },
                away: { value: '-', color: ScoreColor.Primary },
            },
        ],
    },
    {
        data: {
            sport: SportType.Tennis,
            stats: {
                'point-score': { home: 0, away: 40 },
                'full-game-score': [
                    { home: 7, away: 6 },
                    { home: 2, away: 1 },
                    { home: 6, away: 7 },
                ],
            },
            competition: "The Men's Hard Tournament",
        },
        result: [
            {
                id: 1,
                type: 'score',
                home: { value: 0, color: ScoreColor.Primary },
                away: { value: 40, color: ScoreColor.Primary },
            },
            { id: 2, type: 'separator' },
            {
                id: 3,
                type: 'score',
                home: { value: 7, color: ScoreColor.Primary },
                away: { value: 6, color: ScoreColor.Secondary },
            },
            {
                id: 4,
                type: 'score',
                home: { value: 2, color: ScoreColor.Primary },
                away: { value: 1, color: ScoreColor.Secondary },
            },
            {
                id: 5,
                type: 'score',
                home: { value: 6, color: ScoreColor.Primary },
                away: { value: 7, color: ScoreColor.Primary },
            },
            {
                id: 6,
                type: 'score',
                home: { value: '-', color: ScoreColor.Primary },
                away: { value: '-', color: ScoreColor.Primary },
            },
            {
                id: 7,
                type: 'score',
                home: { value: '-', color: ScoreColor.Primary },
                away: { value: '-', color: ScoreColor.Primary },
            },
        ],
    },
];

describe('generateMatchHistory', () => {
    for (const { data, result } of tests) {
        it(`should return a correct match history for ${data.sport}`, () => {
            expect(generateMatchHistory(data.sport, data.stats, data.competition)).toEqual(result);
        });
    }

    it('should return an empty array if sport is null', () => {
        expect(generateMatchHistory(null, null, null)).toEqual([]);
    });
});
