import { fireEvent, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import get from 'lodash/get';
import ms from 'ms';
import { act } from 'react';

import { TimerStatus } from './state/enums';
import type { Settings } from './types';
import useTimer from './useTimer';

vi.useFakeTimers();

describe.skip('useTimer', () => {
    const timeTestId = 'testId-time';
    const statusTestId = 'testId-status';
    const startTestId = 'testId-start';
    const pauseTestId = 'testId-pause';
    const resetTestId = 'testId-reset';

    const Time = ({ time }: { time: number }) => <p data-testid={timeTestId}>{time}</p>;
    const Status = ({ status }: { status: TimerStatus }) => <p data-testid={statusTestId}>{status}</p>;

    const StartButton = ({ start }: { start: () => void }) => (
        <button data-testid={startTestId} onClick={start}>
            Start
        </button>
    );

    const PauseButton = ({ pause }: { pause: () => void }) => (
        <button data-testid={pauseTestId} onClick={pause}>
            Pause
        </button>
    );

    const ResetButton = ({ reset }: { reset: () => void }) => (
        <button data-testid={resetTestId} onClick={reset}>
            Reset
        </button>
    );

    describe('Start', () => {
        it('should start timer', () => {
            const Wrapper = () => {
                const { time, start } = useTimer();

                return (
                    <div>
                        <StartButton start={start} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByRole, getByTestId } = render(<Wrapper />);

            fireEvent.click(getByRole('button'));
            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            expect(getByTestId(timeTestId).textContent).toBe('5');
        });

        it('should start timer with an initialTime of 5', () => {
            const Wrapper = () => {
                const { time, start } = useTimer({
                    initialTime: 5,
                });

                return (
                    <div>
                        <StartButton start={start} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByRole, getByTestId } = render(<Wrapper />);

            fireEvent.click(getByRole('button'));
            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            expect(getByTestId(timeTestId).textContent).toBe('10');
        });

        it('should autoStart timer with an initial status of Running', () => {
            const Wrapper = () => {
                const { time } = useTimer({
                    initialStatus: TimerStatus.Running,
                });

                return <Time time={time} />;
            };

            const { getByTestId } = render(<Wrapper />);

            act(() => {
                vi.advanceTimersByTime(ms('10s'));
            });

            expect(getByTestId(timeTestId).textContent).toBe('10');
        });

        it('should re-start timer with updated initialTime', () => {
            const Wrapper = ({ initialTime }: Partial<Settings>) => {
                const { time, start, reset } = useTimer({
                    initialTime,
                });

                return (
                    <div>
                        <StartButton start={start} />
                        <ResetButton reset={reset} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByTestId, rerender } = render(<Wrapper initialTime={10} />);
            const startButton = getByTestId(startTestId);
            const resetButton = getByTestId(resetTestId);

            fireEvent.click(startButton);

            rerender(<Wrapper initialTime={10} />);

            fireEvent.click(resetButton);
            fireEvent.click(startButton);

            expect(getByTestId(timeTestId).textContent).toBe('10');
        });

        it('should update time with an interval of 2000 milliseconds', () => {
            const Wrapper = () => {
                const { time, start } = useTimer({
                    interval: 2000,
                });

                return (
                    <div>
                        <StartButton start={start} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByRole, getByTestId } = render(<Wrapper />);

            fireEvent.click(getByRole('button'));
            act(() => {
                vi.advanceTimersByTime(ms('10s'));
            });

            expect(getByTestId(timeTestId).textContent).toBe('5');
        });

        it('should autostart', () => {
            const Wrapper = () => {
                const { time } = useTimer({
                    autoStart: true,
                });

                return <Time time={time} />;
            };

            const { getByTestId } = render(<Wrapper />);

            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            expect(getByTestId(timeTestId).textContent).toBe('5');
        });

        it('should start timer with an initial status of Paused', () => {
            const Wrapper = () => {
                const { status, time } = useTimer({
                    initialStatus: TimerStatus.Paused,
                });

                return (
                    <div>
                        <Time time={time} />
                        <Status status={status} />
                    </div>
                );
            };

            const { getByTestId } = render(<Wrapper />);

            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            expect(getByTestId(statusTestId).textContent).toBe(TimerStatus.Paused);
            expect(getByTestId(timeTestId).textContent).toBe('0');
        });
    });

    describe('Stop', () => {
        it('should stop timer when time is over', () => {
            const Wrapper = () => {
                const { time, start } = useTimer({
                    endTime: 25,
                    initialTime: 5,
                });

                return (
                    <div>
                        <StartButton start={start} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByRole, getByTestId } = render(<Wrapper />);

            fireEvent.click(getByRole('button'));
            act(() => {
                vi.advanceTimersByTime(ms('40s'));
            });

            expect(getByTestId(timeTestId).textContent).toBe('25');
        });
    });

    describe('Reset', () => {
        it('should reset timer to default initialTime', () => {
            const Wrapper = () => {
                const { time, start, reset } = useTimer();

                return (
                    <div>
                        <StartButton start={start} />
                        <ResetButton reset={reset} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByTestId } = render(<Wrapper />);
            const startButton = getByTestId(startTestId);
            const resetButton = getByTestId(resetTestId);
            const time = getByTestId(timeTestId);

            fireEvent.click(startButton);
            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            fireEvent.click(resetButton);
            expect(time.textContent).toBe('0');
        });

        it('should reset timer to default initialTime after restart', () => {
            const Wrapper = () => {
                const { time, start } = useTimer({
                    endTime: 10,
                });

                return (
                    <div>
                        <StartButton start={start} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByRole, getByTestId } = render(<Wrapper />);

            fireEvent.click(getByRole('button'));
            act(() => {
                vi.advanceTimersByTime(ms('10s'));
            });

            fireEvent.click(getByRole('button'));
            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            expect(getByTestId(timeTestId).textContent).toBe('5');
        });

        it('should reset timer to initialTime of 20', () => {
            const Wrapper = () => {
                const { time, start, reset } = useTimer({
                    initialTime: 20,
                });

                return (
                    <div>
                        <StartButton start={start} />
                        <ResetButton reset={reset} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByTestId } = render(<Wrapper />);

            fireEvent.click(getByTestId(startTestId));
            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            fireEvent.click(getByTestId(resetTestId));
            expect(getByTestId(timeTestId).textContent).toBe('20');
        });
    });

    describe('Pause', () => {
        it('should pause timer', () => {
            const Wrapper = () => {
                const { time, start, pause } = useTimer();

                return (
                    <div>
                        <StartButton start={start} />
                        <PauseButton pause={pause} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByTestId } = render(<Wrapper />);

            fireEvent.click(getByTestId(startTestId));
            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            fireEvent.click(getByTestId(pauseTestId));
            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            expect(getByTestId(timeTestId).textContent).toBe('5');
        });

        it('should pause timer with an end time', () => {
            const Wrapper = () => {
                const { time, start, pause } = useTimer({
                    endTime: 5,
                });

                return (
                    <div>
                        <StartButton start={start} />
                        <PauseButton pause={pause} />
                        <Time time={time} />
                    </div>
                );
            };

            const { getByTestId } = render(<Wrapper />);
            const startButton = getByTestId(startTestId);
            const pauseButton = getByTestId(pauseTestId);
            const time = getByTestId(timeTestId);

            fireEvent.click(startButton);

            act(() => {
                vi.advanceTimersByTime(ms('3s'));
            });

            fireEvent.click(pauseButton);

            act(() => {
                vi.advanceTimersByTime(ms('5s'));
            });

            fireEvent.click(startButton);

            expect(time.textContent).toBe('3');

            act(() => {
                vi.advanceTimersByTime(ms('3s'));
            });

            expect(time.textContent).toBe('5');
        });
    });

    describe('State and callbacks', () => {
        it('should display Running text when timer is running', () => {
            const Wrapper = () => {
                const { status, start, pause, reset } = useTimer({
                    initialTime: 20,
                });

                return (
                    <div>
                        <StartButton start={start} />
                        <PauseButton pause={pause} />
                        <ResetButton reset={reset} />
                        <Status status={status} />
                    </div>
                );
            };

            const { getByTestId } = render(<Wrapper />);
            const startButton = getByTestId(startTestId);
            const pauseButton = getByTestId(pauseTestId);
            const resetButton = getByTestId(resetTestId);
            const statusBlock = getByTestId(statusTestId);

            fireEvent.click(startButton);
            expect(statusBlock.textContent).toBe(TimerStatus.Running);

            fireEvent.click(pauseButton);
            expect(statusBlock.textContent).toBe(TimerStatus.Paused);

            fireEvent.click(startButton);
            expect(statusBlock.textContent).toBe(TimerStatus.Running);

            fireEvent.click(resetButton);
            expect(statusBlock.textContent).toBe(TimerStatus.Stopped);
        });

        it('should call callback when time is over', () => {
            const onTimeOver = vi.fn();

            const Wrapper = () => {
                const { start } = useTimer({
                    endTime: 30,
                    initialTime: 0,
                    onTimeOver,
                });

                return (
                    <div>
                        <StartButton start={start} />
                    </div>
                );
            };

            const { getByRole } = render(<Wrapper />);

            fireEvent.click(getByRole('button'));

            act(() => {
                vi.advanceTimersByTime(ms('30s'));
            });

            expect(onTimeOver).toHaveBeenCalled();
        });

        it('should call callback when time is updated', () => {
            const onTimeUpdate = vi.fn();

            const Wrapper = () => {
                const { start } = useTimer({
                    endTime: 10,
                    initialTime: 0,
                    onTimeUpdate,
                });

                return (
                    <div>
                        <StartButton start={start} />
                    </div>
                );
            };

            const { getByRole } = render(<Wrapper />);

            fireEvent.click(getByRole('button'));

            act(() => {
                vi.advanceTimersByTime(ms('10s'));
            });

            expect(onTimeUpdate).toHaveBeenCalledTimes(11);
            expect(onTimeUpdate).toHaveBeenNthCalledWith(5, 4);
            expect(onTimeUpdate).toHaveBeenLastCalledWith(10);
        });

        it('should call updated callback when time is updated', () => {
            const initialOnTimeUpdate = vi.fn();
            const updatedOnTimeUpdate = vi.fn();

            const Wrapper = ({ onTimeUpdate }: Partial<Settings>) => {
                const { start } = useTimer({
                    endTime: 10,
                    initialTime: 0,
                    onTimeUpdate,
                });

                return (
                    <div>
                        <StartButton start={start} />
                    </div>
                );
            };

            const { getByRole, rerender } = render(<Wrapper onTimeUpdate={initialOnTimeUpdate} />);
            rerender(<Wrapper onTimeUpdate={updatedOnTimeUpdate} />);

            fireEvent.click(getByRole('button'));

            act(() => {
                vi.advanceTimersByTime(ms('10s'));
            });

            expect(initialOnTimeUpdate).toHaveBeenCalledTimes(1);
            expect(updatedOnTimeUpdate).toHaveBeenCalledTimes(11);
        });
    });
});

test.skip('useTimer humanized version', () => {
    const Wrapper = ({ initialTime, step, interval, endTime }: Partial<Settings>) => {
        const { reset, start, pause, status, time } = useTimer({
            endTime,
            initialTime,
            step,
            interval,
        });

        return (
            <div>
                <button onClick={reset}>reset</button>
                <button onClick={start}>start</button>
                <button onClick={pause}>pause</button>

                <div data-testid='status'>{status}</div>
                <div data-testid='time'>{time}</div>
            </div>
        );
    };

    const fastForwardTime = (seconds: number) =>
        act(() => {
            vi.advanceTimersByTime(ms(`${seconds}s`));
        });

    const tickTock = 10; // time interval
    const timeTravelBarrier = 29;
    const currentAge = 42;
    const step = 2;
    const props = {
        endTime: timeTravelBarrier,
        initialTime: currentAge,
        step: -step,
        interval: ms(`${tickTock}s`),
    };

    const { getByText, getByTestId } = render(<Wrapper {...props} />);

    const startButton = getByText(/start/);
    const pauseButton = getByText(/pause/);
    const resetButton = getByText(/reset/);

    const ageEl = getByTestId('time');
    const stateEl = getByTestId('status');

    //                   42
    //  ------------------x--------
    //                    ^
    //                    |
    //    you are here ---'

    expect(ageEl).toHaveTextContent('42');
    expect(stateEl).toHaveTextContent(TimerStatus.Stopped);

    fastForwardTime(tickTock);

    // nothing is happening
    expect(ageEl).toHaveTextContent('42');
    expect(stateEl).toHaveTextContent(TimerStatus.Stopped);

    user.click(startButton);

    fastForwardTime(1 * tickTock);

    // the getting younger process started (- 1 ticktock)

    //                40  42
    //  ---------------<--.--------
    //                 ^
    //                 '---.
    //  now, you are here -', we are 40 and still running

    expect(stateEl).toHaveTextContent(TimerStatus.Running);
    expect(ageEl).toHaveTextContent(`${currentAge - step}`);

    fastForwardTime(4 * tickTock);

    //      32
    //  ----<---------<--.--------
    //      ^-------------.
    //                    |
    //  now, we are here -', we are 32 and still running
    //  in sum 5 ticktocks passed, hence 5 steps "removed"
    expect(ageEl).toHaveTextContent(`${currentAge - 5 * step}`);
    expect(stateEl).toHaveTextContent(TimerStatus.Running);

    // hold your horses
    user.click(pauseButton);

    fastForwardTime(tickTock);

    //      32
    //  ----x---------<--.--------
    //      ^-------------.
    //                    |
    //  now, we are here -', we are still 32, and we stopped
    expect(ageEl).toHaveTextContent('32');
    expect(stateEl).toHaveTextContent(TimerStatus.Paused);

    // let's go "Back to the Future"
    user.click(resetButton);

    //      .-------------.
    //      |             v
    //  ----.-------------x--------
    //                    ^
    //                    |
    //  now, we are here -', we are still 42, and we stopped
    expect(ageEl).toHaveTextContent(`${currentAge}`);
    expect(stateEl).toHaveTextContent(TimerStatus.Stopped);

    fastForwardTime(tickTock);

    //                    42
    //  ------------------x--------
    //                    ^
    //                    |
    //  nothing happened (since we stopped)
    expect(ageEl).toHaveTextContent(`${currentAge}`);
    expect(stateEl).toHaveTextContent(TimerStatus.Stopped);

    // let's get wild and move to when we are 16
    user.click(startButton);
    fastForwardTime(tickTock);
    // just checking...
    //                    40
    //  ------------------<-.--------
    expect(ageEl).toHaveTextContent(`${currentAge - step}`);
    expect(stateEl).toHaveTextContent(TimerStatus.Running);

    fastForwardTime(15 * tickTock);

    // our barier (timeIsUp limit) is timeTravelBarrier = 29
    //         29|<<<-- we hit the wall
    //  ---------x--------<-.--------
    const age = get(ageEl, 'textContent') || '999';
    // check if age E [29-2, 29+2]
    // in other words if age is within this interva
    expect(+age).toBeGreaterThanOrEqual(timeTravelBarrier - step);
    expect(+age).toBeLessThanOrEqual(timeTravelBarrier + step);
    expect(stateEl).toHaveTextContent(TimerStatus.Stopped);
});
