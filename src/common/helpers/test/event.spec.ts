import type { StatisticValue } from 'src/common/types/statistics';
import { NON_LIVE_PERIODS } from 'src/utils/constants';

import { isLiveEventPeriod } from '../event';

describe('isLiveEventPeriod', () => {
    it('should return true when period is live', () => {
        const statistics = { period: { value: 'Live' } as StatisticValue };
        const result = isLiveEventPeriod(statistics);

        expect(result).toBe(true);
    });

    it('should return false when period is non-live', () => {
        const statistics = { period: { value: 'Not started' } as StatisticValue };
        const result = isLiveEventPeriod(statistics);

        expect(result).toBe(false);
    });

    it('should return false when statistics is null', () => {
        const statistics = null;
        const result = isLiveEventPeriod(statistics);

        expect(result).toBe(false);
    });

    it('should return false when period is empty', () => {
        const statistics = { period: { value: '' } as StatisticValue };
        const result = isLiveEventPeriod(statistics);

        expect(result).toBe(false);
    });

    it('should return false when period is not present', () => {
        const statistics = {};
        const result = isLiveEventPeriod(statistics);

        expect(result).toBe(false);
    });

    it('should return false when period value is non-live', () => {
        NON_LIVE_PERIODS.forEach((period) => {
            const statistics = { period: { value: period } as StatisticValue };
            const result = isLiveEventPeriod(statistics);

            expect(result).toBe(false);
        });
    });
});
