import every from 'lodash/every';
import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import has from 'lodash/has';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import map from 'lodash/map';
import overSome from 'lodash/overSome';
import pickBy from 'lodash/pickBy';
import reduce from 'lodash/reduce';
import reject from 'lodash/reject';
import size from 'lodash/size';
import some from 'lodash/some';
import split from 'lodash/split';
import uniq from 'lodash/uniq';

import { BetslipTab, LegType } from 'src/common/enums';
import { BetslipErrorCode, ErrorResource, ErrorStartPointer } from 'src/common/enums/error';

import type { CastBet } from '../../api/types/castBet';
import type { Combination } from '../../api/types/combination';
import type { PossibleBet, SelectedBet } from '../../api/types/possibleBet';
import type { Problem } from '../../api/types/problem';
import { getSelectionIdsFromLeg } from '../../helpers/bet';
import { splitIds } from '../../helpers/multiBet';
import { isPossibleBetCrossBetType } from '../../typeGuards/bet';
import {
    isBetExceedsMaxPayoutErrorType,
    isBetStakeBelowMinimumErrorType,
    isBetStakeTooHighErrorType,
    isMinMaxStakeErrorType,
    isStakePriceChangedErrorType,
} from '../../typeGuards/error';
import { validationCodesWithLegsPointer } from '../configs';
import type { BetslipSelections } from '../types';

export const getProblemPointers = (problem: Problem): string[] => reject(split(problem.pointer, '/'), isEmpty);

export const hasStakeProblem = overSome<Problem>([isMinMaxStakeErrorType, isStakePriceChangedErrorType]);

export const formatBelowMinimumProblem = <T extends SelectedBet>(
    bet: T,
    problem: Problem,
    activeTab: BetslipTab,
): Problem => {
    if (activeTab === BetslipTab.Single) {
        const betId: string | null = get(bet, 'id', null);

        if (betId !== null) {
            return { ...problem, selectionIds: splitIds(betId) };
        }
    }

    const selectionIds = flatMap(bet.legs, getSelectionIdsFromLeg);

    return { ...problem, selectionIds };
};

export const formatLegProblems = (
    bets: SelectedBet[] | Combination[],
    problem: Problem,
    pointers: string[],
): Problem => {
    const [betIndex, legsPointer, legIndex] = pointers;
    const leg = get(bets, [betIndex, legsPointer, legIndex]);

    if (leg === undefined) {
        return problem;
    }

    return { ...problem, selectionIds: getSelectionIdsFromLeg(leg) };
};

export const formatPossibleBetsProblems = (
    problems: Problem[],
    bets: SelectedBet[] | Combination[],
    activeTab: BetslipTab,
): Problem[] => {
    return map(problems, (problem) => {
        const [startPointer, ...restPointers] = getProblemPointers(problem);

        if (isEmpty(restPointers) || startPointer !== ErrorStartPointer.SelectedBets) {
            return problem;
        }

        if (includes(validationCodesWithLegsPointer, problem.code)) {
            return formatLegProblems(bets, problem, restPointers);
        }

        if (isBetStakeBelowMinimumErrorType(problem)) {
            const [betIndex] = restPointers;
            const bet = get(bets, betIndex);

            return formatBelowMinimumProblem(bet, problem, activeTab);
        }

        if (isBetExceedsMaxPayoutErrorType(problem) || isBetStakeTooHighErrorType(problem)) {
            const selectionIds = last(restPointers) as string;

            return { ...problem, selectionIds: splitIds(selectionIds) };
        }

        return problem;
    });
};

export const formatPlaceBetProblems = (problems: Problem[], bets: CastBet[], activeTab: BetslipTab): Problem[] => {
    return map(problems, (problem) => {
        if (!isEmpty(problem.pointer)) {
            const [startPointer, ...restPointers] = getProblemPointers(problem);

            if (isEmpty(restPointers) || problem.resource !== ErrorResource.Bet) {
                return problem;
            }

            if (startPointer === ErrorStartPointer.Bets) {
                const [betIndex] = restPointers;
                const bet = get(bets, betIndex);

                return formatBelowMinimumProblem(bet, problem, activeTab);
            } else if (
                startPointer === ErrorStartPointer.ValidForReferral ||
                startPointer === ErrorStartPointer.Selection
            ) {
                const [selectionIds] = restPointers;

                return { ...problem, selectionIds: splitIds(selectionIds) };
            }
        }

        return problem;
    });
};

export const mergeProblems = (problems: Problem[]): Problem[] => {
    return reduce(
        groupBy(problems, 'code'),
        (acc: Problem[], problemsByCode: Problem[], code: string) => {
            if (code === BetslipErrorCode.Related && size(problemsByCode) > 1) {
                const [problem] = problemsByCode;

                return [...acc, { ...problem, selectionIds: uniq(flatMap(problemsByCode, 'selectionIds')) }];
            }

            return [...acc, ...problemsByCode];
        },
        [],
    );
};

export const filterNotRelevantRelatedProblems = (
    problems: Problem[],
    selections: BetslipSelections,
    bets: PossibleBet[],
): Problem[] => {
    return reject(
        problems,
        ({ code, selectionIds = [] }) =>
            code === BetslipErrorCode.Related &&
            some(
                selections,
                ({ selectionId, disableCombinationsIn }) =>
                    includes(selectionIds, selectionId) && !includes(disableCombinationsIn, LegType.CrossBet),
            ) &&
            some(
                bets,
                (bet) =>
                    isPossibleBetCrossBetType(bet) &&
                    every(splitIds(bet.id), (selectionId) => includes(selectionIds, selectionId)),
            ),
    );
};

export const findAccountProblem = (problems: Problem[]): Problem | undefined =>
    find(problems, (error) => error?.resource === ErrorResource.Account);

export const syncSuspendedBetslipProblems =
    (selections: BetslipSelections, marketId: number) => (problems: Problem[]) => {
        const selectionsFromMarket = pickBy(selections, { marketId });

        if (isEmpty(selectionsFromMarket)) {
            return problems;
        }

        return reject(
            problems,
            ({ code, selectionIds }) =>
                code === BetslipErrorCode.Suspended &&
                some(selectionIds, (selectionId) => has(selectionsFromMarket, selectionId)),
        );
    };
