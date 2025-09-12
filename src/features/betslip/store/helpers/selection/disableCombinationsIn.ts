import { LegType } from 'src/common/enums';

import type { DisableCombinationsIn } from '../../../api/types/leg';

export const disableCombinationsIn = (isBuildABetRelated = false): DisableCombinationsIn => {
    if (isBuildABetRelated) {
        return [];
    }

    return [LegType.BuildABet];
};
