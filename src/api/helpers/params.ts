import { SportType } from 'src/common/enums';

import type { ShouldMatchTermParam } from '../types';

export const getSportTerm = (sport: SportType): { 'sport.id': ShouldMatchTermParam<SportType> } => ({
    'sport.id': {
        type: 'shouldMatch',
        values: sport === SportType.Football ? [SportType.Football, SportType.ESoccer] : [sport],
    },
});

export const getCompetitionTerm = (competitionIds?: number[]): Record<string, ShouldMatchTermParam<number>> => {
    if (competitionIds === undefined) {
        return {};
    }

    return {
        'competition.id': {
            type: 'shouldMatch',
            values: competitionIds,
        },
    };
};
