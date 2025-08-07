import { useCallback, useEffect, useReducer, useRef } from 'react';
import isNumber from 'lodash/isNumber';

import timerReducer from './state/reducer';
import { pauseTimer, resetTimer, setTimer, startTimer, stopTimer } from './state/actions';
import { TimerStatus } from './state/enums';
import type { Settings, Timeout, TimerResult } from './types';

const DEFAULT_DELAY = 1000;

const useTimer = <T = unknown>({
    autoStart = false,
    endTime,
    initialStatus = TimerStatus.Stopped,
    initialTime = 0,
    interval = DEFAULT_DELAY,
    onTimeOver,
    onTimeUpdate,
    step = 1,
}: Partial<Settings<T>> = {}): TimerResult<T> => {
    const timerPayload = useRef<T>();

    const [state, dispatch] = useReducer(timerReducer, {
        status: initialStatus,
        time: initialTime,
    });

    const { status, time } = state;

    const start = useCallback(
        (payload?: T) => {
            timerPayload.current = payload;

            dispatch(startTimer(initialTime));
        },
        [initialTime],
    );

    const reset = useCallback(() => {
        dispatch(resetTimer(initialTime));
    }, [initialTime]);

    const pause = useCallback(() => {
        dispatch(pauseTimer());
    }, []);

    useEffect(() => {
        if (autoStart) {
            dispatch(startTimer(initialTime));
        }
    }, [autoStart, initialTime]);

    useEffect(() => {
        if (typeof onTimeUpdate === 'function') {
            onTimeUpdate(time);
        }
    }, [time, onTimeUpdate]);

    const timeIsUp = useCallback(
        (time: number) => {
            if (step > 0) {
                return isNumber(endTime) && time >= endTime;
            }

            return isNumber(endTime) && time <= endTime;
        },
        [step, endTime],
    );

    useEffect(() => {
        if (status !== TimerStatus.Stopped && timeIsUp(time)) {
            dispatch(stopTimer());

            if (typeof onTimeOver === 'function') {
                onTimeOver(timerPayload.current);
            }
        }
    }, [onTimeOver, status, time, timeIsUp]);

    useEffect(() => {
        let intervalId: Timeout | null = null;

        if (status === TimerStatus.Running) {
            intervalId = global.setInterval(() => {
                dispatch(setTimer(time + step));
            }, interval);
        } else if (intervalId) {
            global.clearInterval(intervalId);
        }

        return () => {
            if (intervalId) {
                global.clearInterval(intervalId);
            }
        };
    }, [status, step, interval, time]);

    return { reset, start, pause, status, time };
};

export default useTimer;
