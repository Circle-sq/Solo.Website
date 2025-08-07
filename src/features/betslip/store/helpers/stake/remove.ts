import has from 'lodash/has';
import omit from 'lodash/omit';
import omitBy from 'lodash/omitBy';

import type { Legs } from '../../../api/types/leg';

export const removeSingleBetStake =
    (selectionId: string) =>
    (singleBetStakes: Record<string, number>): Record<string, number> =>
        omit(singleBetStakes, selectionId);

export const removeOrphanStakes =
    (actualBets: Legs, lastCrossSelectionId: string) =>
    (singleBetStakes: Record<string, number>): Record<string, number> =>
        omitBy(singleBetStakes, (_, betId) => !has(actualBets, betId) || lastCrossSelectionId === betId);
