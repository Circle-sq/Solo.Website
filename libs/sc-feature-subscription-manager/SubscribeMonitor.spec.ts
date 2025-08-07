import times from 'lodash/times';

import {
    DEFAULT_DEBUG_INTERVAL,
    DEFAULT_LEAK_PREVENT_INTERVAL,
    getUniqueMonitorInstance,
    SubscribeMonitor,
} from './SubscribeMonitor';

describe('SubscribeMonitor', () => {
    beforeAll(() => {
        vi.useFakeTimers();
        console.info = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    it('should not debug', () => {
        const logSpy = vi.fn();
        const monitor = SubscribeMonitor({ log: logSpy });

        expect(monitor.has('FOO')).toBe(false);

        monitor.add('FOO');

        expect(monitor.has('FOO')).toBe(true);

        vi.advanceTimersByTime(DEFAULT_DEBUG_INTERVAL);
        expect(logSpy).not.toHaveBeenCalled();

        monitor.clear();
    });

    it('should add add remove records about attempt to subscribe', () => {
        const logSpy = vi.fn();

        const monitor = SubscribeMonitor({ debug: true, log: logSpy });
        expect(monitor.has('FOO', false)).toBe(false);
        monitor.add('FOO'); // 1 FOO

        if (!monitor.has('FOO', true)) {
            monitor.add('FOO'); // 2nd FOO
        }

        expect(monitor.has('FOO', false)).toBe(true);
        vi.advanceTimersByTime(DEFAULT_DEBUG_INTERVAL);
        expect(logSpy).toHaveBeenCalledWith('AWSM > avoided: 1/current: 1');
        monitor.remove('FOO'); // 1 FOO
        vi.advanceTimersByTime(DEFAULT_DEBUG_INTERVAL);
        expect(logSpy).toHaveBeenCalledWith('AWSM > avoided: 1/current: 0');
        logSpy.mockClear();
    });

    it('should prevent subscribing, preventing memory leak', () => {
        const logSpy = vi.fn();

        const monitor = SubscribeMonitor({ debug: true, log: logSpy });

        const FOO_COUNT = 3;
        times(FOO_COUNT, () => {
            if (monitor.has('FOO')) {
                return;
            }

            monitor.add('FOO');
        });

        vi.advanceTimersByTime(DEFAULT_DEBUG_INTERVAL);

        expect(logSpy).toHaveBeenCalledWith(`AWSM > avoided: ${FOO_COUNT - 1}/current: 1`);
        logSpy.mockClear();

        const BAR_COUNT = 3;
        times(BAR_COUNT, () => {
            if (monitor.has('bar')) {
                return;
            }

            monitor.add('bar');
        });

        const BAZ_COUNT = 2;
        times(BAZ_COUNT, () => {
            if (monitor.has('baz')) {
                return;
            }

            monitor.add('baz');
        });

        vi.advanceTimersByTime(DEFAULT_DEBUG_INTERVAL);

        // 1st attempt is registered the others are avoided
        const supposedlyAvoided = FOO_COUNT - 1 + (BAZ_COUNT - 1) + (BAR_COUNT - 1);
        expect(logSpy).toHaveBeenCalledWith(`AWSM > avoided: ${supposedlyAvoided}/current: 3`);

        // test mem leak prevention
        logSpy.mockClear();
        vi.advanceTimersByTime(DEFAULT_LEAK_PREVENT_INTERVAL);
        expect(logSpy).toHaveBeenCalledWith(`AWSM reset 3 => 0, prevented: ${supposedlyAvoided}`);
        monitor.clear();
    });

    it('should return same instance', () => {
        const mon1 = getUniqueMonitorInstance();
        const mon2 = getUniqueMonitorInstance();

        expect(mon1).toEqual(mon2);
    });
});
