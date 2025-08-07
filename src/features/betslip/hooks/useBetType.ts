import isNull from 'lodash/isNull';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { isBuildABetType } from '@sc-buildABet/utils/typeGuards';

import type { Leg } from '../api/types/leg';
import { pickFreeBetCredit } from '../helpers/freeBet';
import { availableFreeBetsByBetIdSelectorFamily } from '../store/selectors/freeBets';
import { isCrossBetType } from '../typeGuards/bet';

const useBetType = (leg: Leg) => {
    const selectionId = leg.selectionId ?? leg.id;

    const freeBets = useRecoilValue(availableFreeBetsByBetIdSelectorFamily(selectionId));

    const isFreeBet = useMemo(() => !isNull(pickFreeBetCredit(freeBets)), [freeBets]);
    const isBuildABet = isBuildABetType(leg);
    const isCrossBet = isCrossBetType(leg);

    return {
        isBuildABet,
        isCrossBet,
        isMultiBet: isBuildABet || isCrossBet,
        isFreeBet,
    };
};

export default useBetType;
