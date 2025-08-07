import { BetType, PlacedBetType } from 'src/common/enums';
import { ErrorResource } from 'src/common/enums/error';

import type { Combinations } from '../../api/types/combination';
import type { Problem } from '../../api/types/problem';
import { checkCombinationsEligibility, identifyBetType, isValidCombination } from '../combinations';

describe('checkCombinationsEligibility', () => {
    it('should return false and false for empty combinations', () => {
        const combinations = {} as Combinations;
        const { isEligibleForMultiples, isEligibleForSystem } = checkCombinationsEligibility(combinations);

        expect(isEligibleForMultiples).toBeFalsy();
        expect(isEligibleForSystem).toBeFalsy();
    });

    it('should return true if has combination eligible for multi', () => {
        const combinations = {
            DBL: {
                type: 'DBL',
                name: 'Double',
                ewOffered: false,
                legs: [],
                problems: [],
                isFreebet: false,
                potentialReturns: 0,
                potentialReturnsEw: null,
                price: {
                    f: '5237/1000',
                    d: 6.237,
                },
            },
        } as Combinations;

        const { isEligibleForMultiples, isEligibleForSystem } = checkCombinationsEligibility(combinations);

        expect(isEligibleForMultiples).toBeTruthy();
        expect(isEligibleForSystem).toBeFalsy();
    });

    it('should return true if has combination eligible system', () => {
        const combinations = {
            '2F3': {
                type: '2F3',
                name: 'Double fold 3',
                ewOffered: false,
                legs: [] as any,
                problems: [],
                isFreebet: false,
                potentialReturns: 0,
                potentialReturnsEw: null,
                price: {
                    f: '5237/1000',
                    d: 6.237,
                    a: '',
                },
            },
            TRX: {
                type: 'TRX',
                name: 'Trixie',
                ewOffered: false,
                legs: [] as any,
                problems: [],
                isFreebet: false,
                potentialReturns: 0,
                potentialReturnsEw: null,
                price: {
                    f: '5237/1000',
                    d: 6.237,
                    a: '',
                },
            },
            PAT: {
                type: 'PAT',
                name: 'pat',
                ewOffered: false,
                legs: [] as any,
                problems: [],
                isFreebet: false,
                potentialReturns: 0,
                potentialReturnsEw: null,
                price: {
                    f: '5237/1000',
                    d: 6.237,
                    a: '',
                },
            },
        } as Combinations;

        const { isEligibleForMultiples, isEligibleForSystem } = checkCombinationsEligibility(combinations);

        expect(isEligibleForMultiples).toBeFalsy();
        expect(isEligibleForSystem).toBeTruthy();
    });
});

describe('identifyBetType', () => {
    it('should test identifyBetType function', () => {
        expect(identifyBetType(BetType.Single)).toBe(PlacedBetType.Single);
        expect(identifyBetType(BetType.Double)).toBe(PlacedBetType.Multi);
        expect(identifyBetType(BetType.Treble)).toBe(PlacedBetType.Multi);
        expect(identifyBetType(undefined)).toBe(PlacedBetType.System);
    });
});

describe('isValidCombination', () => {
    const errorCodes = ['CODE1', 'CODE2', 'CODE3'];

    it('should return true when there are no problems', () => {
        const problems: Problem[] = [];
        expect(isValidCombination(problems, errorCodes)).toBe(true);
    });

    it('should return true when all problem codes are in errorCodes', () => {
        const problems: Problem[] = [
            {
                code: 'CODE1',
                pointer: '',
                details: null,
                debugDetails: null,
                field: null,
                resource: ErrorResource.Bet,
            },
            {
                code: 'CODE2',
                pointer: '',
                details: null,
                debugDetails: null,
                field: null,
                resource: ErrorResource.Bet,
            },
        ];

        expect(isValidCombination(problems, errorCodes)).toBe(true);
    });

    it('should return false when some problem codes are not in errorCodes', () => {
        const problems = [
            { code: 'CODE1', pointer: '', details: null, debugDetails: null, field: null, resource: ErrorResource.Bet },
            {
                code: 'INVALID_CODE',
                pointer: '',
                details: null,
                debugDetails: null,
                field: null,
                resource: ErrorResource.Bet,
            },
        ];
        expect(isValidCombination(problems, errorCodes)).toBe(false);
    });

    it('should return false when all problem codes are not in errorCodes', () => {
        const problems = [
            {
                code: 'INVALID_CODE1',
                pointer: '',
                details: null,
                debugDetails: null,
                field: null,
                resource: ErrorResource.Bet,
            },
        ];
        expect(isValidCombination(problems, errorCodes)).toBe(false);
    });
});
