import omit from 'lodash/omit';

export const removeSingleBetStake =
    (selectionId: string) =>
    (singleBetStakes: Record<string, number>): Record<string, number> =>
        omit(singleBetStakes, selectionId);
