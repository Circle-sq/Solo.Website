import isNull from 'lodash/isNull';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { isBuildABetType } from '@solo-buildABet/utils/typeGuards';

import type { Leg } from '../api/types/leg';
import { pickFreeBetCredit } from '../helpers/freeBet';
import { availableFreeBetsByBetIdSelectorFamily } from '../store/selectors/freeBets';

const useBetType = (leg: Leg) => {
    const selectionId = leg.selectionId ?? leg.id;

    const freeBets = useRecoilValue(availableFreeBetsByBetIdSelectorFamily(selectionId));

    const isFreeBet = useMemo(() => !isNull(pickFreeBetCredit(freeBets)), [freeBets]);
    const isBuildABet = isBuildABetType(leg);

    return {
        isBuildABet,
        isMultiBet: isBuildABet,
        isFreeBet,
    };
};

export default useBetType;
