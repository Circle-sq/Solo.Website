import filter from 'lodash/filter';
import find from 'lodash/find';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import some from 'lodash/some';
import { selector, selectorFamily } from 'recoil';

import { MinMaxErrorCode } from 'src/common/enums/error';

import type { Problem } from '../../api/types/problem';
import { isMinMaxStakeErrorType } from '../../typeGuards/error';
import { isRelatedSelectionProblem, isSinglesOnlyMarketProblem } from '../../typeGuards/problem';
import { betslipProblemsAtom } from '../atoms/betslip';

import { isCheckedBetslipBetSelectorFamily } from './betslipBets';

export const betslipBetProblemsSelectorFamily = selectorFamily<Problem[], string>({
    key: 'betslipBetProblemsSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            return filter(get(betslipProblemsAtom), ({ selectionIds = [] }) =>
                some(selectionIds, (selectionId) => includes(betId, selectionId)),
            );
        },
});

export const minMaxProblemsSelectorFamily = selectorFamily<Problem[], string>({
    key: 'minMaxProblemsSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            return filter(get(betslipBetProblemsSelectorFamily(betId)), isMinMaxStakeErrorType);
        },
});

export const prioritisedMinMaxProblemSelectorFamily = selectorFamily<Problem | undefined, string>({
    key: 'prioritisedMinMaxProblemSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            const minMaxStakeProblems = get(minMaxProblemsSelectorFamily(betId));

            if (some(minMaxStakeProblems, { code: MinMaxErrorCode.TooHigh })) {
                return find(minMaxStakeProblems, { code: MinMaxErrorCode.TooHigh });
            }

            if (some(minMaxStakeProblems, { code: MinMaxErrorCode.BelowMinimum })) {
                return find(minMaxStakeProblems, { code: MinMaxErrorCode.BelowMinimum });
            }

            if (some(minMaxStakeProblems, { code: MinMaxErrorCode.MaxPayout })) {
                return find(minMaxStakeProblems, { code: MinMaxErrorCode.MaxPayout });
            }
        },
});

export const hasMinMaxStakeProblemSelectorFamily = selectorFamily<boolean, string>({
    key: 'hasMinMaxStakeProblemSelectorFamily',
    get:
        (betId) =>
        ({ get }) =>
            !isEmpty(get(minMaxProblemsSelectorFamily(betId))),
});

export const hasMinMaxTotalStakeProblemSelectorFamily = selectorFamily<boolean, string>({
    key: 'hasMinMaxTotalStakeProblemSelectorFamily',
    get:
        (betId) =>
        ({ get: getRecoilValue }) => {
            const minMaxStakeProblem = getRecoilValue(prioritisedMinMaxProblemSelectorFamily(betId));

            return (
                !isNull(get(minMaxStakeProblem, 'details.maxTotalStake', null)) ||
                !isNull(get(minMaxStakeProblem, 'details.minTotalStake', null))
            );
        },
});

export const hasRelatedSelectionProblemForBetSelectorFamily = selectorFamily<boolean, string>({
    key: 'hasRelatedSelectionProblemForBetSelectorFamily',
    get:
        (betId) =>
        ({ get }) => {
            const problems = get(betslipBetProblemsSelectorFamily(betId));
            const isChecked = get(isCheckedBetslipBetSelectorFamily(betId));

            return some(problems, isRelatedSelectionProblem) && isChecked;
        },
});

export const hasRelatedSelectionProblemSelector = selector<boolean>({
    key: 'hasRelatedSelectionProblemSelector',
    get: ({ get }) => some(get(betslipProblemsAtom), isRelatedSelectionProblem),
});

export const hasSinglesOnlyMarketProblemSelector = selector<boolean>({
    key: 'hasSinglesOnlyMarketProblemSelector',
    get: ({ get }) => some(get(betslipProblemsAtom), isSinglesOnlyMarketProblem),
});
