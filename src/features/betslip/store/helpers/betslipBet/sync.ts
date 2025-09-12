import includes from 'lodash/includes';
import reject from 'lodash/reject';

export const syncUncheckedBetId =
    (prevBetId: string, newBetId: string) =>
    (state: string[]): string[] => {
        if (!includes(state, prevBetId)) {
            return state;
        }

        return [...reject(state, (id) => id === prevBetId), newBetId];
    };
