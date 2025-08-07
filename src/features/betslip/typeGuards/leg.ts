import has from 'lodash/has';
import includes from 'lodash/includes';

import { isBuildABetLegType } from '@sc-buildABet/utils/typeGuards';

import { LegType } from 'src/common/enums';

import type { BaseLeg } from '../api/types/leg';

export const isCrossBetLegType = <T1 extends T2, T2 extends BaseLeg = BaseLeg>(leg: T2 | undefined): leg is T1 => {
    return leg?.type === LegType.CrossBet && has(leg, 'marketsAndSelections');
};

export const isStandardBetLegType = <T1 extends T2, T2 extends BaseLeg = BaseLeg>(leg: T2 | undefined): leg is T1 => {
    return leg?.type === LegType.Standard && has(leg, 'market') && has(leg, 'selection');
};

export const isMultiBetLegType = <T1 extends T2, T2 extends BaseLeg = BaseLeg>(leg: T2 | undefined): leg is T1 =>
    isBuildABetLegType<T1>(leg) || isCrossBetLegType<T1>(leg);

export const isLegType = (type: string): type is LegType => includes(LegType, type);
