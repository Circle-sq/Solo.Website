import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import some from 'lodash/some';
import { type TransactionInterface_UNSTABLE as TransactionInterface } from 'recoil';

import { BetslipTab } from 'src/common/enums';

import { isMultiBetType } from '../../typeGuards/bet';
import { isRelatedSelectionProblem } from '../../typeGuards/problem';
import { animationRecordsAtom } from '../atoms/animation';
import { betReceiptAtom } from '../atoms/betReceipt';
import { betslipProblemsAtom, possibleBetsTriggersAtom } from '../atoms/betslip';
import { betsAtom, uncheckedBetIdsAtom } from '../atoms/betslipBets';
import { betslipActiveTabAtom, isTabSelectedByUserAtom } from '../atoms/betslipTab';
import { combinationsAtom } from '../atoms/combinations';
import { freeBetsAtom } from '../atoms/freeBets';
import { multipleBetStakesAtom } from '../atoms/stake';
import { getBetslipBets, getCheckedBets } from '../helpers/betslipBets';
import { defineActiveTab } from '../helpers/betslipTab';
import { deselectAllFreeBets } from '../helpers/freeBets';

export const defineBetslipTabAfterRemoveLegTransaction = ({ get, reset, set }: TransactionInterface) => {
    const betslipTab = get(betslipActiveTabAtom);
    const betslipBets = getBetslipBets(get(betsAtom));
    const checkedBets = getCheckedBets(betslipBets, get(uncheckedBetIdsAtom));
    const betsCount = size(betslipBets);

    const definedTab = defineActiveTab({
        betsCount,
        checkedBetsCount: size(checkedBets),
        combinations: get(combinationsAtom),
        currentActiveTab: betslipTab,
        isAnimationInProgress: !isEmpty(get(animationRecordsAtom)),
        isPossibleBetsLoading: !isEmpty(get(possibleBetsTriggersAtom)),
        isTabSelectedByUser: get(isTabSelectedByUserAtom),
        hasCheckedMultiBet: some(checkedBets, isMultiBetType),
        hasRelatedSelections: some(get(betslipProblemsAtom), isRelatedSelectionProblem),
    });

    if (definedTab !== betslipTab) {
        set(betslipActiveTabAtom, definedTab);
    }

    if (betsCount === 0 || (betsCount === 1 && betslipTab !== BetslipTab.Single)) {
        set(isTabSelectedByUserAtom, false);
    }

    if (betsCount <= 1 && isEmpty(get(betReceiptAtom).legs)) {
        reset(multipleBetStakesAtom);
    }
};

export const updateBetslipTabTransaction =
    ({ tab, isSelectedByUser }: { tab: BetslipTab; isSelectedByUser?: boolean }) =>
    async ({ get, set }: TransactionInterface) => {
        const betslipTab = get(betslipActiveTabAtom);

        if (tab !== betslipTab) {
            set(freeBetsAtom, deselectAllFreeBets);
            set(betslipActiveTabAtom, tab);

            if (isSelectedByUser !== undefined) {
                set(isTabSelectedByUserAtom, isSelectedByUser);
            }
        }
    };
