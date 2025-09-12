import get from 'lodash/get';
import has from 'lodash/has';

import type { BaseLeg, BuildABetLeg, Leg } from '@solo-betslip/api/types/leg';

import { LegType } from 'src/common/enums';
import type { MyBet, MyBuildABetLeg } from 'src/common/types/myBet';

export const isBuildABetLegType = <T1 extends T2, T2 extends BaseLeg = BaseLeg>(leg: T2 | undefined): leg is T1 => {
    return leg?.type === LegType.BuildABet && has(leg, 'marketsAndSelections');
};

export const isBuildABetType = (bet?: Leg): bet is Leg => {
    return isBuildABetLegType<BuildABetLeg>(get(bet, 'legs.0'));
};

export const isMyBetBuildABet = (bet: MyBet): bet is MyBet<MyBuildABetLeg> => {
    return isBuildABetLegType<MyBuildABetLeg>(get(bet, 'legs.0'));
};
