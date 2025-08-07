import compact from 'lodash/compact';
import filter from 'lodash/filter';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import orderBy from 'lodash/orderBy';
import size from 'lodash/size';
import some from 'lodash/some';
import values from 'lodash/values';
import type { TransactionInterface_UNSTABLE as TransactionInterface } from 'recoil';

import { findBuildABetByEventId } from '@sc-buildABet/utils/helpers';

import { BetslipTab } from 'src/common/enums';

import type { PossibleBetApiReturn } from '../../api/types';
import { PossibleBetsTriggeredBy } from '../../enums';
import {
    getCastCombinations,
    getCombinationProblems,
    getCombinationsWithoutCast,
    getSystemCombination,
} from '../../helpers/combinations';
import { convertBetsToLegs } from '../../helpers/helpers';
import type { PossibleBetsParams } from '../../hooks/types';
import { isMultiBetType, isPossibleBetMultiBetType } from '../../typeGuards/bet';
import { isRelatedSelectionProblem } from '../../typeGuards/problem';
import { animationRecordsAtom } from '../atoms/animation';
import { betslipProblemsAtom } from '../atoms/betslip';
import { betsAtom, singleBetsAtom, uncheckedBetIdsAtom } from '../atoms/betslipBets';
import { betslipActiveTabAtom, isTabSelectedByUserAtom } from '../atoms/betslipTab';
import {
    combinationsAtom,
    multipleCombinationAtom,
    systemBetTypeAtom,
    systemCombinationAtom,
} from '../atoms/combinations';
import { freeBetsAtom } from '../atoms/freeBets';
import { betslipSelectionsAtom } from '../atoms/selections';
import { singleBetStakesAtom } from '../atoms/stake';
import { getBetslipBets, getCheckedBets, getUncheckedBets } from '../helpers/betslipBets';
import { defineActiveTab } from '../helpers/betslipTab';
import { defineSystemBetType, syncPossibleCombinations } from '../helpers/combinations';
import { updateFreeBets } from '../helpers/freeBets';
import {
    filterNotRelevantRelatedProblems,
    findAccountProblem,
    formatPossibleBetsProblems,
    mergeProblems,
} from '../helpers/problems';
import { syncBuildABetStake } from '../helpers/stake/sync';

export const updateBetsTransaction =
    ({ bets, selectedBets }: PossibleBetApiReturn, { triggeredBy, prevBuildABetId }: PossibleBetsParams) =>
    ({ get, set }: TransactionInterface) => {
        set(singleBetsAtom, selectedBets);
        set(freeBetsAtom, updateFreeBets(bets));

        const betslipTab = get(betslipActiveTabAtom);
        const uncheckedBetIds = get(uncheckedBetIdsAtom);
        const selections = get(betslipSelectionsAtom);

        const possibleBets = bets.map((bet) => omit(bet, ['freebetCredits']));
        const convertedLegs = convertBetsToLegs(possibleBets, selections);
        const uncheckedLegs = getUncheckedBets(get(betsAtom), get(uncheckedBetIdsAtom));

        const updatedBets = { ...convertedLegs, ...uncheckedLegs };
        const betslipBets = getBetslipBets(updatedBets);
        const checkedBets = getCheckedBets(betslipBets, uncheckedBetIds);

        const definedTab = defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(checkedBets),
            combinations: get(combinationsAtom),
            currentActiveTab: betslipTab,
            isAnimationInProgress: !isEmpty(get(animationRecordsAtom)),
            isTabSelectedByUser: get(isTabSelectedByUserAtom),
            hasCheckedMultiBet: some(checkedBets, isMultiBetType),
            hasRelatedSelections: some(get(betslipProblemsAtom), isRelatedSelectionProblem),
        });

        if (definedTab !== betslipTab) {
            set(betslipActiveTabAtom, definedTab);
        }

        set(betsAtom, updatedBets);

        const [lastSelection] = orderBy(selections, 'timestamp', 'desc');

        if (
            triggeredBy === PossibleBetsTriggeredBy.AddBuildABetSelection &&
            prevBuildABetId !== undefined &&
            lastSelection !== undefined
        ) {
            const buildABet = find(updatedBets, findBuildABetByEventId(lastSelection.eventId));

            if (buildABet !== undefined) {
                set(singleBetStakesAtom, syncBuildABetStake(prevBuildABetId, buildABet.id as string));
            }
        }
    };

export const updateCombinationsTransaction =
    ({ bets, combinations }: PossibleBetApiReturn) =>
    ({ get, set }: TransactionInterface) => {
        const syncedCombinations = syncPossibleCombinations(combinations, bets);
        const updatedSystemBetType = defineSystemBetType<string>(syncedCombinations)(get(systemBetTypeAtom));

        set(combinationsAtom, syncedCombinations);
        set(systemBetTypeAtom, updatedSystemBetType);

        const [multipleCombination] = values(getCastCombinations(syncedCombinations));
        set(multipleCombinationAtom, multipleCombination);

        const combinationsWithoutCast = getCombinationsWithoutCast(syncedCombinations);
        const systemCombination = getSystemCombination(combinationsWithoutCast, updatedSystemBetType);
        set(systemCombinationAtom, systemCombination);
    };

export const updateProblemsTransaction =
    ({ bets, selectedBets, selectedBetsProblems }: PossibleBetApiReturn) =>
    ({ get, set }: TransactionInterface) => {
        const betslipTab = get(betslipActiveTabAtom);
        const multipleCombination = get(multipleCombinationAtom);
        const systemCombination = get(systemCombinationAtom);

        if (betslipTab === BetslipTab.Single) {
            const combinationProblems = getCombinationProblems(multipleCombination);
            const singleTabProblems = mergeProblems([
                ...selectedBetsProblems,
                ...filter(combinationProblems, isRelatedSelectionProblem),
            ]);
            const problemsWithSelectionIds = formatPossibleBetsProblems(singleTabProblems, selectedBets, betslipTab);

            set(betslipProblemsAtom, mergeProblems(problemsWithSelectionIds));
        } else {
            const selections = get(betslipSelectionsAtom);
            const hasMultiBet = some(bets, isPossibleBetMultiBetType);

            const combination =
                betslipTab === BetslipTab.System && !hasMultiBet ? systemCombination : multipleCombination;
            const combinationProblems = getCombinationProblems(combination);
            const problemsWithSelectionIds = formatPossibleBetsProblems(
                combinationProblems,
                combination !== undefined ? [combination] : [],
                betslipTab,
            );
            const filteredNotRelevantRelatedProblems = filterNotRelevantRelatedProblems(
                problemsWithSelectionIds,
                selections,
                bets,
            );

            set(
                betslipProblemsAtom,
                mergeProblems(
                    compact([...filteredNotRelevantRelatedProblems, findAccountProblem(selectedBetsProblems)]),
                ),
            );
        }
    };
