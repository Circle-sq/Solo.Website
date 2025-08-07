import isEmpty from 'lodash/isEmpty';
import type { TransactionInterface_UNSTABLE as TransactionInterface } from 'recoil';

import { betslipProblemsAtom } from '../atoms/betslip';
import { betslipSelectionsAtom } from '../atoms/selections';
import { syncSuspendedBetslipProblems } from '../helpers/problems';

export const syncSuspendedBetslipProblemsTransaction =
    (marketId: number) =>
    ({ get, set }: Pick<TransactionInterface, 'get' | 'set'>) => {
        const betslipSelections = get(betslipSelectionsAtom);

        if (isEmpty(betslipSelections)) {
            return;
        }

        set(betslipProblemsAtom, syncSuspendedBetslipProblems(betslipSelections, marketId));
    };
