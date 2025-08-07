import { selectorFamily } from 'recoil';

import { SECONDS_IN_MINUTE } from 'src/utils/constants';

import { padTime } from '../helpers';

import { eventLiveTimerAtomFamily } from './atoms';

export const timerEventSelectorFamily = selectorFamily<{ minutes: string; seconds: string }, number>({
    key: 'timerEventSelectorFamily',
    get:
        (eventId) =>
        ({ get }) => {
            const liveSeconds = get(eventLiveTimerAtomFamily(eventId));
            const minutes = padTime(Math.floor(liveSeconds / SECONDS_IN_MINUTE));
            const seconds = padTime(liveSeconds % SECONDS_IN_MINUTE);

            return { minutes, seconds };
        },
});
