import every from 'lodash/every';
import filter from 'lodash/filter';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import reject from 'lodash/reject';
import size from 'lodash/size';
import some from 'lodash/some';
import { selector, selectorFamily } from 'recoil';

import { BetslipErrorCode, MinMaxErrorCode, PriceErrorCode } from 'src/common/enums/error';
import type { InsufficientFundsErrorDetails } from 'src/common/types/error';

import type { BetError } from '../../api/types/error';
import type { Problem } from '../../api/types/problem';
import {
    isInsufficientFundsErrorType,
    isMaxPayoutErrors,
    isMaxStakePerLineErrors,
    isMinStakeExceededErrors,
} from '../../typeGuards/error';
import { isRelatedSelectionProblem } from '../../typeGuards/problem';
import { betslipErrorsAtom, betslipProblemsAtom } from '../atoms/betslip';
import { betsLimitByTab } from '../configs';
import { getBetsWithProblems } from '../helpers/betslipBets';
import {
    filterAlgoSportErrors,
    filterSportsbookErrorCodes,
    filterZeroWinExpectationErrors,
    getSportsbookErrors,
} from '../helpers/errors';
import type { BetslipWarning } from '../types';

import { betslipBetsSelector, isMaxBetValueAvailableSelector } from './betslipBets';
import { isSingleTabSelector } from './betslipTab';
import { minMaxProblemsSelectorFamily } from './problems';
import { summaryStakeSelector } from './stake';

export const insufficientFundsErrorSelector = selector<Problem<InsufficientFundsErrorDetails> | undefined>({
    key: 'insufficientFundsErrorSelector',
    get: ({ get }) => find(get(betslipProblemsAtom), isInsufficientFundsErrorType),
});

export const hasInsufficientFundsErrorSelector = selector<boolean>({
    key: 'hasInsufficientFundsErrorSelector',
    get: ({ get }) => !isEmpty(get(insufficientFundsErrorSelector)),
});

export const neededPlayableBalanceAmountSelector = selector<number>({
    key: 'neededPlayableBalanceAmountSelector',
    get: ({ get }) => {
        const insufficientFundsError = get(insufficientFundsErrorSelector);

        if (insufficientFundsError !== undefined) {
            const { currentAmount, requiredAmount } = insufficientFundsError.details;

            return requiredAmount - currentAmount;
        }

        return 0;
    },
});

export const hasServerSideErrorSelector = selector<boolean>({
    key: 'hasServerSideErrorSelector',
    get: ({ get }) => {
        return some(get(betslipErrorsAtom), (error) => error.code === 'error' || error.code === 'program');
    },
});

export const hasErrorsExceptRelatedSelectionProblemsSelector = selector<boolean>({
    key: 'hasErrorsExceptRelatedSelectionProblemsSelector',
    get: ({ get }) => {
        const withoutRelatedSelectionProblems = reject(
            [...get(betslipProblemsAtom), ...get(betslipErrorsAtom)],
            isRelatedSelectionProblem,
        );

        return !isEmpty(withoutRelatedSelectionProblems);
    },
});

export const algoSportErrorsSelector = selector<BetError[]>({
    key: 'algoSportErrorsSelector',
    get: ({ get }) => {
        const errors = get(betslipErrorsAtom);
        const algoSportErrors = filterAlgoSportErrors(errors);

        if (!isEmpty(algoSportErrors)) {
            return algoSportErrors;
        }

        const zeroWinExpectationErrors = filterZeroWinExpectationErrors(errors);

        if (!isEmpty(zeroWinExpectationErrors)) {
            return zeroWinExpectationErrors;
        }

        return [];
    },
});

export const algoSportErrorsCountSelector = selector<number>({
    key: 'algoSportErrorsCountSelector',
    get: ({ get }) => size(get(algoSportErrorsSelector)),
});

export const hasAlgoSportErrorSelectorFamily = selectorFamily<boolean, number | undefined | null>({
    key: 'hasAlgoSportErrorSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const algoSportErrors = get(algoSportErrorsSelector);

            if (isNil(eventId) || isEmpty(algoSportErrors)) {
                return false;
            }

            return some(algoSportErrors, ({ leg }) => leg?.event.id === eventId);
        },
});

