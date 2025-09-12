import { SingleBuildABetContent } from '@solo-buildABet/ui/myBet';
import { isMyBetBuildABet } from '@solo-buildABet/utils/typeGuards';

import type { BetStatus } from 'src/common/enums';
import type { MyBet } from 'src/common/types/myBet';
import { isMyBetStandardBet } from 'src/ui/myBets/utils/typeGuards';

import SingleStandardBetContent from '../SingleStandardBetContent/SingleStandardBetContent';

const SingleBetContent = ({ bet, betStatus }: { bet: MyBet; betStatus: BetStatus }) => {
    if (isMyBetBuildABet(bet)) {
        return <SingleBuildABetContent bet={bet} betStatus={betStatus} />;
    }

    if (isMyBetStandardBet(bet)) {
        return <SingleStandardBetContent bet={bet} betStatus={betStatus} />;
    }

    return null;
};

export default SingleBetContent;
