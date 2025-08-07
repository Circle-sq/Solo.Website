import type { pauseTimer, resetTimer, setTimer, startTimer, stopTimer } from './state/actions';
import type { TimerStatus } from './state/enums';

export interface Settings<T = unknown> {
    initialTime: number;
    initialStatus: TimerStatus;
    interval: number;
    endTime: number | null;
    step: number;
    autoStart: boolean;
    onTimeOver?: (payload?: T) => void;
    onTimeUpdate?: (time: number) => void;
}

export interface TimerResult<T = unknown> {
    time: number;
    status: TimerStatus;
    start: (payload?: T) => void;
    pause: () => void;
    reset: () => void;
}

export interface State {
    time: number;
    status: TimerStatus;
}

export type TimerActionsType = ReturnType<
    typeof resetTimer | typeof setTimer | typeof startTimer | typeof pauseTimer | typeof stopTimer
>;

export type Timeout = ReturnType<typeof global.setInterval>;
