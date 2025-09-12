import { MultipleBuildBetLeg } from '@solo-buildABet/ui';
import { isBuildABetLegType } from '@solo-buildABet/utils/typeGuards';

import type { PlacedBetLeg, PlacedBuildABetLeg } from '../../../../../api/types/placedBet';

import MultipleStandardBetLeg from './MultipleStandardBetLeg';

const MultipleBetLegItem = ({ leg }: { leg: PlacedBetLeg }) => {
    if (isBuildABetLegType<PlacedBuildABetLeg>(leg)) {
        return <MultipleBuildBetLeg leg={leg} />;
    }

    return <MultipleStandardBetLeg leg={leg} />;
};

export default MultipleBetLegItem;
