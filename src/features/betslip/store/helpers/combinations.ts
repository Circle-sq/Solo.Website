import find from 'lodash/find';
import get from 'lodash/get';
import has from 'lodash/has';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import values from 'lodash/values';

import { BetType } from 'src/common/enums';
import type { Selections } from 'src/common/types/selection';

import type { BaseBet } from '../../api/types/bet';
import type { Combination, CombinationLeg, CombinationMultiBetLeg, Combinations } from '../../api/types/combination';
import type { PossibleBet } from '../../api/types/possibleBet';
import { getCombinationsWithoutCast } from '../../helpers/combinations';
import { isMultiBetLegType } from '../../typeGuards/leg';
import { baseCombinationKeys, betStakeKeys, EMPTY_STAKE } from '../configs';

export const syncPossibleCombination = <T extends CombinationLeg>(
    combination: Combination<T>,
    bets: PossibleBet[],
): Combination<T> => {
    const { type, stakePerLine } = combination;

    const convertedCombination: Combination<T> = {
        ...pick(combination, baseCombinationKeys),
        potentialReturnsAt: stakePerLine,
    };

    const bet = find(bets, { type });
    const betLegs = get(bet, 'legs', []);

    if (bet !== undefined && betLegs.length > 1) {
        const { freebetCredits, freebetRemarks, maxStake, stakePerLine, price } = bet;

        return {
            ...convertedCombination,
            ...(maxStake ? { maxStake } : {}),
            freebetCredits,
            freebetRemarks,
            stakePerLine,
            price,
        };
    }

    return convertedCombination;
};

export const syncPossibleCombinations = (combinations: Combinations, bets: PossibleBet[]): Combinations => {
    return mapValues(omit(combinations, BetType.Single), (combination) => syncPossibleCombination(combination, bets));
};

export const syncCombinationsWithOffer =
    <T extends Omit<BaseBet, 'id'>>(bets: T[]) =>
    (combinations: Combinations): Combinations => {
        return mapValues(combinations, (combination, type) => {
            const bet = find<Omit<BaseBet, 'id'>>(bets, { type });

            if (bet !== undefined && has(combinations, bet.type)) {
                const stakeValues = pick(bet, betStakeKeys);

                return { ...combination, ...stakeValues };
            }

            return combination;
        });
    };

export const syncCombinationWithOffer =
    <T1 extends Omit<BaseBet, 'id'>, T2 extends Combination | undefined>(bets: T1[]) =>
    (combination?: T2): T2 | undefined => {
        if (combination === undefined) {
            return;
        }

        const bet = find<Omit<BaseBet, 'id'>>(bets, { type: combination.type });

        if (bet !== undefined) {
            const stakeValues = pick(bet, betStakeKeys);

            return { ...combination, ...stakeValues };
        }

        return combination;
    };

export const updateCombinationLegsPrice = (legs: CombinationLeg[], selections: Selections): CombinationLeg[] => {
    return legs.map((leg) => {
        if (isMultiBetLegType<CombinationMultiBetLeg>(leg)) {
            const marketsAndSelections = leg.marketsAndSelections.map((item) => {
                if (has(selections, item.selection.id)) {
                    return { ...item, price: get(selections, [item.selection.id, 'price']) };
                }

                return item;
            });

            return { ...leg, marketsAndSelections };
        }

        if (has(selections, leg.selection.id)) {
            return { ...leg, price: get(selections, [leg.selection.id, 'price']) };
        }

        return leg;
    });
};

export const updateCombinationPrice =
    (selections: Selections) =>
    <T extends Combination>(combination: T): T => {
        const legs = updateCombinationLegsPrice(combination.legs, selections);

        return { ...combination, legs };
    };

export const syncCombinationPrice =
    <T extends Combination | undefined>(selections: Selections) =>
    (combination?: T): T | undefined => {
        if (combination === undefined) {
            return;
        }

        return updateCombinationPrice(selections)(combination);
    };

export const updateCombinationsPrice =
    (selections: Selections) =>
    (combinations: Combinations): Combinations =>
        mapValues(combinations, updateCombinationPrice(selections));

export const updateCombinationsStakePerLine =
    (stakePerLine: number, betType?: string) =>
    (combinations: Combinations): Combinations => {
        return mapValues(combinations, (combination, type) => ({
            ...combination,
            stakePerLine: betType === type ? stakePerLine : EMPTY_STAKE,
        }));
    };

export const updateCombinationStakePerLine = <T extends Combination | undefined>(
    stakePerLine: number,
    combination?: T,
): T | undefined => {
    if (combination === undefined) {
        return;
    }

    return { ...combination, stakePerLine };
};

export const defineSystemBetType =
    <T>(combinations: Combinations) =>
    (currentBetType: T | string | undefined): T | string | undefined => {
        const combinationsWithoutCast = getCombinationsWithoutCast(combinations);

        if (
            isEmpty(combinationsWithoutCast) ||
            (isString(currentBetType) && has(combinationsWithoutCast, currentBetType))
        ) {
            return currentBetType;
        }

        const firstCombination = head(values(combinationsWithoutCast));

        return get(firstCombination, 'type');
    };
