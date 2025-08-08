import { MultipleBuildBetLeg } from '@solo-buildABet/ui';
import { isBuildABetLegType } from '@solo-buildABet/utils/typeGuards';

import type { PlacedBetLeg, PlacedBuildABetLeg, PlacedCrossBetLeg } from '../../../../../api/types/placedBet';
import { isCrossBetLegType } from '../../../../../typeGuards/leg';

import MultipleCrossBetLeg from './MultipleCrossBetLeg';
import MultipleStandardBetLeg from './MultipleStandardBetLeg';

const MultipleBetLegItem = ({ leg }: { leg: PlacedBetLeg }) => {
    if (isBuildABetLegType<PlacedBuildABetLeg>(leg)) {
        return <MultipleBuildBetLeg leg={leg} />;
    }

    if (isCrossBetLegType<PlacedCrossBetLeg>(leg)) {
        return <MultipleCrossBetLeg leg={leg} />;
    }

    return <MultipleStandardBetLeg leg={leg} />;
};

export default MultipleBetLegItem;
