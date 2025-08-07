import Corners from 'src/assets/statistics_icons/Corners.svg';
import RedCard from 'src/assets/statistics_icons/RedCard.svg';
import YellowCard from 'src/assets/statistics_icons/YellowCard.svg';

import { EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG, StatisticType } from '../../../constants';

import { updateFootballStatistics } from './useFootballStatistics';

describe('updateFootballStatistics', () => {
    it('should return initial config when statistics are empty', () => {
        const result = updateFootballStatistics({});
        expect(result).toEqual(EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG);
    });

    it('should correctly update statistics for both teams', () => {
        const statistics = {
            'corner-kicks': { home: 3, away: 1 },
            'red-cards': { home: 0, away: 1 },
            'yellow-cards': { home: 2, away: 0 },
            'yellow-red-cards': { home: 0, away: 2 },
        };

        const result = updateFootballStatistics(statistics);

        expect(result.home[0].count).toBe(0); // Red cards
        expect(result.home[1].count).toBe(2); // Yellow cards
        expect(result.home[2].count).toBe(3); // Corner kicks

        expect(result.away[0].count).toBe(3); // Red cards (including yellow-red)
        expect(result.away[1].count).toBe(2); // Yellow cards (including yellow-red)
        expect(result.away[2].count).toBe(1); // Corner kicks
    });

    it('should handle missing statistics', () => {
        const statistics = {
            'corner-kicks': { home: 3, away: 1 },
            // Missing red-cards, yellow-cards, and yellow-red-cards
        };

        const result = updateFootballStatistics(statistics);

        expect(result.home[0].count).toBe(0); // Red cards
        expect(result.home[1].count).toBe(0); // Yellow cards
        expect(result.home[2].count).toBe(3); // Corner kicks

        expect(result.away[0].count).toBe(0); // Red cards
        expect(result.away[1].count).toBe(0); // Yellow cards
        expect(result.away[2].count).toBe(1); // Corner kicks
    });

    it('should handle string values in statistics', () => {
        const statistics = {
            'corner-kicks': { home: '3', away: '1' },
            'red-cards': { home: '0', away: '1' },
            'yellow-cards': { home: '2', away: '0' },
            'yellow-red-cards': { home: '0', away: '2' },
        };

        const result = updateFootballStatistics(statistics);

        expect(result.home[0].count).toBe(0); // Red cards
        expect(result.home[1].count).toBe(2); // Yellow cards
        expect(result.home[2].count).toBe(3); // Corner kicks

        expect(result.away[0].count).toBe(3); // Red cards (including yellow-red)
        expect(result.away[1].count).toBe(2); // Yellow cards (including yellow-red)
        expect(result.away[2].count).toBe(1); // Corner kicks
    });

    it('should not modify the original initial config', () => {
        const statistics = {
            'corner-kicks': { home: 3, away: 1 },
            'red-cards': { home: 0, away: 1 },
            'yellow-cards': { home: 2, away: 0 },
            'yellow-red-cards': { home: 0, away: 2 },
        };

        const result = updateFootballStatistics(statistics);

        expect(result).not.toBe(EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG);
        expect(EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG.home[0].count).toBe(0);
        expect(EVENT_STATISTICS_HOME_AWAY_INITIAL_CONFIG.away[0].count).toBe(0);
    });

    it('should maintain the correct order and structure of statistics', () => {
        const statistics = {
            'corner-kicks': { home: 3, away: 1 },
            'red-cards': { home: 1, away: 0 },
            'yellow-cards': { home: 2, away: 3 },
            'yellow-red-cards': { home: 0, away: 1 },
        };

        const result = updateFootballStatistics(statistics);

        expect(result.home.length).toBe(3);
        expect(result.away.length).toBe(3);

        expect(result.home[0].type).toBe(StatisticType.RedCards);
        expect(result.home[1].type).toBe(StatisticType.YellowCards);
        expect(result.home[2].type).toBe(StatisticType.CornerKicks);

        expect(result.away[0].type).toBe(StatisticType.RedCards);
        expect(result.away[1].type).toBe(StatisticType.YellowCards);
        expect(result.away[2].type).toBe(StatisticType.CornerKicks);

        expect(result.home[0].icon).toBe(RedCard);
        expect(result.home[1].icon).toBe(YellowCard);
        expect(result.home[2].icon).toBe(Corners);
    });
});
