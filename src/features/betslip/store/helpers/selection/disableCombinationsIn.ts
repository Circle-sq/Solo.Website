import includes from 'lodash/includes';

import { LegType } from 'src/common/enums';

import type { DisableCombinationsIn } from '../../../api/types/leg';

export const disableCombinationsIn = (
    isBuildABetRelated: boolean,
    isCrossPageRelated: boolean,
): DisableCombinationsIn => {
    if (isBuildABetRelated) {
        return [LegType.CrossBet];
    }

    if (isCrossPageRelated) {
        return [LegType.BuildABet];
    }

    return [LegType.BuildABet, LegType.CrossBet];
};

export const disableBetCombinationsIn = (legType?: LegType.BuildABet | LegType.CrossBet): DisableCombinationsIn =>
    legType !== undefined ? [legType] : [LegType.BuildABet, LegType.CrossBet];

export const disableCombinationsInByLegType = (
    disableCombinationsIn: DisableCombinationsIn = [],
    legType: LegType.BuildABet | LegType.CrossBet,
): DisableCombinationsIn => {
    if (includes(disableCombinationsIn, legType)) {
        return disableCombinationsIn;
    }

    return [...disableCombinationsIn, legType];
};
