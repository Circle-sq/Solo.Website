import isNil from 'lodash/isNil';
import map from 'lodash/map';
import { useRecoilValue } from 'recoil';

import type { MarketAndSelection } from '../../../../api/types/leg';
import { betslipSelectionSelectorFamily } from '../../../../store/selectors/selections';

export const useMarketRevisions = (marketsAndSelections: MarketAndSelection[] | null | undefined) => {
    const [firstSelectionId, secondSelectionId] = map(marketsAndSelections, 'selection.id');
    const firstSelection = useRecoilValue(betslipSelectionSelectorFamily(firstSelectionId));
    const secondSelection = useRecoilValue(betslipSelectionSelectorFamily(secondSelectionId));

    const out: Record<number, number> = {};

    if (!isNil(firstSelection)) {
        out[firstSelection.marketId] = firstSelection.marketRevision;
    }

    if (!isNil(secondSelection)) {
        out[secondSelection.marketId] = secondSelection.marketRevision;
    }

    return out;
};
