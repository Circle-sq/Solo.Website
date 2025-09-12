import omit from 'lodash/omit';

import { getStakePerLine } from '../stake/common';

export const syncBuildABetStake =
    (prevBuildABetId: string, newBuildABetId: string) =>
    (singleBetStakes: Record<string, number>): Record<string, number> => {
        return {
            ...omit(singleBetStakes, prevBuildABetId),
            [newBuildABetId]: getStakePerLine(singleBetStakes, prevBuildABetId),
        };
    };
