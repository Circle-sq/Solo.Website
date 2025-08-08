/* eslint-disable no-console */
import times from 'lodash/times';
import ms from 'ms';

import type { SubKey } from './subKeys';
import { getBookkeeperInstance } from './SubscriptionQueueService';
import { buildKey } from './utils';

const aTimeout = ms('10s');

const bookKeeperConfig = { timeout: aTimeout, debug: false };
const subKey = 'foo' as SubKey;

describe('SubscriptionQueueService', () => {
    let foos: number[] = [];

    beforeEach(() => {
        vi.useFakeTimers();
        foos = times(2);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it(`should call callback after ${aTimeout}ms `, () => {
        const callbackSpy = vi.fn();
        const queueManager = getBookkeeperInstance(bookKeeperConfig);
        const events = times(2);
        const key = buildKey(events, subKey);

        queueManager.addToQueue(key, () => callbackSpy(events, subKey));

        expect(callbackSpy).not.toHaveBeenCalled();

        expect(queueManager.inQueue(key)).toBe(true);

        vi.advanceTimersByTime(aTimeout / 2);
        expect(callbackSpy).not.toHaveBeenCalled();

        vi.advanceTimersByTime(aTimeout / 2);

        expect(callbackSpy).toHaveBeenCalledWith(events, subKey);
        expect(queueManager.inQueue(key)).toBe(false);
    });

    it('should cancel callback', () => {
        const callbackSpy = vi.fn();
        const queueManager = getBookkeeperInstance(bookKeeperConfig);

        // 2. start unsubscribe
        const key = buildKey(foos, subKey);
        queueManager.addToQueue(key, () => callbackSpy(foos, subKey));

        // haven't yet been called
        expect(callbackSpy).not.toHaveBeenCalled();

        // fast-forward some time
        vi.advanceTimersByTime(aTimeout / 2);

        // still present
        expect(queueManager.inQueue(key)).toBe(true);

        // cancelling callback
        queueManager.cancel(key);
        expect(queueManager.inQueue(key)).toBe(false);

        // fast-forward again
        vi.runAllTimers();

        // no unsubscribe happen
        expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('should clear whole queue', () => {
        const callbackSpy = vi.fn();
        const queueManager = getBookkeeperInstance(bookKeeperConfig);

        // 2. start unsubscribe
        const key = buildKey(foos, subKey);
        queueManager.addToQueue(key, () => callbackSpy(foos, subKey));

        // haven't yet been called
        expect(callbackSpy).not.toHaveBeenCalled();

        queueManager.clear();
        expect(queueManager.empty()).toBe(true);

        // fast-forward again
        vi.advanceTimersToNextTimer();

        // no unsubscribe happen
        expect(callbackSpy).not.toHaveBeenCalled();
    });

    it('should return same instance', () => {
        const instance1 = getBookkeeperInstance(bookKeeperConfig);
        const instance2 = getBookkeeperInstance(bookKeeperConfig);

        expect(instance1).toBe(instance2);
    });
});
