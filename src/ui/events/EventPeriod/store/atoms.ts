import { atomFamily } from 'recoil';

export const eventLiveTimerAtomFamily = atomFamily<number, number>({
    key: 'eventLiveTimerAtomFamily',
    default: 0,
});
