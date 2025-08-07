import { selectorFamily } from 'recoil';

import { eventTimeInSecondsAtomFamily, liveEventTimerAtomFamily } from '../atoms';
import { getTime } from '../helpers';

export const eventTimeSelectorFamily = selectorFamily<string, number>({
    key: 'eventTimeSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const timeInSeconds = get(eventTimeInSecondsAtomFamily(eventId));
            const liveEventTimer = get(liveEventTimerAtomFamily(eventId));

            return getTime(timeInSeconds + liveEventTimer);
        },
});
