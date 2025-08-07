import { SingleBuildABetContent } from '@sc-buildABet/ui';
import { isBuildABetLegType } from '@sc-buildABet/utils/typeGuards';

import type { PlacedBetLeg, PlacedBuildABetLeg, PlacedCrossBetLeg } from '../../../../../api/types/placedBet';
import { isCrossBetLegType } from '../../../../../typeGuards/leg';

import SingleCrossBet from './SingleCrossBet';
import SingleStandardBet from './SingleStandardBet';

const SingleBetItemContent = ({ leg }: { leg: PlacedBetLeg }) => {
    if (isBuildABetLegType<PlacedBuildABetLeg>(leg)) {
        return <SingleBuildABetContent leg={leg} />;
    }

    if (isCrossBetLegType<PlacedCrossBetLeg>(leg)) {
        return <SingleCrossBet leg={leg} />;
    }

    return <SingleStandardBet leg={leg} />;
};

export default SingleBetItemContent;
