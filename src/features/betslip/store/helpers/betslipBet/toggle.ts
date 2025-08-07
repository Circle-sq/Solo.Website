import includes from 'lodash/includes';
import reject from 'lodash/reject';
import union from 'lodash/union';

export const toggleBetslipBet =
    (betId: string) =>
    (state: string[]): string[] => {
        if (!includes(state, betId)) {
            return [...state, betId];
        }

        return reject(state, (id) => id === betId);
    };

export const uncheckBetslipBetIds =
    (betIds: string[]) =>
    (state: string[]): string[] =>
        union(state, betIds);
