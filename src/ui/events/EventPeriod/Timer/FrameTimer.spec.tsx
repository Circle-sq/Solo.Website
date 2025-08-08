import { render as renderRTL, act } from '@testing-library/react'; // Import act
import userEvent from '@testing-library/user-event';
import map from 'lodash/map';
import ms from 'ms';
import createStub from 'raf-stub';
import type { RafStub } from 'raf-stub';
import { useCallback, useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import RecoilObserver from '@solo-tests/unit/mocks/recoil/RecoilObserver';

import { SECONDS_IN_MINUTE } from 'src/utils/constants';

import { formatToSeconds } from '../helpers';
import { eventLiveTimerAtomFamily } from '../store/atoms';

import FrameTimer from './FrameTimer';

const padThreshold = 10;
const initialTimes = [
    { id: 0, time: '09:09' },
    { id: 1, time: '1:55' },
    { id: 2, time: '75:33' },
];

const normalize = (s: string[]) => s.join('').replace(/ /g, '');

const padTime = (time = 0) => (time < padThreshold ? `0${time}` : String(time));

const incrementTime = (timeStr: string): string => {
    let time = formatToSeconds(timeStr);
    time = time + 1;
    const minutes = padTime(Math.floor(time / SECONDS_IN_MINUTE));
    const seconds = padTime(time % SECONDS_IN_MINUTE);

    return `${minutes}: ${seconds}`;
};

const Timers = ({ initialTimes }: { initialTimes: { id: number; time: string }[] }) => {
    return (
        <>
            {map(initialTimes, ({ id, time }) => (
                <div key={id}>
                    <RecoilObserver
                        node={eventLiveTimerAtomFamily(id)}
                        onChange={(_, setValue) => setValue(formatToSeconds(time))}
                    />
                    eventId{id}:<FrameTimer eventId={id} initialTime={time} />
                </div>
            ))}
        </>
    );
};

const MockApp = () => {
    const [times, setTimes] = useState(initialTimes);

    const incrementTimes = useCallback(() => {
        setTimes((prevTimes) =>
            prevTimes.map(({ time, id }) => ({
                time: incrementTime(time),
                id,
            })),
        );
    }, []);

    useEffect(() => {
        const intervalId = setInterval(incrementTimes, 1000);

        return () => clearInterval(intervalId);
    }, [incrementTimes]);

    return (
        <div data-testid='timers'>
            <Timers initialTimes={times} />
            <Timers initialTimes={[times[0]]} />
        </div>
    );
};

const render = (ui: JSX.Element) => {
    const user = userEvent.setup();

    return { user, ...renderRTL(ui) };
};

describe('RequestAnimationFrameTimer', () => {
    let stub: RafStub;

    beforeEach(() => {
        vi.useFakeTimers();
        stub = createStub();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should start with the initial time and update correctly for all on same page', async () => {
        const { getByTestId, rerender } = render(
            <RecoilRoot>
                <MockApp />
            </RecoilRoot>,
        );

        expect(getByTestId('timers')).toHaveTextContent(
            // prettier-ignore
            normalize([
                `eventId 0:   09:09`,
                `eventId 1:   01:55`,
                `eventId 2:   75:33`,
                `eventId 0:   09:09`,
            ]),
        );

        await act(async () => {
            vi.advanceTimersByTime(ms('1.1s'));
            stub.step(1);
            rerender(
                <RecoilRoot>
                    <MockApp />
                </RecoilRoot>,
            );
        });

        expect(getByTestId('timers')).toHaveTextContent(
            // prettier-ignore
            normalize([
                `eventId 0:   09:10`,
                `eventId 1:   01:56`,
                `eventId 2:   75:34`,
                `eventId 0:   09:10`,
            ]),
        );

        await act(async () => {
            vi.advanceTimersByTime(ms('59s'));
            stub.step(59);
            rerender(
                <RecoilRoot>
                    <MockApp />
                </RecoilRoot>,
            );
        });

        expect(getByTestId('timers')).toHaveTextContent(
            // prettier-ignore
            normalize([
                `eventId 0:   10:09`,
                `eventId 1:   02:55`,
                `eventId 2:   76:33`,
                `eventId 0:   10:09`,
            ]),
        );
    });
});
