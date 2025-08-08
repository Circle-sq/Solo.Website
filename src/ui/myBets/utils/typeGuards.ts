import get from 'lodash/get';

import { isCrossBetLegType, isStandardBetLegType } from '@solo-betslip/typeGuards/leg';

import type { MyBet, MyCrossBetLeg, MyStandardBetLeg } from 'src/common/types/myBet';

export const isMyBetStandardBet = (bet: MyBet): bet is MyBet<MyStandardBetLeg> => {
    return isStandardBetLegType<MyStandardBetLeg>(get(bet, 'legs.0'));
};

export const isMyBetCrossBet = (bet: MyBet): bet is MyBet<MyCrossBetLeg> => {
    return isCrossBetLegType<MyCrossBetLeg>(get(bet, 'legs.0'));
};
