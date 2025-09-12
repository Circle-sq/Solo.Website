import { SingleBuildABetContent } from '@solo-buildABet/ui';
import { isBuildABetLegType } from '@solo-buildABet/utils/typeGuards';

import type { PlacedBetLeg, PlacedBuildABetLeg } from '../../../../../api/types/placedBet';

import SingleStandardBet from './SingleStandardBet';

const SingleBetItemContent = ({ leg }: { leg: PlacedBetLeg }) => {
    if (isBuildABetLegType<PlacedBuildABetLeg>(leg)) {
        return <SingleBuildABetContent leg={leg} />;
    }

    return <SingleStandardBet leg={leg} />;
};

export default SingleBetItemContent;