export const summaryStakeErrorSelector = selector({
    key: 'summaryStakeErrorSelector',
    get: ({ get }) => {
        const problems = get(betslipProblemsAtom);

        if (isEmpty(problems)) {
            return;
        }

        const maxStakeErrors = filter(problems, { code: MinMaxErrorCode.TooHigh });

        if (isMaxStakePerLineErrors(maxStakeErrors)) {
            return minBy(maxStakeErrors, ({ details }) => details.maxStakePerLine);
        }

        const minStakeErrors = filter(problems, { code: MinMaxErrorCode.BelowMinimum });

        if (isMinStakeExceededErrors(minStakeErrors)) {
            return maxBy(minStakeErrors, ({ details }) => details.minTotalStake ?? details.minLineStake);
        }

        const maxPayoutErrors = filter(problems, { code: MinMaxErrorCode.MaxPayout });

        if (isMaxPayoutErrors(maxPayoutErrors)) {
            return minBy(maxPayoutErrors, ({ details }) => details.maxPayout);
        }
    },
});

export const hasMinMaxSummaryStakeErrorSelector = selector<boolean>({
    key: 'hasSummaryStakeErrorForMultiBetsOnSingleTabSelector',
    get: ({ get }) => {
        const betsWithProblems = getBetsWithProblems(get(betslipBetsSelector), get(betslipProblemsAtom));

        if (size(betsWithProblems) <= betsLimitByTab.single) {
            return false;
        }

        const hasMaxStakeErrors = every(betsWithProblems, (bet) => {
            const betId = bet.selectionId ?? bet.id;

            return some(get(minMaxProblemsSelectorFamily(betId)), { code: MinMaxErrorCode.TooHigh });
        });

        const hasMinStakeErrors = every(betsWithProblems, (bet) => {
            const betId = bet.selectionId ?? bet.id;

            return some(get(minMaxProblemsSelectorFamily(betId)), { code: MinMaxErrorCode.BelowMinimum });
        });

        const hasMaxPayoutErrors = every(betsWithProblems, (bet) => {
            const betId = bet.selectionId ?? bet.id;
            const minMaxStakeProblems = get(minMaxProblemsSelectorFamily(betId));

            return (
                some(minMaxStakeProblems, { code: MinMaxErrorCode.MaxPayout }) &&
                !some(minMaxStakeProblems, { code: MinMaxErrorCode.TooHigh }) &&
                !some(minMaxStakeProblems, { code: MinMaxErrorCode.BelowMinimum })
            );
        });

        return hasMaxStakeErrors || hasMinStakeErrors || hasMaxPayoutErrors;
    },
});

export const hasSummaryStakeErrorSelector = selector<boolean>({
    key: 'hasSummaryStakeErrorSelector',
    get: ({ get }) => {
        const summaryStake = get(summaryStakeSelector);
        const summaryStakeError = get(summaryStakeErrorSelector);
        const isMaxBetValueAvailable = get(isMaxBetValueAvailableSelector);
        const isSingleTab = get(isSingleTabSelector);
        const hasMinMaxSummaryStakeError = get(hasMinMaxSummaryStakeErrorSelector);

        const isInactive = summaryStake === 0 || isUndefined(summaryStake) || isNull(summaryStake);

        return (
            (!isNil(summaryStakeError) && isMaxBetValueAvailable && !isInactive) ||
            (isSingleTab && hasMinMaxSummaryStakeError)
        );
    },
});

export const hasPanicModeEnabledErrorSelector = selector<boolean>({
    key: 'hasPanicModeEnabledErrorSelector',
    get: ({ get }) => {
        return some(get(betslipErrorsAtom), { code: BetslipErrorCode.PanicModeEnabled });
    },
});

export const hasStartedBuildABetErrorSelector = selector<boolean>({
    key: 'hasStartedBuildABetErrorSelector',
    get: ({ get }) => {
        return some(get(betslipProblemsAtom), { code: BetslipErrorCode.BuildABetInPlayNotAllowed });
    },
});

export const sportsbookErrorMessagesSelector = selector<BetslipWarning[]>({
    key: 'sportsbookErrorMessagesSelector',
    get: ({ get }) => {
        const placeBetSportsbookErrorCodes = filterSportsbookErrorCodes(get(betslipErrorsAtom));

        return getSportsbookErrors(placeBetSportsbookErrorCodes);
    },
});

export const hasZeroWinExpectationErrorSelector = selector<boolean>({
    key: 'hasZeroWinExpectationErrorSelector',
    get: ({ get }) => {
        return some(get(betslipProblemsAtom), { code: PriceErrorCode.ZeroWinExpectation });
    },
});
