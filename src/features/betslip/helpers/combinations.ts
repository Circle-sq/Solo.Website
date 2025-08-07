import every from 'lodash/every';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';
import pickBy from 'lodash/pickBy';
import some from 'lodash/some';

import { BetType, PlacedBetType } from 'src/common/enums';

import type { Combination, Combinations, CombinationStandardLeg } from '../api/types/combination';
import type { BaseProblem, Problem } from '../api/types/problem';
import { isCastBetType, isSystemCombination } from '../typeGuards/bet';
import { hasProblemWith } from '../typeGuards/problem';

import type { CombinationsEligibility } from './types';

const multipleBetTypePattern = `${BetType.Double}|${BetType.Treble}|^\\d{1,2}F{1}$`;

const multipleBetTypeRegExp = new RegExp(multipleBetTypePattern, '');

export const isMultipleBetType = (type: string): boolean => multipleBetTypeRegExp.test(type);

export const isEligibleForMultiples = (combinations: Combinations) =>
    some(combinations, (_, type) => isMultipleBetType(type));

export const isEligibleForSystem = (combinations: Combinations) =>
    some(combinations, (_, type) => !isMultipleBetType(type));

export const hasCombinationProblemsWith = <T extends BaseProblem>(
    combinations: Combinations,
    predicate: (problem: T) => boolean,
): boolean => some(combinations, ({ problems }) => hasProblemWith(problems, predicate));

export const checkCombinationsEligibility = (combinations: Combinations): CombinationsEligibility => {
    if (isEmpty(combinations)) {
        return { isEligibleForMultiples: false, isEligibleForSystem: false };
    }

    return {
        isEligibleForMultiples: isEligibleForMultiples(combinations),
        isEligibleForSystem: isEligibleForSystem(combinations),
    };
};

export const identifyBetType = (type = ''): PlacedBetType => {
    if (type === BetType.Single) {
        return PlacedBetType.Single;
    }

    if (isMultipleBetType(type)) {
        return PlacedBetType.Multi;
    }

    return PlacedBetType.System;
};

export const isAccumulator = <T extends { numLines?: number }>({ numLines = 0 }: T) => numLines === 1;

export const createCombinationRecord = (combination: Combination | undefined): Record<string, Combination> => {
    if (isEmpty(combination)) {
        return {};
    }

    return { [combination.type]: combination };
};

export const findCastCombination = (combination: Combination, type: string) =>
    isCastBetType(type) || isAccumulator(combination);

export const getCastCombinations = (combinations: Combinations): Combinations =>
    pickBy(combinations, findCastCombination);

export const getCombinationsWithoutCast = (combinations: Combinations): Combinations =>
    omitBy(combinations, findCastCombination);

export const getCombinationProblems = (combination?: Combination): Problem[] => get(combination, 'problems', []);

export const getSystemCombination = (
    combinations: Combinations,
    systemBetType?: string,
): Combination<CombinationStandardLeg> | undefined => {
    if (systemBetType === undefined) {
        return;
    }

    const combination = get(combinations, systemBetType);

    if (!isSystemCombination(combination)) {
        return;
    }

    return combination;
};

export const isValidCombination = (problems: Problem[] = [], errorCodes: string[]) => {
    return isEmpty(problems) || every(problems, ({ code }) => errorCodes.includes(code));
};
