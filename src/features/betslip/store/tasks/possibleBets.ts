import forEach from 'lodash/forEach';
import type { CallbackInterface } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { possibleBetsTriggersAtom } from '../atoms/betslip';
import { addPossibleBetsTrigger } from '../helpers/possibleBets';
import type { PossibleBetsTrigger } from '../types';

export const takeLatestTask =
    ({ set, snapshot }: CallbackInterface) =>
    (trigger: PossibleBetsTrigger) => {
        forEach(getValue(snapshot, possibleBetsTriggersAtom), ({ triggeredBy, controller }) => {
            if (trigger.triggeredBy === triggeredBy && !controller.signal.aborted) {
                controller.abort('TAKE_LATEST_STRATEGY');
            }
        });

        set(possibleBetsTriggersAtom, addPossibleBetsTrigger(trigger));
    };
