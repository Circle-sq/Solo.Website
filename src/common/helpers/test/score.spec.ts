import random from 'lodash/random';

import type { Score } from 'src/common/types/statistics';

import { tennisPointScore } from '../score';

const display = ({ home, away }: Score): string => `home:${home} | away:${away}`;

describe('test tennisPointScore function', () => {
    it('should return the score of home: 0, away: 0', () => {
        expect(display(tennisPointScore({} as Score))).toBe(`home:0 | away:0`);
    });

    it('should return the score of home: `A`, away: `A`', () => {
        expect(display(tennisPointScore({ home: 50, away: 50 }))).toBe(`home:A | away:A`);
    });

    it('should return the score of home: 30, away: `A`', () => {
        expect(display(tennisPointScore({ home: 30, away: 50 }))).toBe(`home:30 | away:A`);
    });

    it('should return the score of home: `A`, away: 30', () => {
        expect(display(tennisPointScore({ home: 50, away: 30 }))).toBe(`home:A | away:30`);
    });

    it('should return the score of home: random number greater than 50, away: random number greater than 50', () => {
        const randomNum1 = random(50.1, 1000);
        const randomNum2 = random(50.1, 1000);

        expect(display(tennisPointScore({ home: randomNum1, away: randomNum2 }))).toBe(
            `home:${randomNum1} | away:${randomNum2}`,
        );
    });

    it('should return the score of home: random number less than 50, away: random number less than 50', () => {
        const randomNum1 = random(0, 49);
        const randomNum2 = random(0, 49);

        expect(display(tennisPointScore({ home: randomNum1, away: randomNum2 }))).toBe(
            `home:${randomNum1} | away:${randomNum2}`,
        );
    });

    it('should return the score of home: random string, away: random string', () => {
        const randomString1 = 'string1';
        const randomString2 = 'string2';

        expect(display(tennisPointScore({ home: randomString1, away: randomString2 }))).toBe(
            `home:${randomString1} | away:${randomString2}`,
        );
    });
});
