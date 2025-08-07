import { useRecoilCallback, useRecoilValue } from 'recoil';

import { formatToSeconds } from '../helpers';
import { useAnimateFrame } from '../hooks/useAnimateFrame';
import { timerEventSelectorFamily } from '../store/selectors';
import { updateLiveCounterTask } from '../store/tasks';

interface Props {
    eventId: number;
    initialTime: string;
}

const FrameTimer = ({ eventId, initialTime }: Props) => {
    const { minutes, seconds } = useRecoilValue(timerEventSelectorFamily(eventId));
    const updateLiveCounter = useRecoilCallback(updateLiveCounterTask, [eventId]);

    useAnimateFrame((time: number) => updateLiveCounter(time, eventId), formatToSeconds(initialTime));

    return <>{`${minutes}:${seconds}`}</>;
};

export default FrameTimer;
