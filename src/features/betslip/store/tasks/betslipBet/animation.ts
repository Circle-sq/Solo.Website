import delay from 'lodash/delay';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';
import type { CallbackInterface } from 'recoil';

import { getValue } from 'src/common/recoil/snapshot';

import { animationRecordsAtom, animationSubstitutionTagAtom } from '../../atoms/animation';
import { ANIMATION_DURATION } from '../../configs';

export const animationEndTask =
    ({ reset }: CallbackInterface) =>
    () => {
        reset(animationSubstitutionTagAtom);
    };

export const stopMultiBetAnimationTask =
    ({ reset, snapshot }: CallbackInterface) =>
    (animationKey?: string) => {
        if (animationKey === undefined) {
            return;
        }

        const animationRecords = getValue(snapshot, animationRecordsAtom);
        const animationStartedAt = get(animationRecords, animationKey);

        if (!isNumber(animationStartedAt)) {
            reset(animationRecordsAtom);

            return;
        }

        const animationLasted = Date.now() - animationStartedAt;
        const animationDelay =
            animationLasted < ANIMATION_DURATION
                ? ANIMATION_DURATION - animationLasted
                : animationLasted - ANIMATION_DURATION;

        delay(() => {
            reset(animationRecordsAtom);
        }, animationDelay);
    };
