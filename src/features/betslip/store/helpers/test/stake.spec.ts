import { LegType } from 'src/common/enums';

import type { Combination } from '../../../api/types/combination';
import type { Legs } from '../../../api/types/leg';
import { EMPTY_STAKE } from '../../configs';
import {
    calcSingleTabMaxStake,
    calcSingleTabTotalPotentialReturns,
    calcSingleTabTotalStake,
    calcTotalStake,
} from '../stake/calc';

describe('calcTotalStake', () => {
    it('should return 0 for empty stake and default parameters', () => {
        const combination = {} as Combination;
        const expectedOutput = 0;

        expect(calcTotalStake(combination)).toEqual(expectedOutput);
    });

    it('should return total stake for default parameters', () => {
        const combination = { numLines: 2 } as Combination;
        const expectedOutput = 200000;

        expect(calcTotalStake(combination, 100000)).toEqual(expectedOutput);
    });

    it('should return total stake multiplied by each way multiplier when eachWay is true', () => {
        const combination = { numLines: 2, eachWay: true } as Combination;
        const expectedOutput = 400000;

        expect(calcTotalStake(combination, 100000)).toEqual(expectedOutput);
    });

    it('should return total stake from offer', () => {
        const combination = { totalStake: 200000, numLines: 2, eachWay: true } as Combination;
        const expectedOutput = 200000;

        expect(calcTotalStake(combination, 100000)).toEqual(expectedOutput);
    });
});

describe('calcSingleTabTotalPotentialReturns', () => {
    it('should return 0 for an empty array of bets', () => {
        const bets = {} as Legs;

        expect(calcSingleTabTotalPotentialReturns(bets)).toBe(0);
    });

    it('should return the potentialReturns value for a single bet', () => {
        const bets = { 123: { potentialReturns: 100 } } as unknown as Legs;

        expect(calcSingleTabTotalPotentialReturns(bets)).toBe(100);
    });

    it('should correctly sum the potentialReturns values for multiple bets', () => {
        const bets = {
            123: { potentialReturns: 50 },
            124: { potentialReturns: 150 },
            125: { potentialReturns: 200 },
        } as unknown as Legs;

        expect(calcSingleTabTotalPotentialReturns(bets)).toBe(400);
    });

    it('should use the default value (EMPTY_STAKE, which is 0) for bets without potentialReturns', () => {
        const bets = {
            123: { potentialReturns: 100 },
            124: {}, // no potentialReturns property, so the default 0 is used
            125: { potentialReturns: 50 },
        } as unknown as Legs;

        expect(calcSingleTabTotalPotentialReturns(bets)).toBe(150);
    });

    it('should correctly sum bets where potentialReturns is 0', () => {
        const bets = {
            123: { potentialReturns: 0 },
            124: { potentialReturns: 200 },
            125: { potentialReturns: 0 },
        } as unknown as Legs;

        expect(calcSingleTabTotalPotentialReturns(bets)).toBe(200);
    });
});

describe('calcSingleTabMaxStake', () => {
    it('should return EMPTY_STAKE if bets array is empty', () => {
        const bets = {} as Legs;

        expect(calcSingleTabMaxStake(bets)).toBe(EMPTY_STAKE);
    });

    it('should return the maxStake of the first multi bet if one exists', () => {
        const bets = {
            123: { maxStake: 50 },
            124: {
                maxStake: 150,
                legs: [{ type: LegType.CrossBet, marketsAndSelections: [] }],
            } as unknown as Legs,
            125: { maxStake: 200 },
        } as unknown as Legs;

        expect(calcSingleTabMaxStake(bets)).toBe(150);
    });

    it('should return EMPTY_STAKE if a multi bet exists but its maxStake is undefined', () => {
        const bets = {
            123: { maxStake: 50 },
            124: {
                legs: [{ type: LegType.CrossBet, marketsAndSelections: [] }],
            } as unknown as Legs,
            125: { maxStake: 200 },
        } as unknown as Legs;

        expect(calcSingleTabMaxStake(bets)).toBe(EMPTY_STAKE);
    });

    it('should return the maxStake of the first bet if no multi bet exists', () => {
        const bets = {
            123: { maxStake: 150 },
            125: { maxStake: 250 },
        } as unknown as Legs;

        expect(calcSingleTabMaxStake(bets)).toBe(150);
    });

    it('should return EMPTY_STAKE if no multi bet exists and the first bet has undefined maxStake', () => {
        const bets = {
            123: {},
            125: { maxStake: 250 },
        } as unknown as Legs;

        expect(calcSingleTabMaxStake(bets)).toBe(EMPTY_STAKE);
    });
});

describe('calcSingleTabTotalStake', () => {
    it('should return EMPTY_STAKE for an empty array of bets', () => {
        const checkedBets = {} as Legs;
        const singleBetStakes = {};
        const isOffered = true;

        expect(calcSingleTabTotalStake(checkedBets, singleBetStakes, isOffered)).toBe(EMPTY_STAKE);
    });

    describe('when isOffered is true', () => {
        it('should use bet.stakePerLine for each bet and sum the results', () => {
            const checkedBets = {
                123: { stakePerLine: 10 },
                124: { stakePerLine: 20 },
                125: { stakePerLine: 30 },
            } as unknown as Legs;

            const singleBetStakes = { irrelevant: 999 };
            const isOffered = true;

            expect(calcSingleTabTotalStake(checkedBets, singleBetStakes, isOffered)).toBe(10 + 20 + 30);
        });
    });

    describe('when isOffered is false', () => {
        it('should use getStakePerLine with selectionId (if present) for each bet and sum the results', () => {
            const checkedBets = {
                bet1: { selectionId: 'bet1', stakePerLine: 999 },
                bet2: { selectionId: 'bet2', stakePerLine: 999 },
            } as unknown as Legs;

            const singleBetStakes = { bet1: 15, bet2: 25 };
            const isOffered = false;

            expect(calcSingleTabTotalStake(checkedBets, singleBetStakes, isOffered)).toBe(15 + 25);
        });

        it('should use bet.id when selectionId is not present', () => {
            const checkedBets = {
                bet3: { id: 'bet3' },
            } as unknown as Legs;

            const singleBetStakes = { bet3: 40 };
            const isOffered = false;

            const total = calcSingleTabTotalStake(checkedBets, singleBetStakes, isOffered);
            expect(total).toBe(40);
        });

        it('should return 0 when getStakePerLine returns 0 (i.e. no matching entry in singleBetStakes)', () => {
            const checkedBets = {
                bet4: { id: 'bet4' },
            } as unknown as Legs;

            const singleBetStakes = {};
            const isOffered = false;

            const total = calcSingleTabTotalStake(checkedBets, singleBetStakes, isOffered);

            expect(total).toBe(0);
        });
    });
});
