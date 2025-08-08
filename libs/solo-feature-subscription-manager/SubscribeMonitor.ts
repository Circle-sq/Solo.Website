import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import ms from 'ms';
import noop from 'lodash/noop';

export interface Monitor {
    has: (channel: string, count?: boolean) => boolean;
    add: (channel: string) => void;
    remove: (channel: string) => void;
    clear: () => void;
    log: () => void;
}

export const DEFAULT_DEBUG_INTERVAL = ms('10s');
export const DEFAULT_LEAK_PREVENT_INTERVAL = ms('0.5h');

type MonitorConfig = Partial<{
    debug: boolean;
    log: (message: string) => void;
    debugInterval: number;
    resetInterval: number;
}>;

export const SubscribeMonitor = (config: MonitorConfig = {}): Monitor => {
    const {
        debug = false,
        log = debug ? console.warn : noop,
        debugInterval = DEFAULT_DEBUG_INTERVAL,
        resetInterval = DEFAULT_LEAK_PREVENT_INTERVAL,
    } = config;
    const records: Map<string, number> = new Map();
    let subscriptions = 0;
    let avoided = 0;

    function preventMemoryLeak(): void {
        log(`AWSM reset ${records.size} => 0, prevented: ${avoided}`);
        records.clear();
        avoided = 0;
    }

    function init(): void {
        if (typeof window === 'undefined') {
            return;
        }

        if (debug) {
            window['AWSM'] = {
                records,
                log: () => {
                    const channels = records.keys();
                    log('channels subscribed to', channels);
                },
            };
            window.setInterval(() => {
                // AWSM = A_WebSocket_Monitor
                log(`AWSM > avoided: ${avoided}/current: ${subscriptions}`);
            }, debugInterval);
        }

        window.setInterval(preventMemoryLeak, resetInterval);
    }

    init();

    return {
        has(channel: string, count = true): boolean {
            const alreadyRegistered = records.has(channel);

            if (!alreadyRegistered) {
                return false;
            } else if (debug) {
                log(`AWSM > ${channel} is already registered`);
            }

            if (count) {
                avoided += 1;
            }

            return true;
        },

        add(channel: string): void {
            let currentChannelCount = records.get(channel);

            if (isUndefined(currentChannelCount)) {
                currentChannelCount = 0;
                subscriptions += 1;
            }

            currentChannelCount += 1;
            records.set(channel, currentChannelCount);
        },

        remove(channel: string): void {
            if (!this.has(channel, false)) {
                return;
            }

            let currentChannelCount = records.get(channel);

            if (isUndefined(currentChannelCount)) {
                return;
            }

            currentChannelCount -= 1;
            subscriptions -= 1;

            if (currentChannelCount === 0) {
                records.delete(channel);
            } else {
                records.set(channel, currentChannelCount);
            }
        },

        log() {
            const channels = records.keys();
            log('channels subscribed to', channels);
        },

        clear: preventMemoryLeak,
    };
};

let instance: Monitor | null = null;
let instanceParams: MonitorConfig = {};

export const getUniqueMonitorInstance = (config: MonitorConfig = {}): Monitor => {
    if (isNull(instance) || instanceParams.debug !== config.debug) {
        if (config.debug) {
            console.info('AWSM init', config);
        }
        instanceParams = config;
        instance = SubscribeMonitor(config);
    }

    return instance;
};
