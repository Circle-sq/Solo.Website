import { useRecoilValue } from 'recoil';

import { isBuildABetPageRelatedSelectionSelector } from '@solo-betslip/store/selectors/selections';
import { useBuildABetState } from '@solo-buildABet/hooks/useBuildABetState';

export const useBuildABetHighlighted = (selectionId: number, eventId?: number) => {
    const eligibleBuildABetSelection = useRecoilValue(isBuildABetPageRelatedSelectionSelector(selectionId));
    const { isEnabled } = useBuildABetState(eventId);

    return {
        isHighlightedBuildABet: isEnabled && eligibleBuildABetSelection,
    };
};
