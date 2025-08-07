import { intervalToDuration } from 'date-fns';
import { useAtomValue } from 'jotai';
import { memo, useEffect, useRef, useState } from 'react';

import { userDataAtom } from '../../store/atoms';

const LoggedInTime = () => {
    const interval = useRef<NodeJS.Timeout | null>(null);

    const userData = useAtomValue(userDataAtom);
    const loggedTime = userData?.loggedTime ?? 0;

    // Calculate the initial duration
    const [durationState, setDurationState] = useState<number>(() => {
        const now = new Date().getTime();

        return now - loggedTime;
    });

    useEffect(() => {
        interval.current = setInterval(() => {
            const now = new Date().getTime();
            const duration = now - loggedTime;

            setDurationState(duration);
        }, 1000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [loggedTime]);

    const formatActiveTime = (duration: number): string => {
        const durationObj = intervalToDuration({
            start: 0,
            end: duration,
        });

        const { hours, minutes, seconds } = durationObj;

        return (
            [hours ? `${hours} h` : '', minutes ? `${minutes} min` : '', seconds ? `${seconds} sec` : '']
                .filter(Boolean) // Remove empty parts
                .join(' ') || '0sec'
        ); // Fallback to "0sec" if all parts are zero
    };

    return <span>{formatActiveTime(durationState)}</span>;
};

export default memo(LoggedInTime);
