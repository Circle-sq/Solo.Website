import get from 'lodash/get';

import { isStandardBetLegType } from '@solo-betslip/typeGuards/leg';

import type { MyBet, MyStandardBetLeg } from 'src/common/types/myBet';

export const isMyBetStandardBet = (bet: MyBet): bet is MyBet<MyStandardBetLeg> => {
    return isStandardBetLegType<MyStandardBetLeg>(get(bet, 'legs.0'));
};
