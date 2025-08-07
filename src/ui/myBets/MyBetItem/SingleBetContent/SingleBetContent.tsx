import { SingleBuildABetContent } from '@sc-buildABet/ui/myBet';
import { isMyBetBuildABet } from '@sc-buildABet/utils/typeGuards';

import type { BetStatus } from 'src/common/enums';
import type { MyBet } from 'src/common/types/myBet';
import { isMyBetCrossBet, isMyBetStandardBet } from 'src/ui/myBets/utils/typeGuards';

import SingleCrossBetContent from '../SingleCrossBetContent/SingleCrossBetContent';
import SingleStandardBetContent from '../SingleStandardBetContent/SingleStandardBetContent';

const SingleBetContent = ({ bet, betStatus }: { bet: MyBet; betStatus: BetStatus }) => {
    if (isMyBetBuildABet(bet)) {
        return <SingleBuildABetContent bet={bet} betStatus={betStatus} />;
    }

    if (isMyBetCrossBet(bet)) {
        return <SingleCrossBetContent bet={bet} betStatus={betStatus} />;
    }

    if (isMyBetStandardBet(bet)) {
        return <SingleStandardBetContent bet={bet} betStatus={betStatus} />;
    }

    return null;
};

export default SingleBetContent;
