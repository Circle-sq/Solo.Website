import size from 'lodash/size';
import { selector } from 'recoil';

import { BetslipTab } from 'src/common/enums';

import { uncheckedBetIdsAtom } from '../atoms/betslipBets';
import { betslipActiveTabAtom, isTabSelectedByUserAtom } from '../atoms/betslipTab';
import { combinationsAtom } from '../atoms/combinations';
import { getCheckedBets } from '../helpers/betslipBets';
import { defineActiveTab } from '../helpers/betslipTab';

import { isAnimationInProgressSelector } from './animation';
import { isPossibleBetsLoadingSelector } from './betslip';
import { betslipBetsSelector, hasCheckedMultiBetSelector } from './betslipBets';
import { hasRelatedSelectionProblemSelector } from './problems';
import { hasMinBetsWarningSelector } from './warnings';

export const definedTabSelector = selector<BetslipTab>({
    key: 'definedTabSelector',
    get: ({ get }) => {
        const currentActiveTab = get(betslipActiveTabAtom);
        const betslipBets = get(betslipBetsSelector);
        const combinations = get(combinationsAtom);
        const isAnimationInProgress = get(isAnimationInProgressSelector);
        const isTabSelectedByUser = get(isTabSelectedByUserAtom);
        const isPossibleBetsLoading = get(isPossibleBetsLoadingSelector);
        const hasCheckedMultiBet = get(hasCheckedMultiBetSelector);
        const hasMinBetsWarning = get(hasMinBetsWarningSelector);
        const hasRelatedSelections = get(hasRelatedSelectionProblemSelector);
        const uncheckedBetIds = get(uncheckedBetIdsAtom);
        const checkedBets = getCheckedBets(betslipBets, uncheckedBetIds);

        return defineActiveTab({
            betsCount: size(betslipBets),
            checkedBetsCount: size(checkedBets),
            combinations,
            currentActiveTab,
            isPossibleBetsLoading,
            isAnimationInProgress,
            isTabSelectedByUser,
            hasCheckedMultiBet,
            hasMinBetsWarning,
            hasRelatedSelections,
        });
    },
});

export const isSingleTabSelector = selector<boolean>({
    key: 'isSingleTabSelector',
    get: ({ get }) => get(betslipActiveTabAtom) === BetslipTab.Single,
});

export const isMultiTabSelector = selector<boolean>({
    key: 'isMultiTabSelector',
    get: ({ get }) => get(betslipActiveTabAtom) === BetslipTab.Multi,
});

export const isSystemTabSelector = selector<boolean>({
    key: 'isSystemTabSelector',
    get: ({ get }) => get(betslipActiveTabAtom) === BetslipTab.System,
});
