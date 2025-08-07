import omit from 'lodash/omit';
import replace from 'lodash/replace';

import { getStakePerLine } from '../stake/common';

const syncCrossBetStake = (
    singleBetStakes: Record<string, number>,
    crossBetId: string,
    selectionId: string,
    selectionIdToSubstitute: string,
) => {
    const newCrossBetId = replace(crossBetId, selectionIdToSubstitute, selectionId);

    return {
        ...omit(singleBetStakes, [selectionIdToSubstitute, crossBetId]),
        [newCrossBetId]: getStakePerLine(singleBetStakes, crossBetId),
    };
};

export const syncCrossBetStakeFromSameMarketType =
    (crossBetId: string, selectionId: string, selectionIdFromSameMarket: string) =>
    (singleBetStakes: Record<string, number>): Record<string, number> => {
        return syncCrossBetStake(singleBetStakes, crossBetId, selectionId, selectionIdFromSameMarket);
    };

export const syncCrossBetStakeFromDifferentMarketType =
    (crossBetId: string, selectionId: string, selectionIdToSubstitute: string) =>
    (singleBetStakes: Record<string, number>): Record<string, number> => {
        return syncCrossBetStake(singleBetStakes, crossBetId, selectionId, selectionIdToSubstitute);
    };

export const syncBuildABetStake =
    (prevBuildABetId: string, newBuildABetId: string) =>
    (singleBetStakes: Record<string, number>): Record<string, number> => {
        return {
            ...omit(singleBetStakes, prevBuildABetId),
            [newBuildABetId]: getStakePerLine(singleBetStakes, prevBuildABetId),
        };
    };

export const syncCrossBetStakeFromSameMarket =
    (selectionId: string, selectionIdFromSameMarket: string) =>
    (singleBetStakes: Record<string, number>): Record<string, number> => {
        return {
            ...omit(singleBetStakes, selectionIdFromSameMarket),
            [selectionId]: getStakePerLine(singleBetStakes, selectionIdFromSameMarket),
        };
    };
