import some from 'lodash/some';

import { BetslipTab } from 'src/common/enums';

import type { Combinations } from '../../api/types/combination';
import { checkCombinationsEligibility, hasCombinationProblemsWith } from '../../helpers/combinations';
import { isMultiBetLegType } from '../../typeGuards/leg';
import { isSinglesOnlyMarketProblem } from '../../typeGuards/problem';
import { betsLimitByTab } from '../configs';

interface DefineActiveTabParams {
    betsCount: number;
    checkedBetsCount: number;
    combinations: Combinations;
    currentActiveTab: BetslipTab;
    isAnimationInProgress?: boolean;
    isPossibleBetsLoading?: boolean;
    isTabSelectedByUser?: boolean;
    hasCheckedMultiBet: boolean;
    hasMinBetsWarning?: boolean;
    hasRelatedSelections?: boolean;
}

export const defineActiveTab = ({
    betsCount,
    checkedBetsCount,
    combinations,
    currentActiveTab,
    isAnimationInProgress = false,
    isPossibleBetsLoading = false,
    isTabSelectedByUser = false,
    hasCheckedMultiBet,
    hasMinBetsWarning = false,
    hasRelatedSelections = false,
}: DefineActiveTabParams): BetslipTab => {
    if (!isPossibleBetsLoading && checkedBetsCount > 1 && hasRelatedSelections && !isTabSelectedByUser) {
        return BetslipTab.Single;
    }

    const isSystemTab = currentActiveTab === BetslipTab.System;

    if (isSystemTab && checkedBetsCount === 0) {
        return BetslipTab.System;
    }

    const { isEligibleForMultiples, isEligibleForSystem } = checkCombinationsEligibility(combinations);
    const hasSingleOnlyMarkets = hasCombinationProblemsWith(combinations, isSinglesOnlyMarketProblem);
    const hasCombinationWithMultiBet = some(combinations, ({ legs }) => some(legs, isMultiBetLegType));

    if (
        isSystemTab &&
        isTabSelectedByUser &&
        !hasCheckedMultiBet &&
        !hasCombinationWithMultiBet &&
        (isEligibleForSystem || hasSingleOnlyMarkets)
    ) {
        return BetslipTab.System;
    }

    const hasEligibleCombinations =
        (isEligibleForMultiples || isEligibleForSystem) && betsCount > betsLimitByTab.single;

    const isEligibleForMultiTab = isSystemTab
        ? hasCheckedMultiBet ||
          hasCombinationWithMultiBet ||
          (!isEligibleForSystem && betsCount < betsLimitByTab.system)
        : !isPossibleBetsLoading &&
          hasEligibleCombinations &&
          !hasSingleOnlyMarkets &&
          !hasRelatedSelections &&
          !isTabSelectedByUser &&
          betsCount >= betsLimitByTab.multi;

    if (isEligibleForMultiTab) {
        return BetslipTab.Multi;
    }

    const isEligibleForSingleTab =
        !isPossibleBetsLoading &&
        !isTabSelectedByUser &&
        ((!hasEligibleCombinations && (isSystemTab || betsCount === betsLimitByTab.single)) ||
            (checkedBetsCount > betsLimitByTab.single &&
                (hasRelatedSelections || (!hasEligibleCombinations && !hasMinBetsWarning)) &&
                !isAnimationInProgress) ||
            hasSingleOnlyMarkets);

    if (isEligibleForSingleTab) {
        return BetslipTab.Single;
    }

    return currentActiveTab;
};
