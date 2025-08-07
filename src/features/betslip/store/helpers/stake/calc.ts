import find from 'lodash/find';
import forEach from 'lodash/forEach';
import has from 'lodash/has';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import set from 'lodash/set';
import size from 'lodash/size';
import values from 'lodash/values';

import type { Combination, CombinationStandardLeg } from '../../../api/types/combination';
import type { Leg, Legs } from '../../../api/types/leg';
import { isMultiBetType } from '../../../typeGuards/bet';
import { EMPTY_STAKE } from '../../configs';
import type { BalancedStakes } from '../../types';

import { getStakePerLine } from './common';

const DEFAULT_MULTIPLIER = 1;
const EACH_WAY_MULTIPLIER = 2;

export const calcTotalStake = <T extends { eachWay?: boolean; numLines?: number; totalStake?: number }>(
    {
        eachWay = false,
        numLines = 1,
        totalStake = EMPTY_STAKE, // Exists if bet is from offer
    }: T,
    stakePerLine = EMPTY_STAKE,
): number => {
    if (totalStake > EMPTY_STAKE) {
        return totalStake;
    }

    const totalStakePerLines = numLines * Number(stakePerLine);

    if (eachWay) {
        return EACH_WAY_MULTIPLIER * totalStakePerLines;
    }

    return DEFAULT_MULTIPLIER * totalStakePerLines;
};

export const calcSystemTabTotalStake = (
    combination?: Combination<CombinationStandardLeg>,
    stakePerLine = 0,
): number => {
    if (combination === undefined || isEmpty(combination)) {
        return EMPTY_STAKE;
    }

    return calcTotalStake(combination, stakePerLine);
};

export const calcSingleTabTotalStake = (
    checkedBets: Legs,
    singleBetStakes: Record<string, number>,
    isOffered: boolean,
): number => {
    return reduce(
        checkedBets,
        (total: number, bet: Leg) => {
            const stakePerLine = isOffered
                ? bet.stakePerLine
                : getStakePerLine(singleBetStakes, bet.selectionId ?? bet.id);

            return total + calcTotalStake(bet, stakePerLine);
        },
        EMPTY_STAKE,
    );
};

export const calcSingleTabTotalPotentialReturns = (checkedBets: Legs): number =>
    reduce(checkedBets, (total, { potentialReturns = EMPTY_STAKE }) => total + potentialReturns, EMPTY_STAKE);

export const calcSingleTabMaxStake = (bets: Legs): number => {
    if (isEmpty(bets)) {
        return EMPTY_STAKE;
    }

    const multiBet = find(bets, isMultiBetType);

    if (multiBet !== undefined) {
        return multiBet.maxStake ?? EMPTY_STAKE;
    }

    const [{ maxStake }] = values(bets);

    return maxStake ?? EMPTY_STAKE;
};

export const calcSingleTabSummaryStake = (
    checkedBets: Legs,
    singleBetStakes: Record<string, number>,
    appliedFreeBetIds: string[],
    isOffered: boolean,
) => {
    let summaryStake: number | undefined | null = null;

    forEach(checkedBets, (bet) => {
        const betId = bet.selectionId ?? bet.id;

        if (!includes(appliedFreeBetIds, betId)) {
            const stakePerLine = isOffered ? bet.stakePerLine : getStakePerLine(singleBetStakes, betId);

            if (summaryStake === null) {
                summaryStake = stakePerLine;
            } else if (summaryStake !== stakePerLine) {
                summaryStake = undefined;
            }
        }
    });

    return summaryStake;
};

export const calcBalancedMaxStake = (activeLegs: Leg[], playableBalance: number): BalancedStakes => {
    let tmpBalance = playableBalance;
    const processedLegs: BalancedStakes = {};

    for (const _ of activeLegs) {
        const avgBalance = Math.floor(tmpBalance / (size(activeLegs) - size(processedLegs)));
        const legsToFulfill = activeLegs
            .filter(({ maxStake }) => maxStake ?? 0 <= avgBalance)
            .filter((leg) => !has(processedLegs, leg.selectionId ?? leg.id));

        if (legsToFulfill.length === 0) {
            const legsToFullfill = activeLegs.filter((leg) => !has(processedLegs, leg.selectionId ?? leg.id));

            for (const leg of legsToFullfill) {
                const selectionId = leg.selectionId ?? leg.id;

                set(processedLegs, selectionId, avgBalance);
                tmpBalance = tmpBalance - avgBalance;
            }
        }

        for (const leg of legsToFulfill) {
            const selectionId = leg.selectionId ?? leg.id;
            const maxStake = leg.maxStake ?? 0;

            set(processedLegs, selectionId, maxStake);
            tmpBalance = tmpBalance - maxStake;
        }
    }

    return processedLegs;
};

export const calcBalancedStakes = (activeLegs: Leg[], playableBalance: number): BalancedStakes => {
    if (isEmpty(activeLegs)) {
        return {};
    }

    const betsMaxStakes: BalancedStakes = {};
    let totalStake = 0;

    forEach(activeLegs, (bet) => {
        const betId = bet.selectionId ?? bet.id;
        const maxStake = bet.maxStake ?? 0;

        betsMaxStakes[betId] = maxStake;
        totalStake += maxStake;
    });

    if (totalStake <= playableBalance) {
        return betsMaxStakes;
    }

    return calcBalancedMaxStake(activeLegs, playableBalance);
};
