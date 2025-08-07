import split from 'lodash/split';
import type { CallbackInterface } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { eventLiveTimerAtomFamily } from './atoms';

export const updateLiveCounterTask =
    ({ set, snapshot }: CallbackInterface) =>
    (time: number, eventId: number) => {
        const updatedTime = getValue(snapshot, eventLiveTimerAtomFamily(eventId));
        const hasRunningCounter = time > updatedTime;
        const timer = updatedTime === 0 || hasRunningCounter ? time : updatedTime;

        set(eventLiveTimerAtomFamily(eventId), timer);
    };

export const resetLiveTimerTask =
    ({ reset, snapshot }: CallbackInterface) =>
    () => {
        const nodes = snapshot.getNodes_UNSTABLE({ isInitialized: true });

        for (const node of nodes) {
            const [atomKey, familyId] = split(node.key, '__');

            if (atomKey === 'eventLiveTimerAtomFamily') {
                reset(eventLiveTimerAtomFamily(Number(familyId)));
            }
        }
    };
