import get from 'lodash/get';
import { useMemo } from 'react';

import type { MyBet } from 'src/common/types/myBet';
import { getBetSelectionStatus } from 'src/ui/myBets/utils/helpers';

import MultipleBetContent from '../MultipleBetContent/MultipleBetContent';
import SingleBetContent from '../SingleBetContent/SingleBetContent';

const BetItemContent = ({ bet }: { bet: MyBet }) => {
    const { legs, cashOut: isCashedOut, status: betStatus, payout, totalStake } = bet;
    const resultType = get(legs, '0.result.type');

    const isSingleBet = legs.length === 1;

    const betSelectionStatus = useMemo(
        () => getBetSelectionStatus({ betStatus, resultType, totalStake, payout, isCashedOut, isSingleBet }),
        [betStatus, resultType, totalStake, payout, isCashedOut, isSingleBet],
    );

    if (isSingleBet) {
        return <SingleBetContent bet={bet} betStatus={betSelectionStatus} />;
    }

    return <MultipleBetContent bet={bet} betStatus={betSelectionStatus} />;
};

export default BetItemContent;
