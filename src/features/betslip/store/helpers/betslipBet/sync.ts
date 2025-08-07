import includes from 'lodash/includes';
import reject from 'lodash/reject';
import replace from 'lodash/replace';

export const syncUncheckedBetId =
    (prevBetId: string, newBetId: string) =>
    (state: string[]): string[] => {
        if (!includes(state, prevBetId)) {
            return state;
        }

        return [...reject(state, (id) => id === prevBetId), newBetId];
    };

const syncCrossBetUncheckedId = (
    state: string[],
    crossBetId: string,
    selectionId: string,
    selectionIdToSubstitute: string,
) => {
    const newCrossBetId = replace(crossBetId, selectionIdToSubstitute, selectionId);

    return syncUncheckedBetId(crossBetId, newCrossBetId)(state);
};

export const syncCrossBetUncheckedIdFromSameMarketType =
    (crossBetId: string, selectionId: string, selectionIdFromSameMarket: string) =>
    (state: string[]): string[] => {
        return syncCrossBetUncheckedId(state, crossBetId, selectionId, selectionIdFromSameMarket);
    };

export const syncCrossBetUncheckedIdFromDifferentMarketType =
    (crossBetId: string, selectionId: string, selectionIdToSubstitute: string) =>
    (state: string[]): string[] => {
        return syncCrossBetUncheckedId(state, crossBetId, selectionId, selectionIdToSubstitute);
    };
