import ms from 'ms';

import { Stopwatch } from './test/StopWatch';

export interface Queue {
    empty: () => boolean;
    addToQueue: (key: string, cb: () => void, color?: string) => void;
    cancel: (key: string, color?: string) => void;
    inQueue: (key: string) => boolean;
    clear: () => void;
    log: () => void;
}

export const UNSUBSCRIBE_TIMEOUT = ms('10s');

interface QueueService {
    getWindow: () => Window;
    timeout: number;
    debug: boolean;
}

function SubscriptionQueueService({ getWindow, timeout, debug }: QueueService): Queue {
    const stopWatch = new Stopwatch('sub_queue_service');
    const unsubscribeCache: Map<string, number> = new Map();

    return {
        empty: (): boolean => unsubscribeCache.size === 0,
        cancel: (key: string, color = 'red'): void => {
            if (debug) {
                stopWatch.tick(`cancel ${key}.cb()`);
                console.info(`%c Cancel _callback_ with key=[${key}]`, `color:${color}`);
            }
            getWindow().clearTimeout(unsubscribeCache.get(key));
            unsubscribeCache.delete(key);
        },
        inQueue: (key: string): boolean => {
            return unsubscribeCache.has(key);
        },
        clear: (): void => {
            unsubscribeCache.forEach((pid) => {
                getWindow().clearTimeout(pid);
            });
            unsubscribeCache.clear();
        },
        addToQueue: (key: string, cb: () => void, color = 'green'): void => {
            const pid = getWindow().setTimeout(() => {
                unsubscribeCache.delete(key);

                if (debug) {
                    stopWatch.tick(`call ${key}.cb()`);
                    console.info(`%c Calling _callback_ key=[${key}]`, `color:${color}`);
                }
                cb();
            }, timeout);

            unsubscribeCache.set(key, pid);

            if (debug) {
                stopWatch.tick(`add ${key}.cb() to queue`);
                console.info(`%c Added _callback_ to queue, key=[${key}]`, `color:${color}`);
            }
        },
        log: () => {
            if (!debug) {
                return;
            }
            console.info(`%c      ------ _callback_ queue`, `color:lightblue`, unsubscribeCache.size);
            unsubscribeCache.forEach((pid, key) => {
                console.info(`%c   ${pid}: [${key}]  `, 'color:lightblue');
            });
        },
    };
}

let cachedUnsubscribeService: unknown = null;

export const getBookkeeperInstance = ({
    getWindow = (): Window => window,
    timeout = UNSUBSCRIBE_TIMEOUT,
    debug = false,
}: Partial<QueueService> = {}): Queue => {
    if (cachedUnsubscribeService === null) {
        if (debug) {
            console.info(`SQS init with timeout: ${timeout}, debug: ${debug ? 'On' : 'Off'}`);
        }
        cachedUnsubscribeService = SubscriptionQueueService({ getWindow, timeout, debug });
    }

    return cachedUnsubscribeService as Queue;
};
